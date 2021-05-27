import request from './request'

// 检测登陆状态
export const loginCheck = data => {
  return request({
    method:'POST',
    url:'user/loginCheck',
    data
  })
}

// 注册账号
export const userRegister = data => {
  return request({
    method:'POST',
    url:'user/registerUserName',
    data
  })
}

// 登陆账号
export const userLogin = data => {
  return request({
    method:'post',
    url:'user/loginUserName',
    data
  })
}

// 退出登陆
export const userExit = data => {
  return request({
    method:'post',
    url:'user/exitUserName',
    data
  })
}
// 资料修改
export const userEdit = data => {
  return request({
    method:'post',
    url:'user/editUserInfo',
    data
  })
}

// 查询用户账单
export const userBill = (data) => {
  return request({
    method:'post',
    url:'user/userBill',
    data,
  })
}
