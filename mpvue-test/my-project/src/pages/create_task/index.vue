<template>
  <div>
    <div>
      <span>任务名称:</span>
      <input v-model="taskname" placeholder="请输入" />
    </div>

    <div>
      <span>任务描述:</span><input v-model="taskdesc" placeholder="请输入" />
    </div>

    <div>
      <picker @change="bindTaskTypeChange" :value="typevalue" :range="typelist">
        任务类别:{{typelist[typevalue]}}
      </picker>
    </div>

    <div>
      <picker mode="date" value=begindate :start="currdate" end="" @change="bindBeginDateChange" @click="setbegindate">
        开始日期:{{begindate}}
      </picker>
    </div>

    <div>
      <picker mode="time" value=begintime :start="currtime" end="23:59" @change="bindBeginTimeChange" @click="setbegintime">
        开始时间:{{begintime}}
      </picker>
    </div>

    <div>
      <picker mode="date" value=begindate :start="begindate" end="" @change="bindEndDateChange">
        结束日期:{{enddate}}
      </picker>
    </div>

    <div>
      <picker mode="time" value=endtime :start="end_start" end="23:59" @change="bindEndTimeChange">
        结束时间:{{endtime}}
      </picker>
    </div>

    <div>
      <button @click="addtask">提交</button>
    </div>

  </div>

</template>

<script>
  import store from "../task/store"
  import * as utils from "../../utils/index"
    export default {
      data () {
        return {
          typelist:[],
          typevalue:"",
          taskname:"",
          taskdesc:"",
          begintime:"",
          endtime:"",
          begindate:"",
          enddate:"",
          currdate:"",
          currtime:"",
          //该变量主要用于处理结束时间在当天和以后的不同情况。
          end_start:""
        }
      },
      components:{
        //mpPicker

      },

      async onShow(){
        //当页面加载时，请求任务类型，后期做缓存优化
         this.gettype();
      },

      methods:{
        bindTaskTypeChange(e) {

          this.typevalue=e.target.value;
        },
        bindBeginTimeChange(e) {
          this.begintime=e.target.value;
        },
        bindEndTimeChange(e) {
          this.endtime=e.target.value;
        },
        bindBeginDateChange(e) {
          this.begindate=e.target.value;
        },
        bindEndDateChange(e) {
          this.enddate=e.target.value;
          //当结束日期与开始日期同天，则结束时间必须在开始时间之后
          if(this.enddate===this.begindate)
          {
            this.end_start=this.begintime;
          }
          else
            {
              this.end_start="00:00";
            }
        },
        //获得所有的system和用户自定义的任务类型
        gettype()
        {
          this.$http.get("/taskmenu/"+store.state.openid,{}).then((d)=>{
            for(let val in d.data["obj"])
            {
              this.typelist[val]=d.data["obj"][val]["name"];
              console.log(this.typelist[val]);
            };
          }).catch(err=>{
          console.log(err.status,err.message)
        })
        },
        addtask()
        {
          //这里要添加对openid的探空处理
         if(true)
         {
           console.log("su:"+store.state.openid);
         }
         else
         {
         }
          this.$http.post("/task/",
            {"taskdesc":this.taskdesc,"taskname":this.taskname,"starttime":this.begindate+" "+this.begintime+":00",
              "endtime":this.enddate+" "+this.endtime+":00","taskowner":store.state.openid,"tasktype":this.typelist[this.typevalue],"taskdesc":this.taskdesc})
            .then((d)=>{
            //增加消息提示框，告知用户已成功提交任务
            if(d.data["code"]==="200")
            {
              //清除已提交任务
              this.taskname="";
              this.taskdesc="";
              this.typevalue="";
              this.begindate="";
              this.begintime="";
              this.enddate="";
              this.endtime="";
            }
            //告知用户因网络原因，无法提交，请检查网络后，重新提交
            else
            {
              console.log("failure");
            }
        }).catch(err=>{
          console.log(err.status,err.message)
        })
        },
        setbegindate()
        {
          this.currdate=utils.getCurrentDate();
          console.log("lll")
        },
        setbegintime()
        {
          //当开始日期，大于当天（只有大于和等于俩个选项）时，开始日期不再受限
          if(new Date(Date.parse(this.begindate))>new Date(Date.parse(utils.getCurrentDate())))
          {
            this.currtime="00:00";
          }
          else
          {
            this.currtime=utils.getCurrentTime();
          }
        }
      }
    }
</script>

<style scoped>

</style>
