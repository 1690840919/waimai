import React from 'react'
import { connect } from 'react-redux'
import Style from './Login.module.scss'

import { useState } from 'react'
function Login(props) {
  const [isLogin, setIsLogin] = useState(true)
  // 点击去注册
  const handleRegister = () => {
    setIsLogin(false)
  }
  // 点击已有账号
  const handleLogin = () => {
    setIsLogin(true)
  }

  // 点击登陆/注册
  const handleType = () => {
    // 如果是登陆
    if (isLogin) {
      console.log('登陆')
      props.history.push('/user')
    } else {// 否侧是注册
      console.log('注册')
    }
  }

  // 点击关闭按钮
  const handleClose = () => {
    // 返回
    window.history.back()
  }

  return (
    <div className={Style.login}>
      {/* 关闭按钮 */}
      <div onClick={handleClose} className={`iconfont ${Style.close}`}>&#xe60b;</div>
      {/* 登陆内容 */}
      <div className={Style.content}>
        {/* 头像 */}
        <div className={Style.avatar}>
          <div className={`iconfont ${Style.img}`}>&#xe61a;</div>
        </div>
        {/* 登陆表单 */}
        <div className={Style.loginForm}>
          <div className={Style.input}>
            <input placeholder='请输入账号' type="text" />
          </div>
          <div className={Style.input}>
            <input placeholder='请输入密码' type="password" />
          </div>
          {
            !isLogin ?
              <div className={Style.input}>
                <input placeholder='请输入确认密码' type="password" />
              </div>
              : null
          }
        </div>
        {/* 登陆按钮 */}
        <div className={Style.loginBtn} onClick={handleType}>
          {isLogin ? '登陆' : '注册'}
        </div>
        {/* 提示信息 */}
        <div className={Style.tip}>
          {
            isLogin ?
              <div>
                <a href='/#' onClick={(e) => { e.preventDefault(); handleRegister() }}>立即注册</a>
                <span>|</span>
                <a href='/#'>忘记密码</a>
              </div>
              :
              <div>
                <a href='/#' onClick={(e) => { e.preventDefault(); handleLogin() }}>已有账号去登陆</a>
              </div>
          }
        </div>
      </div>
    </div >
  )
}


export default connect(
  (state) => ({

  }),
  (dispatch) => ({

  })
)(Login)

