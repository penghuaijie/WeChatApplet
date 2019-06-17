// Components/search/index.js
import {
  KeywordsModel
} from '../../Models/keywords.js'

const keywordsModel = new KeywordsModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historys:[],
    hots:[],
    inputText:String,
    results:[]
  },

  attached: function() {
    // 在组件实例进入页面节点树时执行
    this.setData({
      historys: keywordsModel.getHistory()
    })
    
    keywordsModel.getHot()
    .then(res=>{
      console.log(res)
      this.setData({
        hots:res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event){
      this.triggerEvent('cancel',{},{})
    },

    // 点击热门搜索词
    onHotTap(event){
      const word = event.detail.text
      keywordsModel.addToHistory(word)
      this.setData({
        historys: keywordsModel.getHistory()
      })
      this.updateInputText(word)
      this._getSearchResultWithKeyword(word)
    },

    //添加到历史
    onHistoryTap(event) {
      const word = event.detail.text
      this.updateInputText(word)
      this._getSearchResultWithKeyword(word)
    },

    //更新输入框
    updateInputText(word){
      if(!word) {
        return
      }
      this.setData({
        inputText: word
      })
    },

    // 键盘事件
    onConfirm(event){
      const value = event.detail.value
      keywordsModel.addToHistory(value)
      this.setData({
        historys: keywordsModel.getHistory()
      })
      this._getSearchResultWithKeyword(value)
    },

    _getSearchResultWithKeyword(value) {
      if (!value) {
        wx.showToast({
          title: '请输入搜索内容',
          icon: 'none'
        })
        return
      }
      wx.showLoading()
      keywordsModel.getSearchResult(value)
        .then(res => {
          wx.hideLoading()
          this.setData({
            results: res.books
          })
        })
    },

    //关闭按钮事件
    onClose(event) {
      this.setData({
        results: [],
        inputText:''
      })
    }
  }
})
