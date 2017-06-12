import React, { Component } from 'react';

import Lightbox from 'react-image-lightbox';

import homeCss from '../stylesheets/home.less'

import xhr from '../tools/xhr'
import config from '../config'

const images = [
  'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42009_alt6?$main$',
  'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42009_alt3?$main$'
]

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      legoData: [],
      checkedSet: [],
      userInfo: null,
      lightboxOpen: false,
      photoIndex: 0
    }
  }
  componentDidMount = async () => {
    let userInfo
    let legoData
    if (process.env.NODE_ENV === 'development') {
      userInfo = JSON.parse('{"username":"user3","jurisdiction":1}')
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
  render () {
    let {legoData, lightboxOpen, photoIndex} = this.state
    return (
      <div className={homeCss.wrapper}>
        <table>
          <thead>
            <tr>
              <td>选中</td>
              <td>编号</td>
              <td>系列</td>
              <td>库存</td>
              <td>图片</td>
            </tr>
          </thead>
          <tbody>
            {
              legoData.map((item, index) => (
                <tr key={item.no} onClick={(e) => this.chooseRow(item.no, index)}>
                  <td><input type='checkbox' checked={this.state.checkedSet.includes(item.no)}/></td>
                  <td>{item.no}</td>
                  <td>{item.theme}</td>
                  <td>{item.stock}</td>
                  <td onClick={(e) => {
                    e.stopPropagation()
                    this.setState({
                      lightboxOpen: true
                    })
                    console.log(item.no)
                  }}>查看</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {lightboxOpen &&
          <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => this.setState({ lightboxOpen: false })}
              onMovePrevRequest={() => this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length,
              })}
              onMoveNextRequest={() => this.setState({
                  photoIndex: (photoIndex + 1) % images.length,
              })}
          />
      }
      </div>
    )
  }
}

export default Home
