import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import appCss from '../stylesheets/App.less'

class sideBar extends Component {
  componentDidMount = () => {
    this.sideBar.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'opacity' && !this.props.sideBarShow) {
        this.sideBarShade.style.display = 'none'
      }
    })
  }
  componentWillUpdate (nextProps, nextState) {
    (nextProps.sideBarShow) && (this.sideBarShade.style.display = 'block')
  }
  render () {
    let {sideBarShow, toggleSideBar} = this.props
    return (
      <div className={`${appCss.sideBar} ${sideBarShow ? appCss.sideBarShowed : ''}`} ref={(elem) => {this.sideBar = elem}} onClick={toggleSideBar}>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/about">管理</Link></li>
        <li><Link to="/about">关于</Link></li>
        <div className={`${appCss.sideBarShade}`} ref={(elem) => {this.sideBarShade = elem}} onClick={toggleSideBar}></div>
      </div>
    )
  }
}
export default sideBar
