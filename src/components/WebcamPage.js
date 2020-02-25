import React from 'react'
import Webcam from 'react-webcam'
import firebase from '../firebase.js'


class WebcamPage extends React.Component {

  state = {
    image: ''
  }

  setRef = webcam => {
      this.webcam = webcam;
    };

  capture = () => {
    // const imageSrc = this.webcam.getCanvas();
    const imageSrc = this.webcam.getScreenshot();
    // console.log(imageSrc);
    this.setState({ image: imageSrc })
    // this.setState({ image: `<img src='${imageSrc}' />` })
  };

  takeAnother = () => {
    this.setState({ image: null })
  }

  componentDidMount = () => {
  }

  // pixelate = () => {
  //   var imgData = this.getImageData(0,0,w,h).data
  //   var img = new Image();
  //   img.src = this.state.image
  //   let sample_size = 10
  //   ctx.drawImage(img, 0, 0, w, h);
  //   // loop through the rows from top to bottom
  //   for (var y = 0; y < h; y+= sample_size) {
  //     // loop through all the colomns from left to right
  //     for (var x = 0; x < w; x+= sample_size) {
  //       // do something
  //       var pos = ( x + y * w ) * 4;
  //       var red = sample[pos];
  //       var green = sample[pos+1];
  //       var blue = sample[pos+2];
  //
  //       ctx.fillStyle = rgb(red, green, blue)
  //       ctx.fillRect = ( x, y, sample_size, sample_size )
  //     }
  //   }
  // }

  pixelate = () => {
    let c = this.refs.canvas
    let ctx = c.getContext("2d")
    let img1 = this.refs.webcamImage
    console.log('canvas', c);
    console.log('ctx', ctx);
    console.log('img1', img1);

    let w = img1.width;
    // console.log(w);
    let h = img1.height;

    c.width = w;
    c.height = h;
    ctx.drawImage(img1, 0, 0);

    var pixelArr = ctx.getImageData(0, 0, w, h).data;
    let sample_size = 10;

    for (let y = 0; y < h; y += sample_size) {
      for (let x = 0; x < w; x += sample_size) {
        let p = (x + (y*w)) * 4;
        ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
        ctx.fillRect(x, y, sample_size, sample_size);
        this.firebaseSetPixel( x, y, ctx.fillStyle )
        // console.log(x, y, ctx.fillStyle);

      }
    }
    // for (let y = 0; y < h; y += sample_size) {
    //   for (let x = 0; x < w; x += sample_size) {
    //     let p = (x + y * w) * 4;
    //     ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
    //     console.log(y, x, ctx.fillStyle)
    //     // let pos = (x + y * w) * 4;
    //     // let red   = pixelArr[pos];
    //     // let green = pixelArr[pos + 1];
    //     // let blue  = pixelArr[pos + 2];
    //     // ctx.fillStyle = `rgb(${red}, ${blue}, ${green})`;
    //     // ctx.fillRect(x, y, sample_size, sample_size);
    //     // console.log('1');
    //   }
    // } // why doesn't color work?!
  //
  //   let img2 = new Image();
  //   img2.src = c.toDataURL("image/jpeg");
  //   img2.width = 800;
  //   document.body.appendChild(img2);
  // };
  // img1.src = document.getElementById("image1").src;
  }

  firebaseSetPixel = (r, c, color) => {
    console.log('sending to firebase');
    firebase.database().ref(`/grid/${r}${c}`).set({
      row: r,
      col: c,
      color: color
    });
  }


  render() {
    const videoConstraints = {
      width: 1000,
      height: 400,
      facingMode: "user"
    };

    return (
      <div>
        <h2>image below</h2>
        <canvas ref="canvas" width={640} height={425} />
        <img ref="webcamImage" src={this.state.image} />
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
          />
          <br/>
          <button onClick={this.capture}>Capture photo</button>
          <br/>
          </div>
        }
      </div>
    );
  }
} // Class

export default WebcamPage
