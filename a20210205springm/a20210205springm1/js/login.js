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

//��ѯ�Ƿ�󶨵�����
amsCfg_738115 = {
    type: "query",
    iQueryFlowID: 738115,
    service: "lol",
    success: function (bindedInfo) {
        //�Ѱ�ʱ����չ����

    },
    failure: function (res) {
        //δ��ʱ����չ����
        console.log(res);
    }
};

//�ύ�󶨵�����
amsCfg_738114 = {
    type: "comit",
    needPopupRole: true,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
    roleInfo: null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
    iQueryFlowID: 738115,
    service: "lol",
    success: function (bindedInfo) {
        //�Ѱ�ʱ����չ����

    },
    failure: function () {
        //δ��ʱ����չ����

    }
};
/* #t6Hl8#318709CACCFE0AB2A55D82A370B900B3 */