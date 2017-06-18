import React, { Component } from 'react';
// animations
// router
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// components
import Header from './components/header.js'
import SideBar from './components/sideBar.js'
import LoadingIndicator from './components/loadingIndicator.js'

import Home from './components/Home.js'

const About = () => (
  <div>
    <span>About</span>
  </div>
)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sideBarShow: false
    }
  }
  componentDidMount () {
  }
  toggleSideBar = (e) => {
    this.setState({
      sideBarShow: !this.state.sideBarShow
    })
  }
  render() {
    let {sideBarShow} = this.state
    return (
      <Router>
        <div style={{width: '100%',height: '100%', position: 'relative', overflow: 'hidden'}}>
          <LoadingIndicator></LoadingIndicator>
          <Header sideBarShow={sideBarShow} toggleSideBar={this.toggleSideBar}></Header>
          <SideBar sideBarShow={sideBarShow} toggleSideBar={this.toggleSideBar}></SideBar>
          <Route exact path="/lego/" component={Home}/>
          <Route path="/lego/about" component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;
