// 7��Ҫ��ʾ�صȽ�����
if($('.cont1 .lotttop').css('display')!='none'){
	$('.wrap').css({
		'height':'27.49rem',
		'background':'url(//game.gtimg.cn/images/lpl/act/a20210202springmlott/bg3.jpg) no-repeat'
	})
}else{
	$('.wrap').css({
		'height':'19.8rem',
		'background':'url(//game.gtimg.cn/images/lpl/act/a20210202springmlott/bg1.jpg) no-repeat'
	})
}

// �ж��û��Ƿ��¼��cont1��Ʒҳ����ʾ
function cont2Show(){
	if($('.cont1').css('display')!='block'){
		$('.wrap').css({
			'height':'13.34rem',
			'background':'url(//game.gtimg.cn/images/lpl/act/a20210202springmlott/bg2.jpg) no-repeat'
		})
	}else{
		$('.wrap').css({
			'height':'19.8rem',
			'background':'url(//game.gtimg.cn/images/lpl/act/a20210202springmlott/bg1.jpg) no-repeat'
		})
	}
}

// �����ʼ�齱����齱ҳ��
$('.cont1 .btn-lott').on('click',function(){
	$('.cont2').show().siblings('.cont').hide();
	cont2Show();
})

// ����齱���뽱��ҳ��
$('.cont2 .btn-lott').on('click',function(){
	// ��ʱȡ������������⽱��ҳ���ʵ�ｱ��ҳ��
	// var idx=Math.floor(Math.random() * 3)+2;
	$(this).addClass('btn-lotted');
	$('.btn-openred').css({
		'-webkit-animation':'pulse .5s ease both'
	})
	cont2Show();
})

// ��������������
function openred(){
	if($('.cont2 .btn-lott').hasClass('btn-lotted')){
		$('.btn-openred').addClass('active')
		amsSubmit(360375,740207);
		//var idx=Math.floor(Math.random() * 5)+1;
		//$('#dia'+idx+'').fadeIn(1000);
	}
}
// �Զ���رհ�ť
$('.dialott .dia-close').on('click',function(){
	$('.btn-openred').removeClass('active')
	$('.cont2 .btn-lott').removeClass('btn-lotted');
	$('.btn-openred').css({
		'-webkit-animation':'normal'
	})
	// $('.btn-openred').children().css({
	// 	'-webkit-animation':'normal'
	// })
	$('.dialott').hide();
})

// ������ֽ�Ʒ







//��ѯ�Ƿ�󶨵�����
amsCfg_740211={
	type : "query",
	iQueryFlowID:740210,
	success : function(bindedInfo){
		//�Ѱ�ʱ����չ����

	},
	failure : function(){
		//δ��ʱ����չ����
	}
};

//�ύ�󶨵�����
amsCfg_740210={
	type : "comit",
	needPopupRole:true,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
	roleInfo:null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
	iQueryFlowID:740211,
	service:"lol",
	success : function(bindedInfo){
		//�Ѱ�ʱ����չ����
	},
	failure : function(){
		//δ��ʱ����չ����
	}
};

// �齱��ȡ�����ܳ�ʼ��
amsCfg_740207 = {
	'iAMSActivityId' : '360375', // AMS���
	'activityId' : '391192', // ģ��ʵ����
	
	//��ѡ��չ����sData��
	/**	
	"sData":{						
			"sPlatId":1,
			"sArea":4,   
			"appid":"100584625",
			"sServiceType":"pao"
			},
	**/
					
	'onBeginGetGiftEvent' : function(){
		return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
	},
	'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
		if(!callbackObj.sPackageName){
			LotteryManager.alert(callbackObj.sMsg);
			return;
		}
		//1��ʵ��
		var str = "��ϲ������� " + callbackObj.sPackageName + " !";
		if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
			/*
			 * 0��������Ϸ��Ʒ
			 * 1��ʵ����Ʒ����Ҫ��д�����ջ���Ϣ
			 * 2��cdkey
			 */
			str += "����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����";
			LotteryManager.alert(str);
			return;
		}
		//2��cdkey
		if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
		
			LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey ? callbackObj.sPackageCDkey : callbackObj.sPackageOtherInfo);
			//LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
			return;
		}
		str += "����ע����գ�";
		LotteryManager.alert(str);
		return;
	}
};

//���ã���ѯ�Ƿ��Ѿ���
milo.ready(function() {
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
			g("login_qq_span").innerHTML = LoginManager.getUserUin();
			amsInit(360375, 740211);
		}, function () {
			LoginManager.login({"sData": {"pt_no_onekey": 1}});
		});
	});
});







/* #t6Hl8#C1FF78AEDC705AB232D09AE5B4203CAC */