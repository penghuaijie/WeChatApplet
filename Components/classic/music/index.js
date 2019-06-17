import { classicBeh } from '../classic-behavior.js'

const backgroundAudioManager = wx.getBackgroundAudioManager()
Component({
  behaviors:[classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    image:String,
    content:String,
    musicUrl:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    music:'images/music.png',
    pasue: 'images/pasue.png',
    playing: 'images/playing.png',
    isPlay: Boolean
  },

  detached:function() {
    
  },

  attached: function () {
    console.log('attached')
    this._recoverStatus()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event) {
      let play = this.data.isPlay
      if (!play) {
        backgroundAudioManager.title = '千面堕戈'
        backgroundAudioManager.src = this.properties.musicUrl
        this.setData({
          isPlay: true
        })
      }
      else {
        this.setData({
          isPlay: false
        })
        backgroundAudioManager.pause()
      }
    },

    _recoverStatus:function(){
      if(backgroundAudioManager.paused){
        this.setData({
          isPlay:false
        })
        return
      }

      if (backgroundAudioManager.src == this.properties.musicUrl) {
        this.setData({
          isPlay: true
        })
      }
    }
  }
})
