const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_NGINX_PATH
      : '/',

  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080
  },
  configureWebpack: {
    devServer: {
      proxy: {
        [process.env.VUE_APP_BASE_API]: {
          //捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，
          target: process.env.VUE_APP_BASE_DEV_SERVER_PROXY_TARGET, //代理的api地址，就是要跨域的地址
          changeOrigin: true, // 这个参数可以让target参数是域名
          // ws: true, //是否启用websockets，用不到可设为false
          pathRewrite: {
            //对路径匹配到的字符串重写
            ['^' + process.env.VUE_APP_BASE_API]: ''
          }
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Odoo-JS'
      // args[0].title = t('timeSearch.today')
      return args
    })
  }
})
