import React from 'react'
import Style from './UserService.module.scss'
import AppBar from '../../components/AppBar/AppBar'
function UserService(props) {
  const { history } = props
  return (
    <div className={Style.userService}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'我的客服'} bgColor={'rgb(91,170,250)'} />
      {/*  聊天内容*/}
      <div className={Style.chat}>
        {/* 左边消息 */}
        <div className={Style.chatInfo}>
          <div className={Style.avatar}>
            <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
          </div>
          <div className={Style.content}>
            <span className={Style.text}>
              你好，有什么可以帮到你？你好，有什么可以帮到你？你好，有什么可以帮到你？你好，有什么可以帮到你？你好，有什么可以帮到你？你好，有什么可以帮到你？
              <span className={`${Style.icon} ${Style.leftIcon}`}></span>
            </span>
          </div>
        </div>
        {/*  右边消息 */}
        <div className={Style.chatInfo}>
          <div className={Style.content}>
            <span className={Style.text}>
              你好，有什么可以帮到你？你好，有什么可以帮到你？你好，有什么可以帮到你？你好，有什么可以帮到你？你好，有什么可以帮到你？你好，有什么可以帮到你？
              <span className={`${Style.icon} ${Style.rightIcon}`}></span>
            </span>
          </div>
          <div className={Style.avatar}>
            <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
          </div>
        </div>
      </div>

      {/* 底部输入框 */}
      <div className={Style.userInput}>
        <div className={Style.input}>
          <input type="text" />
        </div>
        <div className={Style.send}>
          发送
        </div>
      </div>
    </div >
  )
}

export default UserService
