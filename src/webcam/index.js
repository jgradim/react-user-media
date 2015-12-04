import { Component, PropTypes } from "react";

class Webcam extends Component {
  static propTypes = {
    audio: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    captureFormat: PropTypes.oneOf([
      "image/png",
      "image/jpeg",
      "image/webp"
    ])
  };

  static defaultProps = {
    audio: true,
    width: 640,
    height: 480,
    captureFormat: "image/png"
  };

  static _mediaStream = null;
  static _captureCanvas = null;

  //---------------------------------------------------------------------------
  // Initialization
  //---------------------------------------------------------------------------

  constructor(props) {
    super(props);

    this.state = {
      hasUserMedia: false,
      userMediaRequested: false
    };
  }

  //---------------------------------------------------------------------------
  // Lifecycle methods
  //---------------------------------------------------------------------------

  componentDidMount() {
    if (!this._hasGetUserMedia()) {
      return false;
    }

    const { hasUserMedia, userMediaRequested } = this.state;
    if (!hasUserMedia && !userMediaRequested) {
      this._requestUserMedia();
    }
  }

  componentWillUnmount() {
    this._mediaStream.getTracks().forEach((track) => track.stop());
  }

  //---------------------------------------------------------------------------
  // External methods
  //---------------------------------------------------------------------------

  _hasGetUserMedia() {
    return !!(
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );
  }

  _requestUserMedia() {
    navigator.getUserMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );

    let constraints = {
      video: true,
      audio: this.props.audio
    }

    navigator.getUserMedia(
      constraints,
      (stream) => {
        const video = this.refs.video;

        if (window.URL) {
          video.src = window.URL.createObjectURL(stream);
        } else {
          video.src = stream;
        }

        this._mediaStream = stream;

        this.setState({
          hasUserMedia: true,
          userMediaRequested: true
        });
      },
      (error) => {
        console.log("An error occured while requesting user media");
        throw(error);
      }
    );

  }

  _getCanvas() {
    if (this._captureCanvas) {
      return this._captureCanvas;
    }

    this._captureCanvas = document.createElement("canvas");
    this._captureCanvas.width = this.props.width;
    this._captureCanvas.height = this.props.height;

    return this._captureCanvas;
  }

  //---------------------------------------------------------------------------
  // External methods
  //---------------------------------------------------------------------------

  captureScreenshot() {
    const { hasUserMedia, userMediaRequested } = this.state;
    const { width, height, captureFormat } = this.props;

    if (hasUserMedia && userMediaRequested) {
      const canvas = this._getCanvas();
      const ctx = canvas.getContext("2d");

      ctx.drawImage(this.refs.video, 0, 0, width, height);

      return canvas.toDataURL(captureFormat);
    }
  }

  //---------------------------------------------------------------------------
  // Render
  //---------------------------------------------------------------------------

  render() {
    const { width, height } = this.props;

    return (
      <video
        width={width}
        height={height}
        ref="video"
        autoPlay
      />
    )
  }

};

export default Webcam;
