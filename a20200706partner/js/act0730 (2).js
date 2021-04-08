var VSHAREKEY = milo.request('vShareKey');
var e_code = 511552;
var TRACEINFO='';
var NICKNAME='';
var PAGE=0;
var inviteArr=[681563,681574,681575,681576,681577];
var inviteRule=[732725,732736,732737,732738,732739];
var packageMsgArr={
    '0':'79 Q币',
    '1':'99 Q币',
    '2':'8888元 现金',
    '3':'9999元 现金',
    '4':'谢谢参与',
    '5':'灵魂莲华5款皮肤 等额Q币',
    '6':'期限皮肤+英雄',
    '7':'灵魂莲华 卡西奥佩亚折扇'
};
var swArr=[2,3,7];
var packageType=4;
var packageList={};

//二次领取
var iPackageIdList={
    '2015835':'51,51006',
    '2015836':'61,61007',
    '2015837':'92,92003',
    '2015838':'99,99006',
    '2015839':'103,103004',
    '2015840':'104,104003',
    '2015841':'105,105009',
    '2015842':'110,110006',
    '2015843':'121,121003',
    '2015844':'145,145001',
    '2015845':'157,157001',
    '2015846':'164,164001',
    '2015847':'222,222003',
    '2015848':'236,236001',
    '2015849':'238,238001',
    '2015850':'254,254002',
    '2015851':'266,266003',
    '2015852':'412,412005',
    '2015853':'497,497001',
    '2015854':'498,498001',
    '2015929':'51,51006',
    '2015930':'61,61007',
    '2015931':'92,92003',
    '2015932':'99,99006',
    '2015933':'103,103004',
    '2015934':'104,104003',
    '2015935':'105,105009',
    '2015936':'110,110006',
    '2015937':'121,121003',
    '2015938':'145,145001',
    '2015939':'157,157001',
    '2015940':'164,164001',
    '2015941':'222,222003',
    '2015942':'236,236001',
    '2015943':'238,238001',
    '2015944':'254,254002',
    '2015945':'266,266003',
    '2015946':'412,412005',
    '2015947':'497,497001',
    '2015948':'498,498001'
}
//每周更新累加s
var dhRuleArr=[734397,734404,734409,734410];
var jfTaskArr={
    '1':'前往QQ手游英雄联盟专区(需浏览超过5S)',
    '2':'前往波洞关注英雄联盟官方账号(单次任务)',
    '3':'前往掌盟绽灵节官方专题',
    '4':'每日登录掌上英雄联盟',
    '5':'订阅赛事(单次任务)',
    '6':'邀请1位好友',
    '7':'邀请2位好友',
    '8':'邀请3位好友',
    '9':'邀请4位好友',
    '10':'邀请5位好友',
    '11':'消耗65积分抽奖',
    '12':'消耗200积分兑换期限皮肤',
    '13':'消耗250积分兑换20Q币',
    '14':'消耗300积分兑换99Q币',
    '15':'消耗350积分兑换5000现金',
    '16':'接受好友邀请'
}
//每周更新累加e
var skinHeroList = [];

// 获取定制皮肤数据
function getSkinList() {
    $.getJSON("//game.gtimg.cn/images/lol/act/img/js/cuSkinList/cuskin_list.js", function (res) {
        skinHeroList = res.cuskin;
    })
}
getSkinList();

//查询积分数量
amsCfg_683323 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316473, //活动id
    "iFlowId":    683323, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        var jfNum=+res.ticket
        $(".jfNum").html(jfNum);
        $("#dhStore li").removeClass('on');
        if(jfNum>=200){
          //  $("#DH_734397").attr('href','javascript:amsSubmit(316473,682990);');
            $("#dhStore li").eq(0).addClass('on');
        }
        if(jfNum>=250){
           // $("#DH_734404").attr('href','javascript:amsSubmit(316473,682995);');
            $("#dhStore li").eq(1).addClass('on');
        }
        if(jfNum>=300){
           // $("#DH_734409").attr('href','javascript:amsSubmit(316473,682999);');
            $("#dhStore li").eq(2).addClass('on');
        }
        if(jfNum>=350){
          //  $("#DH_734410").attr('href','javascript:amsSubmit(316473,683000);');
            $("#dhStore li").eq(3).addClass('on');
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        showMsg(res.sMsg);
    }
};
//订阅赛事
function subscribeMatch(){
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //检查登录态
        LoginManager.checkLogin(function(userInfo){
            var self = CGA;
            if(self.dClickLock){
                self.doClickLock=false;
                $.ajax({
                    dataType: 'jsonp',
                    xhrFields: {
                        withCredentials: true
                    },
                    url:'//lol.sw.game.qq.com/lol/lwdcommact/_/v_ttzli/summerGame20200708/summerGame20200708/subscribeMatch?rd=' + Math.random(),
                    success: function (data) {
                        var obj = {};
                        self.doClickLock=true;
                        if(data.code==0){
                            $('.part-play .live-box').css('width','6.7rem');
                            $("#subscribeMatch").attr('href','javascript:;').attr('class','btn-task on').html('<span>已订阅</span>+50积分').hide();
                            $("#subscribeTips").hide();
                            $("#TASK_732718").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681555);').html('立即领取');
                            showMsg('恭喜您订阅成功');
                        }else{
                            showMsg(data.msg);
                        }
                    }
                });
            }
        },function(){
            LoginManager.login();
        });
    });
}
//抽奖大转盘
amsCfg_682936 = {
    'iAMSActivityId' : '316473', // AMS活动号
    'activityId' : '356086', // 模块实例号
    'sData':{},
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        lottery.enable();
        showMsg3(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(316473,683323);
        packageList={};
        if(callbackObj.iPackageId=='2015863'){//谢谢参与
            packageType=4;
        }else if(callbackObj.iPackageId=='2015865'){//周边奖励
            packageType=7;
        }else if(callbackObj.iPackageId=='2015862'){// 79 Q币
            packageType=0;
        }else if(callbackObj.iPackageId=='2015861'){// 99 Q币
            packageType=1;
        }else if(callbackObj.iPackageId=='2015860'){//绽灵节5款皮肤
            packageType=5;
        }else if(callbackObj.iPackageId=='2015859'){//8888元 现金
            packageType=2;
        }else if(callbackObj.iPackageId=='2015858'){//9999元 现金
            packageType=3;
        }else{//期限皮肤
            packageType=6;
        }
        packageList=callbackObj;
        calllotteryToRoll(packageType);
    }
};

//兑换期限皮肤
amsCfg_682990 = {
    'iAMSActivityId' : '316473', // AMS活动号
    'activityId' : '356086', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        showMsg3(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(316473,684797);
        amsSubmit(316473,683323);
        showSkinDia(callbackObj);
    }
};
//兑换20Q币
amsCfg_682995 = {
    'iAMSActivityId' : '316473', // AMS活动号
    'activityId' : '356086', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        showMsg3(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(316473,684797);
        amsSubmit(316473,683323);
        showMsg(callbackObj.sMsg);
    }
};
//兑换99Q币
amsCfg_682999 = {
    'iAMSActivityId' : '316473', // AMS活动号
    'activityId' : '356086', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        showMsg3(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(316473,684797);
        amsSubmit(316473,683323);
        showMsg(callbackObj.sMsg);
    }
};
//兑换5000现金
amsCfg_683000 = {
    'iAMSActivityId' : '316473', // AMS活动号
    'activityId' : '356086', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        showMsg3(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(316473,684797);
        amsSubmit(316473,683323);
        var swInfoHtml='恭喜您获得<span>'+callbackObj.sPackageName+'</span>奖励<br>' +
            '请您前往活动规则底部查看现金获奖用户的信息登记指引<br>' +
            '为了活动工作人员能与你取得联系，请您在此页面上留下您的联系地址和联系方式';
        $("#swInfo").html(swInfoHtml);
        need(["biz.login"],function(LoginManager){
            //填写按钮的点击事件绑定
            LoginManager.submitLogin(function(){
                amsCfg_681522.sData = { iShow: 1 };
                amsSubmit(316473,681522);
            });
        });
    }
};
//兑换初始化
amsCfg_684797 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316473, //活动id
    "iFlowId":    684797, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        var weekLimitArr=res.sOutValue1.split(',');
        //console.log(weekLimitArr)
        if(weekLimitArr.length>0){
            for (var i in weekLimitArr){
                var limitNum=weekLimitArr[i]<0?0:weekLimitArr[i];
                if(i=='0'){
                    $("#residue1").html('期限皮肤+英雄<br>'+limitNum+'份');
                }else if(i=='1'){
                    $("#residue2").html('20Q币<br>'+limitNum+'份');
                }else if(i=='2'){
                    $("#residue3").html('99Q币<br>'+limitNum+'份');
                }else if(i=='3'){
                    $("#residue4").html('5000现金<br>'+limitNum+'份');
                }
                if(weekLimitArr[i]<=0){
                    if(i=='0'){
                        $("#residue1").html('期限皮肤+英雄<br>0份');
                    }else if(i=='1'){
                        $("#residue2").html('20Q币<br>0份');
                    }else if(i=='2'){
                        $("#residue3").html('99Q币<br>0份');
                    }else if(i=='3'){
                        $("#residue4").html('5000现金<br>0份');
                    }
                    $("#DH_"+dhRuleArr[i]).attr('href','javacript:;').html('已兑光').attr('class','btn-exchange changed');
                }
            }
        }
        var totalLimitArr=res.sOutValue2.split(',');
        //console.log(totalLimitArr)
        if(totalLimitArr.length>0){
            for (var i in totalLimitArr){
                if(totalLimitArr[i]<=0){
                    if(i=='0'){
                        $("#residue1").html('期限皮肤+英雄<br>0份');
                    }else if(i=='1'){
                        $("#residue2").html('20Q币<br>0份');
                    }else if(i=='2'){
                        $("#residue3").html('99Q币<br>0份');
                    }else if(i=='3'){
                        $("#residue4").html('5000现金<br>0份');
                    }
                    $("#DH_"+dhRuleArr[i]).attr('href','javacript:;').html('已兑光').attr('class','btn-exchange changed');
                }
            }
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        showMsg(res.sMsg);
    }
};
//二次领取
amsCfg_683001 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    'iAMSActivityId' : '316473', // AMS活动号
    'activityId' : '356086', // 模块实例号
    'sData':{},
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        showMsg(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        closeDialog();
        showMsg(callbackObj.sMsg);
    }
};

//领取任务
amsCfg_681538 = amsCfg_681540 = amsCfg_681544 = amsCfg_681545 = amsCfg_681555 ={
    'iAMSActivityId' : '316473', // AMS活动号
    'activityId' : '356086', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        showMsg(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(316473,684228);
        amsSubmit(316473,683323);
        var msg='恭喜您获得了： '+callbackObj.iPackageNum+'积分';
        showMsg(msg);
    }
};

//积分兑换记录
amsCfg_681521 = {
    'iAMSActivityId' : '316473', // AMS活动号
    'iLotteryFlowId' : '681521', //  查询获奖轮播的流程号
    'activityId' : '357711', // 模块实例号
    'contentId' : 'getGiftContent_681521', //容器ID
    'templateId' : 'getGiftTemplate_681521', //模板ID
    'contentPageId' : 'getGiftPageContent_681521',	//分页容器ID
    'showContentId' : 'showMyGiftContent_681521', //弹出层ID
    'isForce' : true, //false 默认前端有缓存记录，如果需要每次都去后台查询，则改为true,
    'pageSize': 10
};

//提交个人信息
amsCfg_681522 = {
    'iActivityId' : '316473', // AMS活动号
    'iFlowId' : '681522', // 流程号
    '_everyRead' : true,
    'success': function(res){ //提交成功的回调
        if(typeof res.jData == "object") { //返回已经提交的数据，填充页面
            need(["biz.provincecityselector2", "util.form"], function(pcs, FormManager) {

                //提交按钮事件
                g('personInfoContentBtn_681522').onclick = function(){
                    var fillData = FormManager.getAllInputValue('form_personInfo_681522');
                    for(var i in fillData) {
                        var _val = fillData[i];
                        switch(i) {
                            case 'sName': {
                                if(!_val){alert("姓名不能为空"); return false;}
                                if(milo.getByteLength(_val) > 30){alert("姓名长度不能超过30个字节。"); return false;}
                                break;
                            }
                            case 'sMobile':{
                                if(!_val){alert("手机号码不能为空"); return false;}
                                if(isNaN(_val) || _val.indexOf('.') >= 0){alert("手机号码必须为数字。"); return false;}
                                if(_val.length > 11){alert("手机号码不得超过11位。"); return false;}
                                break;
                            }
                            case 'sAddress':{
                                if(!_val){alert("详细地址不能为空"); return false;}
                                if(milo.getByteLength(_val) > 100){alert("详细地址不能超过100个字节。"); return false;}
                                break;
                            }
                            default : {}
                        }
                    }

                    amsCfg_681522.sData = fillData;
                    amsSubmit(316473,681522);
                }
                var pcsConfig = {
                    provinceId : "province_"+681522,
                    cityId : "city_"+681522,
                    areaId: "county_"+681522,
                };
                if (res.jData.sProvince && res.jData.sCity && res.jData.sExtend2) {
                    pcsConfig.initVal = [res.jData.sProvince,res.jData.sCity, res.jData.sExtend2]
                }
                pcs.show(pcsConfig);

                delete res.jData.sProvince;
                delete res.jData.sCity;
                FormManager.setAllInputValue(res.jData, 'form_personInfo_681522');
                if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //如果存在实物信息，则显示
                    for(var i=0; i<res.jData.arrPackageInfo.length; ++i) {
                        var iPackageId = res.jData.arrPackageInfo[i].iPackageId;
                        var sPackageName = res.jData.arrPackageInfo[i].sPackageName;
                        g('package_681522').options[i] = new Option(sPackageName, iPackageId + '|' + sPackageName);
                    }
                }
            });
            TGDialogS('dia_address');
        } else {
            need(["biz.widget.dialog"],function(Dialog){
                showMsg(res.sMsg);
            });
        }
    },
    'fail':function(data){
        showMsg(data.sMsg);
    }, //失败的回调,
    'error':function(data){
        showMsg(data.sMsg);
    } //错误的回调,
};

//前往绽灵节官方专题
amsCfg_684900 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316473, //活动id
    "iFlowId":    684900, //流程id
    "fFlowSubmitEnd": function(res){
        toZMDeatil("https://lol.qq.com/act/a20200723spiritblossomh5/index.html");
        //window.location.href="https://lol.qq.com/act/a20200723spiritblossom/index.html?e_code=442728";
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        //alert(res.sMsg);
        toZMDeatil("https://lol.qq.com/act/a20200723spiritblossomh5/index.html");
        //window.location.href="https://lol.qq.com/act/a20200723spiritblossom/index.html?e_code=442728";
    }
};

//任务资格初始化
amsCfg_684228 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316473, //活动id
    "iFlowId":    684228, //流程id
    "fFlowSubmitEnd": function(res){
        $("#refreshTask").show();
        var isSubscribe=+res.sOutValue2;
        if(isSubscribe>0){
            $('.part-play .live-box').css('width','6.7rem');
            $("#subscribeMatch").attr('href','javascript:;').attr('class','btn-task on').html('<span>已订阅</span>+50积分').hide();
            $("#subscribeTips").hide();
            $("#TASK_732718").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681555);').html('立即领取');
        }else{
            $("#TASK_732718").attr('class','btn-leave').attr('href',"javascript:subscribeMatch();");
        }

        var qqTask=+res.sOutValue3;
        if(qqTask<=0){

            $("#TASK_732702").attr('class','btn-leave').attr('href','javascript:toQQCenter();');
        }else{
            $("#TASK_732702").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681538);').html('立即领取');
        }

        var bdTask=+res.sOutValue4;
        if(bdTask<=0){
            $("#TASK_732703").attr('class','btn-leave').attr('href','javascript:toBdUrl();');
        }else{
            $("#TASK_732703").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681540);').html('立即领取');
        }

        var isloginZM=+res.sOutValue5;
        if(isloginZM<=0){
            var selfs=CheckApp;
            if(selfs.Is_Plat== "ZM"){
                $("#TASK_732709").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681545);').html('立即领取');
            }else{
                $("#TASK_732709").attr('class','btn-leave').attr('href','javascript:toZMDeatil();');
            }
        }else{
            $("#TASK_732709").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681545);').html('立即领取');
        }
        var ruleArr=res.sOutValue1.split(',');
        if(ruleArr.length>0){
            if(parseInt(ruleArr[5])>0){
                $("#TASK_736937").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681544);').attr('onclick','PTTSendClick(\'btn\',\'btn-leave3\',\'btn\');').html('立即领取');
            }else{
                $("#TASK_736937").attr('class','btn-leave').attr('href','javascript:toOfficialTopics();').html('立即前往');
            }
            //完成游戏中心
            if(parseInt(ruleArr[0])>0){
                $("#TASK_732702").attr('class','btn-leave finished').attr('href','javascript:;').html('已领取');
            }
            //完成波动星球
            if(parseInt(ruleArr[1])>0){
                $("#TASK_732703").attr('class','btn-leave finished').attr('href','javascript:;').html('已领取');
            }
            //前往绽灵节官方专题
            if(parseInt(ruleArr[2])>0){
                $("#TASK_736937").attr('class','btn-leave finished').attr('href','javascript:;').html('已领取');
            }
            //完成登录掌上英雄联盟
            if(parseInt(ruleArr[3])>0){
                $("#TASK_732709").attr('class','btn-leave finished').attr('href','javascript:;').html('已领取');
            }
            //完成订阅赛事
            if(parseInt(ruleArr[4])>0){
                $("#TASK_732718").attr('class','btn-leave finished').attr('href','javascript:;').html('已领取');
            }
        }


        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        $("#refreshTask").show();
        showMsg(res.sMsg);

    }
};

//邀请好友s
//邀请好友页面初始化
amsCfg_681527 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316473, //活动id
    "iFlowId":    681527, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){

        var inviteNum=+res.sOutValue1;
        for (var i=0;i<inviteNum;i++){
            $("#inviteNumList li").eq(i).addClass('on');
            $("#inviteNumList li").eq(i).find('a').attr('class','btn-get1').html('领取');
            $("#inviteNumList li").eq(i).find('a').attr('href',"javascript:amsSubmit(316473,"+inviteArr[i]+");");
        }

        var ruleArr=res.sOutValue2.split(',');
        if(ruleArr.length>0){
            for (var j in ruleArr){
                if(ruleArr[j]=='1'){
                    $("#RULE_"+inviteRule[j]).attr('class','btn-get1 got').html('已领取');
                    $("#RULE_"+inviteRule[j]).attr('href','javascript:;');
                }
            }
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        showMsg(res.sMsg);
    }
};

// 抽奖领取主功能初始化
amsCfg_681563 = amsCfg_681574 = amsCfg_681575 = amsCfg_681576 = amsCfg_681577 ={
    'iAMSActivityId' : '316473', // AMS活动号
    'activityId' : '356086', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        showMsg(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(316473,681527);
        amsSubmit(316473,683323);
        var msg='恭喜您获得了： '+callbackObj.iPackageNum+'积分';
        showMsg(msg);
    }
};

//通过好友分享进入信息
amsCfg_682068 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316473, //活动id
    "iFlowId":    682068, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        if(res.jData.result=='0'||res.jData.result=='2'){
            var nickName=decodeURIComponent(decodeURIComponent(milo.request('nick')));
            $("#friendName").html(nickName);
            TGDialogS('dia_invite1');
        }else{
            showMsg(res.jData.msg);
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        showMsg(res.sMsg);
    }
};

//获取好友
function getFriendList(type) {
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //检查登录态
        LoginManager.checkLogin(function(userInfo){
            $("#btnChange").addClass('gray');
            if(PAGE==0 && type<1){
                showMsg('您没有更多可选择好友啦~');
                return;
            }
            var self = CGA;
            if(self.dClickLock){
                self.doClickLock=false;
                $.ajax({
                    dataType: 'jsonp',
                    xhrFields: {
                        withCredentials: true
                    },
                    url:'//lol.sw.game.qq.com/lol/lwdcommact/_/v_ttzli/summerGame20200708/summerGame20200708/getUinFriendList?traceinfo='+TRACEINFO+'&rd=' + Math.random(),
                    success: function (data) {
                        $("#btnChange").removeClass('gray');
                        var obj={};
                        self.doClickLock=true;
                        if(data.code==0){
                            if(data.list.list !=null){
                                if(data.list.list.length > 0){
                                    $("#btnChange").removeClass('gray');
                                    var temp={};
                                    for(var i in data.list.list){
                                        temp[i]=data.list.list[i];
                                        temp[i]['img']="//q.qlogo.cn/g?b=qq&nk=" + data.list.list[i]['uin'] + "&s=100";
                                        temp[i]['nick']=data.list.list[i]['nick']?data.list.list[i]['nick']:data.list.list[i]['uin'];
                                    }
                                    obj['tmpData']=temp;
                                    $("#friendList").html(template('friendTemp',obj));
                                    if(data.list.list.length<5 || data.list.hasmore=='0'){
                                        TRACEINFO='';
                                        var defaultHtml='';
                                        for(var j=0;j<(5-data.list.list.length);j++){
                                            defaultHtml+='<li>';
                                            defaultHtml+='<img src="//game.gtimg.cn/images/lpl/act/a20200706partner/photo1.png" alt="">';
                                            defaultHtml+='<i></i>';
                                            defaultHtml+='<p>暂无好友</p>';
                                            defaultHtml+='</li>';
                                        }
                                        $("#friendList").append(defaultHtml);
                                    }else{
                                        PAGE=1;
                                        TRACEINFO=data.list.traceinfo;
                                    }
                                }else{
                                    TRACEINFO='';
                                }
                            }
                        }else{
                            if(data.msg.indexOf('重新登录')>-1){
                                $(".qq-wrap").show();
                                LoginManager.logout();
                                return;
                            }else if(data.msg.indexOf('fail')>-1) {
                                showMsg('系统繁忙，请稍候再试');
                                return;
                            }else{
                                showMsg(data.msg);
                                return;
                            }

                        }
                    }
                });
            }

        },function(){
            LoginManager.login();
        });
    });
}

function inviteConfirm(fuin,nick,today){
    isQQ(function(){
        if(today>0){
            showMsg('您今天已经邀请过该好友了');
            return;
        }
        /*var msgHtml='您即将向好友“'+nick+'”的QQ发送一条邀请；';
        $("#inviteMsg").html(msgHtml);
        $("#inviteConfirm").attr('href',"javascript:inviteFriend("+fuin+");");
        TGDialogS('dia_invite');*/
        inviteFriend(fuin);
    })
}

function inviteFriend(fuin){
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //检查登录态
        LoginManager.checkLogin(function(userInfo){
            var self = CGA;
            if(self.dClickLock){
                self.doClickLock=false;
                amsCfg_682032.sData.friendUin=fuin;
                amsSubmit(316473,682032);
            }
        },function(){
            LoginManager.login();
        });
    });
}

//点击邀请好友
amsCfg_682032 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316473, //活动id
    "iFlowId":    682032, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        var self = CGA;
        self.doClickLock=true;
        if(res.jData.msg.indexOf('好友已经绑定过')>-1){
            showMsg('您的好友已接受其他人邀请啦~换个好友试试吧！');
        }else{
            if(res.jData.result=='0'){
                var fuin=amsCfg_682032.sData.friendUin;
                var vShareKey=res.jData.vShareKey;
                $("#FUIN_"+fuin).attr('class','btn-invite on').html('已发送');
                shareArkMsg(fuin,vShareKey);
            }else{
                showMsg(res.jData.msg)
            }
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        var self = CGA;
        self.doClickLock=true;
        showMsg(res.sMsg);
    },
    "fFlowProssFailed":function(res){
        var self = CGA;
        self.doClickLock=true;
        showMsg(res.sMsg);
    }
};

function getMyInviteList(){
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //检查登录态
        LoginManager.checkLogin(function(userInfo){
            var self = CGA;
            if(self.dClickLock){
                self.doClickLock=false;
                $.ajax({
                    dataType: 'jsonp',
                    xhrFields: {
                        withCredentials: true
                    },
                    url:'//lol.sw.game.qq.com/lol/lwdcommact/_/v_ttzli/summerGame20200708/summerGame20200708/getMyInviteList?rd=' + Math.random(),
                    success: function (data) {
                        var obj = {};
                        self.doClickLock=true;
                        if(data.code==0){
                            if(data.list.length>0){
                                obj['tmpData']=data.list;
                                $("#MyInviteList").html(template('MyInviteListTemp',obj));
                                TGDialogS('inviteList');
                            }else{
                                showMsg('暂无邀请好友记录');
                            }
                        }else{
                            showMsg(data.msg);
                        }
                    }
                });
            }
        },function(){
            LoginManager.login();
        });
    });
}

//绑定好友
amsCfg_684004 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316473, //活动id
    "iFlowId":    684004, //流程id
    "sData":{},
    "fFlowSubmitEnd": function(res){
        var self = CGA;
        self.doClickLock=true;
        if(res.iRet!=0){
            if(res.jData.msg.indexOf('分享码无效')>-1){
                showMsg('您不是邀请人的QQ好友，无法接受邀请');
            }else{
                showMsg(res.jData.msg);
            }
        }else{
            //积分数
            amsSubmit(316473,683323);
            var msg='恭喜您获得了： '+res.iPackageNum+'积分';
            showMsg(msg+'，邀请更多好友来参与活动吧！');
        }

        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        var self = CGA;
        self.doClickLock=true;
        showMsg(res.sMsg);
    },
    "fFlowProssFailed":function(res){
        var self = CGA;
        self.doClickLock=true;
        showMsg(res.sMsg);
    }
};


function bindFriend(){
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //检查登录态
        LoginManager.checkLogin(function(userInfo){
            closeDialog();
            var self = CGA;
            if(self.dClickLock){
                self.doClickLock=false;
                amsCfg_684004.sData.vShareKey=VSHAREKEY;
                amsSubmit(316473,684004);
            }
        },function(){
            LoginManager.login();
        });
    });
}



template.helper('isInvited',function(today){
    if(parseInt(today) > 0){
        return 'on'
    }else{
        return '';
    }
});

template.helper('isFs',function(today){
    if(parseInt(today) > 0){
        return '已发送'
    }else{
        return '邀请';
    }
});


template.helper('FormatTime',function(time){
    return time.substring(0,10);
});

function showMsg(msg) {
    $("#sMsg").html(msg);
    TGDialogS('dialogMessage');
}

function showMsg2(msg) {
    $("#sMsg2").html(msg);
    TGDialogS('dialogMessage2');
}

function showMsg3(msg) {
    $("#sMsg3").html(msg);
    TGDialogS('dialogMessage3');
}

function isZM(callback) {
    var selfs=CheckApp;
    if (selfs.Is_Plat!= "ZM"){
        TGDialogS('dia_link');
        return;
    }
    callback();
}

function isQQ(callback) {
    var selfs=CheckApp;
    if (selfs.Is_Plat!= "QQ"){
        showMsg('请在qq客户端打开');
        return;
    }
    callback();
}

//一键拉群
function addQQGroup(){
    isQQ(function () {
        mqq.ui.showProfile({
            uin: '1139398106',
            uinType:1
        })
    })
}

function shareArkMsg(fuin,vShareKey) {
    closeDialog();
    console.log(vShareKey);
    isQQ(function () {
        console.log(fuin);
        mqq.ui.shareArkMessage({
            appName: 'com.tencent.gamecenter.share_celebrity',
            appView: 'shareC',
            promptText: '跟我一起参与活动赢大奖吧',
            toUin:''+fuin,
            uinType:0,
            appConfig: JSON.stringify({
                type: 'normal', // normal：非页卡模式（高度可自适应），card：页卡模式（高度固定）
                forward: 1, // 0：不允许转发，1：允许转发
            }),
            metaData: JSON.stringify({
                shareData: {
                    appid: '1110657564',
                    url: "https://game.gtimg.cn/images/lpl/act/a20200706partner/shareArk.png",
                    jumpUrl: "https://lpl.qq.com/act/a20200706partner/index.html?vShareKey="+vShareKey+"&e_code="+e_code+"&nick="+encodeURIComponent(NICKNAME),
                    buttons: [{
                        text: '跟我一起参与活动赢大奖吧',
                        url: "https://lpl.qq.com/act/a20200706partner/index.html?vShareKey="+vShareKey+"&e_code="+e_code+"&nick="+encodeURIComponent(NICKNAME),
                    }]
                }
            }),
            callback: mqq.callback(async (res) => {
                showMsg(res.retCode)
            })
        });
  })
}

function getShareKey(){
    var nickName=decodeURIComponent(decodeURIComponent(milo.request('nick')));
    $("#friendName").html(nickName);
    TGDialogS('dia_invite1');
}
//邀请好友e


// 获取资讯数据
function getNewsList() {
    $.ajax({
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        url:'//mlol.qt.qq.com/go/mlol_news/recommend_feeds?favzone=lol|tft&zone=plat&channel=3&num=3',
        success: function (data) {
            var obj = {};
            var temp=[];
            var newsList = data.data.feedsInfo;
            if(newsList.length>0){
                for (var i in newsList){
                    if(typeof(newsList[i]['feedBase']['position']) == 'undefined'){
                        var tmp={};
                        tmp['img']=newsList[i]['feedNews']['body']['imgUrl']
                        tmp['title']=newsList[i]['feedNews']['body']['title']
                        if(typeof(newsList[i]['feedNews']['footer']['commentCount'])!='undefined'){
                            tmp['commentCount']=0
                        }else{
                            tmp['commentCount']=newsList[i]['feedNews']['footer']['commentCount']
                        }
                        if(newsList[i]['feedNews']['body']['isVideo']=='true'){
                            tmp['vid']=newsList[i]['feedNews']['body']['vid']
                        }else{
                            tmp['vid']='';
                        }
                        tmp['url']=newsList[i]['feedBase']['intent'];
                        tmp['source']=newsList[i]['feedNews']['footer']['source'];
                        temp.push(tmp);
                    }
                }
                obj['tmpData']=temp;
                $("#feedNewsList").html(template('feedNewsListTemp',obj));
            }
            console.log(obj);
        }
    });
}

getNewsList();

function readMore() {
    isZM(function () {
        window.location.href="qtpage://main";
    })
}

function redaDetail(url) {
    isZM(function () {
        window.location.href="qtpage://news_detail?url="+encodeURIComponent(url);
    })
}

//领取期限皮肤
function showSkinDia(packageList) {
    var id=packageList.iDbPackageAutoIncId;
    $("#voteName").html(packageList.sMsg.replace(', 兑换期限皮肤',''));
    var voteImg='';
    for(var i in packageList.all_item_list){
        var code=packageList.all_item_list[i]['iItemCode'];
        if (code > 1000) {
            var _Img = "//game.gtimg.cn/images/lol/act/img/skinloading/" + code + ".jpg";
        } else {
            var _Img = "//game.gtimg.cn/images/lol/act/img/skinloading/" + code + "000.jpg";
        }
        var _Name=packageList.all_item_list[i]['sItemName'];
        voteImg+='<li><img src="'+_Img+'"><span>'+_Name+'</span></li>';
    }
    $("#voteImg").html(voteImg);
    $('#area').html('(请选择领取的大区)');
    $("#receivePackage").attr('href','javascript:receivePackage('+id+');');
    TGDialogS('dia_skin');
}


function changeArea() {
    var self=CGA;
    closeDialog()
    self.ChangeArea(function(iArea) {
        self.iChangeArea = iArea;
        $('#area').html(LOLServerSelect.zoneToName(iArea));
        TGDialogS('dia_skin');
    })
}

function receivePackage(id) {
    var self=CGA;
    if(!self.iChangeArea){
         showMsg2('请选择大区后再领取');
         return;
    }else{
        amsCfg_683001.sData.sArea=self.iChangeArea;
        amsCfg_683001.sData.id=id;
        amsSubmit(316473,683001);
    }
}

//查询领取记录
function userGet(page){
    amsCfg_684852.sData.iPageSize=10;
    amsCfg_684852.sData.iPageNow=page;
    amsSubmit(316473,684852);
}

//提交请求至AME
amsCfg_684852 = {
    '_everyRead':true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
    "iActivityId": 316473, //活动id
    "iFlowId":    684852, //流程id
    "sData":{//自定义传参
    },
    "fFlowSubmitEnd": function(res){
        var temp=res.myGiftList;
        var iTotalPage=res.pageTotal;
        var item={};
        item['tmpData']=temp;
        $('#myUserList').html(template('userListTemp', item));
        need("util.ajaxpage", function(jo) {
            pageShow = new jo({
                oPage: "pageShow",
                pageId: "jPager",
                pageNow:  amsCfg_684852.sData.iPageNow,
                pageShowNum: 2,
                pageTotal: iTotalPage,
                style: 345,
                onChange: function(i) {
                    userGet(i);
                }
            });
            $('#jPager').show();
        });
        TGDialogS('userList');
        return;
    },
    "fFlowSubmitFailed":function(res){
        //失败会走到这个函数
        //条件不满足，ame返回大于0是后走到这里
        showMsg(res.sMsg);
    }
};

//填写实物奖励
function swReward(iPackageId,sPackageName) {
    need(["biz.login"],function(LoginManager){
        LoginManager.submitLogin(function(){

            if(iPackageId=='2015865'){
                var swInfoHtml='恭喜您抽中<span>'+sPackageName+'</span>一个，请仔细填写真实地址，我们将在活动结束的2个月内给您邮寄奖品。'
            }else if(iPackageId=='2015858'||iPackageId=='2015859'||iPackageId=='2015876'){
                var swInfoHtml='恭喜您获得<span>'+sPackageName+'</span>奖励<br>' +
                    '请您前往活动规则底部查看现金获奖用户的信息登记指引<br>' +
                    '为了活动工作人员能与你取得联系，请您在此页面上留下您的联系地址和联系方式';
            }
            $("#swInfo").html(swInfoHtml);

            amsCfg_681522.sData = { iShow: 1 };
            amsSubmit(316473,681522);
        });
    });
}

function getSkinTime(id,iPackageId,sPackageName) {
    $("#voteName").html(sPackageName);
    var iPackageIdArr=iPackageIdList[iPackageId].split(',');
    var voteImg='';
    for(var i in iPackageIdArr){
        var code=iPackageIdArr[i];
        if (code > 1000) {
            var _Name=skinHeroList[code]['name']+'（7天）';
            var _Img = "//game.gtimg.cn/images/lol/act/img/skinloading/" + code + ".jpg";
        } else {
            var _Name=skinHeroList[code+'000']['name']+'（7天）';
            var _Img = "//game.gtimg.cn/images/lol/act/img/skinloading/" + code + "000.jpg";
        }

        voteImg+='<li><img src="'+_Img+'"><span>'+_Name+'</span></li>';
    }
    $("#voteImg").html(voteImg);
    $('#area').html('(请选择领取的大区)');
    $("#receivePackage").attr('href','javascript:receivePackage('+id+');');
    TGDialogS('dia_skin');
}

//获奖信息轮播
amsCfg_683025 = {
    'activityId' : '316473', // 模块实例号
    'contentId' : 'broadcastContent_683025', //容器ID
    'templateId' : 'broadcastTemplate_683025', //模板ID
    'showLiNum' : 10
};

function toQQCenter() {
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //检查登录态
        LoginManager.checkLogin(function(userInfo){
                  //正式
                window.location.href="https://speed.gamecenter.qq.com/pushgame/v1/detail?_wv=2164260896&_wwv=448&appid=1110657564";
        },function(){
            LoginManager.login();
        });
    });
}

function toOfficialTopics() {
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //检查登录态
        LoginManager.checkLogin(function(userInfo){
            //正式
            amsSubmit(316473,684900);

        },function(){
            LoginManager.login();
        });
    });
}


function toBdUrl() {
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //检查登录态
        LoginManager.checkLogin(function(userInfo){

            window.location.href="https://youxi.vip.qq.com/m/act/df9088b15a_lol_502458.html?_wv=3&_wwv=4";

        },function(){
            LoginManager.login();
        });
    });
}

function refreshTask() {
    $("#refreshTask").hide();
    amsSubmit(316473,684228);
}/* #t6Hl8#05B66FD23A99CAA19CD934F527540470 */