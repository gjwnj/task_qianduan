<template>
<div>

  <div class="weui-cells__title">只能修改开始时间距离当前超过30分钟的任务</div>

  <div class="weui-cells weui-cells_after-title">

    <div class="weui-cell">
      <div class="weui-cell__bd">{{ pageSum}}</div>
      <div class="weui-cell__ft">未开始任务量</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{taskname}}</div>
      <div class="weui-cell__ft">当前任务名称</div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">{{taskdesc}}</div>
      <div class="weui-cell__ft">当前任务描述</div>
    </div>


  </div>
</div>
</template>

<script>
    export default {
        //name: "index"
      data() {
        return {

        }
      }
    }
</script>

<style scoped>

</style>
