import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import Style from './UserInfo.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import { getTime } from '../../utils/time'
import Popup from '../../components/Popup/Popup'
import EditNickName from './components/EditNickName/EditNickName'
import EditPhone from './components/EditPhone/EditPhone'
import EditGender from './components/EditGender/EditGender'
import EditAvatar from './components/EditAvatar/EditAvatar'
function UserInfo(props) {
  const { history, userInfo } = props
  const PopupRef = useRef()
  const [userInfoArr, setUserInfoArr] = useState([])
  const [popupContent, setPopupContent] = useState()
  const [editAvatar,setEditAvatar] = useState(false)

  useEffect(() => {
    setUserInfoArr([
      {
        title: '昵称',
        right: userInfo.nickName,
      },
      {
        title: '性别',
        right: userInfo.gender === 3 ? '保密' : userInfo.gender === 1 ? "男" : '女',
      },
      {
        title: '手机号码',
        right: userInfo.phone || '未填写',
      },
      {
        title: '注册时间',
        right: getTime(userInfo.registerTime, 'YY-MM-DD'),
      },
    ])
  }, [userInfo])

  const closePopup = value => {
    PopupRef.current.setShowContent(value)
  }

  // 点击个人信息
  const handleUserInfo = (title) => {
    switch (title) {
      case '昵称':
        closePopup(true)
        setPopupContent(<EditNickName closePopup={() => { closePopup(false) }} />)
        break
      case '手机号码':
        closePopup(true)
        setPopupContent(<EditPhone closePopup={() => { closePopup(false) }} />)
        break
      case '性别':
        closePopup(true)
        setPopupContent(<EditGender closePopup={() => { closePopup(false) }} />)
        break
      default:
        break
    }
  }

  // 显示修改头像
  const openEditAvatar = () => {
    setEditAvatar(true)
  }
  // 关闭修改头像
  const closeEditAvatar = () => {
    setEditAvatar(false)
  }

  return (
    <div className={Style.userInfo}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'个人中心'} bgColor={'rgb(91,170,250)'} />


      {/* 头像 */}
      <AppBar paddingLeft={0} left={'头像'} leftIcon={null} height={'60px'} leftSize={'14px'}
        right={<div style={{ backgroundImage: `url("${userInfo.avatar}")` }} className={Style.avatar}></div>}
        onClick={openEditAvatar}
        rightIcon={'&#xe695;'} color={'#333'} bgColor={'white'} />

      {/* 头像修改 */}
      {
        editAvatar?
        <EditAvatar closeEditAvatar={closeEditAvatar} />
        :null
      }

      {/* 个人信息 */}
      {
        userInfoArr.length && userInfoArr.map(obj => (
          <AppBar key={obj.title} paddingLeft={0} left={obj.title} leftIcon={null}
            right={obj.right} rightSize={'12px'} rightColor={'#969799'}
            rightIconColor={'#333'} leftSize={'14px'} onClick={() => { handleUserInfo(obj.title) }}
            rightIcon={'&#xe695;'} color={'#333'} bgColor={'white'} />
        ))
      }

      {/* 弹出层 */}
      <Popup PopupRef={PopupRef} content={popupContent} ></Popup>
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
)(UserInfo)
