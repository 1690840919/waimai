const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // /api代表代理路径
  // target表示目标服务器地址
  app.use(
    createProxyMiddleware(
      // 匹配以 /api 开头的请求，只要以 /api 开头的，就会被执行代理
      // 需要自行发请求的时候前面加上api,表示使用反向代理 例如 url:'/api/api/user;
      '/api',
      {
        //这里后台的地址模拟的;应该填写你们真实的后台接口
        target: 'http://localhost:7000/',
        //跨域时一般设置该值为 true
        changeOrigin: true,
        //重写接口路由 请求的时候会去掉代表使用反向代码的api,然后拼接到target
        pathRewrite: {
          '^/api': ''
          //这样处理后，最终得到的接口路径为http://localhost:7000/api/user
        }
      }
    )
  )
}
