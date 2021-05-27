import react, { createRef, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import Style from './EditAvatar.module.scss'
import Toast from '../../../../components/Toast/Toast'
import { userEdit } from '../../../../api/user'
import { uploadImg } from '../../../../api/utils'
import { updateUserInfo } from '../../../../redux/actions'
import { setItem } from '../../../../utils/storage'
import { getBase64, getFile } from '../../../../utils/fileAndBase64'
import ToastLoading from '../../../../components/ToastLoading/ToastLoading'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
function EditAvatar(props) {
  const { closeEditAvatar, dispatch, userInfo, closePopup } = props
  const inputRef = useRef()
  const [bigImg, setBigImg] = useState(false)
  const [toastInfo, setToastInfo] = useState({})
  const [avatarUrl, setAvatarUrl] = useState()
  const [cropperRef, setCropperRef] = useState()
  const [toastLoading,setToastLoading] = useState({is:false})

  // 获取图片数据
  const getAvatarData = (e) => {
    setToastLoading({is:false,text:'加载中'})
    const file = inputRef.current.files[0]
    if (file) {
      const type = file.name.split('.')[1]
      if (!['jpg', 'png', 'jpeg'].includes(type)) {
        setToastInfo({
          text: '图片格式不正确',
          date: new Date(),
        })
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        setToastInfo({
          text: '图片超过2M',
          date: new Date(),
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
  const handleAvatar = async () => {
    setToastLoading({is:true,text:'修改中'})
    const avatar = cropperRef.getCroppedCanvas().toDataURL() + ""
    const file = await getFile(avatar, userInfo.nickName + '.jpg')
    const fileData = new FormData()
    fileData.append('file', file)
    const { data: uploadResult } = await uploadImg(fileData)
    if (uploadResult.code !== 1000) {
      setToastLoading({is:false,text:'修改中'})
      setToastInfo({
        text: uploadResult.message,
        date: new Date(),
        callBackFn:()=>{
          setAvatarUrl('')
        }
      })
      return
    }
    const url = uploadResult.data.url
    const { data: { code, message } } = await userEdit({ avatar: url })
    if (code !== 1000) {
      setToastLoading({is:false,text:'修改中'})
      setToastInfo({
        text: message,
        date: new Date(),
      })
      return
    }
    const newData = { ...userInfo, avatar }
    dispatch(updateUserInfo({ data: newData }))
    setItem('lazy_waimai_userInfo', newData)
    setToastLoading({is:false,text:'修改中'})
    setToastInfo({
      text: message,
      date: new Date(),
      callBackFn:()=>{
        closePopup()
      }
    })
    
  }

  return (
    <div className={Style.editAvatar}>
      {/* 消息加载 */}
      {
        toastLoading.is?
        <ToastLoading text={toastLoading.text} />
        :null
      }
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
      {/* 查看大图 */}
      <div className={Style.menuBox} onClick={() => { setBigImg(true) }}>
        查看大图
      </div>
      <div className={Style.menuBox} onClick={() => { inputRef.current.click() }}>
        修改头像
      </div>
      <div className={Style.menuBox} onClick={() => { closePopup() }}>
        取消
      </div>
      {/* 图片上传 */}
      <div className={Style.inputValue}>
        <input onChange={(e) => { getAvatarData(e) }} ref={inputRef} type="file" />
      </div>
      {/* 头像更改 */}
      {
        avatarUrl ?
          <div className={Style.avatarEditBox}>
            <div className={Style.tools}>
              <div onClick={() => { setAvatarUrl('') }}>取消</div>
              <div onClick={handleAvatar}>确认</div>
            </div>
            <Cropper
              onInitialized={cropper => {
                setCropperRef(cropper)
              }}
              src={avatarUrl} // 图片的base64
              background={false} // 背景马赛克
              aspectRatio={1 / 1} // 截取图片的比例
              style={{ width: '100%' }}
              guides={false}
            />
          </div>
          : null
      }
      {/* 查看图像 */}
      {
        bigImg ?
          <div className={Style.avatarEditBox}>
            <div className={`${Style.center} ${Style.tools}`}>
              <div onClick={() => {
                setBigImg(false)
              }}>确认</div>
            </div>
            <div className={Style.bigImg}>
              <img src={userInfo.avatar} alt="" />
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
