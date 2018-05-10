let serverPath=''
export function post(url,body) {
  return new Promise((resolve,reject)=>{
    wx.request({
    url:serverPath+url,
    data:body,
    method:POST,
    header:{
      'content-type':'application/json'
    },
    success(res){
      resolve(res.data)
    },
    fail(ret){
      reject(ret)
    }


  })
  })

}
