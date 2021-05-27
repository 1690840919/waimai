import React from 'react'
import { connect } from 'react-redux'
import Style from './Login.module.scss'
import { useState } from 'react'
import { userLogin, userRegister } from '../../api/user'
import Toast from '../../components/Toast/Toast'
import { updateUserInfo } from '../../redux/actions'
import {setItem} from '../../utils/storage'
import ToastLoading from '../../components/ToastLoading/ToastLoading'
function Login(props) {
  const { history, dispatch, userInfo } = props
  const [isLogin, setIsLogin] = useState(true)
  const [submitData, setSubmitData] = useState({
    username: 'beitu',
    password: '123456',
    surePassword: '123456',
  })
  const [toastInfo, setToastInfo] = useState({})
  const [toastLoading,setToastLoading] = useState({is:false})
  // 点击去注册
  const handleRegister = () => {
    setIsLogin(false)
  }
  // 点击已有账号
  const handleLogin = () => {
    setIsLogin(true)
  }

  // 点击登陆/注册
  const handleType = async () => {
    // 如果是登陆
    if (isLogin) {
      setToastLoading({is:true,text:'登陆中'})
      const { data } = await userLogin(submitData)
      // 登陆失败
      if (data.code !== 1000) {
        setToastLoading({is:false})
        setToastInfo({
          text: data.message,
          date: new Date(),
        })
        return
      }
      dispatch(updateUserInfo(data))
      setItem('lazy_waimai_userInfo',data.data)
      setToastLoading({is:false})
      // 登陆成功
      setToastInfo({
        text: data.message,
        date: new Date(),
        icon: '&#xe687;',
        callBackFn: () => {
          history.push('/user')
        }
      })
    } else {// 否侧是注册
      const { password, surePassword } = submitData
      // 密码不一致
      if (password !== surePassword) {
        setToastInfo({
          text: '密码不一致',
          date: new Date(),
        })
        return
      }
      setToastLoading({is:true,text:'注册中'})
      const { data } = await userRegister(submitData)
      // 注册失败
      if (data.code !== 1000) {
        setToastLoading({is:false})
        setToastInfo({
          text: data.message,
          date: new Date(),
        })
        return
      }
      // 注册成功
      setToastLoading({is:false})
      setToastInfo({
        text: data.message,
        date: new Date(),
        icon: '&#xe687;'
      })
      setIsLogin(true)
      setSubmitData({})
    }
  }

  // 点击关闭按钮
  const handleClose = () => {
    // 返回
    window.history.back()
  }

  // 更新提交的信息
  const updateSubmitData = (e, type) => {
    const value = e.target.value
    const data = {
      ...submitData,
      [type]: value
    }
    setSubmitData(data)
  }

  // 点击忘记密码
  const handleForgetPassword = () => {
    setToastInfo({
      text: "联系管理员",
      date: new Date(),
      icon: '&#xe606;'
    })
  }

  return (
    <div className={Style.login}>
      {/* 消息加载 */}
      {
        toastLoading.is?
        <ToastLoading text={toastLoading.text} />
        :null
      }
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
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
            <input placeholder='请输入账号' value={submitData.username || ""}
              onChange={e => { updateSubmitData(e, 'username') }} type="text" />
          </div>
          <div className={Style.input}>
            <input placeholder='请输入密码' value={submitData.password || ""}
              onChange={e => { updateSubmitData(e, 'password') }} type="password" />
          </div>
          {
            !isLogin ?
              <div className={Style.input}>
                <input placeholder='请输入确认密码' value={submitData.surePassword || ""}
                  onChange={e => { updateSubmitData(e, 'surePassword') }} type="password" />
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
                <a href='/#' onClick={(e) => { e.preventDefault(); handleForgetPassword() }}>忘记密码</a>
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
  ({ userInfo }) => ({
    userInfo
  }),
  (dispatch) => ({
    dispatch
  })
)(Login)

