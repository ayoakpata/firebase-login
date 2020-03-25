import React from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './Auth';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Auth />
    </div>
  );
}

export default App;
