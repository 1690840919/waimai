import react,{useState} from 'react'
import Style from './EditPhone.module.scss'
import Button from '../../../../components/Button/Button'
import Field from '../../../../components/Field/Field'
import Toast from '../../../../components/Toast/Toast'

function EditPhone(props){
  const [toastInfo, setToastInfo] = useState({})
  const handleNewPhone = () => {
    setToastInfo({
      text: '修改成功',
      date: new Date(),
    })
  }
  return(
    <div className={Style.edit}>
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
      <div className={Style.editBox}>
        <Field title={'手机号'} max={11} tips={'请输入新的手机号'} />
      </div>
      <Button
        onClick={handleNewPhone}
        height={'40px'} size={'14px'} radius={'10px'}
        bgColor={'rgb(91,170,250)'} color={'white'}
        text={'立即修改'} />
    </div>
  )
}
export default EditPhone
