import React, { Component } from 'react';
// router
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// components
import Home from './components/Home.js'

import appCss from './stylesheets/App.less'

import config from './config'
import axios from 'axios'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

class App extends Component {
  componentDidMount () {
    console.log('mounted!')
  }
  render() {
    return (
      <Router>
        <div style={{width: '100%',height: '100%'}}>
          <div className={appCss.sideBar}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </div>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;
