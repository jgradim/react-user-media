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
      screenshot: this.refs.webcam.captureScreenshot()
    })
  }

  toggleMount() {
    this.setState({ mounted: false });
  }

  render() {
    const webcam = this.state.mounted ?
      <Webcam ref="webcam" audio={false} /> :
      null;

    const btnLabel = this.state.mounted ?
      "Unmount Webcam" :
      "Mount Webcam";

    return (
      <div>
        <button onClick={this.toggleMount.bind(this)}>{btnLabel}</button>
        <div>
          {webcam}
          <button onClick={this.takeScreenshot.bind(this)}>Take Screenshot</button>
          <img ref="capture" src={this.state.screenshot} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Examples />, document.getElementById("examples"));
