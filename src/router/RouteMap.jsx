import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Redirect, Route, Switch, withRouter } from 'react-router-dom'

import Home from '../pages/Home/Home'
import NotFound from '../pages/NotFound/NotFound'
import Cart from '../pages/Cart/Cart'
import Order from '../pages/Order/Order'
import User from '../pages/User/User'
import Login from '../pages/Login/Login'
import ShopDetail from '../pages/ShopDetail/ShopDetail'
import Setting from '../pages/Setting/Setting'
import UserInfo from '../pages/UserInfo/UserInfo'
import UserVip from '../pages/UserVip/UserVip'
import UserAddress from '../pages/UserAddress/UserAddress'
import UserAddressEdit from '../pages/UserAddressEdit/UseAddressEdit'
import UserService from '../pages/UserService/UserService'
import UserRule from '../pages/UserRule/UserRule'
import UserCollect from '../pages/UserCollect/UserCollect'
import UserDiscount from '../pages/UserDiscount/UserDiscount'
import UserWallet from '../pages/UserWallet/UserWallet'
import OrderInfo from '../pages/OrderInfo/OrderInfo'
import Search from '../pages/Search/Search'
import OrderSure from '../pages/OrderSure/OrderSure'
import { getItem, removeItem } from '../utils/storage'
import { updateUserInfo } from '../redux/actions'
import { loginCheck } from '../api/user'
import Toast from '../components/Toast/Toast'
import MoreBill from '../pages/UserWallet/components/MoreBill/MoreBill'
import OrderComment from '../pages/OrderComment/OrderComment'
class RouteMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toastInfo: {},
      RouteData: [
        { path: '/home', component: Home },
        { path: '/cart', component: Cart },
        { path: '/order', component: Order },
        { path: '/orderComment', component: OrderComment },
        { path: '/orderInfo', component: OrderInfo },
        { path: '/orderSure:id', component: OrderSure },
        { path: '/user', component: User },
        { path: '/login', component: Login },
        { path: '/shopDetail:id', component: ShopDetail },
        { path: '/setting', component: Setting },
        { path: '/userInfo', component: UserInfo },
        { path: '/userVip', component: UserVip },
        { path: '/userAddress', component: UserAddress },
        { path: '/userAddressEdit', component: UserAddressEdit },
        { path: '/userService', component: UserService },
        { path: '/userRule', component: UserRule },
        { path: '/userCollect', component: UserCollect },
        { path: '/userDiscount', component: UserDiscount },
        { path: '/userWallet', component: UserWallet },
        { path: '/search', component: Search },
        { path: "/userBill", component: MoreBill },
        { path: "*", component: NotFound },
      ]
    }
  }

  async componentDidMount() {
    const userInfo = getItem('lazy_waimai_userInfo')
    const { data: { code } } = await loginCheck()
    if (code !== 1000 && userInfo && userInfo.id) {
      this.setState({
        toastInfo: {
          text: '登陆信息过期',
          date: new Date(),
          callBackFn: () => {
            removeItem('lazy_waimai_userInfo')
          }
        }
      })
      return
    }
    userInfo && userInfo.id && this.props.dispatch(updateUserInfo({ data: userInfo }))
  }

  render() {
    const { toastInfo, RouteData } = this.state
    return (
      <Router>
        {/* 消息提醒 */}
        <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
          isShow={toastInfo.date} icon={toastInfo.icon} />
        <Switch>
          <Redirect from='/' to='/login' exact />
          {
            RouteData.map(obj => (
              <Route key={obj.path} path={obj.path} component={obj.component} />
            ))
          }
        </Switch>
      </Router>
    )
  }
}


export default connect(
  ({ userInfo }) => ({
    userInfo
  }),
  (dispatch) => ({
    dispatch
  })
)(withRouter(RouteMap))
