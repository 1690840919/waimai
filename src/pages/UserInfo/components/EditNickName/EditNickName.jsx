import react from 'react'
import Style from './EditNickName.module.scss'
import Button from '../../../../components/Button/Button'
import Field from '../../../../components/Field/Field'

function EditNickName(props){
  return(
    <div className={Style.edit}>
      <div className={Style.editBox}>
        <Field title={'昵称'} max={8} tips={'请输入新的昵称'} />
      </div>
      <Button
        height={'40px'} size={'14px'} radius={'10px'}
        bgColor={'rgb(91,170,250)'} color={'white'}
        text={'立即修改'} />
    </div>
  )
}
export default EditNickName
