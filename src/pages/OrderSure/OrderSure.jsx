import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Style from './OrderSure.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import Toast from '../../components/Toast/Toast'
import { updateCart, updateUserInfo } from '../../redux/actions'
import { userOrderCreate } from '../../api/user'
import ToastLoading from '../../components/ToastLoading/ToastLoading'
import { setItem } from '../../utils/storage'

function OrderSure(props) {
  const { history, dispatch, cartInfo, match, userInfo } = props
  const [toastInfo, setToastInfo] = useState({})
  const [totalMoney, setTotalMoney] = useState(0)
  const shopId = match.params.id.replace(':', '')
  const [toastLoading, setToastLoading] = useState({ is: false })
  const [submitData, setSubmitData] = useState({
    addressId: '',
    shopId,
    payMethod: "支付宝",
    food: {},
    tip: "",
    tools: "1",
    isTicket: false,
    discount: 0,
    deliverTime: "",
  })

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
    if (cartInfo[shopId] && cartInfo[shopId].food) {
      cartInfo[shopId].food.forEach(obj => {
        num += obj.num * obj.foodPrice
      })
      num += cartInfo[shopId].shopInfo.deliver
      setTotalMoney(num)
    }
    let food = {}
    const foodArr = cartInfo[shopId] && cartInfo[shopId].food
    if (foodArr && foodArr.length) {
      foodArr.forEach(obj => {
        food[obj.id] = obj.num
      })
    }
    setSubmitData(pre => {
      const data = { ...pre }
      data.food = JSON.stringify(food)
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
          <div className={Style.addressInfo}>
            <p className={Style.text}>广东金融学院实验中心大楼留下桌子上面</p>
            <p>
              <span className={Style.name}>王贤坤</span>
              <span className={Style.phone}>13411782971</span>
            </p>
          </div>
          {/* 配送 */}
          <AppBar
            padding={0} leftSize={'13px'} rightIconSize={'13px'}
            leftIcon={null} paddingLeft={0} rightSize={'13px'}
            left={'立即送出'} bgColor={'white'} right={'大约12:30送达'} paddingRight={'20px'}
            color={'#333'} rightIcon={'&#xe695;'} />
          {/* 配送 */}
          <AppBar
            padding={0} leftSize={'13px'} rightIconSize={'13px'}
            leftIcon={null} paddingLeft={0} right={'支付宝'} rightSize={'13px'}
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
          leftIcon={null} paddingLeft={0} right={'￥3'} rightSize={'15px'}
          left={'包装费'} bgColor={'white'} paddingRight={'5px'}
          color={'#333'} />
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0}
          right={`￥${(cartInfo[shopId] && cartInfo[shopId].shopInfo && cartInfo[shopId].shopInfo.deliver) || 0} `}
          rightSize={'15px'}
          left={'支配送费'} bgColor={'white'} paddingRight={'5px'}
          color={'#333'} />
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0} right={'未选择红包'} rightSize={'12px'}
          left={'红包 / 抵用券'} bgColor={'white'} paddingRight={'5px'}
          color={'#333'} />
      </div>
      {/* 额外信息 */}
      <div className={Style.orderOtherInfo}>
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0} right={'无'} rightSize={'13px'}
          left={'备注'} bgColor={'white'} paddingRight={'23px'} rightIcon={'&#xe695;'}
          color={'#333'} />
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0} right={'1份'} rightSize={'13px'}
          left={'餐具份数'} bgColor={'white'} paddingRight={'23px'} rightIcon={'&#xe695;'}
          color={'#333'} />
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0} right={'否'} rightSize={'13px'}
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
    </div>
  )
}

export default connect(
  ({ cartInfo, userInfo }) => ({
    cartInfo, userInfo
  }),
  (dispatch) => ({
    dispatch
  })
)(OrderSure)
