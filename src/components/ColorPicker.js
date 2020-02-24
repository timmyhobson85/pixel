import React from 'react'
import { SketchPicker } from 'react-color';


class ColorPicker extends React.Component {

  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    disableAlpha: true,
  };


  onChange = (color) => {
    console.log(color.rgb);
    let rbg = color.rgb
    this.setState({ color: color})
  }


  render(){
    return(
      <div className='App'>
        <h2>ColorPicker</h2>
        <SketchPicker
          onChange={this.onChange}
          color={this.state.color}
          disableAlpha={this.state.disableAlpha}
        />
      </div>
    )
  }

} // Class

export default ColorPicker
