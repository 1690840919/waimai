import React, { Component } from 'react'
import { connect } from 'react-redux'
import Style from './Cart.module.scss'
import TabBar from '../../components/TabBar/TabBar'
import AppBar from '../../components/AppBar/AppBar'


function Cart(props) {
  const { history } = props
  return (
    <div className={Style.cart}>
      {/* 顶部标题栏目 */}
      <AppBar bgColor={'rgb(91,170,250)'} color={'white'} center={'我的购物车'} />
      {/* 购物车内容 */}
      <div className={Style.cartContent}>

      </div>
      {/* 底部导航栏 */}
      <TabBar history={history} current={2} />
    </div>
  )
}


export default connect(
  (state) => ({

  }),
  (dispatch) => ({

  })
)(Cart)

