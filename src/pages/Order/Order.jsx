import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { userOrder } from '../../api/user'
import AppBar from '../../components/AppBar/AppBar'
import Button from '../../components/Button/Button'
import TabBar from '../../components/TabBar/TabBar'
import formatMoney from '../../utils/formatMoney'
import Style from './Order.module.scss'
import Loading from '../../components/Loading/Loading'
import DataNull from '../../components/DataNull/DataNull'

function Order(props) {
  const { history, userInfo } = props
  const [isLogin, setIsLogin] = useState(0)
  const [orderData, setOrderData] = useState()
  const [orderDataNull, setOrderDataNull] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userInfo && userInfo.id) {
      setIsLogin(true)
      initData()
    }
  }, [userInfo])

  // 初始化订单
  const initData = async () => {
    const { data } = await userOrder()
    if (data.code === 1000) {
      setLoading(false)
      setOrderData(data.data)
      if (data.data && !data.data.length) {
        setOrderDataNull(true)
      }
    }
  }

  return (
    <div className={Style.order}>
      {/* 顶部标题 */}
      <AppBar leftIcon={null} fixed={true} bgColor={'rgb(91,170,250)'} color={'white'} center={'我的订单'} />
      {
        isLogin ?
          // 已经登陆
          <div className={Style.loginStatus}>
            {/* 订单内容 */}
            {
              orderData ?
                <div className={Style.orderContent}>
                  {
                    orderData.map(obj => (
                      <div key={obj.order.id} className={Style.order}
                      >
                        {/* 店铺信息 */}
                        <div className={Style.shopInfo}>
                          <div
                            onClick={() => { history.push(`/shopDetail:${obj.shop.id}`) }}
                            className={Style.avatar}>
                            <img src={obj.shop.img} alt="" />
                          </div>
                          <div
                            onClick={() => { history.push(`/shopDetail:${obj.shop.id}`) }}
                            className={Style.info}>
                            <div className={Style.title}>
                              <span>
                                {obj.shop.name}
                              </span>
                            </div>
                            <div className={Style.others}>
                              <span>10减2</span>
                              <span>20减4</span>
                              <span>30减6</span>
                            </div>
                          </div>
                          <div
                            onClick={() => { history.push('/orderInfo') }}
                            className={Style.orderStatus}>{obj.order.arrive ? '已完成' : '配送中'}</div>
                        </div>
                        {/* 食品 */}
                        <div
                          onClick={() => { history.push('/orderInfo') }}
                          className={Style.orderFood}>
                          <div className={Style.foods}>
                            {
                              obj.food.data.map(item => (
                                <div key={item.id} className={Style.food}>
                                  <div className={Style.img}>
                                    <img src={item.img} alt="" />
                                  </div>
                                  <div className={Style.foodName}>
                                    {item.name}
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                          <div className={Style.foodInfo}>
                            <p className={Style.price}>￥{formatMoney(obj.food.totalPrice)}</p>
                            <p className={Style.num}>共{obj.food.data.length}件</p>
                          </div>
                        </div>
                        {/* 按钮 */}
                        <div className={Style.orderBtn}>
                          <div
                            onClick={() => { history.push(`/shopDetail:${obj.shop.id}`) }}
                            className={Style.btn}>再来一单</div>
                          {
                            !obj.order.commentId ?
                              <div
                                onClick={() => {
                                  history.push({
                                    pathname: '/orderComment',
                                    state: {
                                      id: obj.order.id,
                                      shopInfo: {
                                        img: obj.shop.img,
                                        name: obj.shop.name,
                                        id: obj.shop.id,
                                      }
                                    }
                                  })
                                }}
                                className={Style.btn}>评价</div>
                              : null
                          }

                        </div>
                      </div>
                    ))
                  }
                </div>
                : null
            }
            <Loading tip={!orderDataNull} loading={loading} />
            {
              orderDataNull ?
                <DataNull />
                : null
            }
          </div>
          // 未登录
          : <div className={Style.noLoginStatus}>
            <div className={Style.content}>
              <div className={Style.img}>
              </div>
              <p>登陆后查看外卖订单</p>
              <Button onClick={() => { history.push('/login') }}
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
  ({ userInfo }) => ({
    userInfo
  }),
  (dispatch) => ({

  })
)(Order)

