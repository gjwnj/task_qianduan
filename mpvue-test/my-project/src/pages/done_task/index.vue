<template>
  <div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{taskname}}</div>
      <div class="weui-cell__ft">任务名称</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{typevalue}}</div>
      <div class="weui-cell__ft">任务类型</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{begindate}}</div>
      <div class="weui-cell__ft">开始日期</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{starttime}}</div>
      <div class="weui-cell__ft">开始时间</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{enddate}}</div>
      <div class="weui-cell__ft">结束日期</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{endtime}}</div>
      <div class="weui-cell__ft">结束时间</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{finishdate}}</div>
      <div class="weui-cell__ft">完成日期</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{finishtime}}</div>
      <div class="weui-cell__ft">完成时间</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{ selfjudge}}</div>
      <div class="weui-cell__ft">自我评价</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{selfAssessment}}</div>
      <div class="weui-cell__ft">自我打分</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{parentjudge}}</div>
      <div class="weui-cell__ft">家长评价</div>
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
          finishdate:"",
          finishtime:"",
          selfjudge:"",
          parentjudge:"",
          selfAssessment:""
        }
      },
      methods:{
        getonedonetask() {
          this.$http.get("/task/all/"+store.state.openid+"/"+this.pageNo+"/"+this.pageSize).then((d)=>{
            console.log(d.data);
            if(d.data["obj"]!==null&&d.data["obj"]!==""&&d.data["obj"]!==undefined)
            {
              let stdatetime=d.data["obj"]["starttime"];
              let enddatetime=d.data["obj"]["endtime"];
              let finishdatetime=d.data["obj"]["actualfinishtime"];

              this.taskname=d.data["obj"]["taskname"];
              this.taskdesc=d.data["obj"]["taskdesc"];
              this.taskid=d.data["obj"]["id"];
              this.typevalue=d.data["obj"]["tasktype"];
              this.starttime=utils.getCurrentTime(stdatetime);
              this.endtime=utils.getCurrentTime(enddatetime);
              this.begindate=utils.getCurrentDate(stdatetime);
              this.enddate=utils.getCurrentDate(enddatetime);
              this.pageSum=d.data["obj"]["pageSum"];
              this.finishdate=utils.getCurrentDate(finishdatetime);
              this.finishtime=utils.getCurrentTime(finishdatetime);
              this.selfjudge=d.data["obj"]["childeva"];
              this.parentjudge=d.data["obj"]["parentcheck"];
            }
            else
            {
              this.pageSum=0;
            }

          }).catch((err)=>{
            this.pageSum="网络异常，请求数据失败";
          })
        },
        NextPage() {
          //当为最后一个任务时，不再请求，避免无效请求，减轻后端压力，但在同一账号多个客户端的情况下，可能会出现问题
          if(this.pageNo<this.pageSum)
          {
            this.pageNo++;
            this.getonedonetask()
          }
        },

        PrePage() {
          //当为第一个任务时，不再请求，避免无效请求，减轻后端压力，但在同一账号多个客户端的情况下，可能会出现问题
          if(this.pageNo>1)
          {
            this.pageNo--;
            this.getonedonetask();
          }
        }
      },
      async onShow() {
        //请求第一个已完成任务
        this.getonedonetask();
      }
    }
</script>

<style scoped>

</style>
