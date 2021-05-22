import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Style from './User.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import TabBar from '../../components/TabBar/TabBar'

function User(props) {
  const { history,userInfo } = props
  // 登陆状态
  const [isLogin, setIsLogin] = useState(0)
  // 菜单数据
  const menuData = [
    {
      to: '/userVip',
      leftIcon: '&#xe601;',
      left: '我的会员',
      iconColor: '#f3961a'
    },
    {
      to: '/userAddress',
      leftIcon: '&#xe61f;',
      left: '我的地址',
      iconColor: '#3798d4'
    },
    {
      to: '/userService',
      leftIcon: '&#xe606;',
      left: '我的客服',
      iconColor: '#5ed5dd'
    },
    {
      to: '/userRule',
      leftIcon: '&#xe63c;',
      left: '规则中心',
      iconColor: '#b44c4c'
    }
  ]
  // 功能数据    
  const funcData = [
    {
      to: '/userWallet',
      title: '我的钱包',
      icon: '&#xe62d;'
    },
    {
      to: '/userDiscount',
      title: '红包 / 卡券',
      icon: '&#xe62c;'
    },
    {
      to: '/userCollect',
      title: '收藏',
      icon: '&#xe605;'
    }
  ]
  // 点击去登陆
  const toLogin = () => {
    history.push('/login')
  }

  useEffect(()=>{
    setIsLogin(!!userInfo.id)
  },[userInfo])

  return (
    <div className={Style.user}>
      {
        isLogin ?
          // 已经登陆显示信息
          <div className={Style.userInfo}>
            {/* 导航条 */}
            <AppBar history={history} bgColor={'rgb(91,170,250)'} leftIcon={null}
              rightIcon={'&#xe60c;'} handleRight={() => { history.push('/setting') }} />
            {/* 用户信息 */}
            <div className={Style.content} onClick={() => { history.push('/userInfo') }}>
              {/* 用户头像 */}
              <div className={Style.avatar}>
                {
                  userInfo.avatar?
                  <img src={userInfo.avatar} alt="" />
                  :<div className={`iconfont ${Style.img}`}>&#xe658;</div>
                }
              </div>
              {/* 用户昵称 */}
              <div className={Style.text}>
                <p className={Style.userName}>{userInfo.nickName}</p>
                <p>
                  <span className={Style.userId}>{`用户ID：${userInfo.id}`}</span>
                </p>
              </div>
              {/* 更多 */}
              <div className={`iconfont ${Style.moreIcon}`}>&#xe695;</div>
            </div>
          </div>
          // 未登陆头像
          : <div className={Style.noLoginAvatar}>
            <div className={Style.avatar}>
              <div onClick={toLogin} className={`iconfont ${Style.img}`}>&#xe658;</div>
            </div>
            <p className={Style.info}>
              <span onClick={toLogin}>登陆 / 注册</span>
            </p>
          </div>
      }
      {/* 功能区域 */}
      <div className={Style.funcArea}>
        {
          funcData.map(item => (
            <div onClick={() => { history.push(item.to) }}
              key={item.title} className={Style.item}>
              <div className={`iconfont ${Style.icon}`}
                dangerouslySetInnerHTML={{ __html: item.icon }}></div>
              <p className={Style.name}>{item.title}</p>
            </div>
          ))
        }
      </div>
      {/* 菜单区域 */}
      <div className={Style.menuArea}>
        <div className={Style.item}>
          {menuData.map(item => {
            return <AppBar key={item.left} leftIcon={item.leftIcon}
              left={item.left} bgColor={'white'} leftIconColor={item.iconColor}
              onClick={() => { history.push(item.to) }}
              color={'#333'} rightIcon={'&#xe695;'} />
          })}
        </div>
      </div>
      {/* 底部菜单 */}
      <TabBar history={props.history} current={3} />
    </div>
  )
}


export default connect(
  ({userInfo}) => ({
    userInfo
  }),
  (dispatch) => ({
    dispatch
  })
)(User)

