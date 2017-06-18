import React, { Component } from 'react';

import Lightbox from 'react-image-lightbox';
import EditModal from './editModal'

import homeCss from '../stylesheets/home.less'

import xhr from '../tools/xhr'
import {
  put as xhrPut
} from '../tools/xhr'
import config from '../config'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      legoData: [],
      lightboxOpen: false,
      lightboxImages: [],
      lightboxIndex: 0,
      editModalShow: false,
      currentlyEditing: null
    }
  }
  componentDidMount = async () => {
    let legoData
    legoData = JSON.parse(await xhr.get(`${config.rootURL}/api/lego`))
    this.setState({
      legoData
    })
  }
  // chooseRow = (setNo) => {
  //   if (this.state.checkedSet.includes(setNo)) {
  //     let index = this.state.checkedSet.indexOf(setNo)
  //     this.setState(prevState => {
  //       prevState.checkedSet.splice(index, 1)
  //       return {
  //         checkedSet: prevState.checkedSet
  //       }
  //     })
  //   } else {
  //     this.setState(prevState => {
  //       prevState.checkedSet.push(setNo)
  //       return {
  //         checkedSet: prevState.checkedSet
  //       }
  //     })
  //   }
  // }
  fetchSets = async () => {
    let legoData = JSON.parse(await xhr.get(`${config.rootURL}/api/lego`))
    this.setState({
      legoData
    })
  }
  editSet = (set) => {
    this.setState({
      editModalShow: true,
      currentlyEditing: set
    })
  }
  deleteSet = async (set) => {
    let confirm = prompt(`确认删除: ${set.no}`)
    if (confirm !== null) {
      let delRes = JSON.parse(await xhrPut(`${config.rootURL}/api/lego/delete/${set._id}`))
      if (delRes.code === 1) {
        alert('删除成功!')
        this.fetchSets()
      } else {
        alert('删除失败!')
        this.fetchSets()
      }
    }
  }
  // 关闭编辑框
  toggleEditModal = () => {
    this.setState(({editModalShow}) => {
      if (editModalShow === true) {
        this.fetchSets()
      }
      return {
        currentlyEditing: null,
        editModalShow: !editModalShow
      }
    })
  }
  render () {
    let {legoData, lightboxOpen, lightboxIndex, lightboxImages} = this.state
    let {userInfo} = this.props
    return (
      <div className={homeCss.wrapper}>
        {
          userInfo && (userInfo.jurisdiction > 1 ? <p className={homeCss.addBtn}><button className={'btn-primary'} onClick={this.toggleEditModal}>新增</button></p> : <p>&nbsp;</p>)
        }
        <div style={{
          width: '100%',
          overflowX: 'scroll'
        }}>
          <table>
            <thead>
              <tr>
                <td>编号</td>
                <td>系列</td>
                <td>库存</td>
                <td>图片</td>
                {
                  userInfo && (userInfo.jurisdiction > 1 ? <td>编辑</td> : null)
                }
                {
                  userInfo && (userInfo.jurisdiction > 1 ? <td>删除</td> : null)
                }
              </tr>
            </thead>
            <tbody>
              {
                legoData.length ? legoData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{item.no}</td>
                    <td>{item.theme.cnName}({item.theme.engName})</td>
                    <td>{item.stock}</td>
                    <td onClick={(e) => {
                      e.stopPropagation()
                      if (legoData[index]['photos'].length) {
                        this.setState({
                          lightboxOpen: true,
                          lightboxImages: legoData[index]['photos']
                        })
                      } else {
                        alert('没有图片！')
                      }
                    }}><button>查看</button></td>
                    {
                      userInfo && (userInfo.jurisdiction > 1 ? <td><button className={'btn-info'} onClick={(e) => this.editSet(item)}>编辑</button></td> : null)
                    }
                    {
                      userInfo && (userInfo.jurisdiction > 1 ? <td><button className={'btn-info'} onClick={(e) => this.deleteSet(item)}>删除</button></td> : null)
                    }
                  </tr>
                )) : <tr><td colSpan='5'>暂无数据！</td></tr>
              }
            </tbody>
          </table>
        </div>
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
