import React, {Component} from 'react'

import editModalCss from '../stylesheets/editModalCss.less'

class editModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wrapperBg: 'rgba(0,0,0,0)',
      modalPos: 'translateY(-200%)'
    }
  }
  // 进入动效
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        wrapperBg: 'rgba(0,0,0,0.8)',
        modalPos: 'translateY(0)'
      })
    }, 0)
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
    console.log('submit')
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
            <input name='no' type='text'/>
            <label htmlFor='no'>系列:</label>
            <input name='no' type='text'/>
            <label htmlFor='no'>库存:</label>
            <input name='no' type='text'/>
            <label htmlFor='no'>图片:</label>
            <input name='no' type='text'/>
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
