import React from 'react'

class CanvasTest extends React.Component {

  componentDidMount = () => {
    console.log('hi');
  }

  clickOnCanvas = (e) => {
    console.log(e.pageX);
    console.log(e.offsetX);
    console.log(e);
  }

  buttonClick = () => {
    let c = this.refs.canvas
    let ctx = c.getContext("2d")
    console.log(ctx);
    console.log(`click`);
  }

  render(){
    return(
      <div className='App'>
        <h2>Canvastest</h2>
        <canvas
          onClick={this.clickOnCanvas}
          id="testCanvas"
          ref="canvas"
          width={200}
          height={200}
          ></canvas>
        <button onClick={this.buttonClick}>hi</button>
      </div>
    )
  }

} // Class

export default CanvasTest
