import React, { useState } from 'react'
import Style from './UserDiscount.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import AppTab from '../../components/AppTab/AppTab'

function UserDiscount(props) {
  const { history } = props
  const appTabData = ['全部', '红包', '卡券']
  const [current, setCurrent] = useState(0)
  const changeTab = (index) => {
    setCurrent(index)
  }
  return (
    <div className={Style.userDiscount}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'红包卡券'} bgColor={'rgb(91,170,250)'} />
      {/* 选项卡 */}
      <AppTab current={current} appTabData={appTabData} changeTab={changeTab} />
      {/* 红包 */}
      <div className={Style.content}>
        {/* 信息 */}
        <div className={Style.info}>
          <div className={Style.avatar}>
            <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
          </div>
          <div className={Style.text}>
            <p className={Style.title}>会员红包</p>
            <p className={Style.time}>2020.11.03</p>
          </div>
          <div className={Style.priceInfo}>
            <p className={Style.price}>
              <span>￥</span>
              <span className={Style.num}>5</span>
            </p>
            <p>无门槛</p>
          </div>
        </div>
        {/* 使用 */}
        <div className={Style.tip}>
          <div className={Style.left}>
            <span>限制外卖订单使用</span>
          </div>
          <div className={Style.btn}>去使用</div>
        </div>
      </div>
      <div className={Style.content}>
        {/* 信息 */}
        <div className={Style.info}>
          <div className={Style.avatar}>
            <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
          </div>
          <div className={Style.text}>
            <p className={Style.title}>会员红包</p>
            <p className={Style.time}>2020.11.03</p>
          </div>
          <div className={Style.priceInfo}>
            <p className={Style.price}>
              <span>￥</span>
              <span className={Style.num}>5</span>
            </p>
            <p>无门槛</p>
          </div>
        </div>
        {/* 使用 */}
        <div className={Style.tip}>
          <div className={Style.left}>
            <span>限制外卖订单使用</span>
          </div>
          <div className={Style.btn}>去使用</div>
        </div>
      </div>
      <div className={Style.content}>
        {/* 信息 */}
        <div className={Style.info}>
          <div className={Style.avatar}>
            <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
          </div>
          <div className={Style.text}>
            <p className={Style.title}>会员红包</p>
            <p className={Style.time}>2020.11.03</p>
          </div>
          <div className={Style.priceInfo}>
            <p className={Style.price}>
              <span>￥</span>
              <span className={Style.num}>5</span>
            </p>
            <p>无门槛</p>
          </div>
        </div>
        {/* 使用 */}
        <div className={Style.tip}>
          <div className={Style.left}>
            <span>限制外卖订单使用</span>
          </div>
          <div className={Style.btn}>去使用</div>
        </div>
      </div>
    </div>
  )
}

export default UserDiscount
