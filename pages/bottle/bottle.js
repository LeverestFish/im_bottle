/**
 * some size parameter
 */
var sizeInformation = {
  
};

const config = {
  waterUrl: '../../image/water.png',
  bottleUrl: '../../image/bottle.png',

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
  this.waterY = 5;
  this.lastPointY = 0;
  this.ctx = wx.createCanvasContext(canvasID);
  this.drawBottle = function() {
    this.ctx.drawImage(config.waterUrl, 0, 0, 130, 200, 0, this.waterY, 59, 108);
    this.ctx.drawImage(config.bottleUrl, 0, 0, 130, 200, 0, 0, 59, 108);
    this.ctx.draw();
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
    disabled: false,
    width: '123'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (let i = 0; i < bottleNum; i++) {
      myBottle[i] = new bottle('canvas-' + i);
      myBottle[i].drawBottle();
    }
    var that = this;
    wx.getSystemInfo({
      success: function(res){
        console.log(res);
        that.setData({width: res.windowWidth});
      }
    })
  },

  /**
   * 用户开始触摸点击
   */
  start: function(e) {
    var index = parseInt(e.target.id.slice(7));
    var y = e.touches[0].y;
    myBottle[index].lastPointY = y;
  },
  
  /**
   * 用户开始移动
   */
  move: function(e) {
    var index = parseInt(e.target.id.slice(7));
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
    // donothing
  },

  onTap: function(e) {
    // create pics
  }
})