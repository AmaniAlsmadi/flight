import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import traveler from './assets/traveler.webp';
import Image from 'react-bootstrap/Image';
import FlightSearch from './components/flightSearch/flightSearch'

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <Image src={traveler} fluid className="hero-image" />
    </header>
  
    <div className="content-container">
      <h1 className="title">Find Your Perfect Flight</h1>
      <FlightSearch />
    </div>
  </div>
  
  );
}

export default App;
