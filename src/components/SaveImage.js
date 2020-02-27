import React from 'react'
import './css/SaveImage.css'
import firebase from '../firebase.js'

class SaveImage extends React.Component {

  state = {
    image : this.props.image,
    artist: 'anonymous',
    title: 'untitled',
    dataURL: '',
    saveImageShow: false,
  }

  componentDidMount(){
    this.saveImage()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  saveImage = () => {
    console.log('saves');
    let c = this.refs.saveCanvas;
    let ctx = c.getContext("2d");
    let img1 = this.refs.saveImageImage;
    // console.log('canvas', c);
    // console.log('ctx', ctx);
    // console.log('img1', img1);
    let w = img1.width;
    let h = img1.height;
    // c.width = w;
    c.width = 1280;
    // c.height = h;
    c.height = 720;
    let imageData = this.props.image
    // console.log(imageData);
    for (var y = 0; y < imageData.length; y++) {
      // console.log(imageData[y]) // rows
      for (var x = 0; x < imageData[y].length; x++) {
        // console.log(imageData[y][x]) // colomns ( pixls )
        ctx.fillStyle = imageData[y][x]
        ctx.fillRect( x*10, y*10, 10, 10)
      }
    }

    // console.log(c.toDataURL('image/png'));
    let imgsrc = c.toDataURL('image/png');
    img1.src = imgsrc
    this.setState({ dataURL: imgsrc })
  }

  downloadClick = () => {
    console.log('download');
    const data = this.refs.saveCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = data;
    a.download = `${this.state.artist}-${this.state.title}.png`;
    a.click();
  }

  uploadClick = () => {
    // console.log('upload');
    // console.log(this.refs.saveCanvas.toDataURL('image/png'))
    const { artist, title, dataURL } = this.state
    // console.log( artist, title, dataURL );
    firebase.database().ref(`/gallery/`).push({
      artist,
      title,
      dataURL
    })
    this.props.push('/gallery')
  }

  showSaveImage = () => {
    this.setState({ showSaveImage: true })
    this.saveImage();
  }

  cancelClick = () => {
    this.setState({ showSaveImage: false})
    this.props.getImageShow()
  }


  render(){
    return(
      <div className="saveImagePage">
        <canvas
          ref="saveCanvas"
          width={1280} height={720} className="saveImageCanvas"
          />
        <img
          ref="saveImageImage"
          src={this.state.image}
          className="saveImageImage hidden"
          />
        <div className="saveImage">
        <label>artist</label>
        <input
          name="artist"
          onChange={this.handleChange}
          placeholder={this.state.artist}
          type="text"
          /><br/>
        <label>title</label>
        <input
          name="title"
          onChange={this.handleChange}
          placeholder={this.state.title}
          type="text"
          /><br/>
          <button onClick={this.uploadClick}>upload</button><button onClick={this.downloadClick}>download</button> <br/>
          <button onClick={this.cancelClick}>cancel</button>
      </div>
    </div>
    )
  }

} // Class

export default SaveImage
