// pages/classic/classic.js
import {ClassicModel} from '../../Models/classic.js' 
import {FavorateModel} from '../../Models/like.js'

let classicModel = new ClassicModel()
let favorateModel = new FavorateModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeModel:null,
    first:false,
    latest:true,
    likeStatus:false,
    likeCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((response)=>{
      // 数据更新
        this.setData({
          likeModel: response,
          likeStatus: response.like_status,
          likeCount: response.fav_nums
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

  onLike: function (event) {
    console.log(event)
    let behavior = event.detail.behavior
    favorateModel.like(behavior, this.data.likeModel.id, this.data.likeModel.type)
  },

  onNext:function(event){
    this._updateClassic('next')
  },

  onPrevious:function(event) {
    this._updateClassic('previous')
  },

  _updateClassic:function(nextOrPrevious) {
    let index = this.data.likeModel.index
    classicModel.getClassic(index, nextOrPrevious,(res) => {
      this._getClassicLikeStatus(res.id, res.type),
      this.setData({
        likeModel: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },


  _getClassicLikeStatus:function(like_id,category){
    classicModel.getFavorite(category,like_id,(response)=>{
      this.setData({
        likeStatus: response.like_status,
        likeCount: response.fav_nums
      })
    })
  }

})