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

const BOTTLE_NAME = [
  '忘忧瓶',
  '断肠瓶',
  '故人一去从此不复返瓶',
  'test1',
  'test2',
  'test3',
  'test4',
];
var bottleArray = [];
var bottleNum = BOTTLE_NAME.length;
for (let i = 0; i < bottleNum; i++) {
  // bottleArray[i].canvasID = i;
  // bottleArray[i].bottleName = BOTTLE_NAME[i];
  bottleArray[i] = {
    canvasID: 'canvas-' + i,
    bottleName: BOTTLE_NAME[i]
  }
}
var myBottle = [];

// bottle.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bottleArray
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (let i = 0; i < bottleNum; i++) {
      myBottle[i] = new bottle('canvas-' + i);
      myBottle[i].drawBottle();
    }
    // myBottle[0] = new bottle('0');
    // myBottle[0].drawBottle();
    // myBottle[1] = new bottle('1');
    // myBottle[1].drawBottle();
  },

  /**
   * 用户开始触摸点击
   */
  start: function(e) {
    var index = parseInt(e.target.id.charAt(7));
    var y = e.touches[0].y;
    myBottle[index].lastPointY = y;
  },
  
  /**
   * 用户开始移动
   */
  move: function(e) {
    var index = parseInt(e.target.id.charAt(7));
    var y = e.touches[0].y;
    var y_after = myBottle[index].waterY + y - myBottle[index].lastPointY;
    if(y_after <= 5 && y_after >= -108) {
      myBottle[index].waterY = y_after;
      myBottle[index].lastPointY = y;
      myBottle[index].drawBottle();
    }
  },

  /**
   * 用户结束移动
   */
  end: function(e) {
  }
})