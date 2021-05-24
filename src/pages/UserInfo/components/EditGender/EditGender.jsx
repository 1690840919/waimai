import react from 'react'
import Style from './EditGender.module.scss'
import Button from '../../../../components/Button/Button'
function EditGender(props) {
  return (
    <div className={Style.editGender}>
      <form>
        <label htmlFor="boy">
          <div className={Style.radio}>
            <div className={Style.title}>男</div>
            <input id='boy' name='gender' value="1" type="radio" />
          </div>
        </label>
        <label htmlFor="girl">
          <div className={Style.radio}>
            <div className={Style.title}>女</div>
            <input id='girl' name='gender' value="2" type="radio" />
          </div>
        </label>
      </form>
      <Button
        height={'40px'} size={'14px'} radius={'10px'}
        bgColor={'rgb(91,170,250)'} color={'white'}
        text={'立即修改'} />
    </div>
  )
}

export default EditGender
