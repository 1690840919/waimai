import React from 'react'
import Style from './UserInfo.module.scss'
import AppBar from '../../components/AppBar/AppBar'

function UserInfo(props) {
  const { history } = props
  const avatar = 'https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c'
  return (
    <div className={Style.userInfo}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'个人中心'} bgColor={'rgb(91,170,250)'} />
      {/* 头像 */}
      <AppBar paddingLeft={0} left={'头像'} leftIcon={null} height={'60px'}
        right={<div style={{ backgroundImage: `url("${avatar}")` }} className={Style.avatar}></div>}
        rightIcon={'&#xe695;'} color={'#333'} bgColor={'white'} />

      {/* 昵称 */}
      <AppBar paddingLeft={0} left={'昵称'} leftIcon={null}
        right={'新用户13411782971'} rightSize={'12px'} rightColor={'#969799'}
        rightIconColor={'#333'}
        rightIcon={'&#xe695;'} color={'#333'} bgColor={'white'} />
    </div>
  )
}

export default UserInfo
