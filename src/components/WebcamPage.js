import React from 'react'
import Webcam from 'react-webcam'


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
    console.log(imageSrc);
    this.setState({ image: imageSrc })
  };

  takeAnother = () => {
    this.setState({ image: null })
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
        {
          this.state.image ?
          <div>
          <img src={this.state.image} />
          <br/>
          <button onClick={this.takeAnother}>take another</button>
          </div>
          :
          <div>
          <Webcam
            audio={false}
            height={250}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={500}
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
