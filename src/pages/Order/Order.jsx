import React, { useState } from 'react'
import { connect } from 'react-redux'
import AppBar from '../../components/AppBar/AppBar'
import Button from '../../components/Button/Button'
import TabBar from '../../components/TabBar/TabBar'
import Style from './Order.module.scss'

function Order(props) {
  const { history } = props
  const [isLogin, setIsLogin] = useState(false)
  return (
    <div className={Style.order}>
      {/* 顶部标题 */}
      <AppBar bgColor={'rgb(91,170,250)'} color={'white'} center={'我的订单'} />
      {
        isLogin ?
          // 已经登陆
          <div className={Style.loginStatus}>
            已经登陆
          </div>
          // 未登录
          : <div className={Style.noLoginStatus}>
            <div className={Style.content}>
              <div className={Style.img}>
              </div>
              <p>登陆后查看外卖订单</p>
              <Button
                width={'120px'} height={'40px'} size={'14px'}
                bgColor={'rgb(91,170,250)'} color={'white'}
                text={'立即登陆'} />
            </div>
          </div>
      }
      {/* 底部导航菜单 */}
      <TabBar history={history} current={1} />
    </div>
  )
}


export default connect(
  (state) => ({

  }),
  (dispatch) => ({

  })
)(Order)

