import React,{useState} from 'react'
import Style from './OrderSure.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import Toast from '../../components/Toast/Toast'

function OrderSure(props){
  const { history } = props
  const [toastInfo, setToastInfo] = useState({})

  // 点击确认订单
  const sureOrder = () => {
    setToastInfo({
      text: '下单成功',
      icon:'&#xe687;',
      date: new Date(),
      callBackFn:()=>{
        history.replace('/order')
      }
    })
  }
  return (
    <div className={Style.orderSure}>
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
        <p className={Style.shopName}>潮汕山水肠粉</p>
        <div className={Style.food}>
          <div className={Style.foodImg}>
            <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
          </div>
          <div className={Style.foodOthers}>
            <div className={Style.foodName}>
              油条鸡蛋肠粉+白粥+萝卜干+榨菜一包
            </div>
            <div className={Style.foodPrice}>
              <p className={Style.price}>
                <span>￥</span>
                <span className={Style.num}>9.9</span>
              </p>
              <p className={Style.foodNum}>X5</p>
            </div>
          </div>
        </div>
        <div className={Style.food}>
          <div className={Style.foodImg}>
            <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
          </div>
          <div className={Style.foodOthers}>
            <div className={Style.foodName}>
              <p>
                油条鸡蛋肠粉+白粥+萝卜干+榨菜一包
                油条鸡蛋肠粉+白粥+萝卜干+榨菜一包
                油条鸡蛋肠粉+白粥+萝卜干+榨菜一包
              </p>
            </div>
            <div className={Style.foodPrice}>
              <p className={Style.price}>
                <span>￥</span>
                <span className={Style.num}>9.9</span>
              </p>
              <p className={Style.foodNum}>X5</p>
            </div>
          </div>
        </div>
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0} right={'￥3'} rightSize={'15px'}
          left={'包装费'} bgColor={'white'} paddingRight={'5px'}
          color={'#333'} />
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0} right={'￥3'} rightSize={'15px'}
          left={'支配送费'} bgColor={'white'} paddingRight={'5px'}
          color={'#333'}  />
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0} right={'未选择红包'} rightSize={'12px'}
          left={'红包 / 抵用券'} bgColor={'white'} paddingRight={'5px'}
          color={'#333'}  />
      </div>
      {/* 额外信息 */}
      <div className={Style.orderOtherInfo}>
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0} right={'无'} rightSize={'13px'}
          left={'备注'} bgColor={'white'} paddingRight={'23px'} rightIcon={'&#xe695;'}
          color={'#333'}  /> 
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0} right={'1份'} rightSize={'13px'}
          left={'餐具份数'} bgColor={'white'} paddingRight={'23px'} rightIcon={'&#xe695;'}
          color={'#333'}  />
        <AppBar
          padding={0} leftSize={'13px'}
          leftIcon={null} paddingLeft={0} right={'否'} rightSize={'13px'}
          left={'发票'} bgColor={'white'} paddingRight={'23px'} rightIcon={'&#xe695;'}
          color={'#333'}  />
      </div>
      {/* 底部结算菜单 */}
      <div className={Style.bottomMenu}>
        <div className={Style.menuInfo}>
          <p>
            <span className={Style.totalTitle}>合计：</span>
            <span className={Style.moneyIcon}>￥</span>
            <span className={Style.payMoney}>9.9</span>
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

export default OrderSure
