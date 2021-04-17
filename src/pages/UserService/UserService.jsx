import React, { useEffect, useRef, useState } from 'react'
import Style from './UserService.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import debounce from '../../utils/debounce'
import { getItem, setItem } from '../../utils/storage'
import { CHATCONTENT } from '../../utils/enums'
import Toast from '../../components/Toast/Toast'
function UserService(props) {

  const { history } = props
  // 获取dom
  const chatBottomRef = useRef(null)

  // 聊天框里面的值
  const [userValue, setUserValue] = useState('')

  // 提示框是否显示
  // const [toastObj, setToastObj] = useState({ text: null, isShow: false })
  const [toastObj, setToastObj] = useState(false)

  // 聊天内容
  const [chatContent, setChatContent] = useState(getItem(CHATCONTENT) || [
    { id: 6000, type: 'service', text: '您好，有什么可以帮到您的？' }
  ])

  // 输入框值变化
  const changeValue = (value) => {
    setUserValue(value)
  }
  // 点击发送信息
  const handleSend = async () => {
    if (userValue.trim()) {
      await setChatContent(pre => {
        return [
          ...pre,
          {
            id: pre[pre.length - 1].id + 1,
            type: 'user',
            text: userValue
          }
        ]
      })
      chatToBottom()
      serviceReply()
      setUserValue('')
    } else {
      setToastObj({
        text: '内容不能为空',
        isShow: new Date(),
      })
    }
  }
  // 客服回复信息
  const serviceReply = () => {
    const timer = setTimeout(() => {
      setChatContent(pre => {
        return [
          ...pre,
          {
            id: pre[pre.length - 1].id + 1,
            type: 'service',
            text: '您好，请稍等，正在连接人工服务···'
          }
        ]
      })
      chatToBottom()
      clearTimeout(timer)
    }, 1000);
  }

  // 聊天框拉到底部
  const chatToBottom = () => {
    chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  // 进入页面把聊天框拉到最低
  useEffect(() => {
    chatToBottom()
  }, [])

  // 聊天记录变化后保存
  useEffect(() => {
    setItem(CHATCONTENT, chatContent)
  }, [chatContent])

  return (
    <div className={Style.userService}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'我的客服'} bgColor={'rgb(91,170,250)'} fixed={true} />
      {/*  聊天内容*/}
      <div className={Style.chatContent}>
        {
          chatContent.map(obj => {
            return <div className={Style.chat} key={obj.id}>
              {
                obj.type === 'service' ?
                  // 客服
                  <div className={Style.chatInfo}>
                    <div className={Style.avatar}>
                      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
                    </div>
                    <div className={Style.content}>
                      <span className={Style.text}>
                        {obj.text}
                        <span className={`${Style.icon} ${Style.leftIcon}`}></span>
                      </span>
                    </div>
                  </div>
                  // 用户
                  : <div className={Style.chatInfo}>
                    <div className={Style.content}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <span className={Style.text}>
                          {obj.text}
                          <span className={`${Style.icon} ${Style.rightIcon}`}></span>
                        </span>
                      </div>
                    </div>
                    <div className={Style.avatar}>
                      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
                    </div>
                  </div>
              }
            </div>
          })
        }
        <div ref={chatBottomRef}></div>
      </div>
      {/* 底部输入框 */}
      <div className={Style.userInput}>
        {/* <div className={Style.input}>
          <input value={userValue} type="text" onChange={debounce(function (e) {
            changeValue(e.target.value)
          })} />
        </div> */}
        <div className={Style.input}>
          <input value={userValue} type="text" onChange={(e) =>
            changeValue(e.target.value)
          } />
        </div>
        <div className={Style.send} onClick={handleSend}>
          发送
        </div>
      </div>
      {/* 轻提示 */}
      <Toast isShow={toastObj.isShow} text={toastObj.text} icon={toastObj.icon} />
    </div >
  )
}

export default UserService
