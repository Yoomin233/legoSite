import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import appCss from '../stylesheets/App.less'

import config from '../config'

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
    let {sideBarShow, toggleSideBar, userInfo} = this.props
    let jurisdiction
    userInfo && (jurisdiction = (userInfo.jurisdiction === 3 ? '超级管理员' : userInfo.jurisdiction === 2 ? '管理员' : '游客'))
    return (
      <div className={`${appCss.sideBar} ${sideBarShow ? appCss.sideBarShowed : ''}`} ref={(elem) => {this.sideBar = elem}} onClick={toggleSideBar}>
        <h3>{userInfo && `用户: ${userInfo.username}`}</h3>
        <h3>{userInfo && `权限: ${jurisdiction}`}</h3>
        <li><Link to={`${config.rootPath}`}>首页</Link></li>
        <li><Link to={`${config.rootPath}about`}>关于</Link></li>
        <li><a href='/'>回主站</a></li>
        <div className={`${appCss.sideBarShade}`} ref={(elem) => {this.sideBarShade = elem}} onClick={toggleSideBar}></div>
      </div>
    )
  }
}
export default sideBar
