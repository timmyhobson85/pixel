import React from 'react'
import './css/PixelGrid.css';
import { cloneDeep } from 'lodash'
import ColorPicker from './ColorPicker'
import firebase from '../firebase.js'
import WebcamPage from './WebcamPage'
import SaveImage from './SaveImage'
import ChatBox from './ChatBox'
import Canvas from './Canvas'

// i can take away state changes?!

class PixelGrid extends React.Component {

  state = {
    image: [],
    color: "rebeccapurple",
    mouseDown: false,
    firstDraw: true,
    eyeDropperActive: false,
    webcamShow: false,
    saveImageShow: false,
  };

  componentDidMount() {
  };

  activateEyeDropper = () => {
    this.setState({
      eyeDropperActive: true
    });
  };



  colorPickerData = ( data ) => {
    this.setState({ color : data});
  };

  saveImageShow = () => {
    this.setState({ saveImageShow: true})
  }

  showWebCam = () => {
    this.setState({ webcamShow: !this.state.webcamShow })
  }
  turnOffWebcam = () => {
    this.setState({ webcamShow: false })
  }

  getImageShow = () => {
    this.setState({ saveImageShow: false })
  }

  render(){

    const { image } = this.state;

    return(
      <div className='App'>
        {
          this.state.saveImageShow && <SaveImage
          push={this.props.history.push}
          image={this.state.image}
          getImageShow={this.getImageShow}
        />
        }
        <Canvas
          color={this.state.color}
        />
        <div className='toolBox'>
          <WebcamPage />
          <button onClick={this.saveImageShow}>save image</button>
          <ColorPicker
            color={this.state.color}
            sendColorData={this.colorPickerData}
            />
        </div>
        <br/>
        <br/>
        <ChatBox />
        <div id="info">
          <p>collaborative with everyone online to create art</p>
          <p>you can also take a photo to upload to the grid</p>
          <p>you can also save your images to disk, or upload to the gallery</p>
        </div>
      </div>
    )
  }
} // Class

export default PixelGrid

// row/col inputs
// <h4>testinput</h4>
// <label>row</label>
// <input type="number" min="1" max="128" name="row" defaultValue={this.state.row} onChange={this.handleChangeSelect}/>
// <label>col</label>
// <input type="number" min="1" max="128" name="col" defaultValue={this.state.col} onChange={this.handleChangeSelect}/>
// <h4>endtestinput</h4>
// <label> row </label>
// <input type="text" name="row" onChange={this.handleChange} /> <br/>
// <label> col </label>
// <input type="text" name="col" onChange={this.handleChange} /> <br/>
// <button onClick={this.createGrid}>click</button> <br/>

// handleChange = (e) => {
//   this.setState({ [e.target.name] : e.target.value })
// }
//
// handleChangeSelect = (e) => {
//   console.log(this.state.row, this.state.col);
//   this.setState({ [e.target.name] : e.target.value })
//   let image = []
//   for (var i = 0; i < this.state.row; i++) {
//     image[i] = []
//     for (var j = 0; j < this.state.col; j++) {
//       image[i][j] =  null
//     }
//   }
//   this.setState({ image })
// }

// createGrid = () => {
//   console.log(this.state.row, this.state.col);
//   let image = []
//   for (var i = 0; i < this.state.row; i++) {
//     image[i] = []
//     for (var j = 0; j < this.state.col; j++) {
//       image[i][j] =  null
//       // this.firebaseSetPixel( i, j ) // this was to seed grid
//     }
//   }
//   this.setState({ image })
// }


// click and drag draw handlers
// onMouseDown={() => this.setMouseDown(i, j)}
// onMouseOver={() => this.paintMouseOver(i, j)}
// onMouseUp={this.setMouseUp}

// <button
//   onClick={this.activateEyeDropper}
//   className="eyedropperButton"
// >
// eye dropper</button>
