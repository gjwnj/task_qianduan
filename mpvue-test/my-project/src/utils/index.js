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
export function getCurrentDate()
{
  let jiange="-";
  let cdate=new Date();
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

export function getCurrentTime()
{
  let jiange=":";
  let cdate=new Date();
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


