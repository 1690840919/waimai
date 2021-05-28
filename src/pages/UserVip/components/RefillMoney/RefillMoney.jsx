import react, { useState } from 'react'
import { connect } from 'react-redux'
import Style from './RefillMoney.module.scss'
import Button from '../../../../components/Button/Button'
import Toast from '../../../../components/Toast/Toast'
import ToastLoading from '../../../../components/ToastLoading/ToastLoading'
import { updateUserInfo } from '../../../../redux/actions'
import { setItem } from '../../../../utils/storage'
import { getTime } from '../../../../utils/time'
import { userVip } from '../../../../api/user'
function RefillMoney(props) {
  const refillMenuData = [
    {
      title: '1个月',
      month: 1,
      money: '10',
    },
    {
      title: '3个月',
      month: 3,
      money: '28',
    },
    {
      title: '12个月',
      month: 12,
      money: '99',
    },
  ]
  const [toastInfo, setToastInfo] = useState({})
  const [toastLoading, setToastLoading] = useState(false)
  const [refillIndex, setRefillIndex] = useState(0)
  const { userInfo, dispatch, showPopup } = props

  // 点击充值
  const handleRefill = async () => { 
    setToastLoading(true)
    const reqData = refillMenuData[refillIndex]
    const { data } = await userVip(reqData)
    if (data.code !== 1000) {
      setToastLoading(false)
      setToastInfo({
        text: data.message,
        date: new Date(),
        callBackFn: () => {
          showPopup(false)
        }
      })
      return
    }
    const newData = {
      ...userInfo, isVip: true, 
      vipTime: data.data.newVipTime,
      money:data.data.newMoney,
    }
    dispatch(updateUserInfo({ data: newData }))
    setItem('lazy_waimai_userInfo', newData)
    setToastLoading(false)
    setToastInfo({
      text: '充值成功',
      date: new Date(),
      callBackFn: () => {
        showPopup(false)
      }
    })
  }

  return (
    <div className={Style.refillMoney}>
      {/* 消息加载 */}
      {
        toastLoading ?
          <ToastLoading text={'充值中'} />
          : null
      }
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
      {/* 标题 */}
      <div className={Style.menuTitle}>
        请选择您的套餐
      </div>
      {/* 套餐 */}
      <div className={Style.menus}>
        {
          refillMenuData.map((obj, index) => (
            <div
              key={obj.money}
              style={{
                borderColor: index === refillIndex ? 'orange' : "",
                color: index === refillIndex ? 'orange' : ""
              }}
              onClick={() => { setRefillIndex(index) }}
              className={Style.menu}>
              <div>
                <div className={Style.title}>{obj.title}</div>
                <div
                  style={{ color: index === refillIndex ? 'orange' : "" }}
                  className={Style.money}>
                  <span className={Style.icon}>￥</span>
                  <span className={Style.num}>{obj.money}</span>
                </div>
              </div>
            </div>
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
