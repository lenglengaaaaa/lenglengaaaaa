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
                Act.init();
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
/* #t6Hl8#48D5CDD640C1F5AA9826D8FA13E83694 */