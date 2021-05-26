import request from './request'

// 注册账号
export const uploadImg = data => {
  return request({
    method:'POST',
    url:'utils/uploadImg',
    data
  })
}
