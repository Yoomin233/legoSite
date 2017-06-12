import React, { Component } from 'react';

import headerCss from '../stylesheets/headerCss.less'

class Header extends Component {
  render () {
    let {toggleSideBar} = this.props
    return (
      <div className={headerCss.appHeader}>
        <span onClick={toggleSideBar}></span>
        <span>欢迎</span>
      </div>
    )
  }
}

export default Header
