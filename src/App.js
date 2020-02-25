import React from 'react';
import './App.css';
import {
  Route,
  Link,
  HashRouter as Router
} from 'react-router-dom'
import PixelGrid from './components/PixelGrid'
import Chat from './components/Chat'
import WebcamPage from './components/WebcamPage'
import Pixelate from './components/Pixelate'


function App() {

  return (
    <div className="App">
    pixel
    <Router>
    <nav>
      <Link to="/">Home</Link> |&nbsp;
      <Link to="/PixelGrid">PixelGrid</Link> |&nbsp;
      <Link to="/Chat">Chat</Link> |&nbsp;
      <Link to="/WebcamPage">WebcamPage</Link> |&nbsp;
      <Link to="/Pixelate">Pixelate</Link> |&nbsp;
    </nav>
    <Route exact path="/PixelGrid" component={PixelGrid} />
    <Route exact path="/Chat" component={Chat} />
    <Route exact path="/WebcamPage" component={WebcamPage} />
    <Route exact path="/Pixelate" component={Pixelate} />
    </Router>
    </div>
  );
};

export default App;
