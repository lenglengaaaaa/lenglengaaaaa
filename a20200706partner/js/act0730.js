var VSHAREKEY = milo.request('vShareKey');
var e_code = 511552;
var TRACEINFO='';
var NICKNAME='';
var PAGE=0;
var inviteArr=[681563,681574,681575,681576,681577];
var inviteRule=[732725,732736,732737,732738,732739];
var packageMsgArr={
    '0':'79 Q��',
    '1':'99 Q��',
    '2':'8888Ԫ �ֽ�',
    '3':'9999Ԫ �ֽ�',
    '4':'лл����',
    '5':'�������5��Ƥ�� �ȶ�Q��',
    '6':'����Ƥ��+Ӣ��',
    '7':'������� ��������������'
};
var swArr=[2,3,7];
var packageType=4;
var packageList={};

//������ȡ
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
//ÿ�ܸ����ۼ�s
var dhRuleArr=[734397,734404,734409,734410];
var jfTaskArr={
    '1':'ǰ��QQ����Ӣ������ר��(���������5S)',
    '2':'ǰ��������עӢ�����˹ٷ��˺�(��������)',
    '3':'ǰ����������ڹٷ�ר��',
    '4':'ÿ�յ�¼����Ӣ������',
    '5':'��������(��������)',
    '6':'����1λ����',
    '7':'����2λ����',
    '8':'����3λ����',
    '9':'����4λ����',
    '10':'����5λ����',
    '11':'����65���ֳ齱',
    '12':'����200���ֶһ�����Ƥ��',
    '13':'����250���ֶһ�20Q��',
    '14':'����300���ֶһ�99Q��',
    '15':'����350���ֶһ�5000�ֽ�',
    '16':'���ܺ�������'
}
//ÿ�ܸ����ۼ�e
var skinHeroList = [];

// ��ȡ����Ƥ������
function getSkinList() {
    $.getJSON("//game.gtimg.cn/images/lol/act/img/js/cuSkinList/cuskin_list.js", function (res) {
        skinHeroList = res.cuskin;
    })
}
getSkinList();

//��ѯ��������
amsCfg_683323 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316473, //�id
    "iFlowId":    683323, //����id
    "sData":{//�Զ��崫��
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
//��������
function subscribeMatch(){
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //����¼̬
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
                            $("#subscribeMatch").attr('href','javascript:;').attr('class','btn-task on').html('<span>�Ѷ���</span>+50����').hide();
                            $("#subscribeTips").hide();
                            $("#TASK_732718").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681555);').html('������ȡ');
                            showMsg('��ϲ�����ĳɹ�');
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
//�齱��ת��
amsCfg_682936 = {
    'iAMSActivityId' : '316473', // AMS���
    'activityId' : '356086', // ģ��ʵ����
    'sData':{},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        lottery.enable();
        showMsg3(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(316473,683323);
        packageList={};
        if(callbackObj.iPackageId=='2015863'){//лл����
            packageType=4;
        }else if(callbackObj.iPackageId=='2015865'){//�ܱ߽���
            packageType=7;
        }else if(callbackObj.iPackageId=='2015862'){// 79 Q��
            packageType=0;
        }else if(callbackObj.iPackageId=='2015861'){// 99 Q��
            packageType=1;
        }else if(callbackObj.iPackageId=='2015860'){//�����5��Ƥ��
            packageType=5;
        }else if(callbackObj.iPackageId=='2015859'){//8888Ԫ �ֽ�
            packageType=2;
        }else if(callbackObj.iPackageId=='2015858'){//9999Ԫ �ֽ�
            packageType=3;
        }else{//����Ƥ��
            packageType=6;
        }
        packageList=callbackObj;
        calllotteryToRoll(packageType);
    }
};

//�һ�����Ƥ��
amsCfg_682990 = {
    'iAMSActivityId' : '316473', // AMS���
    'activityId' : '356086', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        showMsg3(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(316473,684797);
        amsSubmit(316473,683323);
        showSkinDia(callbackObj);
    }
};
//�һ�20Q��
amsCfg_682995 = {
    'iAMSActivityId' : '316473', // AMS���
    'activityId' : '356086', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        showMsg3(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(316473,684797);
        amsSubmit(316473,683323);
        showMsg(callbackObj.sMsg);
    }
};
//�һ�99Q��
amsCfg_682999 = {
    'iAMSActivityId' : '316473', // AMS���
    'activityId' : '356086', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        showMsg3(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(316473,684797);
        amsSubmit(316473,683323);
        showMsg(callbackObj.sMsg);
    }
};
//�һ�5000�ֽ�
amsCfg_683000 = {
    'iAMSActivityId' : '316473', // AMS���
    'activityId' : '356086', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        showMsg3(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(316473,684797);
        amsSubmit(316473,683323);
        var swInfoHtml='��ϲ�����<span>'+callbackObj.sPackageName+'</span>����<br>' +
            '����ǰ�������ײ��鿴�ֽ���û�����Ϣ�Ǽ�ָ��<br>' +
            'Ϊ�˻������Ա������ȡ����ϵ�������ڴ�ҳ��������������ϵ��ַ����ϵ��ʽ';
        $("#swInfo").html(swInfoHtml);
        need(["biz.login"],function(LoginManager){
            //��д��ť�ĵ���¼���
            LoginManager.submitLogin(function(){
                amsCfg_681522.sData = { iShow: 1 };
                amsSubmit(316473,681522);
            });
        });
    }
};
//�һ���ʼ��
amsCfg_684797 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316473, //�id
    "iFlowId":    684797, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        var weekLimitArr=res.sOutValue1.split(',');
        //console.log(weekLimitArr)
        if(weekLimitArr.length>0){
            for (var i in weekLimitArr){
                var limitNum=weekLimitArr[i]<0?0:weekLimitArr[i];
                if(i=='0'){
                    $("#residue1").html('����Ƥ��+Ӣ��<br>'+limitNum+'��');
                }else if(i=='1'){
                    $("#residue2").html('20Q��<br>'+limitNum+'��');
                }else if(i=='2'){
                    $("#residue3").html('99Q��<br>'+limitNum+'��');
                }else if(i=='3'){
                    $("#residue4").html('5000�ֽ�<br>'+limitNum+'��');
                }
                if(weekLimitArr[i]<=0){
                    if(i=='0'){
                        $("#residue1").html('����Ƥ��+Ӣ��<br>0��');
                    }else if(i=='1'){
                        $("#residue2").html('20Q��<br>0��');
                    }else if(i=='2'){
                        $("#residue3").html('99Q��<br>0��');
                    }else if(i=='3'){
                        $("#residue4").html('5000�ֽ�<br>0��');
                    }
                    $("#DH_"+dhRuleArr[i]).attr('href','javacript:;').html('�Ѷҹ�').attr('class','btn-exchange changed');
                }
            }
        }
        var totalLimitArr=res.sOutValue2.split(',');
        //console.log(totalLimitArr)
        if(totalLimitArr.length>0){
            for (var i in totalLimitArr){
                if(totalLimitArr[i]<=0){
                    if(i=='0'){
                        $("#residue1").html('����Ƥ��+Ӣ��<br>0��');
                    }else if(i=='1'){
                        $("#residue2").html('20Q��<br>0��');
                    }else if(i=='2'){
                        $("#residue3").html('99Q��<br>0��');
                    }else if(i=='3'){
                        $("#residue4").html('5000�ֽ�<br>0��');
                    }
                    $("#DH_"+dhRuleArr[i]).attr('href','javacript:;').html('�Ѷҹ�').attr('class','btn-exchange changed');
                }
            }
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        showMsg(res.sMsg);
    }
};
//������ȡ
amsCfg_683001 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    'iAMSActivityId' : '316473', // AMS���
    'activityId' : '356086', // ģ��ʵ����
    'sData':{},
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        showMsg(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        closeDialog();
        showMsg(callbackObj.sMsg);
    }
};

//��ȡ����
amsCfg_681538 = amsCfg_681540 = amsCfg_681544 = amsCfg_681545 = amsCfg_681555 ={
    'iAMSActivityId' : '316473', // AMS���
    'activityId' : '356086', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        showMsg(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(316473,684228);
        amsSubmit(316473,683323);
        var msg='��ϲ������ˣ� '+callbackObj.iPackageNum+'����';
        showMsg(msg);
    }
};

//���ֶһ���¼
amsCfg_681521 = {
    'iAMSActivityId' : '316473', // AMS���
    'iLotteryFlowId' : '681521', //  ��ѯ���ֲ������̺�
    'activityId' : '357711', // ģ��ʵ����
    'contentId' : 'getGiftContent_681521', //����ID
    'templateId' : 'getGiftTemplate_681521', //ģ��ID
    'contentPageId' : 'getGiftPageContent_681521',	//��ҳ����ID
    'showContentId' : 'showMyGiftContent_681521', //������ID
    'isForce' : true, //false Ĭ��ǰ���л����¼�������Ҫÿ�ζ�ȥ��̨��ѯ�����Ϊtrue,
    'pageSize': 10
};

//�ύ������Ϣ
amsCfg_681522 = {
    'iActivityId' : '316473', // AMS���
    'iFlowId' : '681522', // ���̺�
    '_everyRead' : true,
    'success': function(res){ //�ύ�ɹ��Ļص�
        if(typeof res.jData == "object") { //�����Ѿ��ύ�����ݣ����ҳ��
            need(["biz.provincecityselector2", "util.form"], function(pcs, FormManager) {

                //�ύ��ť�¼�
                g('personInfoContentBtn_681522').onclick = function(){
                    var fillData = FormManager.getAllInputValue('form_personInfo_681522');
                    for(var i in fillData) {
                        var _val = fillData[i];
                        switch(i) {
                            case 'sName': {
                                if(!_val){alert("��������Ϊ��"); return false;}
                                if(milo.getByteLength(_val) > 30){alert("�������Ȳ��ܳ���30���ֽڡ�"); return false;}
                                break;
                            }
                            case 'sMobile':{
                                if(!_val){alert("�ֻ����벻��Ϊ��"); return false;}
                                if(isNaN(_val) || _val.indexOf('.') >= 0){alert("�ֻ��������Ϊ���֡�"); return false;}
                                if(_val.length > 11){alert("�ֻ����벻�ó���11λ��"); return false;}
                                break;
                            }
                            case 'sAddress':{
                                if(!_val){alert("��ϸ��ַ����Ϊ��"); return false;}
                                if(milo.getByteLength(_val) > 100){alert("��ϸ��ַ���ܳ���100���ֽڡ�"); return false;}
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
                if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //�������ʵ����Ϣ������ʾ
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
    }, //ʧ�ܵĻص�,
    'error':function(data){
        showMsg(data.sMsg);
    } //����Ļص�,
};

//ǰ������ڹٷ�ר��
amsCfg_684900 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316473, //�id
    "iFlowId":    684900, //����id
    "fFlowSubmitEnd": function(res){
        toZMDeatil("https://lol.qq.com/act/a20200723spiritblossomh5/index.html");
        //window.location.href="https://lol.qq.com/act/a20200723spiritblossom/index.html?e_code=442728";
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        //alert(res.sMsg);
        toZMDeatil("https://lol.qq.com/act/a20200723spiritblossomh5/index.html");
        //window.location.href="https://lol.qq.com/act/a20200723spiritblossom/index.html?e_code=442728";
    }
};

//�����ʸ��ʼ��
amsCfg_684228 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316473, //�id
    "iFlowId":    684228, //����id
    "fFlowSubmitEnd": function(res){
        $("#refreshTask").show();
        var isSubscribe=+res.sOutValue2;
        if(isSubscribe>0){
            $('.part-play .live-box').css('width','6.7rem');
            $("#subscribeMatch").attr('href','javascript:;').attr('class','btn-task on').html('<span>�Ѷ���</span>+50����').hide();
            $("#subscribeTips").hide();
            $("#TASK_732718").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681555);').html('������ȡ');
        }else{
            $("#TASK_732718").attr('class','btn-leave').attr('href',"javascript:subscribeMatch();");
        }

        var qqTask=+res.sOutValue3;
        if(qqTask<=0){

            $("#TASK_732702").attr('class','btn-leave').attr('href','javascript:toQQCenter();');
        }else{
            $("#TASK_732702").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681538);').html('������ȡ');
        }

        var bdTask=+res.sOutValue4;
        if(bdTask<=0){
            $("#TASK_732703").attr('class','btn-leave').attr('href','javascript:toBdUrl();');
        }else{
            $("#TASK_732703").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681540);').html('������ȡ');
        }

        var isloginZM=+res.sOutValue5;
        if(isloginZM<=0){
            var selfs=CheckApp;
            if(selfs.Is_Plat== "ZM"){
                $("#TASK_732709").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681545);').html('������ȡ');
            }else{
                $("#TASK_732709").attr('class','btn-leave').attr('href','javascript:toZMDeatil();');
            }
        }else{
            $("#TASK_732709").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681545);').html('������ȡ');
        }
        var ruleArr=res.sOutValue1.split(',');
        if(ruleArr.length>0){
            if(parseInt(ruleArr[5])>0){
                $("#TASK_736937").attr('class','btn-leave').attr('href','javascript:amsSubmit(316473,681544);').attr('onclick','PTTSendClick(\'btn\',\'btn-leave3\',\'btn\');').html('������ȡ');
            }else{
                $("#TASK_736937").attr('class','btn-leave').attr('href','javascript:toOfficialTopics();').html('����ǰ��');
            }
            //�����Ϸ����
            if(parseInt(ruleArr[0])>0){
                $("#TASK_732702").attr('class','btn-leave finished').attr('href','javascript:;').html('����ȡ');
            }
            //��ɲ�������
            if(parseInt(ruleArr[1])>0){
                $("#TASK_732703").attr('class','btn-leave finished').attr('href','javascript:;').html('����ȡ');
            }
            //ǰ������ڹٷ�ר��
            if(parseInt(ruleArr[2])>0){
                $("#TASK_736937").attr('class','btn-leave finished').attr('href','javascript:;').html('����ȡ');
            }
            //��ɵ�¼����Ӣ������
            if(parseInt(ruleArr[3])>0){
                $("#TASK_732709").attr('class','btn-leave finished').attr('href','javascript:;').html('����ȡ');
            }
            //��ɶ�������
            if(parseInt(ruleArr[4])>0){
                $("#TASK_732718").attr('class','btn-leave finished').attr('href','javascript:;').html('����ȡ');
            }
        }


        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        $("#refreshTask").show();
        showMsg(res.sMsg);

    }
};

//�������s
//�������ҳ���ʼ��
amsCfg_681527 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316473, //�id
    "iFlowId":    681527, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){

        var inviteNum=+res.sOutValue1;
        for (var i=0;i<inviteNum;i++){
            $("#inviteNumList li").eq(i).addClass('on');
            $("#inviteNumList li").eq(i).find('a').attr('class','btn-get1').html('��ȡ');
            $("#inviteNumList li").eq(i).find('a').attr('href',"javascript:amsSubmit(316473,"+inviteArr[i]+");");
        }

        var ruleArr=res.sOutValue2.split(',');
        if(ruleArr.length>0){
            for (var j in ruleArr){
                if(ruleArr[j]=='1'){
                    $("#RULE_"+inviteRule[j]).attr('class','btn-get1 got').html('����ȡ');
                    $("#RULE_"+inviteRule[j]).attr('href','javascript:;');
                }
            }
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        showMsg(res.sMsg);
    }
};

// �齱��ȡ�����ܳ�ʼ��
amsCfg_681563 = amsCfg_681574 = amsCfg_681575 = amsCfg_681576 = amsCfg_681577 ={
    'iAMSActivityId' : '316473', // AMS���
    'activityId' : '356086', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        showMsg(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(316473,681527);
        amsSubmit(316473,683323);
        var msg='��ϲ������ˣ� '+callbackObj.iPackageNum+'����';
        showMsg(msg);
    }
};

//ͨ�����ѷ��������Ϣ
amsCfg_682068 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316473, //�id
    "iFlowId":    682068, //����id
    "sData":{//�Զ��崫��
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
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        showMsg(res.sMsg);
    }
};

//��ȡ����
function getFriendList(type) {
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //����¼̬
        LoginManager.checkLogin(function(userInfo){
            $("#btnChange").addClass('gray');
            if(PAGE==0 && type<1){
                showMsg('��û�и����ѡ�������~');
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
                                            defaultHtml+='<p>���޺���</p>';
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
                            if(data.msg.indexOf('���µ�¼')>-1){
                                $(".qq-wrap").show();
                                LoginManager.logout();
                                return;
                            }else if(data.msg.indexOf('fail')>-1) {
                                showMsg('ϵͳ��æ�����Ժ�����');
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
            showMsg('�������Ѿ�������ú�����');
            return;
        }
        /*var msgHtml='����������ѡ�'+nick+'����QQ����һ�����룻';
        $("#inviteMsg").html(msgHtml);
        $("#inviteConfirm").attr('href',"javascript:inviteFriend("+fuin+");");
        TGDialogS('dia_invite');*/
        inviteFriend(fuin);
    })
}

function inviteFriend(fuin){
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //����¼̬
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

//����������
amsCfg_682032 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316473, //�id
    "iFlowId":    682032, //����id
    "sData":{//�Զ��崫��
    },
    "fFlowSubmitEnd": function(res){
        var self = CGA;
        self.doClickLock=true;
        if(res.jData.msg.indexOf('�����Ѿ��󶨹�')>-1){
            showMsg('���ĺ����ѽ���������������~�����������԰ɣ�');
        }else{
            if(res.jData.result=='0'){
                var fuin=amsCfg_682032.sData.friendUin;
                var vShareKey=res.jData.vShareKey;
                $("#FUIN_"+fuin).attr('class','btn-invite on').html('�ѷ���');
                shareArkMsg(fuin,vShareKey);
            }else{
                showMsg(res.jData.msg)
            }
        }
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
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
        //����¼̬
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
                                showMsg('����������Ѽ�¼');
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

//�󶨺���
amsCfg_684004 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316473, //�id
    "iFlowId":    684004, //����id
    "sData":{},
    "fFlowSubmitEnd": function(res){
        var self = CGA;
        self.doClickLock=true;
        if(res.iRet!=0){
            if(res.jData.msg.indexOf('��������Ч')>-1){
                showMsg('�����������˵�QQ���ѣ��޷���������');
            }else{
                showMsg(res.jData.msg);
            }
        }else{
            //������
            amsSubmit(316473,683323);
            var msg='��ϲ������ˣ� '+res.iPackageNum+'����';
            showMsg(msg+'�������������������ɣ�');
        }

        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
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
        //����¼̬
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
        return '�ѷ���'
    }else{
        return '����';
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
        showMsg('����qq�ͻ��˴�');
        return;
    }
    callback();
}

//һ����Ⱥ
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
            promptText: '����һ�����Ӯ�󽱰�',
            toUin:''+fuin,
            uinType:0,
            appConfig: JSON.stringify({
                type: 'normal', // normal����ҳ��ģʽ���߶ȿ�����Ӧ����card��ҳ��ģʽ���߶ȹ̶���
                forward: 1, // 0��������ת����1������ת��
            }),
            metaData: JSON.stringify({
                shareData: {
                    appid: '1110657564',
                    url: "https://game.gtimg.cn/images/lpl/act/a20200706partner/shareArk.png",
                    jumpUrl: "https://lpl.qq.com/act/a20200706partner/index.html?vShareKey="+vShareKey+"&e_code="+e_code+"&nick="+encodeURIComponent(NICKNAME),
                    buttons: [{
                        text: '����һ�����Ӯ�󽱰�',
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
//�������e


// ��ȡ��Ѷ����
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

//��ȡ����Ƥ��
function showSkinDia(packageList) {
    var id=packageList.iDbPackageAutoIncId;
    $("#voteName").html(packageList.sMsg.replace(', �һ�����Ƥ��',''));
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
    $('#area').html('(��ѡ����ȡ�Ĵ���)');
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
         showMsg2('��ѡ�����������ȡ');
         return;
    }else{
        amsCfg_683001.sData.sArea=self.iChangeArea;
        amsCfg_683001.sData.id=id;
        amsSubmit(316473,683001);
    }
}

//��ѯ��ȡ��¼
function userGet(page){
    amsCfg_684852.sData.iPageSize=10;
    amsCfg_684852.sData.iPageNow=page;
    amsSubmit(316473,684852);
}

//�ύ������AME
amsCfg_684852 = {
    '_everyRead':true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
    "iActivityId": 316473, //�id
    "iFlowId":    684852, //����id
    "sData":{//�Զ��崫��
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
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        showMsg(res.sMsg);
    }
};

//��дʵ�ｱ��
function swReward(iPackageId,sPackageName) {
    need(["biz.login"],function(LoginManager){
        LoginManager.submitLogin(function(){

            if(iPackageId=='2015865'){
                var swInfoHtml='��ϲ������<span>'+sPackageName+'</span>һ��������ϸ��д��ʵ��ַ�����ǽ��ڻ������2�����ڸ����ʼĽ�Ʒ��'
            }else if(iPackageId=='2015858'||iPackageId=='2015859'||iPackageId=='2015876'){
                var swInfoHtml='��ϲ�����<span>'+sPackageName+'</span>����<br>' +
                    '����ǰ�������ײ��鿴�ֽ���û�����Ϣ�Ǽ�ָ��<br>' +
                    'Ϊ�˻������Ա������ȡ����ϵ�������ڴ�ҳ��������������ϵ��ַ����ϵ��ʽ';
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
            var _Name=skinHeroList[code]['name']+'��7�죩';
            var _Img = "//game.gtimg.cn/images/lol/act/img/skinloading/" + code + ".jpg";
        } else {
            var _Name=skinHeroList[code+'000']['name']+'��7�죩';
            var _Img = "//game.gtimg.cn/images/lol/act/img/skinloading/" + code + "000.jpg";
        }

        voteImg+='<li><img src="'+_Img+'"><span>'+_Name+'</span></li>';
    }
    $("#voteImg").html(voteImg);
    $('#area').html('(��ѡ����ȡ�Ĵ���)');
    $("#receivePackage").attr('href','javascript:receivePackage('+id+');');
    TGDialogS('dia_skin');
}

//����Ϣ�ֲ�
amsCfg_683025 = {
    'activityId' : '316473', // ģ��ʵ����
    'contentId' : 'broadcastContent_683025', //����ID
    'templateId' : 'broadcastTemplate_683025', //ģ��ID
    'showLiNum' : 10
};

function toQQCenter() {
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //����¼̬
        LoginManager.checkLogin(function(userInfo){
                  //��ʽ
                window.location.href="https://speed.gamecenter.qq.com/pushgame/v1/detail?_wv=2164260896&_wwv=448&appid=1110657564";
        },function(){
            LoginManager.login();
        });
    });
}

function toOfficialTopics() {
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //����¼̬
        LoginManager.checkLogin(function(userInfo){
            //��ʽ
            amsSubmit(316473,684900);

        },function(){
            LoginManager.login();
        });
    });
}


function toBdUrl() {
    need("biz.login", function (LoginManager) {
        LoginManager.init();
        //����¼̬
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