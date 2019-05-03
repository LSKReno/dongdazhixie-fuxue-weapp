//获取应用实例
var app = getApp()
Page({
    data: {
        mainUrl: "http://192.168.43.54:8998",
        stuid: "",
        name: "",
        college: "",
        qqmail: "",
        date: '2019-05-01'
    }, //zixi登录

    inputStuid: function(e) {
        // console.log(e.detail)
        this.setData({
            stuid: e.detail
        })

    },
    inputName: function(e) {
        this.setData({
            name: e.detail
        })
    },
    inputCollege: function(e) {
        this.setData({
            college: e.detail
        })
    },
    inputQQmail: function(e) {
        this.setData({
            qqmail: e.detail
        })
    },
    zixiSignin: function() {
        // console.log(this.data.date)
        try {
            wx.setStorageSync('personType', 2)
            wx.setStorageSync('stuid', this.data.stuid)
            wx.setStorageSync('name', this.data.name)
            wx.setStorageSync('college', this.data.college)
            wx.setStorageSync('qqmail', this.data.qqmail)
        } catch (e) {
            console.log("自习personType本地出错啦")
        }
        console.log("stuid: " + this.data.stuid)
        wx.request({
            url: this.data.mainUrl + '/zixi', // 接口地址
            data: {
                stuid: this.data.stuid,
                name: this.data.name,
                college: this.data.college,
                qqmail: this.data.qqmail,
                time: this.data.date,
            },
            method: "post",
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                let responseObj = JSON.parse(res.data);
                let status = responseObj.status;
                if (status == 200) {} else {
                    console.log("糟糕，服务器出问题啦")
                }
                wx.redirectTo({
                    url: '../process/process',
                })
            }
        })


    },
    bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindDateChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },

    onInput(event) {
        this.setData({
            currentDate: event.detail.value
        });
    },
    onLoad: function() {
        this.setData({
            stuid: wx.getStorageSync("stuid"),
            name: wx.getStorageSync("name"),
            college: wx.getStorageSync("college"),
            qqmail: wx.getStorageSync("qqmail"),
        })
    }

})