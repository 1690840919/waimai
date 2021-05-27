import react, { useState } from 'react'
import { connect } from 'react-redux'
import Style from './RefillMoney.module.scss'
import Button from '../../../../components/Button/Button'
import { userEdit } from '../../../../api/user'
import { updateUserInfo } from '../../../../redux/actions'
import { setItem } from '../../../../utils/storage'
import Toast from '../../../../components/Toast/Toast'

function RefillMoney(props) {
  const refillMenus = [30, 50, 100, 200, 300, 500]
  const { dispatch, userInfo, showPopup,update } = props
  const [money, setMoney] = useState()
  const [toastInfo, setToastInfo] = useState({})

  // 点击充值
  const handleRefill = async () => {
    const { data } = await userEdit({
      addMoney: money * 1,
      money: money * 1 + userInfo.money * 1
    })
    if (data.code !== 1000) {
      setToastInfo({
        text: data.message,
        date: new Date(),
        icon: '&#xe687;',
      })
      return
    }
    const newData = { ...userInfo, money: money * 1 + userInfo.money * 1 }
    dispatch(updateUserInfo({ data: newData }))
    setItem('lazy_waimai_userInfo', newData)
    setToastInfo({
      text: '充值成功',
      date: new Date(),
      callBackFn: () => {
        showPopup(false)
        update()
      }
    })
  }

  return (
    <div className={Style.refillMoney}>
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
      {/* 金额数字 */}
      <div className={Style.money}>
        <div className={Style.title}>金额：</div>
        <div className={Style.num}>
          <input onFocus={() => { setMoney("") }}
            type="number" value={money || ""}
            onChange={e => { setMoney(e.target.value) }} />
        </div>
      </div>
      {/* 金额选项 */}
      <div className={Style.menus}>
        {
          refillMenus.map(n => (
            <div onClick={() => { setMoney(n) }}
              key={n} className={Style.num}>{n}</div>
          ))
        }
      </div>
      <Button onClick={handleRefill}
        height={'40px'} size={'14px'} radius={'10px'}
        bgColor={'rgb(91,170,250)'} color={'white'}
        text={'立即充值'} />
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
)(RefillMoney)
