var OUT = {};
var env = ulink.getQueryString("ulenv");
// todo:上线后修改链接
OUT.site = {
    url: env == 'test' ? '//testapp.game.qq.com/index.php' : '//slg.game.qq.com/index.php',
    indexUrl: 'https://slg.qq.com/act/5130/a20210225newstar/index.html',
    iActId: '5130',//活动ID
    game: 'slg',
    sAppId: 'ULINK-TBRJ-729002'//腾讯优联APPID
};
//在之前先引入对应JS 初始化
var LoginManager = ulink.LoginManager;
LoginManager.init({
    openLinkUrl: ""
});


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


//用户登录
OUT.login = {
    isLogin: false,//false 未登录 true 已登录
    doLogin: function () {
        if (ulink.isQQApp()) {
            LoginManager.login();
        } else if (ulink.isWxApp()) {
            LoginManager.loginByWx();
        } else {
            TGDialogS('dialog-login');
        }
    },
    qq: function () {
        LoginManager.loginByPT();
    },
    wx: function () {
        return;
    },
    logout: function () {
        LoginManager.logout(function () {
            window.location.reload();
        });
    }
};

OUT.role = {
    channel: '',
    isBindRole: 0,
    roleInfo: [],
    // 更换绑定
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
                    OUT.role.showBindRoleDialog(result.jData);
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
        var obj = {
            "sAppId": OUT.site.sAppId,  //腾讯优联APPID
            "iActId": OUT.site.iActId,   //活动ID
            "sSign": data.data.sSign,
            "game": OUT.site.game,
            "timestamp": data.data.timestamp,
            "sCode": data.data.sCode,
            "filterChannels": OUT.role.channel,
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
        if (OUT.role.isBindRole == 1) {
            roleselector.on("renderAreaSuccess", function (data) {
                // 角色选择赋值
                roleselector.roleSelectChange(OUT.role.roleInfo.area, OUT.role.roleInfo.platId, OUT.role.roleInfo.partition, OUT.role.roleInfo.roleId);
            });
        }

        return roleselector;
    },
    // 请求后台接口， 绑定角色信息
    bindRole: function (data) {
        $('.m-bind-result').hide();
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
                    showTips(result.sMsg);
                    return;
                }
                OUT.user.isBindRole = 1;
                showTips('绑定成功', function () {
                    window.location.reload();
                });
                closeDialog();
            },
            error: function (e) {
            }
        });
    }
};

// 提示信息
function showTips(msg, func) {
    func = func || '';
    ulink.alert(msg, func);
    return;
}

// 获取区服信息
function getPartitionInfo(partition)
{
    var data = SLGServerSelect.STD_DATA;
    var name = '';
    for (var i = 0; i < data.length; i++) {
        if(partition == data[i].v){
            name = data[i].t;
            break;
        }
    }
    name = name.split("区");
    return name[0] + '区';
}
// 跳转到竞猜页面
function toPage() {
    if(OUT.login.isLogin === false){
        return OUT.login.doLogin();
    }
    window.location.href = 'page.html';
}

// 检查登录态
LoginManager.checkLogin(function (userInfo) { //检查登录态
    console.log(userInfo);
    OUT.login.isLogin = true;
    if ((ulink.isWxApp() || ulink.isQQApp()) && ulink.getQueryString("msdkEncodeParam")) {
        window.location.href = OUT.site.indexUrl;
        return;
    }
    var nickName = userInfo.nickName;
    OUT.role.avatar = userInfo.headimgurl;
    if (ulink.isMSDK()) {
        nickName = ' 亲爱的玩家';
    } else {
        nickName = typeof (userInfo.def_nickname) != "undefined" ? userInfo.def_nickname : (userInfo.nickName.length > 0 ? userInfo.nickName : '');
    }
    $('#unlogin').hide();
    $('#login_qq_span').text(nickName);
    $('.dia-tit-logout em').text(nickName);
    $('#logined').show();
}, function () {
    console.log('checkLogin ==========> 未登录');
});



