import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Style from './Cart.module.scss'
import TabBar from '../../components/TabBar/TabBar'
import AppBar from '../../components/AppBar/AppBar'
import Button from '../../components/Button/Button'
import cartNullImg from '../../assets/images/cartNull.jpg'


function Cart(props) {
  const { history, cartInfo } = props

  return (
    <div className={Style.cart}>
      {/* 顶部标题栏目 */}
      <AppBar fixed={true}
        bgColor={'rgb(91,170,250)'} leftIcon={null}
        color={'white'} center={'我的购物车'} />
      {/* 购物车内容 */}
      <div className={Style.cartContent}>
        {
          Object.keys(cartInfo).length ?
            // 购物车有内容
            <div className={Style.cartData}>
              购物车
            </div>
            :
            // {/* 购物车是空的 */}
            <div className={Style.cartNull}>
              <div className={Style.cartNullContent}>
                <div className={Style.cartNullImg}>
                  <img src={cartNullImg} alt="" />
                </div>
                <p className={Style.title}>购物车还是空的</p>
                <Button onClick={() => { history.push('/home') }}
                  width={'120px'} height={'40px'} size={'14px'}
                  bgColor={'rgb(91,170,250)'} color={'white'}
                  text={'马上去购物'} />
              </div>
            </div>
        }
      </div>
      {/* 底部导航栏 */}
      <TabBar history={history} current={2} />
    </div>
  )
}


export default connect(
  ({ cartInfo }) => ({
    cartInfo
  }),
  (dispatch) => ({

  })
)(Cart)

