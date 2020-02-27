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


class App extends React.Component {

  render(){
    return (
      <div className="App">
        <Router>
        <Link to="/gallery">
          <button id="galleryButton">gallery</button>
        </Link>
        <Link to="/pixelgrid">
          <button id="pixelGridButton">pixelgrid</button>
        </Link>
        <Link to="/webcam">
          <button id="webCamButton">webcam</button>
        </Link>
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/pixelgrid" component={PixelGrid} />
        <Route exact path="/webcam" component={WebcamPage} />
        </Router>
      </div>
    )
  }

};

export default App;
