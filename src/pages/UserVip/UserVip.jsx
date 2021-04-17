import React, { useState } from 'react'
import Style from './UserVip.module.scss'
import AppBar from '../../components/AppBar/AppBar'

function UserVip(props) {
  const { history } = props
  const [vip, setVip] = useState(true)
  const avatar = 'https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c'
  return (
    <div className={Style.userVip}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'我的会员'} bgColor={'rgb(91,170,250)'} />
      {/* 用户资料 */}
      <div className={Style.userInfo}>
        {/* 用户头像 */}
        <div className={Style.avatar}>
          <img src={avatar} alt="" />
        </div>
        {/* 昵称和时间 */}
        <div className={Style.info}>
          <p className={Style.name}>新用户13411782971</p>
          <p className={Style.other}>
            <span className={`iconfont ${Style.icon}`}>&#xe626;</span>
            <span>到期时间：2020.02.06</span>
          </p>
        </div>
        {/* 按钮 */}
        <div className={Style.vipBtn}>
          立即续费
        </div>

      </div>
    </div>
  )
}

export default UserVip
