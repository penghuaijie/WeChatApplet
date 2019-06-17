import {config} from '../config.js'
const showTips = {
  1: '对不起，出现了一个错误',
  1005: 'appkey不存在',
  3000: '期刊不存在'
}
class HTTP{
  request(params){
    if(params.method == null) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header:{
        'content-type':'application/json',
        'appkey':config.appkey
      },
      success:(response)=>{
        let code = response.statusCode.toString()
        if (code.startsWith('2')){
          params.success && params.success(response.data)
        } else {
          this._show_error(response.data.errorCode)
        }
      },
      fail:(error)=>{
        console.log("fail")
        this._show_error(1)
      }
    })
  }
  _show_error(errorCode){
    if(!errorCode){
      errorCode = 1
    }
    wx.showToast({
      title: showTips[errorCode],
      icon: 'none',
      duration: 2000
    })
  }
}
export {HTTP}