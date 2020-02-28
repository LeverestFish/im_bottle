/**
 * some size problem
 */
var sizeInformation = {
  
}


/**
 * some attributes of the bottle
 */
var water = {
  x: 0,
  y: 10,
  url: '../../image/water.png'
}

/**
 * some attributes of the bottle
 */
var bottle = {
  x: 0,
  y: 0,
  url: '../../image/bottle.png'
}

var lastPoint = {
  x: 0,
  y: 0
}

var ctx = null;

function draw() {
  ctx.drawImage(water.url, 0, 0, 130, 200, 0, water.y, 130, 200);
  ctx.drawImage(bottle.url, 0, 0, 130, 200, 0, 0, 130, 200);
  ctx.draw();
}

// bottle.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ctx = wx.createCanvasContext('myCanvas');
    draw();
  },

  /**
   * 用户开始触摸点击
   */
  start: function(e) {
    console.log(water.y);
    var y = e.touches[0].y;
    lastPoint.y = y;
  },
  
  /**
   * 用户开始移动
   */
  move: function(e) {
    var y = e.touches[0].y;
    var y_after = water.y + y - lastPoint.y;
    if(y_after <= 10 && y_after >= -200) {
      water.y = y_after;
      lastPoint.y = y;
      draw();
    }
  },

  /**
   * 用户结束移动
   */
  end: function(e) {
  }
})