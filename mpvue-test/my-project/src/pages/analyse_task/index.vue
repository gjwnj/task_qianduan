<template>
  <div>

    <div>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <input v-model="taskname_select" placeholder="任务名称"/>
        </div>
        <div class="weui-flex__item">
          <button class="weui-btn" @click="getdatabyNameOrType">更改</button>
        </div>
      </div>

      <div class="container">
        <div class="wrap">
          <mpvue-echarts :echarts="echarts" :onInit="onInit" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import mpvueEcharts from 'mpvue-echarts'

  //图表数据，初始为空，点击按钮时再初始化
  let options={}
  //初始化函数
  function initChart (canvas, width, height) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    })
    canvas.setChart(chart)
    var option = options
    chart.setOption(option)
    return chart
  }
  import store from "../task/store"
  export default {
        //name: "index",
        data() {
          return {
            //开启图表延迟初始化
            lazyLoad: true,
            echarts,
            onInit: initChart,
            taskname_select:"",
            tasktype_select:""
          }
        },
       methods:{
          getdatabyNameOrType(dateinterval) {
            dateinterval=7;
            this.$http.get("/task/time/"+dateinterval+"/"+this.taskname_select+"/"+store.state.openid,{})
              .then((d)=>{
              console.log(d.data);
              //图表数据初始化
            options={
              backgroundColor: '#fff',
                color: ['#37A2DA'],
              tooltip: {
              trigger: 'axis'
            },

              //图例名称，支持多条曲线
              legend: {
                data: []
              },

              grid: {
                containLabel: true
              },

              //横坐标值
              xAxis: {
                type: 'category',
                  boundaryGap: false,
                  data: []
              },

              yAxis: {
                x: 'center',
                  type: 'value'
              },

              //纵坐标值
              series: [{
                  name:'a',
                  type: 'line',
                  smooth: true,
                  data: []
              }]
            }
              //图例赋值
              options.legend.data[0]=this.taskname_select;
              //曲线名称与图例保持一致,可以支持多条曲线
              options.series.name=this.taskname_select;
              //横坐标初始化，以当前日期开始，共dateinterval天。
              for(let i=dateinterval;i>0;i--)
              {
                let curdate=new Date();
                //6-0,故减1
                let newdate=new Date(curdate.getTime()-24*60*60*1000*(i-1));
                //console.log(newdate);
                //从0开始赋值
                options.xAxis.data[dateinterval-i]=newdate.getDate();
              }

              //纵坐标赋值
              for(let index in d.data['obj'])
              {
                //开始，结束，完成时间的时间戳（/毫秒）
                let startdatestamp=Date.parse(new Date(d.data['obj'][index]['starttime']));
                let enddate =new Date(d.data['obj'][index]['endtime'])
                let enddatestamp=Date.parse(enddate);
                //日期中的天
                let enddate_d=enddate.getDate()
                let finishdatestamp=Date.parse(new Date(d.data['obj'][index]['actualfinishtime']));
                //预计完成时间，实际完成时间（/分钟）
                let exptime=(enddatestamp-startdatestamp)/(1000*60);
                let actualtime=(finishdatestamp-startdatestamp)/(1000*60);
                //效率（保留小数点2位）
                let eff=(exptime/actualtime).toFixed(2);
                //处理x轴某个点y轴数据不存在或者出现多组数据的情况（当有多组的数据的时候，取其最大值）
                //对x轴数据做探空处理
                if(options.xAxis.data!=null&&options.xAxis.data!==""&&options.xAxis.data!==undefined)
                {
                  let xdata=options.xAxis.data;
                  let ydata= options.series[0].data;
                  for(let index in xdata)
                  {
                    //判断预计完成时间和对应x轴是否一致，避免因y轴数据不存在导致的数据错乱
                    if(enddate_d===xdata[index])
                    {
                      //y轴尚未赋值
                      if(ydata[index]===null||ydata[index]===""||ydata[index]===undefined)
                      {
                        //为y轴赋值,x轴与y轴保持一致，故索引可以通用。
                        options.series[0].data[index]=eff;
                      }
                      //y轴已赋值,则取其最大值（多组数据的情况）
                      else if(ydata[index]!==null&&ydata[index]!==""&&eff>ydata[index])
                      {
                          options.series[0].data[index]=eff;
                      }
                    }
                  }
                }

              }
              //图表初始化
              this.$children[0].init();

            })
          .catch((err)=>{
              console.log(err.status,err.message);
            })
          }
       },
    components: {
      mpvueEcharts
    }
    }
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 300px;
  }
  ec-canvas {
    width: 400px;
    height: 400px;
  }
</style>
