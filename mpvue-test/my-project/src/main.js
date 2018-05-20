import Vue from 'vue'
import App from './App'
import '../static/weui/weui.css'
Vue.config.productionTip = false
App.mpType = 'app'
var Fly=require("flyio/dist/npm/wx")
var fly=new Fly
//配置基地址
fly.config.baseURL="http://localhost:8010/api1/"
//配置拦截器
fly.interceptors.request.use((config,promise)=>{
  config.headers["X-Tag"]="flyio";
return config;

})
Vue.prototype.$http=fly;
//global.encryptedData="";
//global.iv=""
const app = new Vue(App)
app.$mount()
export default {
  // 这个字段走 app.json
  config: {
    pages: [
      '^pages/index/index',
      'pages/task/task',
      'pages/create_task/create_task',
      'pages/undone_task/undone_task',
      'pages/unstart_task/unstart_task',
      'pages/analyse_task/analyse_task',
      'pages/judge_task/judge_task',
      'pages/Success/Success',
      'pages/add_taskmenu/add_taskmenu'], // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'TASK',
      navigationBarTextStyle: 'black'
    }
  }
}
