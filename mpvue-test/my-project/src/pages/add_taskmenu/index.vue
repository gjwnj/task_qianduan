<template>
  <div>
    <input placeholder="请输入类别" v-model="typevalue" />
    <button @click="addtasktype" class="weui-btn" type="primary">提交</button>
  </div>
</template>

<script>
  import store from "../task/store"
  export default {
    //"name: "index"
    data() {
      return {
        typevalue:""
      }
    },
    methods:{
      addtasktype() {
        this.$http.post("/taskmenu/",{"name":this.typevalue,"creater":store.state.openid}).then((d)=>{
          console.log(d.data)
          this.typevalue="";
          wx.navigateTo({url:'/pages/Success/Success'});
        }).catch((err)=>{
          console.log(err.status,err.message)
        })
      }
    }
  }
</script>

<style scoped>

</style>

