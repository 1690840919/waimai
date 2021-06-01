import request from './request'

// 获取店铺
export const shopList = (data) => {
  return request({
    method: 'post',
    url: '/shop/shopList',
    data,
  })
}

// 获取店铺菜单
export const shopMenu = (data) => {
  return request({
    method: 'post',
    url: '/shop/shopMenu',
    data,
  })
}
// 获取店铺菜单商品
export const shopFood = (data) => {
  return request({
    method: 'post',
    url: '/shop/shopFood',
    data,
  })
}
