import React, { useState } from 'react'
import { connect } from 'react-redux'
import AppBar from '../../components/AppBar/AppBar'
import Button from '../../components/Button/Button'
import TabBar from '../../components/TabBar/TabBar'
import Style from './Order.module.scss'

function Order(props) {
  const { history } = props
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className={Style.order}>
      {/* 顶部标题 */}
      <AppBar leftIcon={null} fixed={true} bgColor={'rgb(91,170,250)'} color={'white'} center={'我的订单'} />
      {
        isLogin ?
          // 已经登陆
          <div className={Style.loginStatus}>
            {/* 订单内容 */}
            <div className={Style.orderContent}>
              <div className={Style.order} onClick={() => { history.push('/orderInfo') }}>
                {/* 店铺信息 */}
                <div className={Style.shopInfo}>
                  <div className={Style.avatar}>
                    <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                  </div>
                  <div className={Style.info}>
                    <div className={Style.title}>
                      <div className={Style.name}>
                        水饺先生（龙洞点）
                      </div>
                      <div className={Style.orderStatus}>已完成</div>
                    </div>
                    <div className={Style.others}>
                      <span>10减2</span>
                      <span>20减4</span>
                      <span>30减6</span>
                    </div>
                  </div>
                </div>
                {/* 食品 */}
                <div className={Style.orderFood}>
                  <div className={Style.foods}>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                  </div>
                  <div className={Style.foodInfo}>
                    <p className={Style.price}>￥29.99</p>
                    <p className={Style.num}>共3件</p>
                  </div>
                </div>
                {/* 按钮 */}
                <div className={Style.orderBtn}>
                  <div className={Style.btn}>再来一单</div>
                  <div className={Style.btn}>评价</div>
                </div>
              </div>
              <div className={Style.order}>
                {/* 店铺信息 */}
                <div className={Style.shopInfo}>
                  <div className={Style.avatar}>
                    <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                  </div>
                  <div className={Style.info}>
                    <div className={Style.title}>
                      <div className={Style.name}>
                        水饺先生（龙洞点）
                      </div>
                      <div className={Style.orderStatus}>已完成</div>
                    </div>
                    <div className={Style.others}>
                      <span>10减2</span>
                      <span>20减4</span>
                      <span>30减6</span>
                    </div>
                  </div>
                </div>
                {/* 食品 */}
                <div className={Style.orderFood}>
                  <div className={Style.foods}>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                  </div>
                  <div className={Style.foodInfo}>
                    <p className={Style.price}>￥29.99</p>
                    <p className={Style.num}>共3件</p>
                  </div>
                </div>
                {/* 按钮 */}
                <div className={Style.orderBtn}>
                  <div className={Style.btn}>再来一单</div>
                  <div className={Style.btn}>评价</div>
                </div>
              </div>
              <div className={Style.order}>
                {/* 店铺信息 */}
                <div className={Style.shopInfo}>
                  <div className={Style.avatar}>
                    <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                  </div>
                  <div className={Style.info}>
                    <div className={Style.title}>
                      <div className={Style.name}>
                        水饺先生（龙洞点）
                      </div>
                      <div className={Style.orderStatus}>已完成</div>
                    </div>
                    <div className={Style.others}>
                      <span>10减2</span>
                      <span>20减4</span>
                      <span>30减6</span>
                    </div>
                  </div>
                </div>
                {/* 食品 */}
                <div className={Style.orderFood}>
                  <div className={Style.foods}>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                  </div>
                  <div className={Style.foodInfo}>
                    <p className={Style.price}>￥29.99</p>
                    <p className={Style.num}>共3件</p>
                  </div>
                </div>
                {/* 按钮 */}
                <div className={Style.orderBtn}>
                  <div className={Style.btn}>再来一单</div>
                  <div className={Style.btn}>评价</div>
                </div>
              </div>
              <div className={Style.order}>
                {/* 店铺信息 */}
                <div className={Style.shopInfo}>
                  <div className={Style.avatar}>
                    <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                  </div>
                  <div className={Style.info}>
                    <div className={Style.title}>
                      <div className={Style.name}>
                        水饺先生（龙洞点）
                      </div>
                      <div className={Style.orderStatus}>已完成</div>
                    </div>
                    <div className={Style.others}>
                      <span>10减2</span>
                      <span>20减4</span>
                      <span>30减6</span>
                    </div>
                  </div>
                </div>
                {/* 食品 */}
                <div className={Style.orderFood}>
                  <div className={Style.foods}>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                    <div className={Style.food}>
                      <div className={Style.img}>
                        <img src="https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c" alt="" />
                      </div>
                      <div className={Style.foodName}>
                        全家父超好此地 较迟自
                      </div>
                    </div>
                  </div>
                  <div className={Style.foodInfo}>
                    <p className={Style.price}>￥29.99</p>
                    <p className={Style.num}>共3件</p>
                  </div>
                </div>
                {/* 按钮 */}
                <div className={Style.orderBtn}>
                  <div className={Style.btn}>再来一单</div>
                  <div className={Style.btn}>评价</div>
                </div>
              </div>
            </div>
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

