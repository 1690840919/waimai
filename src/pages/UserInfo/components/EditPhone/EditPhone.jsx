import react, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Style from './EditPhone.module.scss'
import Button from '../../../../components/Button/Button'
import Field from '../../../../components/Field/Field'
import Toast from '../../../../components/Toast/Toast'
import ToastLoading from '../../../../components/ToastLoading/ToastLoading'
import { userEdit } from '../../../../api/user'
import { updateUserInfo } from '../../../../redux/actions'
import { setItem } from '../../../../utils/storage'

function EditPhone(props) {
  const { userInfo, dispatch,closePopup } = props
  const [toastInfo, setToastInfo] = useState({})
  const [submitData, setSubmitData] = useState({})
  const [toastLoading,setToastLoading] = useState(false)

  // 初始化手机号码
  useEffect(()=>{
    setSubmitData({phone:userInfo.phone})
  },[userInfo])

  // 点击修改手机号码
  const handleNewPhone = async () => {
    setToastLoading(true)
    const { data } = await userEdit(submitData)
    if (data.code !== 1000) {
      setToastLoading(false)
      setToastInfo({
        text: data.message,
        date: new Date(),
      })
      return
    }
    const newData = { ...userInfo, phone: submitData.phone }
    dispatch(updateUserInfo({ data: newData }))
    setItem('lazy_waimai_userInfo', newData)
    setToastInfo({
      text: data.message,
      date: new Date(),
      callBackFn:()=>{
        closePopup()
      }
    })
  }

  return (
    <div className={Style.edit}>
      {/* 消息加载 */}
      {
        toastLoading?
        <ToastLoading text={'修改中'} />
        :null
      }
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
      <div className={Style.editBox}>
        <Field inputValue={phone => { setSubmitData({ phone }) }}
          value={submitData.phone} length={(submitData.phone && submitData.phone.length) || 0}
          title={'手机号'} max={11} tips={'请输入新的手机号'} />
      </div>
      <Button
        onClick={handleNewPhone}
        height={'40px'} size={'14px'} radius={'10px'}
        bgColor={'rgb(91,170,250)'} color={'white'}
        text={'立即修改'} />
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
)(EditPhone)
