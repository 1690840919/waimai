import axios from 'axios'

const request = axios.create({
  baseURL:'/api/api'
  // 初始根路径,默认发出的请求是同源的。
  // 第一个api是使用反向代理的表示，第二个是接口路径/api
})

export default request
