import React, { Component } from 'react';

import Lightbox from 'react-image-lightbox';
import EditModal from './editModal'

import homeCss from '../stylesheets/home.less'

import xhr from '../tools/xhr'
import config from '../config'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      legoData: [],
      checkedSet: [],
      userInfo: null,
      lightboxOpen: false,
      lightboxImages: [],
      lightboxIndex: 0,
      editModalShow: false,
      currentlyEditing: null
    }
  }
  componentDidMount = async () => {
    let userInfo
    let legoData
    if (process.env.NODE_ENV === 'development') {
      userInfo = JSON.parse('{"username":"user3","jurisdiction":3}')
    } else {
      userInfo = JSON.parse(await xhr.get(`${config.rootURL}/api/user`)).user
    }
    this.setState({
      userInfo
    })
    legoData = JSON.parse(await xhr.get(`${config.rootURL}/api/lego`))
    this.setState({
      legoData
    })
  }
  chooseRow = (setNo) => {
    if (this.state.checkedSet.includes(setNo)) {
      let index = this.state.checkedSet.indexOf(setNo)
      this.setState(prevState => {
        prevState.checkedSet.splice(index, 1)
        return {
          checkedSet: prevState.checkedSet
        }
      })
    } else {
      this.setState(prevState => {
        prevState.checkedSet.push(setNo)
        return {
          checkedSet: prevState.checkedSet
        }
      })
    }
  }
  toggleEditModal = () => {
    this.setState(({editModalShow}) => ({
      editModalShow: !editModalShow
    }))
  }
  render () {
    let {legoData, userInfo, lightboxOpen, lightboxIndex, lightboxImages} = this.state
    return (
      <div className={homeCss.wrapper}>
        <p className={homeCss.addBtn}><button className={'btn-primary'} onClick={this.toggleEditModal}>新增</button></p>
        <table>
          <thead>
            <tr>
              <td>选中</td>
              <td>编号</td>
              <td>系列</td>
              <td>库存</td>
              <td>图片</td>
              {
                userInfo && (userInfo.jurisdiction > 1 ? <td>编辑</td> : '')
              }
            </tr>
          </thead>
          <tbody>
            {
              legoData.length ? legoData.map((item, index) => (
                <tr key={item.no} onClick={(e) => this.chooseRow(item.no, index)}>
                  <td><input type='checkbox' checked={this.state.checkedSet.includes(item.no)}/></td>
                  <td>{item.no}</td>
                  <td>{item.theme}</td>
                  <td>{item.stock}</td>
                  <td onClick={(e) => {
                    e.stopPropagation()
                    this.setState({
                      lightboxOpen: true,
                      lightboxImages: legoData[index]['images']
                    })
                  }}><button>查看</button></td>
                  {
                    userInfo && (userInfo.jurisdiction > 1 ? <td><button className={'btn-info'}>编辑</button></td> : '')
                  }
                </tr>
              )) : <tr><td colSpan='5'>暂无数据！</td></tr>
            }
          </tbody>
        </table>
        {lightboxOpen &&
          <Lightbox
              mainSrc={lightboxImages[lightboxIndex].url}
              nextSrc={lightboxImages[(lightboxIndex + 1) % lightboxImages.length].url}
              prevSrc={lightboxImages[(lightboxIndex + lightboxImages.length - 1) % lightboxImages.length].url}
              onCloseRequest={() => this.setState({ lightboxOpen: false })}
              onMovePrevRequest={() => this.setState({
                  lightboxIndex: (lightboxIndex + lightboxImages.length - 1) % lightboxImages.length,
              })}
              onMoveNextRequest={() => this.setState({
                  lightboxIndex: (lightboxIndex + 1) % lightboxImages.length,
              })}
          />
        }
        {
          this.state.editModalShow && <EditModal toggleEditModal={this.toggleEditModal} currentlyEditing={this.state.currentlyEditing}/>
        }
      </div>
    )
  }
}

export default Home
