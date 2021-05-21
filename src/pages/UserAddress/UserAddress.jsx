import React from 'react'
import Style from './UserAddress.module.scss'
import AppBar from '../../components/AppBar/AppBar'

function UserAddress(props) {
  const { history } = props
  return (
    <div className={Style.userAddress}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'我的地址'} bgColor={'rgb(91,170,250)'} />
      {/* 我的地址 */}
      <div className={Style.myAddress}>
        <div className={Style.address}>
          <div className={`${Style.aside} iconfont`}>
            &#xe614;
          </div>
          <div className={Style.center}>
            <p className={Style.title}>
              <span>北土</span>
              <span>13411782971</span>
            </p>
            <p>
              河北省秦皇岛市青龙满族自治县杭州市西湖区 黄龙万科中心
            </p>
          </div>
          <div className={`${Style.aside} iconfont`}>
            &#xeb5c;
          </div>
        </div>
        <div className={Style.address}>
          <div className={`${Style.aside} iconfont`}>
            &#xe614;
          </div>
          <div className={Style.center}>
            <p className={Style.title}>
              <span>北土</span>
              <span>13411782971</span>
            </p>
            <p>
              河北省秦皇岛市青龙满族自治县杭州市西湖区 黄龙万科中心
            </p>
          </div>
          <div className={`${Style.aside} iconfont`}>
            &#xeb5c;
          </div>
        </div>
      </div>
      {/* 底部按钮 */}
      <div className={Style.addBtn}>
        <div onClick={() => { history.push("/userAddressEdit") }}
          className={Style.btn}>新增地址</div>
      </div>
    </div>
  )
}

export default UserAddress
