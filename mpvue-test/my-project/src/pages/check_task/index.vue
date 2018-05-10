<template>
  <div>
    <div class="weui-cells__title">今日事，今日毕</div>

    <div class="weui-cells weui-cells_after-title">

      <div class="weui-cell">
        <div class="weui-cell__bd">{{ pageSum}}</div>
        <div class="weui-cell__ft">未完成任务量</div>
      </div>

      <div class="weui-cell">
      <div class="weui-cell__bd">{{taskname}}</div>
      <div class="weui-cell__ft">当前任务名称</div>
     </div>

      <div class="weui-cell">
        <div class="weui-cell__bd">{{taskdesc}}</div>
        <div class="weui-cell__ft">当前任务描述</div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__bd">{{resttime}}</div>
        <div class="weui-cell__ft">剩余时间(-代表已超出时间/分钟)</div>
      </div>

    </div>

    <div>
      <button class="weui-btn" type="primary" @click="FinishTask">完成</button>
    </div>

    <!-- 对上下按钮采用flex布局-->
    <div class="weui-flex">
      <div class="weui-flex__item">
        <button class="weui-btn" type="mini" @click="PrePage">上一个</button>
      </div>
      <div class="weui-flex__item">
        <button class="weui-btn" type="mini" @click="NextPage">下一个</button>
      </div>
    </div>

    <div>

    </div>
  </div>
</template>

<script>
  import store from "../task/store"
  import * as utils from "../../utils/index"
  export default {
        //name: "index",
    data() {
      return {
        pageNo:1,
        pageSize:1,
        pageSum:"",
        taskid:"",
        taskname: "",
        taskdesc:"",
        resttime:""

      }
    },
    methods:{
        getoneTask() {
          //默认请求最早的未完成任务
            this.$http.get("/task/"+store.state.openid+"/"+this.pageNo+"/"+this.pageSize,{})
              .then((d)=>{
              //判断是否有未完任务
              if(d.data["obj"]!==null&&d.data["obj"]!==""&&d.data["obj"]!==undefined)
              {
                this.taskname=d.data["obj"]["taskname"];
                this.taskdesc=d.data["obj"]["taskdesc"];
                this.taskid=d.data["obj"]["id"];
                //计算剩余时间
                let current_timetamp=Date.parse(new Date());
                let end_timetamp=Date.parse(new Date(d.data["obj"]["endtime"]));
                let resttime=(end_timetamp-current_timetamp)/(1000*60)
                this.resttime=Math.round(resttime);
                //页面总数会因为完成任务而变化所以不能只在第一次加载页面时初始化数据（第一次加载如何判断，数据为空）
                  this.pageSum=d.data["obj"]["pageSum"];
              }
              else
              {
                this.pageSum=0;
              }

          })
          .catch((err)=>{
            console.log(err.status,err.message);
          })
        },

        NextPage() {
          //当为最后一个任务时，不再请求，减轻后端压力，但在同一账号多个客户端的情况下，可能会出现问题
          if(this.pageNo<this.pageSum)
          {
            this.pageNo++;
            this.getoneTask();
          }

        },

        PrePage() {
          //当为第一个任务时，不再请求，减轻后端压力，但在同一账号多个客户端的情况下，可能会出现问题
          if(this.pageNo>1)
          {
            this.pageNo--;
            this.getoneTask();
          }

        },
       FinishTask() {
          let currdatetime=utils.getCurrentDate()+" "+utils.getCurrentTime()+":00";
          this.$http.put("/task/",
            {"actualfinishtime":currdatetime,"taskowner":store.state.openid,"id":this.taskid})
            .then((d)=>{
            //完成后增加消息提示框，告知用户已成功
            if(d.data["code"]==='200')
            {
              //将任务id传入store，便于在页面间进行数据传递
              store.commit("settid",this.taskid);
              //清除页面已完成任务
              this.taskid="";
              this.taskname="";
              this.taskdesc="";
              this.resttime="";
              //加载下一个未完任务
              //this.getoneTask();
              console.log("id"+store.state.tid);
              wx.navigateTo({url:'/pages/judge_task/judge_task'});
            }
            //告知用户因某种原因，无法完成
            else
            {

            }
          }).catch((err)=>{
            console.log(err.status,err.message);
         })
       }


      },
    async onShow(){
    //请求最先需要完成的，即完成时间最早的
    this.getoneTask();
  }
  }
</script>

<style scoped>

</style>
