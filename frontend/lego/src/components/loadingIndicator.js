import React, { Component } from 'react'

import xhr from '../tools/xhr.js'

import loadingIndicatorCss from '../stylesheets/loadingIndicator.less'

class loadingIndicator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loadingProgress: 0,
      opacity: 1
    }
  }
  componentWillMount () {
    // 进度指示条
    xhr.onProgressCbs.push((e) => {
      if (e.lengthComputable) {
        this.setState({
          loadingProgress: ((e.loaded/e.total)*100).toPrecision(2)
        })
      }
    })
    // 完成后500ms之内复位进度条指示
    xhr.afterInterceptors.push((e) => {
      this.setState({
        loadingProgress: 100
      })
      setTimeout(() => {
        this.setState({
          opacity: 0
        })
      }, 200)
      setTimeout(() => {
        this.setState({
          loadingProgress: 0
        })
      }, 500)
    })
    // 显示进度条
    xhr.beforeInterceptors.push((e) => {
      this.setState({
        loadingProgress: 10,
        opacity: 1
      })
    })
  }
  render () {
    return (
      <div className={loadingIndicatorCss.indicator} style={{width: `${this.state.loadingProgress}%`, opacity: this.state.opacity}}>
      </div>
    )
  }
}

export default loadingIndicator
