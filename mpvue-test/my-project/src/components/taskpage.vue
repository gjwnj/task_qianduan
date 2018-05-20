<template>
  <div>
    <div>
      <span>任务名称:</span>
      <input v-model="taskname" placeholder="请输入" :disabled="disabled" />
    </div>

    <div>
      <span>任务描述:</span><input v-model="taskdesc" placeholder="请输入" :disabled="disabled" />
    </div>

    <div>
      <picker @change="bindTaskTypeChange" :value="typeindex" :range="typelist" :disabled="disabled">
        任务类别:{{TypeValue}}
      </picker>
    </div>

    <div>
      <picker mode="date" value=begindate :start="currdate" end="" @change="bindBeginDateChange" @click="setbegindate" :disabled="disabled">
        开始日期:{{begindate}}
      </picker>
    </div>

    <div>
      <picker mode="time" value=begintime :start="currtime" end="23:59" @change="bindBeginTimeChange" @click="setbegintime" :disabled="disabled">
        开始时间:{{begintime}}
      </picker>
    </div>

    <div>
      <picker mode="date" value=begindate :start="begindate" end="" @change="bindEndDateChange" :disabled="disabled">
        结束日期:{{enddate}}
      </picker>
    </div>

    <div>
      <picker mode="time" value=endtime :start="end_start" end="23:59" @change="bindEndTimeChange" :disabled="disabled">
        结束时间:{{endtime}}
      </picker>
    </div>

  </div>

</template>

<script>
  import * as utils from "@/utils/index"
  export default {
    props:{typelist:Array,typevalue:String,taskname:String,taskdesc:String,begintime:String,endtime:String,begindate:String,enddate:String,disabled:String},
    data () {
      return {
        TypeValue:this.typelist[this.typeindex]||this.typevalue,
        typeindex:"",
        currdate:"",
        currtime:"",
        //该变量主要用于处理结束时间在当天和以后的不同情况。
        end_start:"",
        disabled:false
      }
    },
    components:{
      //mpPicker

    },
    methods:{
      bindTaskTypeChange(e) {

        this.typeindex=e.target.value;
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
    },
    beforeUpdate() {
      this.$emit("childEvent",{typevalue:this.TypeValue,taskname:this.taskname,taskdesc:this.taskdesc,
        begintime:this.begintime,endtime:this.endtime,begindate:this.begindate,enddate:this.enddate})
    }
  }
</script>

<style scoped>

</style>
