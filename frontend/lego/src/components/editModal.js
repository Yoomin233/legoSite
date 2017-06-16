import React, {Component} from 'react'

import ThemeInput from './themeInput'

import editModalCss from '../stylesheets/editModalCss.less'

import {
  get as xhrGet
} from '../tools/xhr.js'
import config from '../config'

class editModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wrapperBg: 'rgba(0,0,0,0)',
      modalPos: 'translateY(-200%)',
      photoInputShow: false,
      themes: [],
      selectedTheme: '',
      photos: []
    }
  }
  // 进入动效
  async componentDidMount () {
    setTimeout(() => {
      this.setState({
        wrapperBg: 'rgba(0,0,0,0.8)',
        modalPos: 'translateY(0)'
      })
    }, 0)
    // 拉取系列列表
    let allThemes = await xhrGet(`${config.rootURL}/api/lego/themes`)
    this.setState({
      themes: JSON.parse(allThemes)
    })
  }
  updateThemeList = (themes) => {
    this.setState({
      themes
    })
  }
  selectTheme = ({_id}) => {
    this.setState({
      selectedTheme: _id
    })
  }
  togglePhotoInput = () => {
    this.setState(({photoInputShow}) => ({
      photoInputShow: !photoInputShow
    }))
  }
  addPhoto = (e) => {
    e.preventDefault()
    let {photoInput:{value: url}} = this
    let duplicated = false
    if (!url) return alert('请输入图片地址')
    this.state.photos.forEach((item) => {
      if (item.url === url) {
        duplicated = true
      }
    })
    if (duplicated) return alert('重复的图片!')
    this.setState(({photos}) => ({
      photos: photos.concat({
        url: url
      }),
      photoInputShow: false
    }))
  }
  closeModal = () => {
    this.setState({
      wrapperBg: 'rgba(0,0,0,0.0)',
      modalPos: 'translateY(-200%)'
    })
    setTimeout(() => {
      this.props.toggleEditModal()
    }, 300)
  }
  submit = () => {
    let no = this.noInput.value
    let theme = this.state.selectedTheme
    let stock = this.stockInput.value
    if (!no || !theme || !stock) return alert('请填写项目!')
  }
  render () {
    return (
      <div
        className={editModalCss.wrapper}
        style={{'backgroundColor': this.state.wrapperBg}}
        onClick={this.closeModal}
      >
        <div className={editModalCss.modal} style={{'transform': this.state.modalPos}} onClick={(e) => e.stopPropagation()}>
          <span onClick={e => {
            e.stopPropagation()
            this.closeModal()
          }} className={editModalCss.closeBtn}>X</span>
          <form>
            <label htmlFor='no'>编号:</label>
            <input name='no' type='text' ref={input => this.noInput = input} required/>
            <label htmlFor='theme'>系列:</label>
            <ThemeInput themes={this.state.themes} selectedTheme={this.state.selectedTheme} updateThemeList={this.updateThemeList} selectTheme={this.selectTheme}/>
            <label htmlFor='stock'>库存:</label>
            <input name='stock' type='number' required min='1' max='100' ref={input => this.stockInput = input}/>
            <label htmlFor='photos'>图片:</label>
            <div className={editModalCss.photoContainer}>
              {
                this.state.photos.map((photo) => <img alt='' key={photo.url} src={photo.url} />)
                .concat(<div key='add' className={editModalCss.addPhotoBtn} onClick={this.togglePhotoInput}>+</div>)
              }
            </div>
            {
              this.state.photoInputShow && (
                <p style={{display: 'flex'}}>
                  <input type='text' placeholder='请输入图片地址' ref={input => this.photoInput = input}/>
                  <button onClick={(e) => this.addPhoto(e)}>确定</button>
                  <button onClick={this.togglePhotoInput}>取消</button>
                </p>)
            }
            <p style={{display: 'flex','justifyContent':'space-around'}}>
              <button type='submit' onClick={(e) => {
                e.preventDefault()
                this.submit()
              }}>提交</button>
              <button onClick={(e) => {
                e.preventDefault()
                this.closeModal()
              }}>取消</button>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default editModal
