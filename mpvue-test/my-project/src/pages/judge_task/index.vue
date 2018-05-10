<template>
 <div>
   <div>
     <input v-bind:placeholder="cdp" v-model="childeva" />
   </div>
   <div>
     <input v-bind:placeholder="sap" v-model="selfassessment" />
   </div>
   <div>
     <input v-bind:placeholder="pcp" v-model="parentcheck" />
   </div>
   <div>
     <button class="weui-btn" type="primary" @click="commit_judge">提交评价</button>
   </div>
 </div>
</template>

<script>
  import store from "../task/store"
    export default {
        //name: "index"
      data() {
        return {
          //自我评价
          childeva: "",
          //自我评价输入框的提示语
          cdp: "自我评价",
          //自我打分，
          selfassessment: "",
          //自我打分输入框的提示语
          sap: "自我打分",
          //家长评价
          parentcheck: "",
          //家长评价输入框的提示语
          pcp: "家长评价"

        }
      },
      methods: {
        commit_judge() {
          if(this.childeva==="")
          {
            this.cdp="自我评价，不得为空";
          }
          else if(this.selfassessment==="")
          {
            this.sap="自我打分，不得为空";
          }
          else if (this.parentcheck==="")
          {
            this.pcp="家长评价，不得为空";
          }
          else
          {
            this.$http.put("/task/judge/",{"childeva":this.childeva,
              "selfAssessment":this.selfassessment,"parentcheck":this.parentcheck,"id":store.state.tid}).then((d)=>{
              console.log(d.data);
              this.childeva="";
              this.selfassessment="";
              this.parentcheck="";
          })
          }
        }
      }
    }
</script>

<style scoped>

</style>
