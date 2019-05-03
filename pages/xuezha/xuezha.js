//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        mainUrl: "http://192.168.43.54:8998",        
        stuid: "",
        name: "",
        college: "",
        qqmail: "",
        multiArray: [
            ['数学', '哲学', '物理学', '建筑学', '计算机科学与技术', '化学', '工商管理', '法学', '其他'],
            ['高等数学', '线性代数', '离散数学', '概率论', '大学数学(文)', '数值分析', '复变函数',
                '逻辑学',
                '大学物理', '电路原理',
                '造型基础', '画法几何与透视',
                'C语言', 'Python', 'Java', 'PS', '程序设计基础',
                '生物化学',
                '经济法', '中财',
                '法律', '社会学',
                '音乐', '心理健康'
            ]
        ],
        objectMultiArray: [
            [{
                    id: 0,
                    name: '数学'
                },
                {
                    id: 1,
                    name: '哲学'
                }, {
                    id: 2,
                    name: '物理学'
                },
                {
                    id: 3,
                    name: '建筑学'
                },
                {
                    id: 4,
                    name: '计算机科学与技术'
                }, {
                    id: 5,
                    name: '化学'
                },
                {
                    id: 6,
                    name: '工商管理'
                },
                {
                    id: 7,
                    name: '法学'
                }, {
                    id: 8,
                    name: '其他'
                }
            ]
        ],
        multiIndex: [0, 0],

    },
    inputStuid: function (e) {
        // console.log(e.detail)
        this.setData({
            stuid: e.detail
        })

    },
    inputName: function (e) {
        this.setData({
            name: e.detail
        })
    },
    inputCollege: function (e) {
        this.setData({
            college: e.detail
        })
    },
    inputQQmail: function (e) {
        this.setData({
            qqmail: e.detail
        })
    },

    //xuezha登录
    xuezhaSignin: function() {
        try {
            wx.setStorageSync('personType', 1)
            wx.setStorageSync('stuid', this.data.stuid)
            wx.setStorageSync('name', this.data.name)
            wx.setStorageSync('college', this.data.college)
            wx.setStorageSync('qqmail', this.data.qqmail)
            wx.setStorageSync('course', this.data.multiIndex) // 给出了课程大类和具体课程的位置index
        } catch (e) {
            console.log("学渣personType本地出错啦")
        }

        wx.request({
            url: this.data.mainUrl+'/xuezha', // 接口地址
            data: {
                stuid: this.data.stuid,
                name: this.data.name,
                college: this.data.college,
                qqmail: this.data.qqmail,
                course: this.data.multiIndex[0] + "," + this.data.multiIndex[1],
            },
            method: "post",
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                let responseObj = JSON.parse(res.data);
                let status = responseObj.status;
                if (status == 200) {
                } else {
                    console.log("糟糕，服务器出问题啦")
                }
                wx.redirectTo({
                    url: '../process/process',
                })
            }
        })

    },
    bindMultiPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function(e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            //
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['高等数学', '线性代数', '离散数学', '概率论', '大学数学(文)', '数值分析', '复变函数'];
                        break;
                    case 1:
                        data.multiArray[1] = ['逻辑学'];
                        break;
                    case 2:
                        data.multiArray[1] = ['大学物理', '电路原理'];
                        break;
                    case 3:
                        data.multiArray[1] = ['造型基础', '画法几何与透视'];
                        break;
                    case 4:
                        data.multiArray[1] = ['C语言', 'Python', 'Java', 'PS', '程序设计基础'];
                        break;
                    case 5:
                        data.multiArray[1] = ['生物化学'];
                        break;
                    case 6:
                        data.multiArray[1] = ['经济法', '中财'];
                        break;
                    case 7:
                        data.multiArray[1] = ['法律', '社会学'];
                        break;
                    case 8:
                        data.multiArray[1] = ['音乐', '心理健康'];
                        break;
                }
                data.multiIndex[1] = 0;
                break;
                // 
            case 1:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['高等数学', '线性代数', '离散数学', '概率论', '大学数学(文)', '数值分析', '复变函数'];
                        break;
                    case 1:
                        data.multiArray[1] = ['逻辑学'];
                        break;
                    case 2:
                        data.multiArray[1] = ['大学物理', '电路原理'];
                        break;
                    case 3:
                        data.multiArray[1] = ['造型基础', '画法几何与透视'];
                        break;
                    case 4:
                        data.multiArray[1] = ['C语言', 'Python', 'Java', 'PS', '程序设计基础'];
                        break;
                    case 5:
                        data.multiArray[1] = ['生物化学'];
                        break;
                    case 6:
                        data.multiArray[1] = ['经济法', '中财'];
                        break;
                    case 7:
                        data.multiArray[1] = ['法律', '社会学'];
                        break;
                    case 8:
                        data.multiArray[1] = ['音乐', '心理健康'];
                        break;
                }
                break;
                console.log(data.multiIndex);
                break;
        }
        this.setData(data);
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