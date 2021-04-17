import React from 'react'
import Style from './Shop.module.scss'

function Shop(props) {
  const { data, history, bgColor, color } = props
  const handleShop = () => {
    history.push(`/shopDetail:${data.id}`)
  }
  return (
    <div style={{ backgroundColor: bgColor, color }}
      onClick={handleShop} className={Style.shop}>
      {/* 店铺图片 */}
      <div style={{ backgroundImage: `url(${data.img})` }} className={Style.img}>
      </div>
      {/* 店铺信息 */}
      <div className={Style.shopInfo}>
        {/* 店铺名称 */}
        <p className={Style.name}>{data.name}</p>
        {/* 店铺星星和地址 */}
        <div className={Style.others}>
          <div className="star">
            店铺评分:{data.star}
          </div>
          <div className={Style.address}>
            <span>{data.address[0]}</span>
            <span>{data.address[1]}</span>
          </div>
        </div>
        {/* 店铺东西和新店 */}
        <div className={Style.item}>
          <span>
            {data.item}
            {
              data.newShop ?
                <div className={Style.newShop}>新店特惠</div>
                : null
            }
          </span>
        </div>
        {/* 店铺优惠 */}
        {
          data.quan ?
            <p className={`${Style.discount} ${Style.quan}`}>
              <span className={Style.header}>券</span>
              <span>{data.quan}</span>
            </p>
            : null
        }
        {
          data.jian ?
            <p className={`${Style.discount} ${Style.quan}`}>
              <span className={Style.header}>减</span>
              <span>{data.jian}</span>
            </p>
            : null
        }
        {
          data.tuan ?
            <p className={`${Style.discount} ${Style.quan}`}>
              <span style={{ backgroundColor: '#38c2aa' }} className={Style.header}>团</span>
              <span className={Style.text}>{data.tuan}</span>
            </p>
            : null
        }
      </div>
    </div>
  )
}

export default Shop
