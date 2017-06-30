import React, { Component } from 'react'

export default class ItemRow extends Component {
  render () {
    let {item, index, showLightbox, editSet, deleteSet, userInfo} = this.props
    return (
      <tr>
        <td>{item.no}</td>
        <td>{item.theme.cnName}({item.theme.engName})</td>
        <td>{item.stock}</td>
        <td onClick={(e) => {
          if (item['photos'].length) {
            showLightbox(index)
          } else {
            alert('没有图片！')
          }
        }}><button className={'btn-info'}>{item['photos'].length}张</button></td>
        {
          userInfo && (userInfo.jurisdiction > 1 ? <td><button className={'btn-info'} onClick={(e) => editSet(item)}>编辑</button></td> : null)
        }
        {
          userInfo && (userInfo.jurisdiction > 1 ? <td><button className={'btn-info'} onClick={(e) => deleteSet(item)}>删除</button></td> : null)
        }
      </tr>
    )
  }
}
