// pages/book-detail/book-detail.js

import {
  BookModel,
} from '../../Models/book.js'

import {
  FavorateModel,
} from '../../Models/like.js'

const bookModel = new BookModel()
const favorateModel = new FavorateModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo:null,
    comments:[],
    likeStatus:false,
    likeCount:0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bookId = options.bookId
    wx.showLoading()
    const detail = bookModel.getBookDetail(bookId)
    const comments = bookModel.getBookComments(bookId)
    const favo = bookModel.getBookFavoStatus(bookId)

    Promise.all([detail, comments, favo])
    .then(res=>{
        this.setData({
          bookInfo: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading()
    })

    // detail.then((res)=>{
    //   this.setData({
    //     bookInfo: res
    //   })
    // })

    // comments.then((res) => {
    //   console.log(res)
    //   this.setData({
    //     comments: res.comments
    //   })
    // })

    // favo.then((res) => {
    //     this.setData({
    //       likeStatus: res.like_status,
    //       likeCount: res.fav_nums
    //     })
    // })
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

  onLike(event) {
    const like_cancel = event.detail.behavior
    favorateModel.like(like_cancel,this.data.bookInfo.id, 400)
  },

  onFakePost() {
    this.setData({
      posting:true
    })
  },

  onCancel(){
    this.setData({
      posting:false
    })
  },

  onPost(event){
    const comment = event.detail.text || event.detail.value
    if(!comment) {
      return
    }

    if(comment.length>12) {
      wx.showToast({
        title: '短评不能超过12个字',
        icon:'none'
      })
      return
    }
    bookModel.postComment(this.data.bookInfo.id,comment)
    .then((res)=>{
      wx.showToast({
        title: '+1',
        icon: 'none'
      })

      this.data.comments.unshift({
        content:comment,
        nums: 1
      })

      this.setData({
        comments:this.data.comments,
        posting:false
      })
    })
  }
})