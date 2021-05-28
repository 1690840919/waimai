import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import Style from './UserVip.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import { getTime } from '../../utils/time'
import Popup from '../../components/Popup/Popup'
import Toast from '../../components/Toast/Toast'
import RefillMoney from './components/RefillMoney/RefillMoney'
import ToastLoading from '../../components/ToastLoading/ToastLoading'
import { userVipPacket } from '../../api/user'
function UserVip(props) {
  const { history, userInfo } = props
  const [vip, setVip] = useState(true)
  const PopupRef = useRef()
  const [toastInfo, setToastInfo] = useState({})
  const [popupContent, setPopupContent] = useState()
  const [toastLoading, setToastLoading] = useState(false)
  const vipMenus = [
    {
      icon: '&#xe62c;',
      name: '会员红包',
      to: '/userDiscount',
    },
    {
      icon: '&#xe63b;',
      name: '会员活动',
      to: '/home',
    },
    {
      icon: '&#xe61c;',
      name: '超低折扣',
      to: '/home',
    },
    {
      icon: '&#xe606;',
      name: '专属客服',
      to: '/userService',
    },
  ]
  // 切换popup弹出层
  const showPopup = value => {
    PopupRef.current.setShowContent(value)
  }

  // 点击立即充值
  const handleRefill = () => {
    showPopup(true)
    setPopupContent(<RefillMoney showPopup={showPopup} />)
  }

  // 点击来领取会员红包
  const handleVipPacket = async () => {
    if (!userInfo.isVip) {
      setToastLoading(false)
      setToastInfo({
        text: '会员未开通',
        date: new Date(),
      })
      return
    }
    setToastLoading(true)
    const { data } = await userVipPacket()
    if (data.code !== 1000) {
      setToastLoading(false)
      setToastInfo({
        text: data.message,
        date: new Date(),
      })
      return
    }
    setToastLoading(false)
    setToastInfo({
      text: data.message,
      date: new Date(),
    })
  }

  return (
    <div className={Style.userVip}>
      {/* 消息加载 */}
      {
        toastLoading ?
          <ToastLoading text={'领取中'} />
          : null
      }
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
      {/* 弹出层 */}
      <Popup PopupRef={PopupRef} content={popupContent} ></Popup>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'我的会员'} bgColor={'rgb(91,170,250)'} />
      {/* 用户资料 */}
      <div className={Style.userInfo}>
        {/* 用户头像 */}
        <div className={Style.avatar}>
          <img src={userInfo.avatar} alt="" />
        </div>
        {/* 昵称和时间 */}
        <div className={Style.info}>
          <p className={Style.name}>{userInfo.nickName}</p>
          <p className={Style.other}>
            <span style={{ color: !userInfo.isVip ? '#ccc' : '' }}
              className={`iconfont ${Style.icon}`}>&#xe626;</span>
            <span>{userInfo.isVip ? '到期时间：' : '未开通'}
              {userInfo.isVip ? getTime(userInfo.vipTime, 'YY-MM-DD') : null}</span>
          </p>
        </div>
        {/* 按钮 */}
        <div
          onClick={handleRefill}
          className={Style.vipBtn}>
          {userInfo.isVip ? '立即续费' : '立即开通'}
        </div>
      </div>
      {/* 会员中心 */}
      <div className={`${Style.areaBox}`}>
        <AppBar paddingRight={0} paddingLeft={0} left={'会员中心'}
          color={'#333'} rightColor={'#969799'}
          right={'更多'} leftIcon={null} size={'14px'} />
        <div className={Style.packet}>
          <div className={Style.content}>
            <div className={Style.img}>
              <span className="iconfont">&#xe62c;</span>
            </div>
            <div className={Style.info}>
              <p className={Style.title}>会员红包</p>
              <p className={Style.time}>有效期七天</p>
            </div>
            <div className={Style.money}>
              <p>
                <span>￥</span>
                <span className={Style.num}>5</span>
              </p>
              <p>无门槛</p>
            </div>
          </div>
          <div className={Style.tip}>
            <div className={Style.condition}>限制外卖订单使用</div>
            <div onClick={handleVipPacket} className={Style.btn}>领取</div>
          </div>
        </div>
      </div>
      {/* 会员特权 */}
      <div className={`${Style.areaBox}`}>
        <AppBar paddingRight={0} paddingLeft={0} left={'会员特权'}
          color={'#333'} rightColor={'#969799'}
          right={'更多'} leftIcon={null} size={'14px'} />
        <div className={Style.menus}>
          {
            vipMenus.map(obj => (
              <div key={obj.name} onClick={() => { history.push(obj.to) }} className={Style.menu}>
                <div className={Style.icon}>
                  <span className="iconfont"
                    dangerouslySetInnerHTML={{ __html: obj.icon }}></span>
                </div>
                <div className={Style.name}>
                  {obj.name}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default connect(
  ({ userInfo }) => ({
    userInfo
  }),
  (dispatch) => ({
    dispatch
  })
)(UserVip)
