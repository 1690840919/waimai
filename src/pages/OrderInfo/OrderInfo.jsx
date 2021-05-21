import React, { useState } from 'react'
import Style from './OrderInfo.module.scss'
import AppBar from '../../components/AppBar/AppBar'

function OrderInfo(props) {
  const { history } = props
  const [isArrive, setIsArrive] = useState(0)
  return (
    <div className={Style.orderInfo}>
      {/* 顶部标题 */}
      <AppBar fixed={true} bgColor={'rgb(91,170,250)'} color={'white'}
        center={'订单详情'} handleLeft={() => { history.goBack() }} />
      {/* 详情 */}
      <div className={Style.arrive}>
        <h1 style={{ textAlign: 'center' }}> {isArrive ? '订单已送达' : "配送中"}
          <span className="iconfont">&#xe695;</span>
        </h1>
        <div className={Style.funcBox}>
          <div className={Style.title}>感谢您的光临，期待再次光临</div>
          <div className={Style.menus}>
            <div className={Style.menu}>
              <div>
                <div className="iconfont">&#xe606;</div>
                <div>联系客服</div>
              </div>
            </div>
            <div className={Style.menu}>
              <div>
                <div className="iconfont">&#xe692;</div>
                <div>打赏骑手</div>
              </div>
            </div>
            <div className={Style.menu}>
              <div>
                <div className="iconfont">&#xe667;</div>
                <div>申请退款</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderInfo
