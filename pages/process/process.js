var root = getApp()
var util = require('../../utils/util.js')

Page({
    data: {
        mainUrl: "http://192.168.43.54:8998",
        imgUrl: "",
        images: [],
        uploadedImages: [], //照片上传
        personType: 0,
        stuid: "",
        // 对应人的信息
        matchName: "...",
        matchQqMail: "...",
        matchCollege: "...",
        matchStuid: "...",

        active: 0,
        steps: [{
                text: '完成登陆',
            },
            {
                text: '完成匹配',
            },
            {
                text: '完成约见',
            }
        ]
    },


    // 监听页面加载
    onLoad: function() {
        var that = this
        that.setData({
            personType: wx.getStorageSync("personType")
        })

        // 大佬请求匹配
        if (that.data.personType == 0) {
            // console.log("dalao-stuid" + that.data.stuid)
            wx.request({
                url: that.data.mainUrl+'/dalao/match', // 接口地址
                data: {
                    stuid: wx.getStorageSync('stuid')
                },
                method: "post",
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    let responseObj = JSON.parse(res.data);
                    let match = responseObj.data.match;
                    if (match == 0) {
                        that.setData({
                            active: 0
                        })

                    } else if (match == 1) {
                        that.setData({
                            active: 1
                        })

                        setTimeout(function() {
                            // 再次发出请求，得到对方信息
                            wx.request({
                                url: that.data.mainUrl +'/dalao/getMatchInformation', // 接口地址
                                data: {
                                    stuid: wx.getStorageSync('stuid')
                                },
                                method: "post",
                                header: {
                                    'content-type': 'application/json'
                                },
                                success(res) {
                                    // matchName: "匹配者学号",
                                    //     matchQqMail: "匹配者邮箱",
                                    //         matchCollege: "匹配者学院",
                                    //             matchStuid: "匹配者学号",
                                    console.log("dalao-match: ")
                                    console.log(res)
                                    let responseObj = JSON.parse(res.data);
                                    let matchName = responseObj.data.matchName;
                                    let matchQqmail = responseObj.data.matchQqmail;
                                    let matchCollege = responseObj.data.matchCollege;
                                    let matchStuid = responseObj.data.matchStuid;
                                    that.setData({
                                        matchName: matchName.substring(0,1),
                                        matchQqMail: matchQqmail,
                                        matchCollege: matchCollege,
                                        matchStuid: matchStuid.substring(0,4)
                                    })
                                }
                            })
                        }, 1200)

                    } else if (match == 2) {
                        that.setData({
                            active: 2
                        })
                    }
                    try {
                        wx.setStorageSync('active', that.data.active)
                    } catch (e) {
                        console.log("大佬active本地出错啦")
                    }
                }
            })
        }
        // 学渣请求匹配
        else if (that.data.personType == 1) {
            wx.request({
                url: that.data.mainUrl +'/xuezha/match', // 接口地址
                data: {
                    stuid: wx.getStorageSync('stuid')
                },
                method: "post",
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    // console.log(res)
                    let responseObj = JSON.parse(res.data);
                    let match = responseObj.data.match;
                    console.log("match: " + match)

                    if (match == 0) {
                        that.setData({
                            active: 0
                        })
                    } else if (match == 1) {
                        that.setData({
                            active: 1
                        })
                        setTimeout(function() {

                            // 再次发出请求，得到对方信息
                            wx.request({
                                url: that.data.mainUrl +'/xuezha/getMatchInformation', // 接口地址
                                data: {
                                    stuid: wx.getStorageSync('stuid')
                                },
                                method: "post",
                                header: {
                                    'content-type': 'application/json'
                                },
                                success(res) {
                                    // matchName: "匹配者学号",
                                    //     matchQqMail: "匹配者邮箱",
                                    //         matchCollege: "匹配者学院",
                                    //             matchStuid: "匹配者学号",
                                    console.log("xuezha-match: ")
                                    console.log(res)
                                    let responseObj = JSON.parse(res.data);
                                    let matchName = responseObj.data.matchName;
                                    let matchQqmail = responseObj.data.matchQqmail;
                                    let matchCollege = responseObj.data.matchCollege;
                                    let matchStuid = responseObj.data.matchStuid;
                                    that.setData({
                                        matchName: matchName.substring(0, 1),
                                        matchQqMail: matchQqmail,
                                        matchCollege: matchCollege,
                                        matchStuid: matchStuid.substring(0, 4)
                                    })
                                }
                            })

                        }, 1200)

                    } else if (match == 2) {
                        that.setData({
                            active: 2
                        })
                    }
                }
            })
        }
        // 自习人请求匹配
        else if (that.data.personType == 2) {
            wx.request({
                url: that.data.mainUrl +'/zixi/match', // 接口地址
                data: {
                    stuid: wx.getStorageSync('stuid')
                },
                method: "post",
                header: {
                    'content-type': 'application/json'
                },
                success(res) {

                    let responseObj = JSON.parse(res.data);
                    let match = responseObj.data.match;
                    if (match == 0) {
                        that.setData({
                            active: 0
                        })


                    } else if (match == 1) {
                        that.setData({
                            active: 1
                        })
                        setTimeout(function() {
                            // 再次发出请求，得到对方信息
                            wx.request({
                                url: that.data.mainUrl +'/zixi/getMatchInformation', // 接口地址
                                data: {
                                    stuid: wx.getStorageSync('stuid')
                                },
                                method: "post",
                                header: {
                                    'content-type': 'application/json'
                                },
                                success(res) {
                                    // matchName: "匹配者学号",
                                    //     matchQqMail: "匹配者邮箱",
                                    //         matchCollege: "匹配者学院",
                                    //             matchStuid: "匹配者学号",
                                    console.log("zixiren-match")
                                    console.log(res)
                                    let responseObj = JSON.parse(res.data);
                                    let matchName = responseObj.data.matchName;
                                    let matchQqmail = responseObj.data.matchQqmail;
                                    let matchCollege = responseObj.data.matchCollege;
                                    let matchStuid = responseObj.data.matchStuid;
                                    that.setData({
                                        matchName: matchName.substring(0, 1),
                                        matchQqMail: matchQqmail,
                                        matchCollege: matchCollege,
                                        matchStuid: matchStuid.substring(0, 4)
                                    })
                                }
                            })
                        }, 1200)
                    } else if (match == 2) {
                        that.setData({
                            active: 2
                        })
                    }
                }
            })
        }
    },
    // 上传照片
    chooseImage: function() {
        var that = this
        // 选择图片
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                console.log(tempFilePaths);
                that.setData({
                    images: that.data.images.concat(tempFilePaths)
                });
            }
        })
    },
    // 图片预览
    previewImage: function(e) {
        //console.log(this.data.images);
        var current = e.target.dataset.src
        wx.previewImage({
            current: current,
            urls: this.data.images
        })
    },
    submit: function() {
        // console.log("images[0]:  "+this.data.images[0])
        var that = this
        if (that.data.personType == 0) {
            // 上传照片到

            wx.uploadFile({
                url: 'https://sm.ms/api/upload',
                filePath: that.data.images[0],
                name: 'smfile',
                async: false,
                success: res => {
                    console.log("上传图片：")
                    console.log(res)
                    let responseObj = JSON.parse(res.data);
                    let url = responseObj.data.url;
                    that.setData({
                        imgUrl: url
                    })
                    console.log('上传成功：', that.data.imgUrl);


                    let imgurl = that.data.imgUrl
                    console.log("imgurl: " + imgurl)
                    wx.request({
                        url: that.data.mainUrl +'/dalao/finishMeeting', // 接口地址
                        data: {
                            stuid: wx.getStorageSync('stuid'),
                            imgUrl: imgurl
                        },
                        method: "post",
                        header: {
                            'content-type': 'application/json'
                        },
                        success(res) {
                            // console.log(this.data.stuid)
                            // 大佬请求匹配
                            if (that.data.personType == 0) {
                                wx.request({
                                    url: that.data.mainUrl +'/dalao/match', // 接口地址
                                    data: {
                                        stuid: wx.getStorageSync('stuid')
                                    },
                                    method: "post",
                                    header: {
                                        'content-type': 'application/json'
                                    },
                                    success(res) {

                                        let responseObj = JSON.parse(res.data);
                                        let match = responseObj.data.match;
                                        if (match == 0) {
                                            that.setData({
                                                active: 0
                                            })
                                        } else if (match == 1) {
                                            that.setData({
                                                active: 1
                                            })
                                        } else if (match == 2) {
                                            that.setData({
                                                active: 2
                                            })
                                        }
                                    }
                                })
                            }
                            // 学渣请求匹配
                            else if (that.data.personType == 1) {
                                wx.request({
                                    url: that.data.mainUrl +'/xuezha/match', // 接口地址
                                    data: {
                                        stuid: wx.getStorageSync('stuid')
                                    },
                                    method: "post",
                                    header: {
                                        'content-type': 'application/json'
                                    },
                                    success(res) {

                                        let responseObj = JSON.parse(res.data);
                                        let match = responseObj.match;
                                        if (match == 0) {
                                            that.setData({
                                                active: 0
                                            })
                                        } else if (match == 1) {
                                            that.setData({
                                                active: 1
                                            })
                                        } else if (match == 2) {
                                            that.setData({
                                                active: 2
                                            })
                                        }
                                    }
                                })
                            }
                            // 自习人请求匹配
                            else if (that.data.personType == 2) {
                                wx.request({
                                    url: that.data.mainUrl +'/zixi/match', // 接口地址
                                    data: {
                                        stuid: wx.getStorageSync('stuid')
                                    },
                                    method: "post",
                                    header: {
                                        'content-type': 'application/json'
                                    },
                                    success(res) {
                                        let responseObj = JSON.parse(res.data);
                                        let match = responseObj.data.match;
                                        if (match == 0) {
                                            that.setData({
                                                active: 0
                                            })
                                        } else if (match == 1) {
                                            that.setData({
                                                active: 1
                                            })
                                        } else if (match == 2) {
                                            that.setData({
                                                active: 2
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                },
                fail: res =>{
                    wx.showToast({
                        title: '上传失败，请检测当前网络环境',
                    })
                }
            })


        } else {
            wx.request({
                url: that.data.mainUrl +'/zixi/finishMeeting', // 接口地址
                data: {
                    stuid: wx.getStorageSync('stuid'),
                    // imgUrl: imgurl
                },
                method: "post",
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    // console.log(this.data.stuid)
                    // 大佬请求匹配
                    if (that.data.personType == 0) {
                        wx.request({
                            url: that.data.mainUrl +'/dalao/match', // 接口地址
                            data: {
                                stuid: wx.getStorageSync('stuid')
                            },
                            method: "post",
                            header: {
                                'content-type': 'application/json'
                            },
                            success(res) {

                                let responseObj = JSON.parse(res.data);
                                let match = responseObj.data.match;
                                if (match == 0) {
                                    that.setData({
                                        active: 0
                                    })
                                } else if (match == 1) {
                                    that.setData({
                                        active: 1
                                    })
                                } else if (match == 2) {
                                    that.setData({
                                        active: 2
                                    })
                                }
                            }
                        })
                    }
                    // 学渣请求匹配
                    else if (that.data.personType == 1) {
                        wx.request({
                            url: that.data.mainUrl +'/xuezha/match', // 接口地址
                            data: {
                                stuid: wx.getStorageSync('stuid')
                            },
                            method: "post",
                            header: {
                                'content-type': 'application/json'
                            },
                            success(res) {

                                let responseObj = JSON.parse(res.data);
                                let match = responseObj.match;
                                if (match == 0) {
                                    that.setData({
                                        active: 0
                                    })
                                } else if (match == 1) {
                                    that.setData({
                                        active: 1
                                    })
                                } else if (match == 2) {
                                    that.setData({
                                        active: 2
                                    })
                                }
                            }
                        })
                    }
                    // 自习人请求匹配
                    else if (that.data.personType == 2) {
                        wx.request({
                            url: that.data.mainUrl +'/zixi/match', // 接口地址
                            data: {
                                stuid: wx.getStorageSync('stuid')
                            },
                            method: "post",
                            header: {
                                'content-type': 'application/json'
                            },
                            success(res) {
                                let responseObj = JSON.parse(res.data);
                                let match = responseObj.data.match;
                                if (match == 0) {
                                    that.setData({
                                        active: 0
                                    })
                                } else if (match == 1) {
                                    that.setData({
                                        active: 1
                                    })
                                } else if (match == 2) {
                                    that.setData({
                                        active: 2
                                    })
                                }
                            }
                        })
                    }
                }
            })
            console.log("学渣和自习人上传成功")
        }






        // console.log("uploadedImages:  "+this.data.uploadedImages)
        // console.log("images:  "+this.data.images)

    },
    delete: function(e) {
        var that = this
        var index = e.currentTarget.dataset.index;
        var images = that.data.images;
        images.splice(index, 1);
        that.setData({
            images: images
        });
    },
    // 再来一次，清理active状态
    again: function() {
        // 清理状态
        try {
            wx.removeStorageSync('personType')
            wx.removeStorageSync('stuid')
            wx.removeStorageSync('name')
            wx.removeStorageSync('college')
            wx.removeStorageSync('qqmail')
            wx.removeStorageSync('course')
            wx.removeStorageSync('active')
            wx.removeStorageSync('logs')
        } catch (e) {
            // Do something when catch error
        }

        // 导航回主界面
        wx.redirectTo({
            url: '../home/home',
        })
    },
    //  监听页面初次渲染完成
    onReady: function() {

    },
    onShow: function() {
        // console.log("page ---onShow---");
    },
    onHide: function() {
        // console.log("page ---onHide---");
    },
    onUnload: function() {
        // console.log("page ---onUnload---");
    }
})