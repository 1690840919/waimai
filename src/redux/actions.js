// 同步action

import {
  UPDATE_CART,
  UPDATE_USERINFO
} from "./actionTypes";

// 更新购物车
export const updateCart = (data) => ({ type: UPDATE_CART, data })
// 更新用户信息
export const updateUserInfo = (data) => ({type: UPDATE_USERINFO, data})
