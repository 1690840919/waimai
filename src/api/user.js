import request from './request'

// 检测登陆状态
export const loginCheck = data => {
  return request({
    method: 'POST',
    url: 'user/loginCheck',
    data
  })
}

// 注册账号
export const userRegister = data => {
  return request({
    method: 'POST',
    url: 'user/registerUserName',
    data
  })
}

// 登陆账号
export const userLogin = data => {
  return request({
    method: 'post',
    url: 'user/loginUserName',
    data
  })
}

// 退出登陆
export const userExit = data => {
  return request({
    method: 'post',
    url: 'user/exitUserName',
    data
  })
}
// 资料修改
export const userEdit = data => {
  return request({
    method: 'post',
    url: 'user/editUserInfo',
    data
  })
}

// 查询用户账单
export const userBill = (data) => {
  return request({
    method: 'post',
    url: 'user/userBill',
    data,
  })
}

// 获取用户红包/卡券
export const userDiscount = (data) => {
  return request({
    method: 'post',
    url: 'user/userDiscount',
    data,
  })
}

// 充值VIP
export const userVip = (data) => {
  return request({
    method: 'post',
    url: 'user/userVip',
    data,
  })
}

// 领取会员红包
export const userVipPacket = (data) => {
  return request({
    method: 'post',
    url: 'user/userVipPacket',
    data,
  })
}

// 保存新地址
export const userNewAddress = (data) => {
  return request({
    method: 'post',
    url: 'user/userNewAddress',
    data,
  })
}

// 获取新地址
export const userAddress = (data) => {
  return request({
    method: 'post',
    url: 'user/userAddress',
    data,
  })
}

// 删除地址
export const userDeleteAddress = (data) => {
  return request({
    method: 'post',
    url: 'user/userDeleteAddress',
    data,
  })
}

// 用户下单
export const userOrderCreate = (data) => {
  return request({
    method: 'post',
    url: 'user/userOrderCreate',
    data,
  })
}

// 获取用户订单
export const userOrder = (data) => {
  return request({
    method: 'post',
    url: 'user/userOrder',
    data,
  })
}
// 用户评价
export const userCommentCreate = (data) => {
  return request({
    method: 'post',
    url: 'user/userCommentCreate',
    data,
  })
}

// 获取用户评价
export const userComment = (data) => {
  return request({
    method: 'post',
    url: 'user/userComment',
    data,
  })
}
