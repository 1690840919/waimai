import react, { createRef, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import Style from './EditAvatar.module.scss'
import Toast from '../../../../components/Toast/Toast'
import { userEdit } from '../../../../api/user'
import { updateUserInfo } from '../../../../redux/actions'
import { setItem } from '../../../../utils/storage'
import { getBase64, getFile } from '../../../../utils/fileAndBase64'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
function EditAvatar(props) {
  const { closeEditAvatar, dispatch, userInfo } = props
  const inputRef = useRef()
  const [toastInfo, setToastInfo] = useState({})
  const [avatarUrl, setAvatarUrl] = useState()
  const [cropperRef, setCropperRef] = useState()

  useEffect(() => {
    inputRef.current.click()
  }, [])

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
      getBase64(file, (url) => {
        setAvatarUrl(url)
      })
    }
  }

  // 点击确认裁剪
  const handleAvatar = () => {
    const avatar = cropperRef.getCroppedCanvas().toDataURL() + ""
    const file = getFile(avatar,'dd')
    console.log(file)
    const newData = { ...userInfo, avatar }
    dispatch(updateUserInfo({ data: newData }))
    setItem('lazy_waimai_userInfo', newData)
    closeEditAvatar()
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
          <div className={Style.avatarEditBox}>
            <div className={Style.tools}>
              <div onClick={closeEditAvatar}>取消</div>
              <div onClick={handleAvatar}>确认</div>
            </div>
            <Cropper
              onInitialized={cropper => {
                setCropperRef(cropper)
              }}
              src={avatarUrl} // 图片的base64
              background={false} // 背景马赛克
              style={{ width: '100%' }}
              guides={false}
            />
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
