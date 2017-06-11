import React, { Component } from 'react';
// animations
// router
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// components
import Home from './components/Home.js'

import appCss from './stylesheets/App.less'
import './stylesheets/transitions.css'

import config from './config'
import axios from 'axios'

const About = () => (
  <div>
    <span>About</span>
  </div>
)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sideBarShow: true
    }
  }
  componentDidMount () {
    console.log('mounted!')
  }
  render() {
    let {sideBarShow} = this.state
    return (
      <Router>
        <div style={{width: '100%',height: '100%', position: 'relative'}}>
          <div className={appCss.sideBarToggle} onClick={(e) => this.setState({sideBarShow: !sideBarShow})}>
            {sideBarShow ? 'hide' : 'show'}
          </div>
            <div className={`${appCss.sideBar} ${sideBarShow ? appCss.sideBarShowed : ''}`}>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/about">管理</Link></li>
              <li><Link to="/about">关于</Link></li>
              <div className={appCss.sideBarShade} onClick={(e) => this.setState({sideBarShow: !sideBarShow})}></div>
            </div>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;
