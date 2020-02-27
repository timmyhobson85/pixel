import React from 'react'
import './SaveImage.css'
import firebase from '../firebase.js'

class SaveImage extends React.Component {

  state = {
    image : this.props.image,
    artist: 'anonymous',
    title: 'untitled',
    dataURL: ''
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
    c.width = 1000;
    // c.height = h;
    c.height = 400;
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
    a.download = 'image.png';
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


  render(){
    return(
      <div className='saveImage'>
        <br/>
        <canvas ref="saveCanvas" width={1000} height={400} className="saveImageCanvas" />
        <img ref="saveImageImage" src={this.state.image} className="saveImageImage"/>
        <button onClick={this.downloadClick}>download</button> <br/>
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

        <button onClick={this.uploadClick}>upload</button>
        <button onClick={this.saveImage}>save image</button>
      </div>
    )
  }

} // Class

export default SaveImage
