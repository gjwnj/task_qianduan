module.exports={
  proxyList:{
    '/apis':{
      target:'http://localhost:8070/',//接口域名
      changeOrigin:true,//是否跨域
      pathRewrite:{
        '/apis':'/bbs_test'
      }

    }
  }
}
