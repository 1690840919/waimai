// 同步action

import {
  UPDATE_CART,
  UPDATE_USERINFO,
  UPDATE_BILLINFO,
  UPDATE_DISCOUNTINFO,
  UPDATE_ORDERINFO,
} from "./actionTypes";

// 更新购物车
export const updateCart = (data) => ({ type: UPDATE_CART, data })
// 更新用户信息
export const updateUserInfo = (data) => ({type: UPDATE_USERINFO, data})
// 更新账单信息
export const updateBillInfo = (data) => ({type: UPDATE_BILLINFO, data})
// 更新红包卡券
export const updateDiscountInfo = (data) => ({type: UPDATE_DISCOUNTINFO, data})
// 更新订单信息
export const updateOrderInfo = (data) => ({type: UPDATE_ORDERINFO, data})
