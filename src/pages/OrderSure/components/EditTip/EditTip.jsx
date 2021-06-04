import react, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Style from './EditTip.module.scss'
import Button from '../../../../components/Button/Button'
import Field from '../../../../components/Field/Field'
import Toast from '../../../../components/Toast/Toast'
function EditNickName(props) {
  const { value, closePopup,update } = props
  const [submitData, setSubmitData] = useState({})

  // 初始化昵称
  useEffect(() => {
    setSubmitData({ nickName: value })
  }, [value])

  // 点击修改昵称
  const handleNewTip = async () => {
    update(submitData.nickName)
    closePopup()
  }

  return (
    <div className={Style.edit}>
      <div className={Style.editBox}>
        <Field inputValue={nickName => { setSubmitData({ nickName }) }}
          value={submitData.nickName} length={(submitData.nickName + "").length}
          title={'备注'} tips={'请输入备注内容'} />
      </div>
      <Button onClick={handleNewTip}
        height={'40px'} size={'14px'} radius={'10px'}
        bgColor={'rgb(91,170,250)'} color={'white'}
        text={'确认'} />
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
