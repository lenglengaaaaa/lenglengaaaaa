var openid = "";
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
                openid = milo.cookie.get('openid');
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

    // ams��¼�ص�
    need('ams.flowengine', function (FlowEngine) {
        FlowEngine.setLoginErrorCallback(function (iActivityId, iFlowId) {
            //���ﴦ���Զ�����߼�
            //����:
            need("biz.login", function (LoginManager) {
                LoginManager.loginByWX({
                    appConfig: {
                        "WxAppId": "wx0abed84681090cfd", //Ҫ��Ȩ��appid
                        "scope": "snsapi_userinfo",   //Ĭ���� snsapi_base ��Ĭ��Ȩ������д��snsapi_userinfo,����û�취��ȡ�ǳơ�ͷ���
                    }
                });
            });
        });
    })
});

/* #t6Hl8#4D43B895B1690686A74EEE6AA578A74A */