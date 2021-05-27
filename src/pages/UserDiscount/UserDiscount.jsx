import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Style from './UserDiscount.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import AppTab from '../../components/AppTab/AppTab'
import { userDiscount } from '../../api/user'
import Discount from './components/Discount'
import { updateDiscountInfo } from '../../redux/actions'
function UserDiscount(props) {
  const { history, dispatch, discountInfo } = props
  const appTabData = ['全部', '红包', '卡券']
  const [current, setCurrent] = useState(0)
  const [discountData, setDiscountData] = useState()
  const [typeDiscount, setTypeDiscount] = useState()

  useEffect(() => {
    initDiscount()
  }, [])

  useEffect(() => {
    setDiscountData(discountInfo)
  }, [discountInfo])

  // 初始化红包卡券
  const initDiscount = async () => {
    const { data } = await userDiscount()
    if (data.code === 1000) {
      dispatch(updateDiscountInfo(data.data))
    }
  }

  // 切换红包卡券
  const changeTab = (index) => {
    setCurrent(index)
    if (index === 1) {
      const data = discountData.filter(obj => (obj.isPacket))
      setTypeDiscount(data)
    } else if (index === 2) {
      const data = discountData.filter(obj => (!obj.isPacket))
      setTypeDiscount(data)
    }
  }

  return (
    <div className={Style.userDiscount}>
      {/* 顶部标题 */}
      <AppBar fixed={true} handleLeft={() => { history.goBack() }}
        center={'红包卡券'} bgColor={'rgb(91,170,250)'} />
      {/* 选项卡 */}
      <AppTab sticky={true} top={'40px'}
        current={current} appTabData={appTabData} changeTab={changeTab} />
      {/* 所有 */}
      {
        current === 0 && discountData ?
          <div className={Style.allDiscount}>
            {
              discountData.length && discountData.map(obj => (
                <Discount key={obj.id} obj={obj} />
              ))
            }
          </div>
          : null
      }
      {
        current === 1 ?
          <div className={Style.redPacket}>
            {
              typeDiscount.length && typeDiscount.map(obj => (
                <Discount key={obj.id} obj={obj} />
              ))
            }
          </div>
          : null
      }
      {
        current === 2 ?
          <div className={Style.coupon}>
            {
              typeDiscount.length && typeDiscount.map(obj => (
                <Discount key={obj.id} obj={obj} />
              ))
            }
          </div>
          : null
      }
    </div>
  )
}

export default connect(
  ({ discountInfo }) => ({
    discountInfo
  }),
  (dispatch) => ({
    dispatch
  })
)(UserDiscount)
