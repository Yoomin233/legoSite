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
import About from './components/About.js'

// tools
import {
  get as xhrGet
} from './tools/xhr'

// config
import config from './config'

// loadingCss
import loadingCss from './stylesheets/loading.less'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sideBarShow: false,
      userInfo: null,
      loadingComplete: false,
      loadingPageShow: true
    }
  }
  async componentDidMount () {
    let userInfo
    if (process.env.NODE_ENV === 'development') {
      userInfo = JSON.parse('{"username":"user3","jurisdiction":1}')
    } else {
      userInfo = JSON.parse(await xhrGet(`${config.rootURL}/api/user`))
    }
    this.setState({
      userInfo
    })
    setTimeout(() => {
      this.setState({
        loadingComplete: true
      })
    }, 200)
    setTimeout(() => {
      this.setState({
        loadingPageShow: false
      })
    }, 1200)
  }
  toggleSideBar = (e) => {
    this.setState({
      sideBarShow: !this.state.sideBarShow
    })
  }
  render() {
    let {sideBarShow, userInfo, loadingComplete, loadingPageShow} = this.state
    return (
      <Router>
        <div style={{width: '100%',height: '100%', position: 'relative', overflow: 'hidden'}}>
          <LoadingIndicator></LoadingIndicator>
          <Header sideBarShow={sideBarShow} toggleSideBar={this.toggleSideBar}></Header>
          <SideBar sideBarShow={sideBarShow} toggleSideBar={this.toggleSideBar} userInfo={this.state.userInfo}></SideBar>
          <Route exact path={`${config.rootPath}`} render={(props) => (
            <Home userInfo={userInfo} {...props}>
            </Home>
          )}/>
          <Route path={`${config.rootPath}about`} component={About}/>
          {
            loadingPageShow &&
            <div className={`${loadingCss.wrapper} ${loadingComplete ? loadingCss.loadingComplete : ''}`}>
              <div></div>
              <div></div>
              <h2>Yoomin的乐高仓库!</h2>
              <p>努力加载中...</p>
            </div>
          }
        </div>
      </Router>
    );
  }
}

export default App;
