import React from 'react';
import './App.css';
import {
  Route,
  Link,
  HashRouter as Router
} from 'react-router-dom'
import PixelGrid from './components/PixelGrid'
import Gallery from './components/Gallery'
import WebcamPage from './components/WebcamPage'
import TestCanvas from './components/TestCanvas'


class App extends React.Component {

  render(){
    return (
      <div className="App">
        <Router>
        <Link to="/gallery">
          <button id="galleryButton">gallery</button>
        </Link>
        <Link to="/TestCanvas">
          <button id="TestCanvasButton">TestCanvas</button>
        </Link>
        <Link to="/">
          <button id="pixelGridButton">pixelgrid</button>
        </Link>
        <Link to="/webcam">
          <button id="webCamButton">webcam</button>
        </Link>
        <Route exact path="/" component={PixelGrid} />
        <Route exact path="/webcam" component={WebcamPage} />
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/TestCanvas" component={TestCanvas} />
        </Router>
      </div>
    )
  }

};

export default App;
