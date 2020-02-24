import React from 'react';
import './App.css';
import {
  Route,
  Link,
  HashRouter as Router
} from 'react-router-dom'
import PixelGrid from './components/PixelGrid'


function App() {
  return (
    <div className="App">
    pixel
    <PixelGrid />
    </div>
  );
}

export default App;
