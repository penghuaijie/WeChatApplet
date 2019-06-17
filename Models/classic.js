
import {HTTP} from '../util/http.js'
class ClassicModel extends HTTP {
  // 方法
  getLatest(sCallback){
    this.request({
      url: '/classic/latest',
      success: (res) => {
        this._setLatestIndex(res.index)
        sCallback(res)
      }
    })
  }

  getClassic(index,nextOrPrivious,sCallBack) {
    let key = nextOrPrivious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if(!classic) {
      this.request({
        url: '/classic/' + index + '/' + nextOrPrivious,
        success: (response) => {
          wx.setStorageSync(this._getKey(response.index), response)
          sCallBack(response)
        }
      })
    }
    else {
      sCallBack(classic)
    }
  }

  getFavorite(type,fav_id,sCallBack){
    this.request({
      url: '/classic/' + type + '/' + fav_id + '/favor',
      success:(response)=>{
        sCallBack(response)
      }
    })
  }

  isFirst(index){
    return index==1 ? true:false
  }

  isLatest(index) {
    let latestIndex = this._getLatesrIndex()
    return latestIndex==index?true:false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

    _getLatesrIndex() {
      let index = wx.getStorageSync('latest')
      return index
    }

    _getKey(index) {
      return 'classic-' + index
    }
}

export {ClassicModel}