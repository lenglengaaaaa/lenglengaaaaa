var OUT = {};
var env = ulink.getQueryString("ulenv");
// todo:上线后修改链接
OUT.site = {
    url: env == 'test' ? '//testapp.game.qq.com/index.php' : '//ulink.game.qq.com/app/4021/c18b4ca11f9dcea7/index.php',
    indexUrl: 'https://slg.qq.com/act/5130/a20210225newstar/index.html',
    iActId: '5130',//活动ID
    game: 'slg',
    sAppId: 'ULINK-TBRJ-729002'//腾讯优联APPID
};
//在之前先引入对应JS 初始化
var LoginManager = ulink.LoginManager;
// LoginManager.init({
//     openLinkUrl: ""
// });


var shareOptions = {
    iActId: OUT.site.iActId, // 活动号
    title: '乱世新秀，明日星宿', // 分享标题
    desc: '九鼎新星赛火热进行中，关注赛事进程，参与赛事竞猜，每周好礼相送！',  // 分享内容简介
    link: OUT.site.indexUrl,  // 分享链接
    imgUrl: 'https://game.gtimg.cn/images/slg/m/icon_share.jpg', // 分享后朋友看到的图标，大小不能超过32K
    WXtrigger: function (res) { // 微信分享点击事件回调

    },
    WXsuccess: function (res) { // 微信分享后回调
    },
    QQcallback: function (res) { // qq成功、失败、或取消的回调
    },
};
ulink.share.init(shareOptions);

var wxLogin = false;


//用户登录
OUT.login = {
    isLogin: false,//false 未登录 true 已登录
    doLogin: function () {
        LoginManager.checkLogin(function (userInfo) {

        }, function () {
            if (ulink.isQQApp()) {
                LoginManager.login();
            } else if (ulink.isWxApp()) {
                console.log('debug wx login');
                if (!wxLogin) {
                    wxLogin = true;
                    console.log('do wx login');
                    LoginManager.loginByWx();
                }
            } else {
                TGDialogS('dialog-login');
            }
        });
    },
    qq: function () {
        if (!ulink.isMSDK()) {
            LoginManager.openLink("https://slg.qq.com/act/5130/a20210225newstar/index.html");
        }
    },
    wx: function () {
        if (!wxLogin && !OUT.user.isLogin) {
            wxLogin = true;
            LoginManager.loginByWx();
        }
        return;
    },
    logout: function () {
        LoginManager.logout(function () {
            console.log('执行了退出登陆');
            // window.location.reload();
        });
    }
};

OUT.role = {
    channel: '',
    isBindRole: 0,
    roleInfo: {},
    // 更换绑定
    checkBind: function () {
        if (this.isBindRole == 0) {
            // 未绑定
            this.updateBindRole();
            return true;
        }
        return false;
    },
    updateBindRole: function () {
        if (OUT.login.isLogin === false) {
            return OUT.login.doLogin();
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Role/getRoleSecretInfo',
            params: {
                'sAppId': OUT.site.sAppId,
                'game': OUT.site.game,
                'iActId': OUT.site.iActId
            },
            success: function (result) {
                if (result.iRet != 0) {
                    showTips(result.sMsg);
                } else {
                    if (ulink.isObject(result.jData.roleData) && Object.keys(result.jData.roleData).length > 0) {
                        OUT.role.roleInfo = result.jData.roleData;
                    }
                    OUT.role.showBindRoleDialog(result.jData.signData);
                }
            },
            error: function (e) {
            }
        });
    },
    // 弹出绑定弹窗
    showBindRoleDialog: function (data) {
        if (OUT.login.isLogin === false) {
            return OUT.login.doLogin();
        }
        window.role = OUT.role.createRoleSelector(OUT.role.setOptions(data));
        console.log('roleselector========>' + JSON.stringify(window.role));
        window.role.show();
        TGDialogS('dialog-login-role');
    },
    // 设置options值
    setOptions: function (data) {
        console.log('=====>' + JSON.stringify(data));
        var filterChannels = [];
        if (ulink.isQQApp()) {
            filterChannels = ['微信'];
        } else if (ulink.isWxApp()) {
            filterChannels = ['手Q'];
        } else {
            var area = ulink.getQueryString('areaid');
            if (area.length > 0) {
                // area 1微信，2手Q
                if (area == '1') {
                    filterChannels = ['手Q'];
                } else if (area == '2') {
                    filterChannels = ['微信'];
                }
            }
        }
        var obj = {
            "sAppId": OUT.site.sAppId,  //腾讯优联APPID
            "iActId": OUT.site.iActId,   //活动ID
            "sSign": data.data.sSign,
            "game": OUT.site.game,
            "timestamp": data.data.timestamp,
            "sCode": data.data.sCode,
            "filterChannels": filterChannels,
            custom: true,    // 自定义皮肤必须指定为true
            UISettings: {   // 以下属性必须指定，且不能为空
                dialog: ulink.$('#pop'), // RoleSelector弹框
                channelSelect: ulink.$('#login-select-app'), // 渠道下拉框
                systemSelect: ulink.$('#login-select-system'),  // 系统下拉框
                areaSelect: ulink.$('#login-select-area'),    // 大区下拉框
                serverSelect: ulink.$('#ulinkServerSelect'),    // 服务器下拉框
                roleSelect: ulink.$('#login-select-role'),    // 角色下拉框
                roleSelectParent: ulink.$('#ulinkRoleSelectParent'), // 角色下拉框父节点
                errorMsgPanel: ulink.$('#ulinkErrorMessage'), // 错误信息展示面板
                confirmButton: ulink.$('#ulinkConfirmBtn'), // 确定按钮
                cancelButton: ulink.$('#ulinkCancelBtn'), // 取消按钮
                closeButton: ulink.$('#ulinkCloseBtn'), // 关闭按钮
            }
        };

        return obj;
    },
    // 调起角色选择器
    createRoleSelector: function (options) {
        var roleselector = new ulink.RoleSelector(options);
        //角色查询数据返回监听事件绑定
        roleselector.on("getRoleData", function (data) {
            OUT.role.bindRole(data);//绑定关系
        });
        console.log("角色数据", Object.keys(OUT.role.roleInfo).length, OUT.role.roleInfo);
        if (Object.keys(OUT.role.roleInfo).length > 0) {
            roleselector.on("renderAreaSuccess", function (data) {
                // 角色选择赋值
                console.log('开始角色赋值', OUT.role.roleInfo);
                roleselector.roleSelectChange(OUT.role.roleInfo.area, OUT.role.roleInfo.platId, OUT.role.roleInfo.partition, OUT.role.roleInfo.roleId);
            });
        }

        return roleselector;
    },
    // 请求后台接口， 绑定角色信息
    bindRole: function (data) {
        closeDialog();
        ulink.http.get({
            url: OUT.site.url + '?route=Role/bind',
            params: {
                'iActId': OUT.site.iActId,
                'area': data.area,
                'platId': data.platId,
                'partition': data.partition,
                'roleId': data.roleId,
                'game': OUT.site.game,
                'avatar': encodeURIComponent(OUT.role.avatar)
            },
            success: function (result) {
                console.log('bindRole=========>' + JSON.stringify(result));
                if (result.iRet != 0) {
                    closeDialog();
                    showTips(result.sMsg, "TGDialogS('dialog-login-role');");
                    return;
                }
                OUT.user.isBindRole = 1;
                showTips('绑定成功', 'window.location.reload()');
            },
            error: function (e) {
            }
        });
    }
};

// 提示信息
function showTips(msg, func) {
    func = func || 'closeDialog();';
    $('#dialog-system .dialog-written-desc span').text(msg);
    $('#dialog-system a').attr('href', 'javascript:closeDialog();' + func);
    TGDialogS('dialog-system');
    return;
}

// 获取区服信息
function getPartitionInfo(partition) {
    var data = SLGServerSelect.STD_DATA;
    var name = '';
    for (var i = 0; i < data.length; i++) {
        if (partition == data[i].v) {
            name = data[i].t;
            break;
        }
    }
    name = name.split("区");
    return name[0] + '区';
}

// 跳转到竞猜页面
function toPage() {
    if (OUT.login.isLogin === false) {
        return OUT.login.doLogin();
    }
    if (OUT.role.checkBind()) {
        return;
    }
    window.location.href = 'page.html';
}

// 弹出投注弹框
function showPoulPop(key, type, index) {
    console.log(OUT.user.betList[key]);
    var tmpData = OUT.user.betList[key];
    if (!tmpData) {
        return;
    }

    if (type == 1 && tmpData['fightBetGroupId'] != 0 && tmpData['fightBetGroupId'] != index) {
        return;
    }


    if (tmpData.status == 0 || tmpData.status == 3) {
        showTips('抱歉, 亲爱的玩家, 该赛事投注时间已结束不可投注');
        return;
    } else if (tmpData.status == 1) {
        showTips('抱歉, 亲爱的玩家, 该赛事还未到投注时间, 不可投注');
        return;
    }

    OUT.user.matchId = tmpData.matchId;
    OUT.user.optionId = index;
    OUT.user.type = type;
    $('#dialog-bet1 .bet-right em').eq(0).text(OUT.user.coinNum);
    TGDialogS('dialog-bet1');
}

// 显示更多玩法
function showMorePlay(key) {
    console.log(OUT.user.betList[key]);

    var tmpData = OUT.user.betList[key];
    if (!tmpData) {
        return;
    }
    $('#morePlayUl').attr('data-key', key);
    createMorePlayHtml(key);
    openSubPage('moreplay');
}

// 创建更多玩法html
function createMorePlayHtml(key) {
    var tmpData = OUT.user.betList[key];
    var tmp1 = $('#morePlayUl li').eq(0);
    if (tmpData['sumBetOptionId']) {
        tmp1.find('.btns').find('a').addClass('no');
        tmp1.find('.btns').find('a').eq(parseInt(tmpData['sumBetOptionId']) - 1).removeClass().addClass('btn-sub-vote');
    }

    var tmp2 = $('#morePlayUl li').eq(1);
    if (tmpData['subBetOptionId']) {
        tmp2.find('.btns').find('a').addClass('no');
        tmp2.find('.btns').find('a').eq(parseInt(tmpData['subBetOptionId']) - 6).removeClass().addClass('btn-sub-vote');
    }

}

// 弹出bet2
function showBet2() {
    var len = $('.lott-btns .on').length;
    if (len < 1) {
        showTips('请先选择倍数~');
        return;
    }
    $('#dialog-bet2 .bet-right em').eq(0).text(OUT.user.coinNum);
    TGDialogS('dialog-bet2');
}

// 弹出暂未开放
function showPending() {
    showTips('暂未开放, 敬请期待~');
    //TGDialogS('dialog-vote')
}
