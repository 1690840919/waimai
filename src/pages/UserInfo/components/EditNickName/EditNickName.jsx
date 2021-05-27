import react,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import Style from './EditNickName.module.scss'
import Button from '../../../../components/Button/Button'
import Field from '../../../../components/Field/Field'
import Toast from '../../../../components/Toast/Toast'
import { userEdit } from '../../../../api/user'
import { updateUserInfo } from '../../../../redux/actions'
import { setItem } from '../../../../utils/storage'
import ToastLoading from '../../../../components/ToastLoading/ToastLoading'
function EditNickName(props){
  const { userInfo, dispatch, closePopup } = props
  const [toastInfo, setToastInfo] = useState({})
  const [submitData, setSubmitData] = useState({})
  const [toastLoading,setToastLoading] = useState(false)

  // 初始化昵称
  useEffect(()=>{
    setSubmitData({nickName:userInfo.nickName})
  },[userInfo])

  // 点击修改昵称
  const handleNewNickName= async () => {
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
    const newData = { ...userInfo, nickName: submitData.nickName }
    dispatch(updateUserInfo({ data: newData }))
    setItem('lazy_waimai_userInfo', newData)
    setToastLoading(false)
    setToastInfo({
      text: data.message,
      date: new Date(),
      callBackFn:()=>{
        closePopup()
      }
    })
  }

  return(
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
        <Field inputValue={nickName => { setSubmitData({ nickName }) }}
        value={submitData.nickName} length={(submitData.nickName+"").length}
         title={'昵称'} max={8} tips={'请输入新的昵称'} />
      </div>
      <Button onClick={handleNewNickName}
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
)(EditNickName)
