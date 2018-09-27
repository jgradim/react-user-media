import React, { Component } from "react";
import PropTypes from "prop-types";

class Webcam extends Component {
  static propTypes = {
    audio: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    captureFormat: PropTypes.oneOf([
      "image/png",
      "image/jpeg",
      "image/webp"
    ]),
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
  };

  static defaultProps = {
    audio: true,
    video: true,
    width: 640,
    height: 480,
    captureFormat: "image/png",
    onSuccess: (() => {}),
    onFailure: ((error) => {
      console.error("An error occured while requesting user media");
      throw error;
    }),
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
    this._mediaStream && this._mediaStream.getTracks().forEach((track) => track.stop());
  }

  //---------------------------------------------------------------------------
  // External methods
  //---------------------------------------------------------------------------
  _hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  _requestUserMedia() {
    const constraints = {
      video: this.props.video,
      audio: this.props.audio,
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        const video = this._video;

        video.srcObject = stream;

        this._mediaStream = stream;

        this.setState({
          hasUserMedia: true,
          userMediaRequested: true
        });

        this.props.onSuccess();
      })
      .catch((error) => {
        this.props.onFailure(error);
      });
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

  captureCanvas() {
    const { hasUserMedia, userMediaRequested } = this.state;
    const { width, height } = this.props;

    if (hasUserMedia && userMediaRequested) {
      const canvas = this._getCanvas();
      const ctx = canvas.getContext("2d");

      ctx.drawImage(this._video, 0, 0, width, height);

      return canvas;
    }
  }

  captureScreenshot() {
    const { captureFormat } = this.props;
    const canvas = this.captureCanvas()
    if (canvas) {
      return canvas.toDataURL(captureFormat);
    }
  }

  captureBlob(cb = () => {}) {
    const { captureFormat } = this.props;
    const canvas = this.captureCanvas()
    if (canvas) {
      return canvas.toBlob(cb, captureFormat);
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
        ref={(component) => this._video = component}
        autoPlay
      />
    )
  }

};

export default Webcam;
