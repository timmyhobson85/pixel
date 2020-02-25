import React from 'react'
import './PixelGrid.css';
import { cloneDeep } from 'lodash'
import ColorPicker from './ColorPicker'
import firebase from '../firebase.js'


class PixelGrid extends React.Component {
  state = {
      image: [
        [ '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'  ],
        [ '#000000', '#ff0000', '#000000', '#000000', '#ff0000', '#000000'  ],
        [ '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'  ],
        [ '#000000', '#ff0000', '#000000', '#000000', '#ff0000', '#000000'  ],
        [ '#000000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#000000'  ],
        [ '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'  ],
      ],
      row: 40,
      col: 100,
      color: "#000000",
      mouseDown: false,
      firstDraw: true,
    }

    componentDidMount() {
      this.testFirebaseListen()
      this.firebaseGridListen()
      this.createGrid()
    }
    componentDidUpdate() {
    }

    componentWillUnmount(){

    }

    handleChange = (e) => {
      this.setState({ [e.target.name] : e.target.value })
    }

    handleChangeSelect = (e) => {
      console.log(this.state.row, this.state.col);
      this.setState({ [e.target.name] : e.target.value })
      let image = []
      for (var i = 0; i < this.state.row; i++) {
        image[i] = []
        for (var j = 0; j < this.state.col; j++) {
          image[i][j] =  null
        }
      }
      this.setState({ image })
    }

    createGrid = () => {
      // let total = this.state.row * this.state.col
      console.log(this.state.row, this.state.col);
      // this.setState({pixels: Array(total).fill(null)})
      let image = []
      for (var i = 0; i < this.state.row; i++) {
        image[i] = []
        for (var j = 0; j < this.state.col; j++) {
          image[i][j] =  null
          // this.firebaseSetPixel( i, j ) // this was to seed grid
        }
      }
      this.setState({ image })
      // set width here too
    }

    paintClick = (r, c) => {
      // if (document.body.onmousedown) {
        // console.log(r, c);
        // console.log(this.state.image[r][c])
        // this is a shallow copy - use deep copy with lodash
        // let newImage = [...this.state.image];
        let newImage = cloneDeep(this.state.image);
        // console.log(newImage);
        newImage[r].splice(c, 1, this.state.color )
        this.setState({
          image: newImage
        })
      // }
      this.firebaseSet( r, c )
      // this.firebaseSetPixel( r, c )
      // this.setState({ image[r][c] : '#FFFFFF' })
    }

    paintMouseOver = (r, c) => {
      if (this.state.mouseDown) {
        console.log(this.state.mouseDown);
        console.log(r, c);
        this.firebaseSet( r, c, this.state.color)
        // console.log(this.state.image[r][c])
        // this is a shallow copy - use deep copy with lodash
        // let newImage = this.state.image
        // let newImage = [...this.state.image];
        let newImage = cloneDeep(this.state.image);
        // console.log(newImage);
        newImage[r].splice(c, 1, this.state.color)
        this.setState({
          image: newImage
        })
      }
      // this.setState({ image[r][c] : '#FFFFFF' })
    }

    setColor = (e) => {
      console.log(e.target.value);
      this.setState({ color : e.target.value })
    }

    setEraser = () => {
      this.setState({ color: null })
    }

    // onMouseDown={() => this.paintClick(i, j)}

    setMouseDown = (r, c) => {
      // let newImage = this.state.image
      let newImage = cloneDeep(this.state.image);
      console.log(newImage);
      newImage[r].splice(c, 1, this.state.color )
      this.setState({
        image: newImage
      })
      console.log('down');
      this.setState({ mouseDown: true})
    };
    setMouseUp = () => {
      console.log('up');
      this.setState({ mouseDown: false})
    };

    testFirebase = () => {
      let test = firebase.database().ref('/lastDraw').once('value')
        .then( data => console.log('data', data.val()  ) );

      console.log(test);
    };

    firebaseSet = (r, c) => {
      firebase.database().ref('/lastDraw').set({
        row: r,
        col: c,
        color: this.state.color
      });
    }

    firebaseSetPixel = (r, c) => {
      firebase.database().ref(`/grid/${r}${c}`).set({
        row: r,
        col: c,
        color: this.state.color
      });
    }

    testFirebaseListen = () => {
      let listen = firebase.database().ref('/lastDraw');
      listen.on('value', (snapshot) => {
        let data = snapshot.val()
        // console.log('firebaseListen', data.row, data.col);
        console.log(data);
        if (this.state.firstDraw === false) {
          this.firebasePaint( data.row, data.col, data.color )
        }
        console.log('first message');
        this.setState({ firstDraw: false })
      })
    }

    firebaseGridListen = () => {
      // let listen = firebase.database().ref('/grid');
      // listen.on('value', (snapshot) => {
      //   let data = snapshot.val()
      //   // console.log('firebaseListen', data.row, data.col);
      //   console.log(data);
      // })
    }

    firebasePaint = ( r, c, color ) => {
      let newImage = cloneDeep(this.state.image);
      newImage[r].splice(c, 1, color )
      this.setState({
        image: newImage
      })
    }

    getPhotoFromFirebase = () => {
      console.log('hello');
      firebase.database().ref('/grid').once('value')
      // .then((pixels) => console.log(pixels.val()))
        .then((pixels) => {
          // console.log('then');
          const pix = Object.values( pixels.val() );
          const output = Array(40).fill(null).map( el => new Array(100) );
          let rows = 40; let cols = 100;
          // console.log('pix', pix.length);
          for(let i = 0; i < pix.length; i++){
            const {row, col, color} = pix[i];
            // if( row < rows && col < cols ){
              output[col][row] = color;
            // }
             // const row = Math.floor(i/cols);
             // const col = i % cols;
          }
          // console.log( output );
          this.setState({ image: output });
          // pixels.forEach( pixel => {
          //   let p = pixel.val();
          //   console.log(p);
          //   // this.firebasePaint( p.col, p.row, p.color )
          // })
        });
    }

    firebaseEmptyGrid = () => {
      firebase.database().ref('/grid').remove()
    }

    consoleLogState = () => {
      console.log(this.state.image);
    }

    colorPickerData = ( data ) => {
      this.setState({ color : data})
      console.log('colorPickerData');
    }

    // click and drag draw handlers
    // onMouseDown={() => this.setMouseDown(i, j)}
    // onMouseOver={() => this.paintMouseOver(i, j)}
    // onMouseUp={this.setMouseUp}



    render(){
      const { image } = this.state
      return(
        <div className='App'>
          <h2>PixelCanvas02</h2>
          <div
            className="pixelGrid"
            onMouseLeave={this.setMouseUp}
            >
            {
              image.map((row, i) => (
                <div
                  className="row"
                  style={{
                    height: `${100 / image[i].length}%`
                  }}
                  >
                  {
                    row.map( (color, j ) => (
                      <div
                        className="pixel"
                        style={{
                          backgroundColor: image[i][j] || 'rgb(70, 70, 70)',
                          width: `${100 / image[i].length}%`,
                          paddingBottom: `${100 / image[i].length}%`
                        }}
                        onClick={() => this.paintClick(i, j)}
                        onMouseDown={() => this.setMouseDown(i, j)}
                        onMouseOver={() => this.paintMouseOver(i, j)}
                        onMouseUp={this.setMouseUp}

                        />)
                      )
                    }
                  </div>
                ))
              }
            </div>
            <ColorPicker
              color={this.state.color}
              sendColorData={this.colorPickerData}
              />
          <button onClick={this.testFirebase}>test firebase</button> <br/>
          <button onClick={this.consoleLogState}>consoleLogState</button> <br/>
          <button onClick={this.firebaseEmptyGrid}>emptygrid</button> <br/>
          <button onClick={this.firebaseSet}>firebaseSet</button> <br/>
          <button onClick={this.testFirebaseListen}>testFirebaseListen</button> <br/>
          <button onClick={this.getPhotoFromFirebase}>getPhotoFromFirebase</button> <br/>
          <h4>testinput</h4>
          <label>row</label>
          <input type="number" min="1" max="100" name="row" defaultValue={this.state.row} onChange={this.handleChangeSelect}/>
          <label>col</label>
          <input type="number" min="1" max="100" name="col" defaultValue={this.state.col} onChange={this.handleChangeSelect}/>
          <h4>endtestinput</h4>
          <label> row </label>
          <input type="text" name="row" onChange={this.handleChange} /> <br/>
          <label> col </label>
          <input type="text" name="col" onChange={this.handleChange} /> <br/>
          <button onClick={this.createGrid}>click</button> <br/>
          <br/>
          <button onClick={this.setEraser} value='rgb(70, 70, 70)'>eraser</button>
          <br/>
        </div>
      )
    }
} // Class

export default PixelGrid
