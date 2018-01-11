import React from "react"
import ReactDOM from "react-dom"

import Webcam from "./webcam"

class Examples extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: true,
      screenshot: null
    }
  }

  takeScreenshot() {
    this.setState({
      screenshot: this.webcam.captureScreenshot()
    })
  }

  takeBinaryScreenshot() {
    this.webcam.captureBlob((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      this.setState({
        screenshot: imageUrl,
      });
    });
  }

  toggleMount() {
    this.setState({ mounted: false });
  }

  render() {
    const webcam = this.state.mounted ?
      <Webcam ref={(ref) => this.webcam = ref} audio={false} /> :
      null;

    const btnLabel = this.state.mounted ?
      "Unmount Webcam" :
      "Mount Webcam";

    return (
      <div>
        <button onClick={this.toggleMount.bind(this)}>{btnLabel}</button>
        <div>
          {webcam}
          <br />
          <button onClick={this.takeScreenshot.bind(this)}>
            Take Screenshot (As a base64 data URL)
          </button>
          <br />
          <button onClick={this.takeBinaryScreenshot.bind(this)}>
            Take Screenshot (As a binary blob)
          </button>
          <br />
          <img src={this.state.screenshot} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Examples />, document.getElementById("examples"));
