import { combineReducers } from 'redux'
import {
  UPDATE_CART
} from './actionTypes'
const cartInfoState = {
  // '601': {
  //   name: '烧烤',
  //   food: [
  //     {
  //       id: '601001',
  //       name: "鸡腿"
  //     }
  //   ]
  // }
}
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
const userInfo = (state = { name: 'beitu' }, action) => {
  switch (action.type) {
    // case UPDATE_U:
    //   console.log('ok');
    //   return action.data
    default:
      return { ...state }
  }
}

export default combineReducers({
  cartInfo,
  userInfo
})