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
var traceinfo = '';
var G_shareKey = '';

// 登录
function initLogin() {
    milo.ready(function () {
        G_shareKey = milo.request('vShareKey');
        need("biz.login", function (LoginManager) {
            LoginManager.init();
            //QQ登录
            milo.addEvent(g('ptLoginBtn'), 'click', function (e) {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });

            //注销
            milo.addEvent(g("ptLogoutBtn"), "click", function () {
                LoginManager.logout();
            })

            //执行验证登陆操作
            LoginManager.checkLogin(function (userinfo) {
                g("login_qq_span").innerHTML = LoginManager.getUserUin();
                amsInit(353484, 730839);
            }, function () {
                LoginManager.login({"sData": {"pt_no_onekey": 1}});
            });
        });
    });
}

//查询是否绑定的配置
amsCfg_730839 = {
    type: "query",
    iQueryFlowID: 730839,
    service: "lol",
    success: function (bindedInfo) {
        //已绑定时的扩展处理
        Act.BindAreaCallback(bindedInfo);
    },
    failure: function () {
        //未绑定时的扩展处理
        GetInviteInfo();
    }
};

//提交绑定的配置
amsCfg_730838 = {
    type: "comit",
    needPopupRole: true,//是否弹默认角色框选角色
    roleInfo: null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
    iQueryFlowID: 730839,
    service: "lol",
    success: function (bindedInfo) {
        //已绑定时的扩展处理
        Act.BindAreaCallback(bindedInfo);
    },
    failure: function () {
        //未绑定时的扩展处理
    }
};

//提交请求至AME
amsCfg_730842 = {
    "_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 353484, //活动id
    "iFlowId": 730842, //流程id
    "sData": {//自定义传参
    },
    "fFlowSubmitEnd": function (res) {
    },
    "fFlowSubmitFailed": function (res) {
    }
};

//提交请求至AME
amsCfg_730849 = {
    "_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 353484, //活动id
    "iFlowId": 730849, //流程id
    "sData": {//自定义传参
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
        getQQFrdList();
        GetInviteInfo();
    },
    "fFlowSubmitFailed": function (res) {
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        showSysInfo(res.sMsg);
    }
};

//提交请求至AME
var G_WJRes = '';
amsCfg_731159 = {
    "_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 353484, //活动id
    "iFlowId": 731159, //流程id
    "sData": {//自定义传参
    },
    "fFlowSubmitEnd": function (res) {
        console.log(res);
        if (res.iRet == 0 && res['jData'] && res['jData']['retList']) {
            var list = res['jData']['retList'];
            var html = '';
            if (list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    html += '<li>';
                    html += '<a attr-uin="' + list[i]['AccountId'] + '" attr-area="' + list[i]['iArea'] + '"  href="javascript:;" class="spr dia-select" onclick="LotteryClickInfo(' + i + ');PTTSendClick(\'btn\',\'dia-select1\',\'选中\');"></a>';
                    html += decodeURIComponent(list[i]['Nick']);
                    //html += decodeURIComponent(list[i]['Nick']) + '  所在大区 : ' + LOLServerSelect.zoneToName(list[i]['iArea']);
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
            } else {
                showSysInfo('非常抱歉，没有可邀请的流失好友');
            }
            return;
        }
        showSysInfo('非常抱歉，当前参与活动人数过多，请稍后再试');
    },
    "fFlowSubmitFailed": function (res) {
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        showSysInfo(res.sMsg);
    }
};

// 抽奖领取主功能初始化
amsCfg_730844 = {
    'iAMSActivityId': '353484', // AMS活动号
    'activityId': '384424', // 模块实例号
    'onBeginGetGiftEvent': function () {
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
        showSysInfo(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
        showSysInfo(callbackObj.sMsg);
        switchBtnStatus(730844, 1);
    }
};

function inviteUser() {
    if ($('#myNotLoginFriend .on').length <= 0) {
        showSysInfo('请选择要邀请的好友！');
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

function getQQFrdList() {
    var params = {};
    params['traceinfo'] = traceinfo;
    CallSwooleFunc('a20210108newseason', 'a20210108newseason', 'getQQFrendList', params, function (data) {
        if (data.result == 0) {
            traceinfo = data['jData']['traceinfo'];
            var list = data['jData']['list'];
            if (list.length > 0) {
                var html = '';
                for (var i = 0; i < list.length; i++) {
                    html += '<li>';
                    html += '<p><img src="http://q.qlogo.cn/g?b=qq&nk=' + list[i]['uin'] + '&s=100" /></p>';
                    html += '<span>' + list[i]['nick'] + '</span>';
                    html += '<a href="javascript:inviteConfirm(' + list[i]['uin'] + ');" class="btn-invite1" onclick="PTTSendClick(\'btn\',\'btn-invite1\',\'邀请\');">邀请</a>';
                    html += '</li>';
                }
                $('#qqRecList').html(html);
                $('.qqfriendTask').show();
                $('#main2 .box3 .num').html('03');
            } else {
                $('.qqfriendTask').hide();
                $('#main2 .box3 .num').html('02');
            }
        } else {
            $('.qqfriendTask').hide();
            $('#main2 .box3 .num').html('02');
            showSysInfo(data['msg']);
        }
    })
}

function inviteConfirm(iUin) {
    $('#dia-success .dia-con p').html('您将给好友发送一条QQ消息，通知他们重返召唤师峡谷！');
    $('#dia-success .dia-sure').attr('href', 'javascript:inviteFriend(' + iUin + ')')
    TGDialogS('dia-success');
}

//提交请求至AME
amsCfg_734107 = {
    "_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 353484, //活动id
    "iFlowId": 734107, //流程id
    "sData": {//自定义传参
    },
    "fFlowSubmitEnd": function (res) {
        console.log(res);
        showSysInfo(res['jData']['msg']);
    },
    "fFlowSubmitFailed": function (res) {
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        showSysInfo(res.sMsg);
    }
};


function inviteFriend(iUin) {
    amsCfg_734107['sData']['friendUin'] = iUin;
    amsCfg_734107['sData']['e_code'] = milo.request('e_code');
    amsSubmit(353484, 734107);
}

//提交请求至AME
amsCfg_734213 = {
    "_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 353484, //活动id
    "iFlowId": 734213, //流程id
    "sData": {//自定义传参
    },
    "fFlowSubmitEnd": function (res) {
        console.log(res);
        var nick = res.sOutValue1;
        var msg = '您的好友 ' + nick + ' 邀请您参与活动，你需要在';
        if (res.sOutValue2 == 0) {
            msg += '活动期间登录游戏';
        } else {
            msg += '活动期间进行3场对局';
        }
        $('#dia-success .dia-con p').html(msg);
        $('#dia-success .dia-sure').attr('href', 'javascript:accpetFriend()')
        TGDialogS('dia-success');
    },
    "fFlowSubmitFailed": function (res) {
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        showSysInfo(res.sMsg);
    }
};

function GetInviteInfo() {
    if (!G_shareKey) {
        return false;
    }
    amsCfg_734213['sData']['vShareKey'] = G_shareKey;
    amsSubmit(353484, 734213)
}

//提交请求至AME
amsCfg_734257 = {
    "_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 353484, //活动id
    "iFlowId": 734257, //流程id
    "sData": {//自定义传参
    },
    "fFlowSubmitEnd": function (res) {
        console.log(res);
        showSysInfo(res['jData']['msg']);
    },
    "fFlowSubmitFailed": function (res) {
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        showSysInfo(res.sMsg);
    }
};

function accpetFriend() {
    if (!G_shareKey) {
        return false;
    }
    amsCfg_734257['sData']['vShareKey'] = G_shareKey;
    amsSubmit(353484, 734257)
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

// 抽奖领取主功能初始化
amsCfg_730840 = {
    'iAMSActivityId': '353484', // AMS活动号
    'activityId': '384424', // 模块实例号
    'onBeginGetGiftEvent': function () {
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
        showSysInfo(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
        showSysInfo(callbackObj.sMsg);
        switchBtnStatus(730840, 1);
    }
};

// 抽奖领取主功能初始化
amsCfg_730846 = {
    'iAMSActivityId': '353484', // AMS活动号
    'activityId': '384424', // 模块实例号
    'onBeginGetGiftEvent': function () {
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
        showSysInfo(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
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
        var areaName = decodeURIComponent(bindedInfo['jData']['data']['FareaName']);
        $('.myAreaInfo').html(areaName);
        amsSubmit(353484, 730849);
    }
}

//提交请求至AME
amsCfg_733576 = {
    "_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 353484, //活动id
    "iFlowId": 733576, //流程id
    "sData": {//自定义传参
    },
    "fFlowSubmitEnd": function (res) {
        G_zcTicket = res.sOutValue1 * 100;
        $('.myTicketNum').html(G_zcTicket);
        return;
    },
    "fFlowSubmitFailed": function (res) {
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        showSysInfo(res.sMsg);
    }
};

amsCfg_732769 = {
    'iActivityId': '353484',
    'iFlowId': '732769',
    'sData': {},
    'fFlowSubmitEnd': function (res) {
        need(["ams.daoju_buy_v2.daoju_buy_v2"], function (DaojuBuy) {
            var option = {
                //apptype:4	新版webpay，已默认
                //onPaySuccess:function(){},//支付成功后回调方法
                //onPayClose:function(){}//关闭支付页面回调方法
                onPaySuccess: function () {

                },//支付成功后回调方法
                dc: res.jData.dc
            };
            DaojuBuy.pay(res.jData, option);
        });
    },
    'fFlowSubmitFailed': function (res) {
        alert(res.sMsg);
    }
};
milo.ready(function () {
    need(["ams.daoju_buy_v2.appid"], function (autoappid) {
        autoappid.init('lol', 19047, function (final_appid) {
            //final_appid为自动判断得到的道聚城渠道号
            //本段代码内自动进行道聚城全流程数据的收集，必须保留并放到milo.ready内，除非自行在页面上进行基于道聚城活动号的eas曝光上报
        });
    });
});

G_showHistory = false;
G_zcTicket = 0;
// 个人获奖记录初始化
amsCfg_732768 = {
    'iAMSActivityId': '353484', // AMS活动号
    'iLotteryFlowId': '732768', //  查询获奖轮播的流程号
    'activityId': '386171', // 模块实例号
    'contentId': 'getGiftContent_732768', //容器ID
    'templateId': 'getGiftTemplate_732768', //模板ID
    'contentPageId': 'getGiftPageContent_732768',	//分页容器ID
    'showContentId': 'showMyGiftContent_732768', //弹出层ID
    'isForce': false, //false 默认前端有缓存记录，如果需要每次都去后台查询，则改为true,
    'getData': function (data) {
        console.log(data);
        amsCfg_732768['isForce'] = false;
        if (G_showHistory) {
            G_showHistory = false;
            return;
        }

        console.log(data);
        if (data.length <= 0) {
            // 未抽过奖，展示选择宝箱弹窗
            TGDialogS('dia-receive3');
            return;
        }

        if (data.length == 1) {
            var item = data[0];
            if(item['iPackageGroupId'] == '1470057' || item['iPackageGroupId'] == '1470061'){
                setItemInfo(item['id'], item['sExtend3'], '10000', item['packageName'], item['iStatus'], 'dia-openGift', 0);
            } else {
                setItemInfo(item['id'], item['sExtend3'], item['sExtend1'], item['packageName'], item['iStatus'], 'dia-openGift', 0);
            }

            amsSubmit(353484, 733576);
            TGDialogS('dia-openGift')
        }
    }
};

function getPrize() {
    amsSubmit(353484, 732768)
}

function openPayBox() {
    if(G_zcTicket < 100){
        showSysInfo('征程币不足，不开奖',true);
        return;
    }
    TGDialogS('dia-receive4');
}

amsCfg_732767 = {
    'iAMSActivityId': '353484', // AMS活动号
    'activityId': '386171', // 模块实例号
    'onBeginGetGiftEvent': function () {
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
        showSysInfo(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
        console.log(callbackObj);
        amsCfg_732768['isForce'] = true;
        var data = callbackObj['all_item_list'][0];
        setItemInfo(callbackObj['iDbPackageAutoIncId'], data['iItemCode'], data['sItemSubType'], callbackObj['sPackageName'], 3, 'dia-openGift', 0);
        TGDialogS('dia-openGift')
    }
};

function setItemInfo(iId, iItemCode, iItemType, sPackageName, iStatus, dialogId, domIndex) {
    var itemInfo = {};
    itemInfo['iItemType'] = iItemType;
    itemInfo['iStatus'] = iStatus;
    switch (iItemType) {
        case '2':
            itemInfo['vItemName'] = (G_skinList[iItemCode] ? G_skinList[iItemCode]['name'] : sPackageName);
            if (G_skinList[iItemCode]['isChromas'] == 'true' || G_skinList[iItemCode]['isChromas'] == true) {
                var heroId = Math.floor(parseInt(iItemCode) / 1000);
                itemInfo['vImg'] = "//game.gtimg.cn/images/lol/act/img/chromas/" + heroId + '/' + iItemCode + '.png';
            } else {
                itemInfo['vImg'] = "//ossweb-img.qq.com/images/lol/act/img/skinloading/" + iItemCode + '.jpg';
            }
            break;
        case '10000':
            itemInfo['vItemName'] = sPackageName;
            itemInfo['vImg'] = "//game.gtimg.cn/images/lol/act/a20210108newseason/dia-gift2.png";
            break;
    }

    var domItem = $('#' + dialogId + ' .AMSPrizeBox').eq(domIndex);
    $(domItem).attr('attr-id', iId);
    $(domItem).find('.AMSPrizeImg').attr('src', itemInfo['vImg']);
    $(domItem).find('.AMSPrizeName').html(itemInfo['vItemName']);
    $('#' + dialogId).find('.AMSBtnCheckOwn').eq(domIndex).attr('href', "javascript:checkItem(" + iItemType + ",'" + iItemCode + "','" + itemInfo['vItemName'] + "');");
    if (itemInfo['iStatus'] != 3) {
        $('#' + dialogId).find('.AMSBtnGet').eq(domIndex).attr('href', "javascript:showSysInfo('非常抱歉，该道具已经领取过了');");
    } else {
        $('#' + dialogId).find('.AMSBtnGet').eq(domIndex).attr('href', "javascript:getItem('" + iId + "');");
    }
}

// 抽奖领取主功能初始化
amsCfg_733542 = {
    'iAMSActivityId': '353484', // AMS活动号
    'activityId': '386171', // 模块实例号
    'sData': {},
    'onBeginGetGiftEvent': function () {
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
        showSysInfo(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
        amsCfg_732768['isForce'] = true;
        showSysInfo('领取成功，物品发货24小时内到账');
    }
};

function getItem(iId) {
    amsCfg_733542['sData']['id'] = iId;
    amsSubmit(353484, 733542);
}

// 抽奖领取主功能初始化
amsCfg_733543 = {
    'iAMSActivityId': '353484', // AMS活动号
    'activityId': '386171', // 模块实例号
    'onBeginGetGiftEvent': function () {
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
        showSysInfo(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
        console.log(callbackObj);
        amsCfg_732768['isForce'] = true;
        TGDialogS('dia-openGift')
    }
};

function getFreePrize() {
    if ($('#dia-receive3 li.on').length <= 0) {
        showSysInfo('请选择要领取的奖励', true);
        return;
    }
    var index = $('#dia-receive3 li.on').index();
    console.log(index);
    if (index == 0) {
        amsSubmit(353484, 732767)
    } else {
        amsSubmit(353484, 733543)
    }
}

function doLogin() {
    need("biz.login", function (LoginManager) {
        LoginManager.login({"sData": {"pt_no_onekey": 1}});
    });
}

tgShare('tg-sns', '新赛季 新征程', '免费赢取永久皮肤、小小英雄稀有蛋等丰富奖励', false);

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
        snsModule: ['qq', 'wechat', 'qzone', 'sina'],
        title: title,
        url: _pshareUrl,
        picUrl: 'https://game.gtimg.cn/images/lol/act/a20210108newseason/m/share.jpg',
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
        } else {
            var onclickStr = $(el).attr('onclick');
            onclickStr = 'amsSubmit(353484,730842);' + onclickStr;
            $(this).attr('onclick', onclickStr);
        }
        switch (index) {
            case 0:
                $(this).attr('class', 'btn-qq spr');
                break;
            case 1:
                $(this).attr('class', 'btn-wx spr');
                break;
            case 2:
                $(this).attr('class', 'btn-kj spr');
                break;
            case 3:
                $(this).attr('class', 'btn-wb spr');
                break;
        }
    });
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
        $('.open-box .num').eq(0).html($('.jd-box li.on').length);
    } else {
        if (!functionStr) {
            functionStr = 'amsSubmit(353484,' + flowId + ')'
        }
        $('.getBtn_' + flowId).removeClass('btn-got').attr('href', 'javascript:javascript:' + functionStr + ';');
    }
}

function TGDialogS(e) {
    nowDialogId = e;
    // 利用milo库引入dialog组件
    need("biz.dialog", function (Dialog) {
        if (e == reopenDialogId) {
            reopenDialogId = false;
        }

        Dialog.show({
            id: e,
            bgcolor: '#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity: 50 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
        });
    });
}

function closeDialog() {
    // 利用milo库引入dialog组件
    need("biz.dialog", function (Dialog) {
        Dialog.hide();
        if (reopenDialogId) {
            TGDialogS(reopenDialogId);
        }
    });
}

// 抽奖领取主功能初始化
amsCfg_731855 = {
    'iAMSActivityId': '353484', // AMS活动号
    'activityId': '385423', // 模块实例号
    'sData': {},
    'onBeginGetGiftEvent': function () {
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
        showSysInfo(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
        showSysInfo(callbackObj.sMsg);
        switchBtnStatus(731855, 1, 'showDurationPackageList()');
    }
};

function showDurationPackageList() {
    var html = '';
    for (var i in durationPackageCfg) {
        var cfg = durationPackageCfg[i];
        html += '<li attr-id="' + cfg['packageId'] + '">';
        html += '<div class="img-box"><img class="pic" src="//game.gtimg.cn/images/lol/act/img/skinloading/' + cfg['skinId'] + '.jpg"/></div>';
        html += '<p  class="name">' + G_skinList[cfg['skinId']]['name'] + '（7天）</p>';
        html += '<p class="phone-box"><span><img src="//ossweb-img.qq.com/images/lol/appskin/' + cfg['heroId'] + '.jpg" class="pic1"></span></p>';
        html += '<a href="javascript:;" class="select" onclick="PTTSendClick(\'btn\',\'select\',\'确认\');"></a>';
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
        showSysInfo('请选择要领取的道具', true);
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


//挖掘上报 start----------------
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
                        if (firstFlag) {
                            firstFlag = false;
                            url += '?' + i + '=' + param[i];
                        } else {
                            url += '&' + i + '=' + param[i];
                        }
                    }
                }
            }
            var R1 = 'retObj_' + a;
            url += '&r1=' + R1;
            $.ajax({
                dataType: 'script',
                url: url,
                xhrFields: {
                    withCredentials: true
                },
                success: function () {
                    G_clickFlag = true;
                    var data = window[R1];
                    console.log(data) // 处理data数据
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


function checkItem(itemType, itemCode, packageName) {
    if (G_Area == 0) {
        changeArea();
        return;
    }
    switch (itemType) {
        case 1:
            _Model = "LOLHero";
            break;
        case 2:
            _Model = "LOLSkin";
            break;
        case 6:
            _Model = "LOLIcon";
            break;
        case 8:
            _Model = "LOLEmote";
            break;
        case 19:
            _Model = "LOLWard";
            break;
        default:
            showSysInfo("该道具不支持检测是否拥有", true);
            return;
    }
    CallCheckItem(_Model, 'areaid=' + G_Area, 'GetUserGame', itemCode, packageName);
}

function UnloginFunc() {
    need("biz.login", function (LoginManager) {
        login();
    });
}

function CallCheckItem(m, param, control, vID, vName) {
    need("biz.login", function (LoginManager) {
        LoginFunc = function () {
            var goUrl = "//lol.ams.game.qq.com/lol/Go/dollclip/" + control + "?actid=12&SearchType=" + m + "&" + param + "&rid=" + Math.random();
            $.getScript(goUrl, function () {
                if (typeof (window["J_" + control]) != "undefined" && window["J_" + control] != null) {
                    var iRet = parseInt(window["J_" + control]["iRet"], 10);
                    if (iRet == 0) {
                        var ParamArray = m.split(",");
                        for (var i = 0; i < ParamArray.length; i++) {
                            if (ParamArray[i] == "")
                                continue;
                            var _Func = control + "_" + ParamArray[i];
                            if (typeof (window["J_" + control][ParamArray[i]]) != "undefined" && window["J_" + control][ParamArray[i]] != null) {
                                if (typeof (window[_Func]) == "function") {
                                    window[_Func](window["J_" + control][ParamArray[i]], vID, vName);
                                }
                            }
                        }
                    } else {
                        showSysInfo(window["J_" + control]["sMsg"]);
                    }
                }
            });
        };
        LoginManager.checkLogin(LoginFunc, UnloginFunc);
    });
}

function GetUserGame_LOLHero(vData, vID, vName) {
    var iRet = parseInt(vData["result"], 10);
    if (iRet == 0) {
        if (typeof (vData["list"]) != "undefined" && vData["list"] != null && vData["list"] != "") {
            var _tmpArr = vData["list"].split("|");
            for (var i = 1; i < _tmpArr.length; i++) {
                var _tmpItem = _tmpArr[i].split(" ");
                if (_tmpItem[2] == "null" || parseInt(_tmpItem[2], 10) < parseInt(_tmpItem[1], 10)) {
                    if (_tmpItem[0] == vID) {
                        showSysInfo("已拥有", true);
                        return;
                    }
                }
            }
        }
        showSysInfo("未拥有", true);
    } else if (iRet == 1) {
        showSysInfo("未拥有", true);
    } else {
        showSysInfo("查询失败，请稍候再试", true);
    }
}

function GetUserGame_LOLSkin(vData, vID, vName) {
    var iRet = parseInt(vData["result"], 10);
    if (iRet == 0) {
        if (typeof (vData["list"]) != "undefined" && vData["list"] != null && vData["list"] != "") {
            var _tmpArr = vData["list"].split("|");
            for (var i = 1; i < _tmpArr.length; i++) {
                var _tmpItem = _tmpArr[i].split(" ");
                if (_tmpItem[2] == "null" || parseInt(_tmpItem[2], 10) < parseInt(_tmpItem[1], 10)) {
                    if (_tmpItem[0] == vID) {
                        showSysInfo("您在该大区已拥有【" + vName + "】 ", true);
                        return;
                    }
                }
            }
        }
        showSysInfo("您在该大区未拥有【" + vName + "】 ", true);
    } else if (iRet == 1) {
        showSysInfo("您在该大区未拥有【" + vName + "】 ", true);
    } else {
        showSysInfo("查询失败，请稍候再试", true);
    }
}

function GetUserGame_LOLIcon(vData, vID) {
    var iRet = parseInt(vData["result"], 10);
    if (iRet == 0) {
        if (typeof (vData["icon_json"]) != "undefined" && vData["icon_json"] != null && vData["icon_json"] != "") {
            var _tmpArr = eval(vData["icon_json"]);
            for (var i = 0; i < _tmpArr.length; i++) {
                if (_tmpArr[i]["id"] == vID) {
                    showSysInfo("已拥有", true);
                    return;
                }
            }
        }
        showSysInfo("未拥有", true);
    } else if (iRet == 1) {
        showSysInfo("未拥有", true);
    } else {
        showSysInfo("查询失败，请稍候再试", true);
    }
}

function GetUserGame_LOLWard(vData, vID) {
    var iRet = parseInt(vData["result"], 10);
    if (iRet == 0) {
        if (typeof (vData["num"]) != "undefined" && vData["num"] != null && vData["num"] != "") {
            var _tmpArr = vData["num"].split("|");
            for (var i = 1; i < _tmpArr.length; i++) {
                var _tmpItem = _tmpArr[i].split(" ");
                if (_tmpItem[1] == vID) {
                    showSysInfo("已拥有", true);
                    return;
                }
            }
        }
        showSysInfo("未拥有", true);
    } else if (iRet == 1) {
        showSysInfo("未拥有", true);
    } else {
        showSysInfo("查询失败，请稍候再试", true);
    }
}

function GetUserGame_LOLEmote(vData, vID) {
    var iRet = parseInt(vData["result"], 10);
    if (iRet == 0) {
        if (typeof (vData["list"]) != "undefined" && vData["list"] != null && vData["list"] != "") {
            var _tmpArr = vData["list"].split("|");
            for (var i = 1; i < _tmpArr.length; i++) {
                var _tmpItem = _tmpArr[i].split(" ");
                if (_tmpItem[0] == vID) {
                    showSysInfo("已拥有", true);
                    return;
                }
            }
        }
        showSysInfo("未拥有", true);
    } else if (iRet == 1) {
        showSysInfo("未拥有", true);
    } else {
        showSysInfo("查询失败，请稍候再试", true);
    }
}/* #t6Hl8#71981536D23E16B4DF19A6CB59DC0BE2 */