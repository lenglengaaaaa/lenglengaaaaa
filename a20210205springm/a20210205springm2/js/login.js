milo.ready(function () {
    // ����¼ 
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(function (userInfo) {
            console.log("�ѵ�¼");
            console.log("��¼��Ϣ��", userInfo);

            // ΢�ŵ�¼
            // �����½������wx΢�ţ���ֱ�ӻ�ȡ������Ϣ���ͷ��
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
                console.log('��ȡ�û���Ϣʧ��', err);
            })
        }, function () {
            need("biz.login", function (LoginManager) {
                LoginManager.loginByWX({
                    appConfig: {
                        "WxAppId": "wx0abed84681090cfd", //Ҫ��Ȩ��appid
                        "scope": "snsapi_userinfo",   //Ĭ���� snsapi_base ��Ĭ��Ȩ������д��snsapi_userinfo,����û�취��ȡ�ǳơ�ͷ���
                    }
                });
            });
            console.log("δ��¼");
        });
    });
});
/* #t6Hl8#48D5CDD640C1F5AA9826D8FA13E83694 */