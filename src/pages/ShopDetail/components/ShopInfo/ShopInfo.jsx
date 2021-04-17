import React from 'react'
import Style from './ShopInfo.module.scss'

function ShopInfo(props) {
  return (
    <div className={Style.shopInfo}>
      {/* 配送和店铺信息 */}
      <div className={Style.sendInfo}>
        <p className={Style.title}>配送信息</p>
        <p className={Style.send}>
          <span>专业配送</span>
          由商家配送，大约28分钟送达，距离1000m
        </p>
        <p className={Style.price}>
          配送费
          <span>￥4元</span>
        </p>
      </div>
      {/* 店铺活动 */}
      <div className={Style.activity}>
        <p className={Style.title}>活动与服务</p>
        <p className={Style.item}>
          <span>专业配送</span>
          满34-10，欢乐小餐饮
        </p>
        <p className={Style.item}>
          <span>专业配送</span>
          满34-10，欢乐小餐饮
        </p>
        <p className={Style.item}>
          <span>专业配送</span>
          满34-10，欢乐小餐饮
        </p>
        <p className={Style.item}>
          <span>专业配送</span>
          满34-10，欢乐小餐饮
        </p>
      </div>
    </div>
  )
}

export default ShopInfo

