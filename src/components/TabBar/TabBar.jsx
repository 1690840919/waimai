import React from 'react'
import { connect } from 'react-redux'
import Style from './TabBar.module.scss'

function TabBar(props) {
  const { current, history } = props
  const tabBarData = [
    {
      title: '首页',
      icon: '&#xe70e;',
      to: '/home',
    },
    {
      title: '订单',
      icon: '&#xe604;',
      to: '/order',
    },
    {
      title: '购物车',
      icon: '&#xe657;',
      to: '/cart',
    },
    {
      title: '我的',
      icon: '&#xe658;',
      to: '/user',
    }
  ]
  // 点击路由跳转
  function handleRoute(path) {
    if (history.location.pathname === path) {
      return
    } else {
      history.push(path)
    }
  }
  return (
    <div className={Style.tabBar}>
      {
        tabBarData.map((item, index) => (
          <div
            onClick={() => { handleRoute(item.to) }}
            style={{ color: current === index ? 'rgb(91,170,250)' : '#333' }}
            key={item.title}
            className={Style.item}>
            <div className={`iconfont ${Style.icon}`}
              dangerouslySetInnerHTML={{ __html: item.icon }}></div>
            <p className={Style.name}>{item.title}</p>
          </div>
        ))
      }
    </div>
  )
}


export default connect(
  (state) => ({

  }),
  (dispatch) => ({

  })
)(TabBar)

