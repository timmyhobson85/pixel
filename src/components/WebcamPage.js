import React from 'react'
import Webcam from 'react-webcam'
import firebase from '../firebase.js'
import './WebcamPage.css'


class WebcamPage extends React.Component {

  state = {
    image: ''
  };

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ image: imageSrc });
  };

  takeAnother = () => {
    this.setState({ image: null })
  };

  componentDidMount = () => {
  };

  pixelate = () => {
    console.log('clearing database');
    firebase.database().ref('/grid').remove();
    let c = this.refs.canvas;
    let ctx = c.getContext("2d");
    let img1 = this.refs.webcamImage;
    console.log('canvas', c);
    console.log('ctx', ctx);
    console.log('img1', img1);

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
    console.log('redraw grid here');
    firebase.database().ref(`/gridWasUpdated`).set({
      update: firebase.database.ServerValue.TIMESTAMP
     });

  }

  firebaseSetPixel = (r, c, color) => {
    console.log('sending to firebase');
    firebase.database().ref(`/grid/${r}-${c}`).set({
      row: r,
      col: c,
      color: color
    });
  }


  render() {
    const videoConstraints = {
      width: 100,
      height: 40,
      facingMode: "user"
    };

    return (
      <div>
        <h2>take a photo</h2>
        <div>
        {
          this.state.image ?
          <div>
          <br/>
          <button onClick={this.takeAnother}>take another</button>
          <button onClick={this.pixelate}>pixelate</button>
          </div>
          :
          <div>
          <Webcam
            audio={false}
            height={400}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={1000}
            videoConstraints={videoConstraints}
            minScreenshotHeight={40}
            minScreenshotWidth={100}
          />
          <br/>
          <button onClick={this.capture}>Capture photo</button>
          <br/>
          </div>
        }
        <canvas ref="canvas" width={100} height={40} />
        <img ref="webcamImage" src={this.state.image} className="hidden"/>
        </div>
      </div>

    );
  }
} // Class

export default WebcamPage
