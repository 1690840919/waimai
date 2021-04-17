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
      {/* 底部按钮 */}
      <div className={Style.addBtn}>
        <div onClick={() => { history.push("/userAddressEdit") }}
          className={Style.btn}>新增地址</div>
      </div>
    </div>
  )
}

export default UserAddress
