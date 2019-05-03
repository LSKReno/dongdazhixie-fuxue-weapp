var root = getApp()
var util = require('../../utils/util.js')

Page({
    data: {
        stuid: "",
        active: 0
    },
    onLoad: function () {
        var that = this
        that.setData({
            stuid: wx.getStorageSync("stuid"),
            active: wx.getStorageSync("active")
        })
        if(that.data.stuid !=""){
            wx.redirectTo({
                url: '../process/process',
            })
        }
        
    }
    ,
    //跳转到dalao
    toDalao:function(e){
        console.log(e.detail.value)
        wx.redirectTo({
            url: '../dalao/dalao'
        })
    },
    //跳转到xuezha
    toXuezha: function () {
        wx.redirectTo({
            url: '../xuezha/xuezha',
        })
    },
    //跳转到zixi
    toZixi: function () {
        wx.redirectTo({
            url: '../zixi/zixi',
        })
    },

})