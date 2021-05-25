import react, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Style from './EditGender.module.scss'
import Button from '../../../../components/Button/Button'
import { userEdit } from '../../../../api/user'
import { updateUserInfo } from '../../../../redux/actions'
import { setItem } from '../../../../utils/storage'
import Toast from '../../../../components/Toast/Toast'
function EditGender(props) {
  const { userInfo, dispatch,closePopup } = props
  const [currentGender, setCurrentGender] = useState()
  const [toastInfo, setToastInfo] = useState({})

  // 初始化性别
  useEffect(() => {
    setCurrentGender(userInfo.gender)
  }, [userInfo])

  // 点击修改昵称
  const handleGender = async () => {
    const { data } = await userEdit({ gender: currentGender })
    if (data.code !== 1000) {
      setToastInfo({
        text: data.message,
        date: new Date(),
      })
      return
    }
    const newData = { ...userInfo, gender: currentGender }
    dispatch(updateUserInfo({ data: newData }))
    setItem('lazy_waimai_userInfo', newData)
    setToastInfo({
      text: data.message,
      date: new Date(),
      callBackFn: () => {
        closePopup()
      }
    })
  }

  return (
    <div className={Style.editGender}>
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
      <form>
        <label htmlFor="boy">
          <div className={Style.radio}>
            <div className={Style.title}>男</div>
            <input id='boy' name='gender' value="1" readOnly
              onChange={(e) => { setCurrentGender(e.target.value * 1) }}
              type="radio" checked={currentGender === 1} />
          </div>
        </label>
        <label htmlFor="girl">
          <div className={Style.radio}>
            <div className={Style.title}>女</div>
            <input id='girl' name='gender' value="2" readOnly
              onChange={(e) => { setCurrentGender(e.target.value * 1) }}
              type="radio" checked={currentGender === 2} />
          </div>
        </label>
        <label htmlFor="secret">
          <div className={Style.radio}>
            <div className={Style.title}>保密</div>
            <input id='secret' name='gender' value="3" readOnly
              onChange={(e) => { setCurrentGender(e.target.value * 1) }}
              type="radio" checked={currentGender === 3} />
          </div>
        </label>
      </form>
      <Button
        onClick={handleGender}
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
)(EditGender)
