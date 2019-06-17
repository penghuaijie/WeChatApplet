
import { BookModel} from '../../Models/book.js'

let bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searchSrc:'../../images/icon/search.png',
    quality:'../../images/book/quality.png',
    searching:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      bookModel.getHotBooKList()
      .then(res=>{
          this.setData({
            books:res
          })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onSearch(event) {
    this.setData({
      searching:true
    })
  },

  onCancelSearch(event) {
    this.setData({
      searching: false
    })
  }
})