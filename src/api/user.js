import request from './request'

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