// Components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content:String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc:'images/triangle@left.png',
    leftDisSrc: 'images/triangle.dis@left.png',
    rightSrc: 'images/triangle@right.png',
    rightDisSrc: 'images/triangle.dis@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(event){
      if(!this.properties.latest) {
        this.triggerEvent('left', {}, {})
      }
    },
    onRight: function (event) {
      if(!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
