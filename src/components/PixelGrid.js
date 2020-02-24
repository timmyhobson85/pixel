import React from 'react'
import './PixelGrid.css';
import { cloneDeep } from 'lodash'
// import cloneDeep from ‘lodash/cloneDeep’;


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
      row: 5,
      col: 5,
      color: "#000000",
      mouseDown: false
    }

    componentDidMount() {
    }

    handleChange = (e) => {
      this.setState({ [e.target.name] : e.target.value })
    }

    handleChangeselect = (e) => {
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
        }
      }
      this.setState({ image })
      // set width here too
    }

    paintClick = (r, c) => {
      // if (document.body.onmousedown) {
        console.log(r, c);
        console.log(this.state.image[r][c])
        // this is a shallow copy - use deep copy with lodash
        // let newImage = [...this.state.image];
        let newImage = cloneDeep(this.state.image);
        console.log(newImage);
        newImage[r].splice(c, 1, this.state.color )
        this.setState({
          image: newImage
        })
      // }
      // this.setState({ image[r][c] : '#FFFFFF' })
    }

    paintMouseOver = (r, c) => {
      if (this.state.mouseDown) {
        console.log(this.state.mouseDown);
        console.log(r, c);
        // console.log(this.state.image[r][c])
        // this is a shallow copy - use deep copy with lodash
        // let newImage = this.state.image
        // let newImage = [...this.state.image];
        let newImage = cloneDeep(this.state.image);
        console.log(newImage);
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
    }
    setMouseUp = () => {
      console.log('up');
      this.setState({ mouseDown: false})
    }



    render(){
      const { image } = this.state
      return(
        <div className='App'>
          <h2>PixelCanvas02</h2>
          <h4>testinput</h4>
          <label>row</label>
          <input type="number" min="1" max="100" name="row" defaultValue={this.state.row} onChange={this.handleChangeselect}/>
          <label>col</label>
          <input type="number" min="1" max="100" name="col" defaultValue={this.state.col} onChange={this.handleChangeselect}/>
          <h4>endtestinput</h4>
          <label> row </label>
          <input type="text" name="row" onChange={this.handleChange} /> <br/>
          <label> col </label>
          <input type="text" name="col" onChange={this.handleChange} /> <br/>
          <button onClick={this.createGrid}>click</button> <br/>
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
          <br/>
          <button onClick={this.setColor} value="red">red</button>
          <button onClick={this.setColor} value="black">black</button>
          <button onClick={this.setColor} value="blue">blue</button>
          <button onClick={this.setEraser} value='rgb(70, 70, 70)'>eraser</button>
          <br/>
        </div>
      )
    }
} // Class

export default PixelGrid
