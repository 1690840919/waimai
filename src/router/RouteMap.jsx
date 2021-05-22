import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

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
import { getItem } from '../utils/storage'
import { updateUserInfo } from '../redux/actions'
class RouteMap extends Component {

  componentDidMount(){
    const data = getItem('lazy_waimai_userInfo')
    data && this.props.dispatch(updateUserInfo(data))
  }

  render() {
    return (
      <Router>
        <Switch>
          <Redirect from='/' to='/login' exact />
          <Route path='/home' component={Home} />
          <Route path='/cart' component={Cart} />
          <Route path='/order' component={Order} />
          <Route path='/orderInfo' component={OrderInfo} />
          <Route path='/orderSure:id' component={OrderSure} />
          <Route path='/user' component={User} />
          <Route path='/login' component={Login} />
          <Route path='/shopDetail:id' component={ShopDetail} />
          <Route path='/setting' component={Setting} />
          <Route path='/userInfo' component={UserInfo} />
          <Route path='/userVip' component={UserVip} />
          <Route path='/userAddress' component={UserAddress} />
          <Route path='/userAddressEdit' component={UserAddressEdit} />
          <Route path='/userService' component={UserService} />
          <Route path='/userRule' component={UserRule} />
          <Route path='/userCollect' component={UserCollect} />
          <Route path='/userDiscount' component={UserDiscount} />
          <Route path='/userWallet' component={UserWallet} />
          <Route path='/search' component={Search} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    )
  }
}


export default connect(
  ({userInfo}) => ({
    userInfo
  }),
  (dispatch) => ({
    dispatch
  })
)(RouteMap)
