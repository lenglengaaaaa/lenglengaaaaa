milo.ready(function () {
    // 检查登录 
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userInfo) {
            console.log("已登录");
            console.log("登录信息：", userInfo);

            // 微信登录
            // 如果登陆类型是wx微信，就直接获取基本信息里的头像
            LoginManager.getUserInfoByWxOpenId({
                openid: milo.cookie.get('openid'),
                access_token: milo.cookie.get('access_token'),
                lang: 'zh_CH'
            }, function (userInfoWx) {
                nick_name = userInfoWx.nickname;
                head_img = userInfoWx.headimgurl + "/64";
                console.log(userInfoWx);
            }, function (err) {
                console.log('获取用户信息失败', err);
            })
        }, function () {
            need("biz.login", function (LoginManager) {
                LoginManager.loginByWX({
                    appConfig: {
                        "WxAppId": "wx0abed84681090cfd", //要授权的appid
                        "scope": "snsapi_userinfo",   //默认是 snsapi_base 静默授权，建议写成snsapi_userinfo,否则没办法获取昵称、头像等
                    }
                });
            });
            console.log("未登录");
        });
    });
});

var role_name = "";
var area_name = 0;
//查询是否绑定的配置
amsCfg_738115 = {
    type: "query",
    iQueryFlowID: 738115,
    service: "lol",
    success: function (bindedInfo) {
        //已绑定时的扩展处理
        area_name = bindedInfo.jData.data.FareaName;
        role_name = bindedInfo.jData.data.FroleName;
        $("#role_info").text(area_name + "-" + role_name);
        Act.checkWXJoinGameStatus();
    },
    failure: function (res) {
        //未绑定时的扩展处理
        amsInit(358412, 738114);
    }
};

//提交绑定的配置
amsCfg_738114 = {
    type: "comit",
    needPopupRole: true,//是否弹默认角色框选角色
    roleInfo: null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
    iQueryFlowID: 738115,
    service: "lol",
    success: function (bindedInfo) {
        //已绑定时的扩展处理
        area_name = bindedInfo.jData.data.FareaName;
        role_name = bindedInfo.jData.data.FroleName;
        $("#role_info").text(area_name + "-" + role_name);
        Act.checkWXJoinGameStatus();
    },
    failure: function () {
        //未绑定时的扩展处理

    }
};
/* #t6Hl8#3103CBB8BAD91E05F2270AF1DF88853A */