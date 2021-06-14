import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import Style from './UserWallet.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import Toast from '../../components/Toast/Toast'
import { userEdit, userBill } from '../../api/user'
import { updateBillInfo, updateUserInfo } from '../../redux/actions'
import { setItem } from '../../utils/storage'
import Popup from '../../components/Popup/Popup'
import RefillMoney from './components/RefillMoney/RefillMoney'
import { getTime } from '../../utils/time'
import Loading from '../../components/Loading/Loading'
import formatMoney from '../../utils/formatMoney'
import DataNull from '../../components/DataNull/DataNull'
function UserWallet(props) {
  const { history, dispatch, userInfo, billInfo } = props
  const [toastInfo, setToastInfo] = useState({})
  const [popupContent, setPopupContent] = useState()
  const [billData, setBillData] = useState([])
  const [showNull, setShowNull] = useState(false)
  const [loading, setLoading] = useState(true)
  const PopupRef = useRef()

  useEffect(() => {
    initBillData()
  }, [])

  // 更新账单信息
  useEffect(() => {
    setBillData(billInfo)
    if (billInfo.length) {
      setShowNull(false)
    }
  }, [billInfo])

  // 初始化账单数据
  const initBillData = async () => {
    const { data } = await userBill({ num: 4 })
    if (data.code === 1000) {
      if (!data.data.length) {
        setShowNull(true)
        setLoading(false)
        return
      }
      dispatch(updateBillInfo(data.data))
    } else {
      setShowNull(true)
      setLoading(false)
    }

  }

  // 切换popup弹出层
  const showPopup = value => {
    PopupRef.current.setShowContent(value)
  }

  // 切换显示余额
  const changeShowMoney = async () => {
    const newData = { ...userInfo, showMoney: !userInfo.showMoney }
    dispatch(updateUserInfo({ data: newData }))
    setItem('lazy_waimai_userInfo', newData)
    const { data: { code } } = await userEdit({ showMoney: !userInfo.showMoney })
    if (code !== 1000) {
      const newData = { ...userInfo, showMoney: !userInfo.showMoney }
      dispatch(updateUserInfo({ data: newData }))
      setItem('lazy_waimai_userInfo', newData)
      return
    }
  }

  // 点击立即充值
  const handleRefill = () => {
    showPopup(true)
    setPopupContent(<RefillMoney update={initBillData} showPopup={showPopup} />)
  }

  return (
    <div className={Style.userWallet}>
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />

      {/* 弹出层 */}
      <Popup PopupRef={PopupRef} content={popupContent} ></Popup>

      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'我的钱包'} bgColor={'rgb(91,170,250)'} />

      {/* 我的钱包 */}
      <div className={Style.wallet}>
        <div className={Style.title}>
          <div className={Style.left}>总余额（元）</div>
          <div className={`iconfont ${Style.right}`} onClick={changeShowMoney}
            dangerouslySetInnerHTML={{ __html: userInfo.showMoney ? '&#xe62e;' : '&#xe901;' }}
          ></div>
        </div>
        <div className={Style.price}>
          <div className={Style.num}>{!userInfo.showMoney ? '*****' : formatMoney(userInfo.money) || '0.00'}</div>
          <div className={Style.btn} onClick={handleRefill}>立即充值</div>
        </div>
      </div>
      {/* 账号 */}
      <div className={Style.bills}>
        <AppBar paddingRight={0} paddingLeft={0} left={'我的账单'} color={'#333'} rightColor={'#969799'}
          right={'更多'} leftIcon={null} size={'14px'}
          handleRight={() => { history.push('/userBill') }} />
        {/* 账单 */}
        <div className={Style.content}>
          {
            !billData.length ?
              <Loading tip={false} loading={loading} /> :
              <div>
                {
                  billData.map(obj => (
                    <div key={obj.id} className={Style.bill}>
                      <div className={Style.avatar}>
                        <span className="iconfont"
                          dangerouslySetInnerHTML={{ __html: obj.isSpend ? '&#xe63c;' : '&#xe6d4;' }}
                        ></span>
                      </div>
                      <div className={Style.info}>
                        <p className={Style.title}>{obj.title}</p>
                        <p className={Style.time}>{getTime(obj.time, 'YY-MM-DD hh:mm:ss')}</p>
                      </div>
                      <div className={Style.right}>
                        <p>{obj.isSpend ? "-" + formatMoney(obj.num) : "+" + formatMoney(obj.num)}</p>
                        <p>余额：{formatMoney(obj.money)}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
          }
          {
            showNull ?
              <DataNull/>
              : null
          }

        </div>
      </div>
    </div>
  )
}

export default connect(
  ({ userInfo, billInfo }) => ({
    userInfo,
    billInfo,
  }),
  (dispatch) => ({
    dispatch
  })
)(UserWallet)
