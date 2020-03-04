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
import Canvas from './components/Canvas'


class App extends React.Component {

  render(){
    return (
      <div className="App">
        <h1 id="header">pixels</h1>
        <Router>
        <Route exact path="/" component={PixelGrid} />
        <Route exact path="/webcam" component={WebcamPage} />
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/Canvas" component={Canvas} />
        <Route exact path="/PixelGrid" component={PixelGrid} />
        </Router>
      </div>
    )
  }

};

export default App;


// <Link to="/gallery">
//   <button id="galleryButton">gallery</button>
// </Link>
// <Link to="/Canvas">
//   <button id="TestCanvasButton">Canvas</button>
// </Link>
// <Link to="/">
//   <button id="pixelGridButton">pixelgrid</button>
// </Link>
// <Link to="/webcam">
//   <button id="webCamButton">webcam</button>
// </Link>
