import React, { Component } from 'react';

import aboutCss from '../stylesheets/about.less'

class About extends Component {
  render () {
    return (
      <div className={aboutCss.wrapper}>
        <h3>Lego sets view and management system(LVMS)</h3>
        <h4>Proudly brought to you by <a href='github.com/YueminHu/'>Yoomin</a></h4>
        <h4>Driven by: <a href='https://facebook.github.io/react/'>React</a>(front-end), <a href='https://nodejs.org/en/'>Node.js</a>(back-end), <a href='https://expressjs.com/'>Express</a>(back-end) and <a href='https://www.mongodb.com/'>MongoDB</a>(databse)</h4>
        <hr/>
        <h4>2017, <a href='github.com/YueminHu/'>Yoomin Hu</a></h4>
      </div>
    )
  }
}

export default About
