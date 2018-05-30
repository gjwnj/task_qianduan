<template>
    <div>
      <navigator class="weui-cell weui-cell_access" :url=" '/pages/create_task/create_task'">创建任务</navigator>
      <navigator class="weui-cell weui-cell_access" :url=" '/pages/undone_task/undone_task'">待做任务</navigator>
      <navigator class="weui-cell weui-cell_access" :url=" '/pages/unstart_task/unstart_task'">修改任务</navigator>
      <navigator class="weui-cell weui-cell_access" :url=" '/pages/analyse_task/analyse_task'">近七天效率</navigator>
      <navigator class="weui-cell weui-cell_access" :url=" '/pages/add_taskmenu/add_taskmenu'">自定义类别</navigator>
      <navigator class="weui-cell weui-cell_access" :url=" '/pages/done_task/done_task'">已完成任务</navigator>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <span>积分:{{credits}}</span>
        </div>
        <div class="weui-flex__item">
          <span>连签天数:{{lastday}}</span>
        </div>

      </div>
      <div>
        <button v-if="!isqd" class="weui-btn" type="primary" @click="SignIn(openid)">签到</button>
        <button v-else class="weui-btn">已签到</button>
      </div>
      <button v-if="!issq" class="weui-btn" type="primary" open-type="getUserInfo" @getuserinfo="agreeGetUser">授权</button>
    </div>
</template>

<script>
  import store from './store'
    export default {
        name: "index",
        data() {
          return {
            openid:"",
            isqd:false,
            issq:false,
            credits:"",
            //连签天数，吐槽一下自己的翻译
            lastday:""
          }

        },
      async onShow()
    {
      //获取用户id
      store.commit('getopenid');
      //如果用户openid不存在，授权按钮显示
      if(store.state.openid==="")
      {
        console.log("null");
        this.openid=store.state.openid;
        this.issq=false;
      }
      else
      {
        console.log("not null");
        this.issq=true;
        this.openid=store.state.openid;
        //签到
        this.isSignIn(store.state.openid);
      }

    },
        methods:{

          getUserInfo () {
            // 调用登录接口
            console.log("login");
            wx.login({
              success: (res) => {
              global.code=res.code;
            wx.getUserInfo({withCredentials: true,
              success: (res) => {
              this.userInfo = res.userInfo;
            global.encryptedData=res.encryptedData;
            global.iv=res.iv;
            this.$http.post("/user/",{"encryptedData":global.encryptedData,"iv":global.iv,"code":global.code}).then((d)=>{
              this.openid=d.data["obj"]["openid"];
              wx.setStorageSync('openid',this.openid);
              store.commit('getopenid')
          }).catch(err=>{
              console.log(err.status,err.message)
          })
          }
          })
          }
          })
          },
          createTask() {
            wx.request({
              url:'http://localhost:8010/api1/student/'+this.sid,
              data:{},
              header: {'Content-Type': 'application/json'},
              success: function(res) {
                console.log(res)
              }
            })
          },
          isSignIn(userid) {
            this.$http.get("/signin/"+userid+"/").then((d)=>{
              console.log(d.data)
            if(d.data.code==="200")
            {
              this.isqd=true;
            }
            else {
                this.isqd=false;
            }
            //刷新页面的积分和连签天数
            if(d.data.obj!==null||d.data.obj!==""||d.data.obj!==undefined)
            {
              this.credits=d.data.obj.credits;
              this.lastday=d.data.obj.lastday
            }
            })
            .catch(
              (err)=>{
                console.log(err.status,err.message);
            }
            )
          },
          SignIn(userid) {
            this.$http.put("/signin/"+userid+"/").then((d)=>{
              console.log(d.data);
              this.isqd=true;
            //刷新页面的积分和连签天数
            if(d.data.obj!==null||d.data.obj!==""||d.data.obj!==undefined)
            {
              this.credits=d.data.obj.credits;
              this.lastday=d.data.obj.lastday
            }
            })
            .catch((err)=>{
              console.log(err.status,err.message);
            })
          },
          agreeGetUser(e) {
            console.log(e)
            let encryptedData=e.mp.detail.encryptedData;
            let iv=e.mp.detail.iv;
            wx.login({
              success: (res) => {
                let code=res.code;
                    this.$http.post("/user/",{"encryptedData":encryptedData,"iv":iv,"code":code}).then((d)=>{
                      this.openid=d.data["obj"]["openid"];
                      wx.setStorageSync('openid',this.openid);
                      store.commit('getopenid')
                      this.issq=true;
                      console.log("openid:"+this.openid)
                    }).catch(err=>{
                      console.log(err.status,err.message)
                    })
              }
            })
          }
        }
    }
</script>

<style scoped>
  .weui-cells {
    margin-top: 0;
    opacity: 0;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }
</style>
