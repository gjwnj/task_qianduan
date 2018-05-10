// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //用户id
    openid: "",
    //任务id
    tid:""
  },
  mutations: {
    getopenid: (state) => {
      const obj = state;
      obj.openid=wx.getStorageSync('openid');
      console.log("obj:"+obj.openid)
    },
    settid:(state,tid) =>{
      const obj=state;
      obj.tid=tid;
   }
  }
})

export default store
