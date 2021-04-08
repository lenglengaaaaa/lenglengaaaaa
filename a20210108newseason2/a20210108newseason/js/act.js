var G_Area = 0;
var G_skinList = [];
var G_heroList = [];
var G_clickFlag = true;
$.getJSON("https://game.gtimg.cn/images/lol/act/img/js/cuSkinList/cuskin_list.js", function (res) {
    G_skinList = res.cuskin;
})

$.getJSON('//game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js', function (result) {
    G_heroList = result.hero;
})

// ��¼
function initLogin() {
    milo.ready(function () {
        need("biz.login", function (LoginManager) {
            LoginManager.init();
            //QQ��¼
            milo.addEvent(g('ptLoginBtn'), 'click', function (e) {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });

            //ע��
            milo.addEvent(g("ptLogoutBtn"), "click", function () {
                LoginManager.logout();
            })

            //ִ����֤��½����
            LoginManager.checkLogin(function (userinfo) {
                amsInit(353484, 730839);
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    });
}

//��ѯ�Ƿ�󶨵�����
amsCfg_730839 = {
    type: "query",
    iQueryFlowID: 730839,
    service: "lol",
    success: function (bindedInfo) {
        //�Ѱ�ʱ����չ����
        Act.BindAreaCallback(bindedInfo);
    },
    failure: function () {
        //δ��ʱ����չ����
    }
};

//�ύ�󶨵�����
amsCfg_730838 = {
    type: "comit",
    needPopupRole: true,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
    roleInfo: null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
    iQueryFlowID: 730839,
    service: "lol",
    success: function (bindedInfo) {
        //�Ѱ�ʱ����չ����
        Act.BindAreaCallback(bindedInfo);
    },
    failure: function () {
        //δ��ʱ����չ����
    }
};

//�ύ������AME
amsCfg_730842 = {
    "_everyRead": true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 353484, //�id
    "iFlowId": 730842, //����id
    "sData": {//�Զ��崫��
    },
    "fFlowSubmitEnd": function (res) {
    },
    "fFlowSubmitFailed": function (res) {
    }
};

//�ύ������AME
amsCfg_730849 = {
    "_everyRead": true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 353484, //�id
    "iFlowId": 730849, //����id
    "sData": {//�Զ��崫��
    },
    "fFlowSubmitEnd": function (res) {
        console.log(res);
        $('.battleNum').html(res.sOutValue1);
        var holdArr = res.sOutValue3.split('_');
        switchBtnStatus(730840, holdArr[1]);
        switchBtnStatus(730844, holdArr[2]);
        switchBtnStatus(731855, holdArr[3], 'showDurationPackageList()');
        switchBtnStatus(730846, holdArr[4]);
        setConditionNum('gidCout', res.sOutValue1);
        setConditionNum('teamCout', res.sOutValue2);
        setConditionNum('zmLogin', res.sOutValue4);
        setConditionNum('gameLogin', res.sOutValue5);
        setConditionNum('wbLogin', res.sOutValue6);
    },
    "fFlowSubmitFailed": function (res) {
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        showSysInfo(res.sMsg);
    }
};

//�ύ������AME
var G_WJRes = '';
amsCfg_731159 = {
    "_everyRead": true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 353484, //�id
    "iFlowId": 731159, //����id
    "sData": {//�Զ��崫��
    },
    "fFlowSubmitEnd": function (res) {
        console.log(res);
        if (res.iRet == 0 && res['jData'] && res['jData']['retList']) {
            var list = res['jData']['retList'];
            var html = '';
            for (var i = 0; i < list.length; i++) {
                html += '<li>';
                html += '<a attr-uin="' + list[i]['AccountId'] + '" attr-area="' + list[i]['iArea'] + '"  href="javascript:;" class="spr dia-select" onclick="LotteryClickInfo(' + i + ');PTTSendClick(\'btn\',\'dia-select1\',\'ѡ��\');"></a>';
                html += decodeURIComponent(list[i]['Nick']) + '  ���ڴ��� : ' + LOLServerSelect.zoneToName(list[i]['iArea']);
                html += '</li>';

            }
            $('#myNotLoginFriend').html(html);
            $('.dia-invite .dia-select').on('click', function () {
                var idx = $(this).parent().index();
                $(this).parent().toggleClass('on').siblings().removeClass('on');
            })
            TGDialogS('dia-invite')
            G_WJRes = res['jData']['recvStr'];
            LotteryPopInfo(res['jData']['recvStr']);
            return;
        }
        showSysInfo('�ǳ���Ǹ����ǰ�����������࣬���Ժ�����');
    },
    "fFlowSubmitFailed": function (res) {
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        showSysInfo(res.sMsg);
    }
};

// �齱��ȡ�����ܳ�ʼ��
amsCfg_730844 = {
    'iAMSActivityId' : '353484', // AMS���
    'activityId' : '384424', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        showSysInfo(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        showSysInfo(callbackObj.sMsg);
        switchBtnStatus(730844, 1);
    }
};

function inviteUser() {
    if ($('#myNotLoginFriend .on').length <= 0) {
        showSysInfo('��ѡ��Ҫ����ĺ��ѣ�');
        return;
    }
    var item = $('#myNotLoginFriend .on');
    var params = {};
    params['iArea'] = G_Area;
    params['uin'] = $(item).find('a').attr('attr-uin');
    params['area'] = $(item).find('a').attr('attr-area');
    CallSwooleFunc('a20210108newseason', 'a20210108newseason', 'inviteWJFriend', params, function (data) {
        console.log(data);
        if (data['jData'] && 0 == data['jData']['result']) {

        }
        showSysInfo(data['msg']);
    })
}

function setConditionNum(type, num) {
    var items = $('.' + type + '_Obj');
    num = parseInt(num);
    for (var i = 0; i < items.length; i++) {
        var limit = $(items[i]).find('.' + type + '_Num').attr('attr-total');
        limit = parseInt(limit);
        var cout = (num > limit ? limit : num);
        $(items[i]).find('.' + type + '_Num').html(cout);
        var width = cout / limit * 100 + '%';
        $(items[i]).find('.' + type + '_Pro').css('width', width);
    }
}

// �齱��ȡ�����ܳ�ʼ��
amsCfg_730840 = {
    'iAMSActivityId': '353484', // AMS���
    'activityId': '384424', // ģ��ʵ����
    'onBeginGetGiftEvent': function () {
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent': function (callbackObj) {// �齱ʧ���¼�
        showSysInfo(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// �齱�ɹ��¼�
        showSysInfo(callbackObj.sMsg);
        switchBtnStatus(730840, 1);
    }
};

// �齱��ȡ�����ܳ�ʼ��
amsCfg_730846 = {
    'iAMSActivityId': '353484', // AMS���
    'activityId': '384424', // ģ��ʵ����
    'onBeginGetGiftEvent': function () {
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent': function (callbackObj) {// �齱ʧ���¼�
        showSysInfo(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// �齱�ɹ��¼�
        showSysInfo(callbackObj.sMsg);
        switchBtnStatus(730846, 1);
    }
};

function showSysInfo(msg, reopenFlag) {
    if (reopenFlag) {
        reopenDialogId = nowDialogId;
    }
    $('#dia-system .dia-con p').html(msg);
    TGDialogS('dia-system');
}

var Act = {
    ChangeArea: function (showDialogFlag) {
        amsInit(353484, 730838);
    },

    BindAreaCallback: function (bindedInfo) {
        G_Area = bindedInfo['jData']['data']['Farea'];
        amsSubmit(353484, 730849);
    }
}

function doLogin() {
    need("biz.login", function (LoginManager) {
        LoginManager.login({"sData": {"pt_no_onekey": 1}});
    });
}

tgShare('tg-sns', '������һ�ģ������ĵ�һ', '������������ѡӢ�ۻ����Ǳ�1�顢ϡ��ͼ��ȣ����ɳ�Ӿ���ɶ��޶�Ƥ��', false);

function getUrl(params) {
    var url = 'https://lol.qq.com/act/a20210108newseason/index.html';
    var ecode = milo.request('e_code');
    if (ecode) {
        url += '?e_code=' + ecode;
    }
    if (params) {
        for (var i in params) {
            if (url.indexOf('?') >= 0) {
                url += '&';
            } else {
                url += '?';
            }
            url += '' + i + '=' + params[i];
        }
    }
    return url;
}

function tgShare(id, title, desc, params) {
    var _pshareUrl = getUrl(params);
    var description = $('meta[name="description"]').attr('content');
    desc = desc == '' ? description : desc;
    TGshare({
        iconSize: 24,
        snsModule: ['wechat', 'qq', 'qzone', 'sina'],
        title: title,
        url: _pshareUrl,
        picUrl: 'https://game.gtimg.cn/images/lol/act/a20200529pool/share.jpg',
        snsID: id,
        isWindow: true,
        tcss: true
    });

    $('#' + id + ' a').each(function (index, el) {
        var event = '';
        var event_cont;
        if (el.href == 'javascript:void(0)') {
            console.log($(el).attr('onclick'));
            event_cont = $(el).attr('onclick').split(',');
            if (id == 'tg-sns') {
                event_cont[0] = 'amsSubmit(353484,730842);' + event_cont[0];
            }
            event_cont[2] = event_cont[2].substring(0, event_cont[2].length - 1) + '&summary=' + encodeURIComponent(desc) + '\'';
            $(this).attr('onclick', event_cont.join(','));
        }
    });

    if (/(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(navigator.userAgent)) {
        init_ZMApp({
            'title': '������һ�ģ������ĵ�һ',
            'summery': '������������ѡӢ�ۻ����Ǳ�1�顢ϡ��ͼ��ȣ����ɳ�Ӿ���ɶ��޶�Ƥ��',
            'subtitle': '������һ�ģ������ĵ�һ',
            'img': 'https://game.gtimg.cn/images/lol/act/a20200529pool/share.jpg',
            'url': _pshareUrl,
            'WXtrigger': function (res) {
                //΢�Ŷ����ص�
            },
            'WXsuccess': function (res) {
                //΢�ųɹ��ص�
                if (!res) return;
                if (res.errMsg == 'sendAppMessage:ok') {
                    //΢�ŷ������
                    PTTSendClick('btn', 'sharewx1', '���������');
                } else if (res.errMsg == 'shareTimeline:ok') {
                    //΢�ŷ�������Ȧ
                    PTTSendClick('btn', 'sharewx2', '��������Ȧ');
                } else if (res.errMsg == 'shareQQ:ok') {
                    //΢�ŷ�����QQ
                    PTTSendClick('btn', 'shareqq', '����QQ');
                }
            },
            'WXcancel': function (res) {
                //΢�ŷ���ȡ�������ص�
                PTTSendClick('btn', 'sharewx_cancel', '����ȡ��');
            },
            'WXfail': function (res) {
                //΢�ŷ���ʧ�ܶ����ص�
                PTTSendClick('btn', 'sharewx_fail', '����ʧ��');
            },
            'QQtrigger': function (res) {
                //QQ�����ص�
            },
            'QQcallback': function (res) {
                //QQ����ɹ�
                PTTSendClick('btn', 'shareqq_succ', 'QQ����ɹ�');
            },
            'LOL_APPsuccess': function (res) {
                //���˷���ɹ�
                PTTSendClick('btn', 'sharezm_succ', '���˷���ɹ�');
            }
        });
    }
}

var nowDialogId = false;
var reopenDialogId = false;

function switchBtnStatus(flowId, iNumUsed, functionStr) {
    if (iNumUsed > 0) {
        $('.getBtn_' + flowId).addClass('btn-got').attr('href', 'javascript:;');
        var taskIndex = false;
        switch (flowId) {
            case 730840:
                taskIndex = 1;
                break;
            case 730844:
                taskIndex = 2;
                break;
            case 731855:
                taskIndex = 3;
                break;
            case 730846:
                taskIndex = 4;
                break;
        }
        if (taskIndex) {
            $('.task' + taskIndex).addClass('on');
        }
        $('.num').html($('.jd-box li.on').length);
    } else {
        if (!functionStr) {
            functionStr = 'amsSubmit(353484,' + flowId + ')'
        }
        $('.getBtn_' + flowId).removeClass('btn-got').attr('href', 'javascript:javascript:' + functionStr + ';');
    }
}

function TGDialogS(e) {
    nowDialogId = e;
    // ����milo������dialog���
    need("biz.dialog", function (Dialog) {
        if (e == reopenDialogId) {
            reopenDialogId = false;
        }

        Dialog.show({
            id: e,
            bgcolor: '#000', //���������֡�����ɫ����ʽΪ"#FF6600"�����޸ģ�Ĭ��Ϊ"#fff"
            opacity: 50 //���������֡���͸���ȣ���ʽΪ��10-100������ѡ
        });
    });
}

function closeDialog() {
    // ����milo������dialog���
    need("biz.dialog", function (Dialog) {
        Dialog.hide();
        if (reopenDialogId) {
            TGDialogS(reopenDialogId);
        }
    });
}

// �齱��ȡ�����ܳ�ʼ��
amsCfg_731855 = {
    'iAMSActivityId': '353484', // AMS���
    'activityId': '385423', // ģ��ʵ����
    'sData': {},
    'onBeginGetGiftEvent': function () {
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent': function (callbackObj) {// �齱ʧ���¼�
        showSysInfo(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// �齱�ɹ��¼�
        showSysInfo(callbackObj.sMsg);
        switchBtnStatus(731855, 1, 'showDurationPackageList()');
    }
};

function showDurationPackageList() {
    var html = '';
    for (var i in durationPackageCfg) {
        var cfg = durationPackageCfg[i];
        html += '<li attr-id="' + cfg['packageId'] + '">';
        html += '<div><img src="//game.gtimg.cn/images/lol/act/img/skinloading/' + cfg['skinId'] + '.jpg"/></div>';
        html += '<p  class="name">' + G_skinList[cfg['skinId']]['name'] + '��7�죩+ ' + getHeroName(cfg['heroId']) + '��7�죩</p>';
        html += '<a href="javascript:;" class="select" onclick="PTTSendClick(\'btn\',\'select\',\'ȷ��\');"></a>';
        html += '</li>';
    }
    $('#durationBox').html(html);
    $('.dia-receive1 .select').on('click', function () {
        var idx = $(this).parent().index();
        $(this).parent().addClass('on').siblings('li').removeClass('on');
    })
    TGDialogS('dia-receive1');
}

function getDurationPackage() {
    if ($('#durationBox .on').length <= 0) {
        showSysInfo('��ѡ��Ҫ��ȡ�ĵ���', true);
        return;
    }
    var packageId = $('#durationBox .on').attr('attr-id');
    amsCfg_731855['sData']['iPackageId'] = packageId;
    amsSubmit(353484, 731855);
}

function getHeroName(id) {
    for (var i = 0; i < G_heroList.length; i++) {
        if (G_heroList[i]['heroId'] == id) {
            return G_heroList[i]['name'] + ' ' + G_heroList[i]['title'];
        }
    }
    return '';
}

var durationPackageCfg = {
    '0': {'packageId': '1469115', 'skinId': '1011', 'heroId': '1'},
    '1': {'packageId': '1469139', 'skinId': '2005', 'heroId': '2'},
    '2': {'packageId': '1469141', 'skinId': '3005', 'heroId': '3'},
    '3': {'packageId': '1465310', 'skinId': '4005', 'heroId': '4'},
    '4': {'packageId': '1465311', 'skinId': '5013', 'heroId': '5'},
    '5': {'packageId': '1465312', 'skinId': '7004', 'heroId': '7'},
    '6': {'packageId': '1465313', 'skinId': '8008', 'heroId': '8'},
    '7': {'packageId': '1465314', 'skinId': '12008', 'heroId': '12'},
    '8': {'packageId': '1465315', 'skinId': '14004', 'heroId': '14'},
    '9': {'packageId': '1465316', 'skinId': '15007', 'heroId': '15'},
    '10': {'packageId': '1465317', 'skinId': '16006', 'heroId': '16'},
    '11': {'packageId': '1465318', 'skinId': '17004', 'heroId': '17'},
    '12': {'packageId': '1465319', 'skinId': '21008', 'heroId': '21'},
    '13': {'packageId': '1465320', 'skinId': '22007', 'heroId': '22'},
    '14': {'packageId': '1465321', 'skinId': '23007', 'heroId': '23'},
    '15': {'packageId': '1465322', 'skinId': '24012', 'heroId': '24'},
    '16': {'packageId': '1465323', 'skinId': '28004', 'heroId': '28'},
    '17': {'packageId': '1465325', 'skinId': '29006', 'heroId': '29'},
    '18': {'packageId': '1465326', 'skinId': '31005', 'heroId': '31'},
    '19': {'packageId': '1465327', 'skinId': '39004', 'heroId': '39'},
    '20': {'packageId': '1465328', 'skinId': '51006', 'heroId': '51'},
    '21': {'packageId': '1465329', 'skinId': '54006', 'heroId': '54'},
    '22': {'packageId': '1465330', 'skinId': '55004', 'heroId': '55'},
    '23': {'packageId': '1465331', 'skinId': '58005', 'heroId': '58'},
    '24': {'packageId': '1465332', 'skinId': '61007', 'heroId': '61'},
    '25': {'packageId': '1465333', 'skinId': '63005', 'heroId': '63'},
    '26': {'packageId': '1465334', 'skinId': '64010', 'heroId': '64'},
    '27': {'packageId': '1465335', 'skinId': '67006', 'heroId': '67'},
    '28': {'packageId': '1465336', 'skinId': '68003', 'heroId': '68'},
    '29': {'packageId': '1465337', 'skinId': '79009', 'heroId': '79'},
    '30': {'packageId': '1465338', 'skinId': '80008', 'heroId': '80'},
    '31': {'packageId': '1465341', 'skinId': '81008', 'heroId': '81'},
    '32': {'packageId': '1465342', 'skinId': '86004', 'heroId': '86'},
    '33': {'packageId': '1465343', 'skinId': '92003', 'heroId': '92'},
    '34': {'packageId': '1465344', 'skinId': '99006', 'heroId': '99'},
    '35': {'packageId': '1465345', 'skinId': '103004', 'heroId': '103'},
    '36': {'packageId': '1465346', 'skinId': '104003', 'heroId': '104'},
    '37': {'packageId': '1465348', 'skinId': '105009', 'heroId': '105'},
    '38': {'packageId': '1465349', 'skinId': '107002', 'heroId': '107'},
    '39': {'packageId': '1465350', 'skinId': '110006', 'heroId': '110'},
    '30': {'packageId': '1465351', 'skinId': '114003', 'heroId': '114'},
    '41': {'packageId': '1465352', 'skinId': '117003', 'heroId': '117'},
    '42': {'packageId': '1465353', 'skinId': '119003', 'heroId': '119'},
    '43': {'packageId': '1465354', 'skinId': '121003', 'heroId': '121'},
    '44': {'packageId': '1465355', 'skinId': '122008', 'heroId': '122'},
    '45': {'packageId': '1465356', 'skinId': '131003', 'heroId': '131'},
    '46': {'packageId': '1465357', 'skinId': '134002', 'heroId': '134'},
    '47': {'packageId': '1465358', 'skinId': '145001', 'heroId': '145'},
    '48': {'packageId': '1465359', 'skinId': '157001', 'heroId': '157'},
    '49': {'packageId': '1465360', 'skinId': '164001', 'heroId': '164'},
    '40': {'packageId': '1465361', 'skinId': '222003', 'heroId': '222'},
    '51': {'packageId': '1465362', 'skinId': '236001', 'heroId': '236'},
    '52': {'packageId': '1465363', 'skinId': '238001', 'heroId': '238'},
    '53': {'packageId': '1465364', 'skinId': '245002', 'heroId': '245'},
    '54': {'packageId': '1465365', 'skinId': '254002', 'heroId': '254'},
    '55': {'packageId': '1465366', 'skinId': '266007', 'heroId': '266'},
    '56': {'packageId': '1465367', 'skinId': '412005', 'heroId': '412'},
    '57': {'packageId': '1465368', 'skinId': '497001', 'heroId': '497'},
    '58': {'packageId': '1465369', 'skinId': '498001', 'heroId': '498'},
    '59': {'packageId': '1465370', 'skinId': '59007', 'heroId': '59'},
    '60': {'packageId': '1465371', 'skinId': '34008', 'heroId': '34'}
}


//�ھ��ϱ� start----------------
function LotteryPopInfo(recvStr) {
    need("biz.login", function (LoginManager) {
        var popLoginFunc = function () {
            var reportStr = decodeURIComponent(encodeURIComponent(G_WJRes).replace('%00', ''))
            var fields = '{"userInfo":{"area":"' + G_Area + '","partition":"' + G_Area + '","userid":"","roleid":"","credid":"lol_friendlist_21133"},"djcInfo":{"gender":"1","channel_src":"1"},"rcInfo":' + reportStr + '}';
            var url = "//apps.game.qq.com/daoju/v3/dcrpt/ping?ver=2&bid=sshop&uin=" + LoginManager.getUserUin() + "&area=" + G_Area + "&table_type=SnsPopInfo&_=" + Math.random() + "&scendid=56001&fields=" + fields;
            $.getScript(url, function () {
            });
        };
        LoginManager.checkLogin(popLoginFunc, Undo);
    });
}

function LotteryClickInfo(index) {
    need("biz.login", function (LoginManager) {
        var clickLoginFunc = function () {
            var reportStr = decodeURIComponent(encodeURIComponent(G_WJRes).replace('%00', ''))
            var reportList = JSON.parse(reportStr);
            console.log(reportList);
            var reportUin = reportList.data.recommendlist[index]
            if (reportUin) {
                reportList.data.recommendlist.splice(0, reportList.data.recommendlist.length);
                reportList.data.recommendlist[0] = reportUin;
            }
            var reportStr = JSON.stringify(reportList);
            var fields = '{"userInfo":{"area":"' + G_Area + '","partition":"' + G_Area + '","userid":"","roleid":"","credid":"lol_friendlist_21133"},"djcInfo":{"gender":"1","channel_src":"1"},"rcInfo":' + reportStr + '}';
            var url = "//apps.game.qq.com/daoju/v3/dcrpt/ping?ver=2&bid=sshop&uin=" + LoginManager.getUserUin() + "&area=" + G_Area + "&table_type=SnsClickInfo&_=" + Math.random() + "&scendid=56001&fields=" + fields;
            $.getScript(url, function () {
            });
        };
        LoginManager.checkLogin(clickLoginFunc, Undo);
    });
}

function Undo() {
    return;
}

function CallSwooleFunc(proj, c, a, param, callBack, notNeedLogin) {
    need("biz.login", function (LoginManager) {
        var doFunc = function (proj, c, a, param, callBack, needLogin) {
            if (!G_clickFlag) {
                return;
            }
            G_clickFlag = false;
            var url = '//lol.sw.game.qq.com/lol/lwdcommact/' + proj + '/' + c + '/' + a;
            if (param) {
                if (typeof (param) == 'string') {
                    url += param;
                } else if (typeof (param) == 'object') {
                    var firstFlag = true;
                    for (var i in param) {
                        if(firstFlag){
                            firstFlag = false;
                            url += '?' + i + '=' + param[i];
                        } else {
                            url += '&' + i + '=' + param[i];
                        }
                    }
                }
            }
            var R1 = 'retObj_' + a;
            url += '&r1='+R1;
            $.ajax({
                dataType: 'script',
                url: url,
                xhrFields: {
                    withCredentials: true
                },
                success: function () {
                    G_clickFlag = true;
                    var data = window[R1];
                    console.log(data) // ����data����
                    if (typeof (callBack) == 'function') {
                        callBack(data);
                        return;
                    }
                    if (data["status"] == "0") {
                        switch (a) {
                            default:
                                break;
                        }
                    } else {
                        showSysInfo(data.msg);
                    }
                }
            });
        }
        if (!notNeedLogin) {
            LoginManager.checkLogin(function () {
                doFunc(proj, c, a, param, callBack, notNeedLogin);
            }, function () {
                LoginManager.login();
            });
        } else {
            doFunc(proj, c, a, param, callBack, notNeedLogin);
        }
    });
}
/* #t6Hl8#D14CDE4EEE0917746684FF8B3A499C1F */