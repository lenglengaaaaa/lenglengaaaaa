var OUT = {};
var env = ulink.getQueryString("ulenv");
// todo:���ߺ��޸�����
OUT.site = {
    url: env == 'test' ? '//testapp.game.qq.com/index.php' : '//ulink.game.qq.com/app/4021/c18b4ca11f9dcea7/index.php',
    indexUrl: 'https://slg.qq.com/act/5130/a20210225newstar/index.html',
    iActId: '5130',//�ID
    game: 'slg',
    sAppId: 'ULINK-TBRJ-729002'//��Ѷ����APPID
};
//��֮ǰ�������ӦJS ��ʼ��
var LoginManager = ulink.LoginManager;
// LoginManager.init({
//     openLinkUrl: ""
// });


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

var wxLogin = false;


//�û���¼
OUT.login = {
    isLogin: false,//false δ��¼ true �ѵ�¼
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
            console.log('ִ�����˳���½');
            // window.location.reload();
        });
    }
};

OUT.role = {
    channel: '',
    isBindRole: 0,
    roleInfo: {},
    // ������
    checkBind: function () {
        if (this.isBindRole == 0) {
            // δ��
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
        var filterChannels = [];
        if (ulink.isQQApp()) {
            filterChannels = ['΢��'];
        } else if (ulink.isWxApp()) {
            filterChannels = ['��Q'];
        } else {
            var area = ulink.getQueryString('areaid');
            if (area.length > 0) {
                // area 1΢�ţ�2��Q
                if (area == '1') {
                    filterChannels = ['��Q'];
                } else if (area == '2') {
                    filterChannels = ['΢��'];
                }
            }
        }
        var obj = {
            "sAppId": OUT.site.sAppId,  //��Ѷ����APPID
            "iActId": OUT.site.iActId,   //�ID
            "sSign": data.data.sSign,
            "game": OUT.site.game,
            "timestamp": data.data.timestamp,
            "sCode": data.data.sCode,
            "filterChannels": filterChannels,
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
        console.log("��ɫ����", Object.keys(OUT.role.roleInfo).length, OUT.role.roleInfo);
        if (Object.keys(OUT.role.roleInfo).length > 0) {
            roleselector.on("renderAreaSuccess", function (data) {
                // ��ɫѡ��ֵ
                console.log('��ʼ��ɫ��ֵ', OUT.role.roleInfo);
                roleselector.roleSelectChange(OUT.role.roleInfo.area, OUT.role.roleInfo.platId, OUT.role.roleInfo.partition, OUT.role.roleInfo.roleId);
            });
        }

        return roleselector;
    },
    // �����̨�ӿڣ� �󶨽�ɫ��Ϣ
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
                showTips('�󶨳ɹ�', 'window.location.reload()');
            },
            error: function (e) {
            }
        });
    }
};

// ��ʾ��Ϣ
function showTips(msg, func) {
    func = func || 'closeDialog();';
    $('#dialog-system .dialog-written-desc span').text(msg);
    $('#dialog-system a').attr('href', 'javascript:closeDialog();' + func);
    TGDialogS('dialog-system');
    return;
}

// ��ȡ������Ϣ
function getPartitionInfo(partition) {
    var data = SLGServerSelect.STD_DATA;
    var name = '';
    for (var i = 0; i < data.length; i++) {
        if (partition == data[i].v) {
            name = data[i].t;
            break;
        }
    }
    name = name.split("��");
    return name[0] + '��';
}

// ��ת������ҳ��
function toPage() {
    if (OUT.login.isLogin === false) {
        return OUT.login.doLogin();
    }
    if (OUT.role.checkBind()) {
        return;
    }
    window.location.href = 'page.html';
}

// ����Ͷע����
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
        showTips('��Ǹ, �װ������, ������Ͷעʱ���ѽ�������Ͷע');
        return;
    } else if (tmpData.status == 1) {
        showTips('��Ǹ, �װ������, �����»�δ��Ͷעʱ��, ����Ͷע');
        return;
    }

    OUT.user.matchId = tmpData.matchId;
    OUT.user.optionId = index;
    OUT.user.type = type;
    $('#dialog-bet1 .bet-right em').eq(0).text(OUT.user.coinNum);
    TGDialogS('dialog-bet1');
}

// ��ʾ�����淨
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

// ���������淨html
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

// ����bet2
function showBet2() {
    var len = $('.lott-btns .on').length;
    if (len < 1) {
        showTips('����ѡ����~');
        return;
    }
    $('#dialog-bet2 .bet-right em').eq(0).text(OUT.user.coinNum);
    TGDialogS('dialog-bet2');
}

// ������δ����
function showPending() {
    showTips('��δ����, �����ڴ�~');
    //TGDialogS('dialog-vote')
}
