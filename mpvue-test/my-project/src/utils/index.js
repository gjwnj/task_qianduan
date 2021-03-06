import Vue from 'vue'
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
//自定义公共函数
export function getCurrentDate(d)
{
  let jiange="-";
  let cdate=null;
  //该函数经过改造，能获取传入时间字符串的日期部分，因为该函数已被使用，不想改变量名
  if(arguments.length==0)
  {
    cdate=new Date();
  }
  else
  {
    cdate=new Date(d);
  }
  let cyear=cdate.getFullYear();
  let cmonth=cdate.getMonth()+1;
  let cday=cdate.getDate();
  if(cmonth>=1&&cmonth<=9)
  {
    cmonth="0"+cmonth;
  }
  if(cday>=1&&cday<=9)
  {
    cday="0"+cday;
  }
  let cdateString=cyear+jiange+cmonth+jiange+cday;
  return cdateString;
}
export function getCurrentTime(d)
{
  let jiange=":";
  let cdate=null;
  //该函数经过改造，能获取传入时间字符串的时间部分，因为该函数已被使用，不想改变量名
  if(arguments.length==0)
  {
    cdate=new Date();
  }
  else
  {
    cdate=new Date(d);
  }
  let ch=cdate.getHours();
  let cm=cdate.getMinutes();
  //后端接收类型为localdatetime类型时这步工作一定得做，不然报解析错误，而在util.date类型中不必，这大概是他唯一的优势了吧
  if(ch>=0&&ch<=9)
  {
    ch="0"+ch;
  }
  if(cm>=0&&cm<=9)
  {
    cm="0"+cm;
  }
  let ctime=ch+jiange+cm;
  //console.log(ch+jiange+cm);
  return ctime;
}

//获得所有的system和用户自定义的任务类型
//如果是把result返回该怎么处理异步回调
export function  getType(result,uid)
{
  Vue.prototype.$http.get("/taskmenu/"+uid).then((d)=>{
    for(let val in d.data["obj"])
    {
      result[val]=d.data["obj"][val]["name"];
    };
  }).catch(err=>{
    console.log(err.status,err.message)
  });
}


