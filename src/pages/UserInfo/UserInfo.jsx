import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Style from './UserInfo.module.scss'
import AppBar from '../../components/AppBar/AppBar'

function UserInfo(props) {
  const { history, userInfo } = props
  const [userInfoArr, setUserInfoArr] = useState([])

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
        right: userInfo.registerTime,
      },
    ])
  }, [userInfo])

  return (
    <div className={Style.userInfo}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'个人中心'} bgColor={'rgb(91,170,250)'} />


      {/* 头像 */}
      <AppBar paddingLeft={0} left={'头像'} leftIcon={null} height={'60px'}
        right={<div style={{ backgroundImage: `url("${userInfo.avatar}")` }} className={Style.avatar}></div>}
        rightIcon={'&#xe695;'} color={'#333'} bgColor={'white'} />
      
      {/* 个人信息 */}
      {
        userInfoArr.length && userInfoArr.map(obj=>(
          <AppBar paddingLeft={0} left={obj.title} leftIcon={null}
            right={obj.right} rightSize={'12px'} rightColor={'#969799'}
            rightIconColor={'#333'}
            rightIcon={'&#xe695;'} color={'#333'} bgColor={'white'} />
        ))
      }
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
