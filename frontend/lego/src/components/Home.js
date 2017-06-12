import React, { Component } from 'react';

import homeCss from '../stylesheets/home.less'

import xhr from '../tools/xhr'
import config from '../config'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      legoData: null
    }
  }
  componentDidMount () {
    xhr.get(`${config.rootURL}/api/lego`, (xhr) => console.log(xhr))
  }
  render () {
    return (
      <div className={homeCss.wrapper}>
        <table>
          <thead>
            <tr>
              <td>编号</td>
              <td>系列</td>
              <td>库存</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Home
