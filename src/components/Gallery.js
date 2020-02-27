import React from 'react'
import firebase from '../firebase.js'
import './css/Gallery.css'
import {
  Route,
  Link,
  HashRouter as Router
} from 'react-router-dom'

class Gallery extends React.Component {

  state = {
    images : null
  }

  componentDidMount(){
    firebase.database().ref('/gallery').once('value')
    .then((artworks) => {
      const artwork = Object.values( artworks.val() );
      this.setState({ images: artwork.reverse() })
    })
  }

  render(){
    return(
      <div className='gallery'>
        <h2>Gallery</h2>
          <Link to="/">
            <button id="pixelGridButton">pixelgrid</button>
          </Link>
        <br/>
        <div>
          {
            this.state.images ?
            this.state.images.map( image =>
              <div className="artwork">
                <h2>
                  Artist: {image.artist}
                </h2>
                <h2>
                  Title: {image.title}
                </h2>
                <br/>
                <img src={image.dataURL} alt=""/>
              </div>
            )
            :
            <p>no</p>
          }
        </div>
      </div>
    )
  }

}; // Class

export default Gallery;
