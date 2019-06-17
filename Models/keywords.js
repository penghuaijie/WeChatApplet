


import {HTTP} from '../util/http-p.js'

class KeywordsModel extends HTTP{
  key = 'q'
  maxLength = 10
  getHistory(){
    let words = wx.getStorageSync(this.key)
    if(!words) {
      return []
    }
    return words
  }

  getHot(){
     return this.request({
      url:'/book/hot_keyword'
    })
  }

  addToHistory(word){
    let words = this.getHistory()
    const has = words.includes(word)
    if(!has) {
      if (words.length >= this.maxLength) {
        words.pop()
      }
      // 插入数组第一位
      words.unshift(word)
      wx.setStorageSync(this.key, words)
    }
  }

  getSearchResult(word) {
    return this.request({
      url: '/book/search',
      data: {
        start: 0,   
        count: 20,
        summary:0,
        q: word
      }
    })
  }
}

export {KeywordsModel}