import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import Style from './OrderSure.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import Toast from '../../components/Toast/Toast'
import { updateCart, updateUserInfo, updateOrderInfo } from '../../redux/actions'
import { userOrderCreate, userAddress } from '../../api/user'
import ToastLoading from '../../components/ToastLoading/ToastLoading'
import { setItem } from '../../utils/storage'
import Popup from '../../components/Popup/Popup'
import EditTicket from './components/EditSelect/EditSelect'
import EditTip from './components/EditTip/EditTip'
import { getTime } from '../../utils/time'

function OrderSure(props) {
  const {
    updateReduxOrderInfo,
    history, dispatch, cartInfo, match, userInfo, orderInfo
  } = props
  const [toastInfo, setToastInfo] = useState({})
  const [totalMoney, setTotalMoney] = useState(0)
  const PopupRef = useRef()
  const shopId = match.params.id.replace(':', '')
  const [popupContent, setPopupContent] = useState()
  const [address, setAddress] = useState()
  const [toastLoading, setToastLoading] = useState({ is: false })
  const [submitData, setSubmitData] = useState({
    address: '',
    addressId: '',
    shopId,
    payMethod: "钱包",
    food: {},
    tip: "",
    tools: "1份",
    isTicket: 0,
    discount: 0,
    deliverTime: "",
    packMoney: 0,
    discountId: "",
  })

  useEffect(() => {
    const keyArr = Object.keys(orderInfo)
    if (!keyArr.length) {
      updateReduxOrderInfo(submitData)
    }
    initData()
  }, [])

  useEffect(() => {
    setSubmitData({ ...submitData, ...orderInfo })
    setAddress(orderInfo.address)
  }, [orderInfo])

  // 更新redux订单
  const getOrderInfo = (obj) => {
    let newData = { ...orderInfo, ...obj }
    return newData
  }

  useEffect(() => {
    const params = history.location.params
    if (params && params.address) {
      const address = params.address
      updateReduxOrderInfo(getOrderInfo({ address, addressId: address.id }))
    }
    if (params && params.discount && params.discountId) {
      const discount = params.discount
      const discountId = params.discountId
      updateReduxOrderInfo(getOrderInfo({ discount, discountId }))
    }
  }, [history])

  // 初始化数据
  const initData = async () => {
    const params = history.location.params
    if ((params && params.address) || (params && params.discount)) {
      setAddress(params.address)
    } else {
      const { data } = await userAddress()
      const obj = data.data.find(obj => obj.isDefault)
      if (obj) {
        updateReduxOrderInfo(getOrderInfo({ address: obj }))
      }
    }
  }

  // 切换popup弹出层
  const changePopup = value => {
    PopupRef.current.setShowContent(value)
  }

  // 点击地址
  const handleAddress = () => {
    history.push({
      pathname: '/userAddress',
      params: {
        orderSure: true,
        id: shopId,
      }
    })
  }

  // 点击红包
  const handlePacket = () => {
    history.push({
      pathname: '/userDiscount',
      params: {
        orderSure: true,
        id: shopId,
      }
    })
  }

  // 点击发票
  const handleTicket = () => {
    changePopup(true)
    setPopupContent(<EditTicket
      value={submitData.isTicket}
      data={
        [
          {
            title: '是',
            value: 1
          },
          {
            title: '否',
            value: 0
          },
        ]
      }
      update={isTicket => {
        updateReduxOrderInfo(getOrderInfo({ isTicket: isTicket * 1 }))
      }}
      closePopup={() => { changePopup(false) }} />)
  }

  // 点击餐具
  const handleTool = () => {
    changePopup(true)
    setPopupContent(<EditTicket
      value={submitData.tools}
      data={
        [
          {
            title: '1份',
            value: '1份'
          },
          {
            title: '2份',
            value: '2份'
          },
          {
            title: '3份',
            value: '3份'
          },
          {
            title: '按量',
            value: '按量'
          },
        ]
      }
      update={tools => {
        updateReduxOrderInfo(getOrderInfo({ tools }))
      }}
      closePopup={() => { changePopup(false) }} />)
  }

  // 点击支付方式
  const handlePayMethod = () => {
    changePopup(true)
    setPopupContent(<EditTicket
      value={submitData.payMethod}
      data={
        [
          {
            title: '支付宝',
            value: '支付宝',
            icon: '&#xe627;',
            iconColor: 'rgb(2,169,241)',
          },
          {
            title: '微信',
            value: '微信',
            icon: '&#xe689;',
            iconColor: 'rgb(9,187,7)',
          },
          {
            title: '钱包',
            value: '钱包',
            icon: '&#xe6d4;',
            iconColor: 'rgb(254,106,0)',
          },
        ]
      }
      update={payMethod => {
        updateReduxOrderInfo(getOrderInfo({ payMethod }))
      }}
      closePopup={() => { changePopup(false) }} />)
  }

  // 点击备注
  const handleTip = () => {
    changePopup(true)
    setPopupContent(<EditTip
      value={submitData.tip}
      update={tip => {
        updateReduxOrderInfo(getOrderInfo({ tip }))
      }}
      closePopup={() => { changePopup(false) }} />)
  }

  // 点击确认订单
  const sureOrder = async () => {
    setToastLoading({ is: true, text: '下单中' })
    const { data } = await userOrderCreate(submitData)
    setToastLoading({ is: false })
    if (data.code !== 1000) {
      setToastInfo({
        text: data.message,
        date: new Date(),
      })
      return
    }
    const newData = { ...userInfo, money: data.data.money.toFixed(2) }
    dispatch(updateUserInfo({ data: newData }))
    setItem('lazy_waimai_userInfo', newData)
    dispatch(updateCart({}))
    setToastInfo({
      text: '下单成功',
      icon: '&#xe687;',
      date: new Date(),
      callBackFn: () => {
        history.replace('/order')
      }
    })
  }

  useEffect(() => {
    let num = 0
    let food = {}
    const foodArr = (cartInfo[shopId] && cartInfo[shopId].food) || []
    if (foodArr.length) {
      foodArr.forEach(obj => {
        num += obj.num * obj.foodPrice
      })
      num += cartInfo[shopId].shopInfo.deliver
      num += foodArr.length * 0.5
      num -= orderInfo.discount * 1 || 0
      setTotalMoney(num)
    }
    if (foodArr && foodArr.length) {
      foodArr.forEach(obj => {
        food[obj.id] = obj.num
      })
    }
    setSubmitData(pre => {
      const data = { ...pre }
      data.food = JSON.stringify(food)
      data.packMoney = foodArr.length * 0.5
      return data
    })
  }, [cartInfo, shopId])

  return (
    <div className={Style.orderSure}>
      {/* 消息加载 */}
      {
        toastLoading.is ?
          <ToastLoading text={toastLoading.text} />
          : null
      }
      {/* 顶部标题 */}
      <AppBar fixed={true} bgColor={'rgb(91,170,250)'} color={'white'}
        center={'订单确认'} handleLeft={() => { history.goBack() }} />
      {/* 订单信息 */}
      <div className={Style.orderInfoBox}>
        <div className={Style.orderInfo}>
          {/* 地址信息 */}
          {
            address ?
              <div className={Style.addressInfo} onClick={handleAddress}>
                <p className={Style.text}>{address.address + address.detail}</p>
                <p>
                  <span className={Style.name}>{address.name}</span>
                  <span className={Style.phone}>{address.phone}</span>
                </p>
              </div>
              :
              <div className={Style.addressInfo}>
                <div className={Style.defaultNull}>
                  加载中
                </div>
              </div>
          }
          {/* 配送 */}
          <AppBar
            padding={0} leftSize={'13px'} rightIconSize={'13px'}
            leftIcon={null} paddingLeft={0} rightSize={'13px'}
            left={'立即送出'} bgColor={'white'}
            right={`预计${getTime((new Date()).getTime() + 3600000, 'hh:mm:ss')}送达`}
            paddingRight={'20px'}
            color={'#333'} rightIcon={'&#xe695;'} />
          {/* 配送 */}
          <AppBar
            onClick={handlePayMethod}
            padding={0} leftSize={'13px'} rightIconSize={'13px'}
            leftIcon={null} paddingLeft={0} right={submitData.payMethod} rightSize={'13px'}
            left={'支付方式'} bgColor={'white'} paddingRight={'20px'}
            color={'#333'} rightIcon={'&#xe695;'} />
        </div>
      </div>
      {/* 商品信息 */}
      <div className={Style.foodInfo}>
        {
          cartInfo[shopId] ?
            <div>
              <p className={Style.shopName}>{cartInfo[shopId].shopInfo.shopname}</p>
              {
                cartInfo[shopId].food.map(obj => (
                  <div key={obj.id} className={Style.food}>
                    <div className={Style.foodImg}>
                      <img src={obj.foodImg} alt="" />
                    </div>
                    <div className={Style.foodOthers}>
                      <div className={Style.foodName}>
                        {obj.foodName}
                      </div>
                      <div className={Style.foodPrice}>
                        <p className={Style.price}>
                          <span>￥</span>
                          <span className={Style.num}>{(obj.foodPrice * obj.num).toFixed(2)}</span>
                        </p>
                        <p className={Style.foodNum}>X{obj.num}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            : null
        }
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0}
          right={`￥${submitData.packMoney || 0}`}
          rightSize={'15px'}
          left={'包装费'} bgColor={'white'} paddingRight={'5px'}
          color={'#333'} />
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0}
          right={`￥${(cartInfo[shopId] && cartInfo[shopId].shopInfo && cartInfo[shopId].shopInfo.deliver) || 0} `}
          rightSize={'15px'}
          left={'配送费'} bgColor={'white'} paddingRight={'5px'}
          color={'#333'} />
        <AppBar
          padding={0} leftSize={'13px'} onClick={handlePacket}
          leftIcon={null} paddingLeft={0} rightSize={submitData.discount ? '15px' : '12px'}
          right={submitData.discount ? "-￥" + submitData.discount : '未选择红包'}
          left={'红包 / 抵用券'} bgColor={'white'} paddingRight={'5px'}
          color={'#333'} />
      </div>
      {/* 额外信息 */}
      <div className={Style.orderOtherInfo}>
        <AppBar
          padding={0} leftSize={'13px'} onClick={handleTip}
          leftIcon={null} paddingLeft={0} right={submitData.tip || '无'} rightSize={'13px'}
          left={'备注'} bgColor={'white'} paddingRight={'23px'} rightIcon={'&#xe695;'}
          color={'#333'} />
        <AppBar
          padding={0} leftSize={'13px'} onClick={handleTool}
          leftIcon={null} paddingLeft={0} right={submitData.tools} rightSize={'13px'}
          left={'餐具份数'} bgColor={'white'} paddingRight={'23px'} rightIcon={'&#xe695;'}
          color={'#333'} />
        <AppBar
          padding={0} leftSize={'13px'} onClick={handleTicket}
          leftIcon={null} paddingLeft={0} right={`${submitData.isTicket ? '是' : '否'}`}
          rightSize={'13px'}
          left={'发票'} bgColor={'white'} paddingRight={'23px'} rightIcon={'&#xe695;'}
          color={'#333'} />
      </div>
      {/* 底部结算菜单 */}
      <div className={Style.bottomMenu}>
        <div className={Style.menuInfo}>
          <p>
            <span className={Style.totalTitle}>合计：</span>
            <span className={Style.moneyIcon}>￥</span>
            <span className={Style.payMoney}>{totalMoney.toFixed(2)}</span>
          </p>
          <p className={Style.tip}>已经优惠￥9.9</p>
        </div>
        <div onClick={sureOrder} className={Style.sureBtn}>提交订单</div>
      </div>
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn}
        text={toastInfo.text} isShow={toastInfo.date} icon={toastInfo.icon} />
      {/* 弹出层 */}
      <Popup PopupRef={PopupRef} content={popupContent} ></Popup>
    </div>
  )
}

export default connect(
  ({ cartInfo, userInfo, orderInfo }) => ({
    cartInfo, userInfo, orderInfo
  }),
  (dispatch) => ({
    dispatch,
    updateReduxOrderInfo: value => { dispatch(updateOrderInfo(value)) }
  })
)(OrderSure)
