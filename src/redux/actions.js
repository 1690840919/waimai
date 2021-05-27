// 同步action

import {
  UPDATE_CART,
  UPDATE_USERINFO,
  UPDATE_BILLINFO,
} from "./actionTypes";

// 更新购物车
export const updateCart = (data) => ({ type: UPDATE_CART, data })
// 更新用户信息
export const updateUserInfo = (data) => ({type: UPDATE_USERINFO, data})
// 更新账单信息
export const updateBillInfo = (data) => ({type: UPDATE_BILLINFO, data})
