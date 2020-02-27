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
        <Link to="/">
          <button id="pixelGridButton">back to canvas</button>
        </Link>
        <h2>Gallery</h2>
        <div>
          {
            this.state.images ?
            this.state.images.map( image =>
              <div className="artwork">
                <div className="artworkWrapper">
                <img src={image.dataURL} alt=""/>
                <h4>
                  artist: {image.artist}
                </h4>
                <h4>
                  title: {image.title}
                </h4>
                </div>
              </div>
            )
            :
            <h2>loading...</h2>
          }
        </div>
      </div>
    )
  }

}; // Class

export default Gallery;
