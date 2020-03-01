/**
 * some size parameter
 */
var sizeInformation = {
  windowWidth: 375,
  // x rpx的东西要画 _375 / 2 * windowWidth_ (px) 的canvas
  rpxToPx: null
};

const config = {
  waterUrl: '../../image/water.png',
  bottleUrl: '../../image/bottle.png',
  color: '#fc5185'
};

const BOTTLE_NAME = [
  '忘忧瓶',
  '断肠瓶',
  '故人一去从此不复返瓶',
  'test1',
  'test2',
  'test3',
  'test4',
  'test5',
  'test6',
  'test7',
  'test8',
  'test9',
  'test10',
  'test11'
];

function bottle(canvasID,) {
  this.waterY = 40;
  this.lastPointY = 0;
  this.ctx = wx.createCanvasContext(canvasID);
  this.color = '#fc5185'
  this.drawBottle = function() {
    this.setBackground();
    this.ctx.drawImage(config.waterUrl, 0, 0, 246, 450, -1, -2 + this.waterY * sizeInformation.rpxToPx, 122 * sizeInformation.rpxToPx, 220 * sizeInformation.rpxToPx);
    this.ctx.drawImage(config.bottleUrl, 0, 0, 246, 450, -1, -2, 122 * sizeInformation.rpxToPx, 220 * sizeInformation.rpxToPx);
    this.ctx.draw();
  }
  this.setBackground = function() {
    this.ctx.rect(1, 1, 116 * sizeInformation.rpxToPx, 214 * sizeInformation.rpxToPx);
    this.ctx.setFillStyle(config.color);
    this.ctx.fill();
  }
};

var myBottle = []; // 存放bottle实例
var bottleArray = []; // 用于渲染前端的data数组
var bottleNum = BOTTLE_NAME.length; //存放data数组个数，也即瓶子的数量
// 根据bottle名字列表来初始化data
for (let i = 0; i < bottleNum; i++) {
  bottleArray[i] = {
    canvasID: 'canvas-' + i,
    bottleName: BOTTLE_NAME[i]
  }
}

// bottle.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bottleArray,
    loading: false,
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function(res){
        sizeInformation.windowWidth=res.windowWidth;
        sizeInformation.rpxToPx = res.windowWidth / (2.0 * 375.0);
        console.log(sizeInformation.rpxToPx);
      }
    })
    for (let i = 0; i < bottleNum; i++) {
      myBottle[i] = new bottle('canvas-' + i);
      myBottle[i].drawBottle();
    }
  },

  /**
   * 用户开始触摸点击
   */
  start: function(e) {
    var index = parseInt(e.target.id.slice(7));
    var y = e.touches[0].y / sizeInformation.rpxToPx;
    myBottle[index].lastPointY = y;
  },
  
  /**
   * 用户开始移动
   */
  move: function(e) {
    var index = parseInt(e.target.id.slice(7));
    var y = e.touches[0].y / sizeInformation.rpxToPx;
    var y_after = myBottle[index].waterY + y - myBottle[index].lastPointY;
    if(y_after <= 40 && y_after >= -210) {
      myBottle[index].waterY = y_after;
      myBottle[index].lastPointY = y;
      myBottle[index].drawBottle();
    }
  },

  /**
   * 用户结束移动
   */
  end: function(e) {
    // donothing
  },

  onTap: function(e) {
    // create pics
  }
})