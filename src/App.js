import React from 'react';
import './App.css';
import {
  Route,
  Link,
  HashRouter as Router
} from 'react-router-dom'
import PixelGrid from './components/PixelGrid'
import Chat from './components/Chat'


function App() {

  return (
    <div className="App">
    pixel
    <PixelGrid />
    <Chat />
    </div>
  );
};

export default App;
