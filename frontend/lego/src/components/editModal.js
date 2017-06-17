import React, {Component} from 'react'

import ThemeInput from './themeInput'

import editModalCss from '../stylesheets/editModalCss.less'

import {
  get as xhrGet,
  post as xhrPost,
  put as xhrPut
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
      selectedTheme: this.props.currentlyEditing ? this.props.currentlyEditing.theme._id : '',
      photos: this.props.currentlyEditing ? this.props.currentlyEditing.photos : []
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
  deletePhoto = (photo) => {
    let deletedIndex = this.state.photos.indexOf(photo)
    this.setState(({photos}) => ({
      photos: photos.filter((item, index) => index !== deletedIndex)
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
  submit = async () => {
    let no = this.noInput.value
    let theme = this.state.selectedTheme
    let stock = this.stockInput.value
    let photos = this.state.photos
    let saveResult
    if (!no || !theme || !stock) return alert('请填写项目!')
    // 更新操作
    if (this.props.currentlyEditing) {
      saveResult = JSON.parse(await xhrPut(`${config.rootURL}/api/lego`, {
        _id: this.props.currentlyEditing._id,
        no,
        theme,
        stock,
        photos: encodeURIComponent(JSON.stringify(photos))
      }))
    } else {
      saveResult = JSON.parse(await xhrPost(`${config.rootURL}/api/lego`, {
        no,
        theme,
        stock,
        photos: encodeURIComponent(JSON.stringify(photos))
      }))
    }
    if (saveResult.code === 1) {
      this.closeModal()
      setTimeout(() => {
        alert(`${this.props.currentlyEditing ? '修改' : '保存'}成功!`)
      }, 300)
    } else {
      alert('出错了!')
    }
  }
  render () {
    let {currentlyEditing} = this.props
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
            <input name='no' type='text' ref={input => this.noInput = input} defaultValue={currentlyEditing ? currentlyEditing.no : ''} required/>
            <label htmlFor='theme'>系列:</label>
            <ThemeInput themes={this.state.themes} selectedTheme={this.state.selectedTheme} updateThemeList={this.updateThemeList} selectTheme={this.selectTheme}/>
            <label htmlFor='stock'>库存:</label>
            <input name='stock' type='number' required min='1' max='100' ref={input => this.stockInput = input} defaultValue={currentlyEditing ? currentlyEditing.stock : ''}/>
            <label htmlFor='photos'>图片:</label>
            <div className={editModalCss.photoContainer}>
              {
                this.state.photos.map((photo) =>
                  <div key={photo.url}>
                    <img alt='' src={photo.url}/>
                    <span onClick={(e) => this.deletePhoto(photo)}>X
                    </span>
                  </div>)
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
