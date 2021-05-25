import react, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import Style from './EditAvatar.module.scss'
import Toast from '../../../../components/Toast/Toast'
function EditAvatar(props) {
  const { closeEditAvatar } = props
  const inputRef = useRef()
  const [toastInfo, setToastInfo] = useState({})
  const [avatarUrl, setAvatarUrl] = useState()

  useEffect(() => {
    inputRef.current.click()
  },[])

  // 获取图片数据
  const getAvatarData = (e) => {
    const file = inputRef.current.files[0]
    if (file) {
      const type = file.name.split('.')[1]
      if (!['jpg', 'png', 'jpeg'].includes(type)) {
        setToastInfo({
          text: '图片格式不正确',
          date: new Date(),
          callBackFn: () => {
            closeEditAvatar()
          }
        })
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        setToastInfo({
          text: '图片超过2M',
          date: new Date(),
          callBackFn: () => {
            closeEditAvatar()
          }
        })
        return
      }
      // 转换为base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const url = e.target.result
        setAvatarUrl(url)
      }
    }
  }

  return (
    <div className={Style.editAvatar}>
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
      {/* 图片上传 */}
      <div className={Style.inputValue}>
        <input onChange={(e) => { getAvatarData(e) }} ref={inputRef} type="file" />
      </div>
      {
        avatarUrl ?
          <div onClick={closeEditAvatar} className={Style.avatarEditBox}>
            <div className={Style.img}>
              <img src={avatarUrl} alt="" />
            </div>
          </div>
          : null
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
)(EditAvatar)
