var OUT = {};
var env = ulink.getQueryString("ulenv");
// todo:���ߺ��޸�����
OUT.site = {
    url: env == 'test' ? '//testapp.game.qq.com/index.php' : '//slg.game.qq.com/index.php',
    indexUrl: 'https://slg.qq.com/act/5130/a20210225newstar/index.html',
    iActId: '5130',//�ID
    game: 'slg',
    sAppId: 'ULINK-TBRJ-729002'//��Ѷ����APPID
};
//��֮ǰ�������ӦJS ��ʼ��
var LoginManager = ulink.LoginManager;
LoginManager.init({
    openLinkUrl: ""
});


var shareOptions = {
    iActId: OUT.site.iActId, // ���
    title: '�������㣬��������', // �������
    desc: '�Ŷ����������Ƚ����У���ע���½��̣��������¾��£�ÿ�ܺ������ͣ�',  // �������ݼ��
    link: OUT.site.indexUrl,  // ��������
    imgUrl: 'https://game.gtimg.cn/images/slg/m/icon_share.jpg', // ��������ѿ�����ͼ�꣬��С���ܳ���32K
    WXtrigger: function (res) { // ΢�ŷ������¼��ص�

    },
    WXsuccess: function (res) { // ΢�ŷ����ص�
    },
    QQcallback: function (res) { // qq�ɹ���ʧ�ܡ���ȡ���Ļص�
    },
};
ulink.share.init(shareOptions);


//�û���¼
OUT.login = {
    isLogin: false,//false δ��¼ true �ѵ�¼
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
    // ������
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
    // �����󶨵���
    showBindRoleDialog: function (data) {
        if (OUT.login.isLogin === false) {
            return OUT.login.doLogin();
        }
        window.role = OUT.role.createRoleSelector(OUT.role.setOptions(data));
        console.log('roleselector========>' + JSON.stringify(window.role));
        window.role.show();
        TGDialogS('dialog-login-role');
    },
    // ����optionsֵ
    setOptions: function (data) {
        console.log('=====>' + JSON.stringify(data));
        var obj = {
            "sAppId": OUT.site.sAppId,  //��Ѷ����APPID
            "iActId": OUT.site.iActId,   //�ID
            "sSign": data.data.sSign,
            "game": OUT.site.game,
            "timestamp": data.data.timestamp,
            "sCode": data.data.sCode,
            "filterChannels": OUT.role.channel,
            custom: true,    // �Զ���Ƥ������ָ��Ϊtrue
            UISettings: {   // �������Ա���ָ�����Ҳ���Ϊ��
                dialog: ulink.$('#pop'), // RoleSelector����
                channelSelect: ulink.$('#login-select-app'), // ����������
                systemSelect: ulink.$('#login-select-system'),  // ϵͳ������
                areaSelect: ulink.$('#login-select-area'),    // ����������
                serverSelect: ulink.$('#ulinkServerSelect'),    // ������������
                roleSelect: ulink.$('#login-select-role'),    // ��ɫ������
                roleSelectParent: ulink.$('#ulinkRoleSelectParent'), // ��ɫ�����򸸽ڵ�
                errorMsgPanel: ulink.$('#ulinkErrorMessage'), // ������Ϣչʾ���
                confirmButton: ulink.$('#ulinkConfirmBtn'), // ȷ����ť
                cancelButton: ulink.$('#ulinkCancelBtn'), // ȡ����ť
                closeButton: ulink.$('#ulinkCloseBtn'), // �رհ�ť
            }
        };

        return obj;
    },
    // �����ɫѡ����
    createRoleSelector: function (options) {
        var roleselector = new ulink.RoleSelector(options);
        //��ɫ��ѯ���ݷ��ؼ����¼���
        roleselector.on("getRoleData", function (data) {
            OUT.role.bindRole(data);//�󶨹�ϵ
        });
        if (OUT.role.isBindRole == 1) {
            roleselector.on("renderAreaSuccess", function (data) {
                // ��ɫѡ��ֵ
                roleselector.roleSelectChange(OUT.role.roleInfo.area, OUT.role.roleInfo.platId, OUT.role.roleInfo.partition, OUT.role.roleInfo.roleId);
            });
        }

        return roleselector;
    },
    // �����̨�ӿڣ� �󶨽�ɫ��Ϣ
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
                showTips('�󶨳ɹ�', function () {
                    window.location.reload();
                });
                closeDialog();
            },
            error: function (e) {
            }
        });
    }
};

// ��ʾ��Ϣ
function showTips(msg, func) {
    func = func || '';
    ulink.alert(msg, func);
    return;
}

// ��ȡ������Ϣ
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
    name = name.split("��");
    return name[0] + '��';
}
// ��ת������ҳ��
function toPage() {
    if(OUT.login.isLogin === false){
        return OUT.login.doLogin();
    }
    window.location.href = 'page.html';
}

// ����¼̬
LoginManager.checkLogin(function (userInfo) { //����¼̬
    console.log(userInfo);
    OUT.login.isLogin = true;
    if ((ulink.isWxApp() || ulink.isQQApp()) && ulink.getQueryString("msdkEncodeParam")) {
        window.location.href = OUT.site.indexUrl;
        return;
    }
    var nickName = userInfo.nickName;
    OUT.role.avatar = userInfo.headimgurl;
    if (ulink.isMSDK()) {
        nickName = ' �װ������';
    } else {
        nickName = typeof (userInfo.def_nickname) != "undefined" ? userInfo.def_nickname : (userInfo.nickName.length > 0 ? userInfo.nickName : '');
    }
    $('#unlogin').hide();
    $('#login_qq_span').text(nickName);
    $('.dia-tit-logout em').text(nickName);
    $('#logined').show();
}, function () {
    console.log('checkLogin ==========> δ��¼');
});



