import { config } from '../config.js'
const showTips = {
  1: '对不起，出现了一个错误',
  1005: 'appkey不存在',
  3000: '期刊不存在'
}
class HTTP {
    request({url,data={},method='GET'}){
        return new Promise((resolve,reject)=>{
          this._request(url, resolve, reject, data, method)
        })
    }

  _request(url, resolve, reject, data={}, method='GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (error) => {
        reject(error)
        this._show_error(1)
      }
    })
  }
  _show_error(errorCode) {
    if (!errorCode) {
      errorCode = 1
    }
    wx.showToast({
      title: showTips[errorCode],
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP }