import React, {Component} from 'react'

import {
  post as xhrPost,
  get as xhrGet
} from '../tools/xhr.js'
import config from '../config'

import themeInputCss from '../stylesheets/themeInputCss.less'

class ThemeInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      themeSelectShow: false,
      addingTheme: false
    }
  }
  toggleThemeSelector = () => {
    this.setState(({themeSelectShow}) => ({
      themeSelectShow: !themeSelectShow
    }))
  }
  selectTheme = (theme) => {
    this.props.selectTheme(theme)
    this.toggleThemeSelector()
  }
  doneAddingTheme = async () => {
    let cnName = this.addThemeInputCn.value
    let engName = this.addThemeInputEng.value
    if (!cnName) return alert('请填写值!')
    xhrPost(`${config.rootURL}/api/lego/themes`, {
      cnName,
      engName
    })
    .then(resp => {
      resp = JSON.parse(resp)
      if (resp.code !== 1) {
        return alert(resp.message)
      } else {
        alert(`添加成功: ${resp.data}`)
        xhrGet(`${config.rootURL}/api/lego/themes`)
        .then((newThemes) => {
          this.setState({
            addingTheme: false
          })
          this.props.updateThemeList(JSON.parse(newThemes))
        })
      }
    })
  }
  render () {
    return (
      <div className={themeInputCss.themeInputWrapper}>
        <div onClick={this.toggleThemeSelector} className={themeInputCss.dummyInput}>{this.props.themes.length && this.props.themes.filter(theme => theme._id === this.props.selectedTheme)[0] && this.props.themes.filter(theme => theme._id === this.props.selectedTheme)[0]['cnName']} - {this.props.themes.length && this.props.themes.filter(theme => theme._id === this.props.selectedTheme)[0] && this.props.themes.filter(theme => theme._id === this.props.selectedTheme)[0]['engName']}</div>
        <div className={themeInputCss.themeSelect} style={{
          display: this.state.themeSelectShow ? 'block' : 'none'
        }}>
          {
            this.props.themes.map(theme => <p
              onClick={(e) => this.selectTheme(theme)}
              key={theme._id}
            >{theme.cnName} - {theme.engName}</p>)
            .concat(this.state.addingTheme ? <p key='add'><input type='text' ref={input => this.addThemeInputCn = input} placeholder='中文名'/><input type='text' ref={input => this.addThemeInputEng = input} placeholder='英文名'/><button onClick={this.doneAddingTheme}>确定添加</button><button onClick={(e) => {
              this.setState({
                addingTheme: false
              })
            }}>取消</button></p> : <p className={themeInputCss.addTheme} key='add' style={{'textAlign': 'center','fontSize': '1.2em', 'fontWeight': 'bold', 'marginBottom': '.2em'}} onClick={(e) => {
              this.setState({
                addingTheme: true
              })
            }}>+</p>)
          }
        </div>
      </div>
    )
  }
}

export default ThemeInput
