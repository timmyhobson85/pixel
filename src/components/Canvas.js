import React from 'react'
import firebase from '../firebase.js'

class Canvas extends React.Component {

  state = {
    image: null,
    firstDraw: true,
    mouseDown: false,
  }


  componentDidMount(){
    this.firebaseFetchImage()
    this.firebaseLastDrawListen()
    this.firebaseGridWasUpdatedListen()
  }

  firebaseGridWasUpdatedListen = () => {
    let listen = firebase.database().ref('/gridWasUpdated');
    listen.on('value', (snapshot) => {
      let data = snapshot.val()
      this.firebaseFetchImage()
    })
  }

  firebaseFetchImage = () => {
    firebase.database().ref('/grid').once('value')
    .then((pixels) => {
      const pix = Object.values( pixels.val() );
      const output = Array(60).fill(null).map( el => new Array(100) );
      let rows = 60; let cols = 100;
      for(let i = 0; i < pix.length; i++){
        const {row, col, color} = pix[i];
        //fixing up negatives that broek it
        if (row >= 0 && col >= 0) {
          output[col][row] = color;
        } else {
          console.log(col, row, color);
        }
      };
      this.setState({ image: output });
      this.saveImage()
    });
  }

  saveImage = () => {
    console.log('saves');
    let c = this.refs.drawCanvas;
    let ctx = c.getContext("2d");
    c.width = 1000;
    c.height = 600;
    let imageData = this.state.image
    for (var y = 0; y < imageData.length; y++) {
      // console.log(imageData[y]) // rows
      for (var x = 0; x < imageData[y].length; x++) {
        // console.log(imageData[y][x]) // colomns ( pixls )
        ctx.fillStyle = imageData[y][x]
        ctx.fillRect( x*10, y*10, 10, 10)
      }
    }
  }

  drawPixel = (row, col, color) => {
    let c = this.refs.drawCanvas;
    let ctx = c.getContext("2d");;
    ctx.fillStyle = color
    // ctx.fillStyle = imageData[y][x]
    // y = rows
    // x = cols
    // ctx.fillRect( x*10, y*10, 10, 10)
    ctx.fillRect( col*10, row*10, 10, 10)
  }

  firebaseLastDrawListen = () => {
    let listen = firebase.database().ref('/lastDraw');
    listen.on('value', (snapshot) => {
      let data = snapshot.val();
      if (this.state.firstDraw === false) {
        // this.firebasePaint( data.row, data.col, data.color );
        this.drawPixel( data.row, data.col, data.color );
      };
      this.setState({ firstDraw: false });
    });
  };

  firebaseSetPixel = (c, r) => {
    firebase.database().ref(`/grid/${r}-${c}`).set({
      row: r,
      col: c,
      color: this.props.color
    });
  };

  clickOnCanvas = (e) => {
    console.log('click');
    let can = this.refs.drawCanvas;
    let rect = can.getBoundingClientRect()
    let c = Math.floor( (e.pageX - rect.left)/10)
    let r = Math.floor( (e.pageY - rect.top )/10)
    firebase.database().ref('/lastDraw').set({
      row: r,
      col: c,
      color: this.props.color
    });
    this.firebaseSetPixel( r, c )
  }

  mouseDown = (e) => {
    console.log('mouseDown');
    this.setState({ mouseDown: true })
  }

  mouseUp = (e) => {
    console.log('mouseUp');
    this.setState({mouseDown:false})
  }

  mouseMove = (e) => {
    if (this.state.mouseDown) {
      console.log('mouseMovemouseDownTrue');
      let can = this.refs.drawCanvas;
      let rect = can.getBoundingClientRect()
      let c = Math.floor( (e.pageX - rect.left)/10)
      let r = Math.floor( (e.pageY - rect.top )/10)
      firebase.database().ref('/lastDraw').set({
        row: r,
        col: c,
        color: this.props.color
      });
      this.firebaseSetPixel( r, c )
    } else {
      console.log('mouseMovemouseDownFalse');
    }
  }

  mouseLeave = (e) => {
    console.log('leave');
    this.setState({mouseDown: false})
  }


  render(){
    return(
      <div className='App'>
          <canvas
            ref="drawCanvas"
            width={1000}
            height={600}
            className="saveImageCanvas"
            onClick={this.clickOnCanvas}
            onMouseDown={this.mouseDown}
            onMouseMove={this.mouseMove}
            onMouseUp={this.mouseUp}
            onMouseLeave={this.mouseLeave}
            />
      </div>
    )
  }

} // Class

export default Canvas
