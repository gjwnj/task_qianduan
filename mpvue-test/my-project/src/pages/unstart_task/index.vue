<template>
<!--div>

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

</div-->
  <div>
    <taskpage :typelist="typelist" :typevalue="typevalue" :taskname="taskname" :taskdesc="taskdesc" :begintime="starttime"
              :endtime="endtime" :begindate="begindate" :enddate="enddate" :disabled="disabled" @childEvent="parentMethod"></taskpage>

    <button v-if="disabled" @click="revise_task" class="weui-btn" type="warn">修改</button>
    <button v-else class="weui-btn" type="primary" @click="update_task">提交</button>

    <!-- 对上下按钮采用flex布局-->
    <div class="weui-flex">
      <div class="weui-flex__item">
        <button class="weui-btn" type="mini" @click="PrePage">上一个</button>
      </div>
      <div class="weui-flex__item">
        <button class="weui-btn" type="mini" @click="NextPage">下一个</button>
      </div>
    </div>

  </div>

</template>

<script>
  import store from "../task/store"
  import * as utils from "../../utils/index"
  import taskpage from "@/components/taskpage"
    export default {
        //name: "index"
      data() {
        return {
          pageNo:1,
          pageSize:1,
          pageSum:"",
          typelist:new Array(),
          typevalue:"",
          taskid:"",
          taskname: "",
          taskdesc:"",
          starttime:"",
          endtime:"",
          begindate:"",
          enddate:"",
          disabled:true
        }
      },
      components:{
        taskpage
      },
      methods:{
        getoneunstarttask() {
          this.$http.get("/task/"+store.state.openid+"/"+this.pageNo+"/"+this.pageSize+"/"+0).then((d)=>{
            console.log(d.data);
            if(d.data["obj"]!==null&&d.data["obj"]!==""&&d.data["obj"]!==undefined)
            {
              let stdatetime=d.data["obj"]["starttime"];
              let enddatetime=d.data["obj"]["endtime"];

              this.taskname=d.data["obj"]["taskname"];
              this.taskdesc=d.data["obj"]["taskdesc"];
              this.taskid=d.data["obj"]["id"];
              this.typevalue=d.data["obj"]["tasktype"];
              this.starttime=utils.getCurrentTime(stdatetime);
              this.endtime=utils.getCurrentTime(enddatetime);
              this.begindate=utils.getCurrentDate(stdatetime);
              this.enddate=utils.getCurrentDate(enddatetime);
              this.pageSum=d.data["obj"]["pageSum"];
            }
            else
            {
              this.pageSum=0;
            }

          }).catch((err)=>{
            this.pageSum="网络异常，请求数据失败";
          })
        },
        revise_task() {
          if(this.pageSum!==""&&this.pageSum>0)
          {
            this.disabled=false;
          }
        },
        NextPage() {
          //当为最后一个任务时，不再请求，避免无效请求，减轻后端压力，但在同一账号多个客户端的情况下，可能会出现问题
          if(this.pageNo<this.pageSum)
          {
            this.pageNo++;
            this.getoneunstarttask()
          }
        },

        PrePage() {
          //当为第一个任务时，不再请求，避免无效请求，减轻后端压力，但在同一账号多个客户端的情况下，可能会出现问题
          if(this.pageNo>1)
          {
            this.pageNo--;
            this.getoneunstarttask();
          }
        },
        update_task() {
          this.$http.put("/task/",{"taskname":this.taskname,"taskdesc":this.taskdesc,"starttime":this.begindate+" "+this.starttime+":00",
          "endtime":this.enddate+" "+this.endtime+":00","id":this.taskid}).then((d)=>{
            wx.navigateTo({url:'/pages/Success/Success'});
          }).catch((err)=>{
            console.log(err.status,err.message)
          })
        },
        parentMethod({typevalue,taskname,taskdesc,begintime,endtime,begindate,enddate}) {
          this.taskname=taskname;
          this.taskdesc=taskdesc;
          this.typevalue=typevalue;
          this.starttime=begintime;
          this.endtime=endtime;
          this.begindate=begindate;
          this.enddate=enddate;
        }
      },
      async onShow() {
        //确保每次加载页面，处于不可修改状态
        this.disabled=true;
        //当页面加载时，请求任务类型，后期做缓存优化
        utils.getType(this.typelist,store.state.openid);
        //请求第一个未开始任务
        this.getoneunstarttask();
      }
    }
</script>

<style scoped>

</style>
