import React, { useState } from 'react'
import { connect } from 'react-redux'
import AppBar from '../../components/AppBar/AppBar'
import Style from './Setting.module.scss'
import { removeItem } from '../../utils/storage'
import { updateUserInfo } from '../../redux/actions'
import { userExit } from '../../api/user'
import Toast from '../../components/Toast/Toast'
import ToastLoading from '../../components/ToastLoading/ToastLoading'
import Dialog from '../../components/Dialog/Dialog'
function Setting(props) {
  const { history, dispatch } = props
  const [dialog, setDialog] = useState({ show: false })
  const settingData = [
    {
      to: "/userInfo",
      left: '个人中心',
    },
    {
      // to: "/",
      left: '安全设置',
    },
    {
      // to: "/",
      left: '隐私设置',
    },
    {
      left: '退出登录',
    }
  ]
  const [toastInfo, setToastInfo] = useState({})
  const [toastLoading, setToastLoading] = useState(false)

  // 点击设置
  const handleSetting = item => {
    if (item.to) {
      history.push(item.to)
    }
    if (item.left === '退出登录') {
      setDialog({
        show: dialog.show+1,
        confirm: async () => {
          setDialog({ show: false })
          removeItem('lazy_waimai_userInfo')
          dispatch(updateUserInfo({ data: {} }))
          setToastLoading(true)
          const { data } = await userExit()
          setToastLoading(false)
          if (data.code !== 1000) {
            setToastInfo({
              text: '登陆身份已过期',
              date: new Date(),
              callBackFn: () => {
                history.replace('/login')
              }
            })
            return
          }
          setToastInfo({
            text: data.message,
            date: new Date(),
            icon: '&#xe687;',
            callBackFn: () => {
              history.replace('/login')
            }
          })
        }
      })

    }
  }

  return (
    <div className={Style.setting}>
      {/* dialog弹窗 */}
      <Dialog dialog={dialog.show} text={'确认退出登录吗？'}
        confirm={dialog.confirm} />
      {/* 消息加载 */}
      {
        toastLoading ?
          <ToastLoading text={'退出中'} />
          : null
      }
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'设置'} bgColor={'rgb(91,170,250)'} />
      {/* 设置选项 */}
      <div className={Style.settingItem}>
        {settingData.map(item => {
          return <AppBar key={item.left} leftIcon={null} height={'50px'}
            onClick={() => { handleSetting(item) }}
            left={item.left} bgColor={'white'} paddingLeft={0}
            color={'#333'} rightIcon={'&#xe695;'} />
        })}
      </div>
    </div>
  )
}

export default connect(
  () => ({
  }),
  (dispatch) => ({
    dispatch
  })
)(Setting)
