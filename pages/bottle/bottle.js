/**
 * some size problem
 */
var sizeInformation = {
  
};

const config = {
  waterUrl: '../../image/water.png',
  bottleUrl: '../../image/bottle.png',

};

function bottle(canvasID,) {
  this.waterY = 5;
  this.lastPointY = 0;
  this.ctx = wx.createCanvasContext(canvasID);
  this.drawBottle = function() {
    this.ctx.drawImage(config.waterUrl, 0, 0, 130, 200, 0, this.waterY, 59, 108);
    this.ctx.drawImage(config.bottleUrl, 0, 0, 130, 200, 0, 0, 59, 108);
    this.ctx.draw();
  }
};

var myBottle = null;

// bottle.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bottleArray: [
      {
        canvasID: '1',
        bottleName: '忘忧瓶'
      },
      {
        canvasID: '2',
        bottleName: '忘忧瓶1'
      },
      {
        canvasID: '3',
        bottleName: '忘忧瓶2'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myBottle = new bottle('1');
    myBottle.drawBottle();
  },

  /**
   * 用户开始触摸点击
   */
  start: function(e) {
    console.log(e);
    var y = e.touches[0].y;
    myBottle.lastPointY = y;
  },
  
  /**
   * 用户开始移动
   */
  move: function(e) {
    console.log(e);
    var y = e.touches[0].y;
    var y_after = myBottle.waterY + y - myBottle.lastPointY;
    if(y_after <= 5 && y_after >= -108) {
      myBottle.waterY = y_after;
      myBottle.lastPointY = y;
      myBottle.drawBottle();
    }
  },

  /**
   * 用户结束移动
   */
  end: function(e) {
  }
})