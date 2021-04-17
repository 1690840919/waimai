import React from 'react'
import Style from './UserWallet.module.scss'
import AppBar from '../../components/AppBar/AppBar'
function UserWallet(props) {
  const { history } = props
  return (
    <div className={Style.userWallet}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'我的钱包'} bgColor={'rgb(91,170,250)'} />
      {/* 我的钱包 */}
      <div className={Style.wallet}>
        <div className={Style.title}>
          <div className={Style.left}>总余额（元）</div>
          <div className={`iconfont ${Style.right}`}>&#xe62e;</div>
        </div>
        <div className={Style.price}>
          <div className={Style.num}>51.00</div>
          <div className={Style.btn}>立即充值</div>
        </div>
      </div>
      {/* 账号 */}
      <div className={Style.bills}>
        <AppBar paddingLeft={0} left={'我的账单'} color={'#333'} rightColor={'#969799'}
          rightIcon={'&#xe695;'} right={'更多'} leftIcon={null} size={'14px'} />
        {/* 账单 */}
        <div className={Style.content}>
          <div className={Style.bill}>
            <div className={Style.avatar}>
              <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
            </div>
            <div className={Style.info}>
              <p className={Style.title}>开通vip</p>
              <p className={Style.time}>2021-03-11 11:13:04</p>
            </div>
            <div className={Style.right}>
              <p>-99</p>
              <p>余额：100</p>
            </div>
          </div>
          <div className={Style.bill}>
            <div className={Style.avatar}>
              <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
            </div>
            <div className={Style.info}>
              <p className={Style.title}>开通vip</p>
              <p className={Style.time}>2021-03-11 11:13:04</p>
            </div>
            <div className={Style.right}>
              <p>-99</p>
              <p>余额：100</p>
            </div>
          </div>
          <div className={Style.bill}>
            <div className={Style.avatar}>
              <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
            </div>
            <div className={Style.info}>
              <p className={Style.title}>开通vip</p>
              <p className={Style.time}>2021-03-11 11:13:04</p>
            </div>
            <div className={Style.right}>
              <p>-99</p>
              <p>余额：100</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserWallet
