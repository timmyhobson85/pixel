import React from 'react'
import firebase from '../firebase.js'

class TestCanvas extends React.Component {

  state = {
    image: null,
    firstDraw: true,
    mouseDown: false,
  }


  componentDidMount(){
    firebase.database().ref('/grid').once('value')
    // .then((pixels) => console.log(pixels.val()))
    .then((pixels) => {
      const pix = Object.values( pixels.val() );
      const output = Array(40).fill(null).map( el => new Array(100) );
      let rows = 40; let cols = 100;
      for(let i = 0; i < pix.length; i++){
        const {row, col, color} = pix[i];
          output[col][row] = color;
      };
      this.setState({ image: output });
      this.saveImage()
    });
    this.firebaseLastDrawListen()
  }

  saveImage = () => {
    console.log('saves');
    let c = this.refs.saveCanvas;
    let ctx = c.getContext("2d");;
    c.width = 1000;
    c.height = 400;
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
    let c = this.refs.saveCanvas;
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
      color: 'red'
    });
  };

  clickOnCanvas = (e) => {
    console.log('click');
    let can = this.refs.saveCanvas;
    let rect = can.getBoundingClientRect()
    let c = Math.floor( (e.pageX - rect.left)/10)
    let r = Math.floor( (e.pageY - rect.top )/10)
    firebase.database().ref('/lastDraw').set({
      row: r,
      col: c,
      color: 'red'
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
      let can = this.refs.saveCanvas;
      let rect = can.getBoundingClientRect()
      let c = Math.floor( (e.pageX - rect.left)/10)
      let r = Math.floor( (e.pageY - rect.top )/10)
      firebase.database().ref('/lastDraw').set({
        row: r,
        col: c,
        color: 'red'
      });
      this.firebaseSetPixel( r, c )
    } else {
      console.log('mouseMovemouseDownFalse');
    }
  }


  render(){
    return(
      <div className='App'>
          <canvas
            ref="saveCanvas"
            width={1000}
            height={400}
            className="saveImageCanvas"
            onClick={this.clickOnCanvas}
            onMouseDown={this.mouseDown}
            onMouseMove={this.mouseMove}
            onMouseUp={this.mouseUp}
            />
      </div>
    )
  }

} // Class

export default TestCanvas
