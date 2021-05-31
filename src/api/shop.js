import request from './request'

// 获取店铺
export const shopList = (data) => {
  return request({
    method: 'post',
    url: '/shop/shopList',
    data,
  })
}
