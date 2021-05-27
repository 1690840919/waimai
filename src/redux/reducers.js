import { combineReducers } from 'redux'
import {
  UPDATE_CART, 
  UPDATE_USERINFO,
  UPDATE_BILLINFO,
} from './actionTypes'
// 购物车
const cartInfo = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CART:
      return action.data
    default:
      return { ...state }
  }
}
// 用户信息
const userInfo = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USERINFO:
      return action.data.data
    default:
      return { ...state }
  }
}
// 账单信息
const billInfo = (state = [], action) => {
  switch (action.type) {
    case UPDATE_BILLINFO:
      return action.data
    default:
      return [ ...state ]
  }
}

export default combineReducers({
  cartInfo,
  userInfo,
  billInfo
})
