<template>
<div>

  <div class="weui-cells__title">只能修改开始时间距离当前超过30分钟的任务</div>

  <div class="weui-cells weui-cells_after-title">

    <div class="weui-cell">
      <div class="weui-cell__bd">{{ pageSum}}</div>
      <div class="weui-cell__ft">未开始任务量</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd"><input v-model:="taskname" :disabled="disabled" /></div>
      <div class="weui-cell__ft">当前任务名称</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd"><input v-model:="taskdesc" :disabled="disabled" /></div>
      <div class="weui-cell__ft">当前任务描述</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd"><input v-model:="starttime"></input></div>
      <div class="weui-cell__ft">开始时间</div>
    </div>

    <div class="weui-cell">
      <input class="weui-cell__bd">{{endtime}}</input>
      <div class="weui-cell__ft">结束时间</div>
    </div>
    <button @click="revise_task">{{buttonvalue}}</button>

  </div>
</div>
</template>

<script>
  import store from "../task/store"
    export default {
        //name: "index"
      data() {
        return {
          pageNo:1,
          pageSize:1,
          pageSum:"",
          taskid:"",
          taskname: "",
          taskdesc:"",
          starttime:"",
          endtime:"",
          disabled:true,
          buttonvalue:"修改"
        }
      },
      methods:{
        getoneunstarttask() {
          this.$http.get("/task/"+store.state.openid+"/"+this.pageNo+"/"+this.pageSize+"/"+0).then((d)=>{
            console.log(d.data);
            if(d.data["obj"]!==null&&d.data["obj"]!==""&&d.data["obj"]!==undefined)
            {
              this.taskname=d.data["obj"]["taskname"];
              this.taskdesc=d.data["obj"]["taskdesc"];
              this.taskid=d.data["obj"]["id"];
              this.starttime=d.data["obj"]["starttime"];
              this.endtime=d.data["obj"]["endtime"];
              this.pageSum=d.data["obj"]["pageSum"];
            }
            else
            {
              this.pageSum=0;
            }

          }).catch((err)=>{
            this.pageSum="网络异常，请求数据失败";
            console.log(err.status,err.message)
          })
        },
        revise_task() {
          if(this.pageSum!==""&&this.pageSum>0)
          {
            this.disabled=false;
          }
        }
      },
      async onShow() {
        //确保每次加载页面，处于不可修改状态
        this.disabled=true;
        this.getoneunstarttask();
      }
    }
</script>

<style scoped>

</style>
