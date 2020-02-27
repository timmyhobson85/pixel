import React from 'react'
import Webcam from 'react-webcam'
import firebase from '../firebase.js'
import './css/WebcamPage.css'


class WebcamPage extends React.Component {

  state = {
    image: '',
    webcamShow: false
  };

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ image: imageSrc }, () => {
      // this waits for the image to render before it runs the pixelate method.
      setTimeout(() => this.pixelate(), 0)
    });
    this.setState({ webcamShow: false });
    // this.props.turnOffWebcam()
  };

  takeAnother = () => {
    this.setState({ image: null })
  };

  componentDidUpdate = () => {
  };

  pixelate = () => {
    // console.log('clearing database');
    firebase.database().ref('/grid').remove();
    let c = this.refs.canvas;
    let ctx = c.getContext("2d");
    let img1 = this.refs.webcamImage;
    // console.log('canvas', c);
    // console.log('ctx', ctx);
    // console.log('img1', img1);

    let w = img1.width;
    let h = img1.height;

    c.width = w;
    c.height = h;
    ctx.drawImage(img1, 0, 0);

    var pixelArr = ctx.getImageData(0, 0, w, h).data;
    let sample_size = 1;

    for (let y = 0; y < h; y += sample_size) {
      for (let x = 0; x < w; x += sample_size) {
        let p = (x + (y*w)) * 4;
        ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
        ctx.fillRect(x, y, sample_size, sample_size);
        this.firebaseSetPixel( x, y, ctx.fillStyle );
        // console.log(x, y, ctx.fillStyle);

      }
    }
    // console.log('redraw grid here');
    firebase.database().ref(`/gridWasUpdated`).set({
      update: Math.random() // firebase.database.ServerValue.TIMESTAMP
    });
  }

  firebaseSetPixel = (r, c, color) => {
    firebase.database().ref(`/grid/${r}-${c}`).set({
      row: r,
      col: c,
      color: color
    });
  }
  //
  showWebCam = () => {
    this.setState({ webcamShow: true});
  }

  cancelClick = () => {
    this.setState({ webcamShow: false });
  }

  render() {
    const videoConstraints = {
      width: 1000,
      height: 600,
      facingMode: "user"
    };

    return (
      <div className="webcamPage">
        <button onClick={this.showWebCam}>take photo</button>
        {
          this.state.webcamShow &&
          <div className="webcamPopUp">
            <Webcam
              className="showWebCam"
              audio={false}
              height={600}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={1000}
              videoConstraints={videoConstraints}
              minScreenshotHeight={60}
              minScreenshotWidth={100}
              />
            <button onClick={this.capture}>Capture photo</button>
            <button onClick={this.cancelClick}>cancel</button>
          </div>
        }
        <canvas ref="canvas" width={100} height={60} className="hidden" />
        <img ref="webcamImage" src={this.state.image} className="hidden"/>
      </div>

    );
  }
} // Class

export default WebcamPage
