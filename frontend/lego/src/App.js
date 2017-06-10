import React, { Component } from 'react';

import logo from './logo.svg';
import appCss from './stylesheets/App.css';

import config from './config'
import axios from 'axios'

class App extends Component {
  componentDidMount () {
    console.log('mounted!')
  }
  render() {
    return (
      <div className="App">
        <div className={appCss['App-header']}>
          <h2>Lego!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
