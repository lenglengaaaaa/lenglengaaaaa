// �����ʼ�齱����齱ҳ��
$('.cont1 .btn-lott').on('click',function(){
	$('.cont2').show().siblings('.cont').hide();
})

// ����齱���뽱��ҳ��
$('.cont2 .btn-lott').on('click',function(){
	// ��ʱȡ������������⽱��ҳ���ʵ�ｱ��ҳ��
	// var idx=Math.floor(Math.random() * 3)+2;
	$(this).addClass('btn-lotted');
	$('.btn-openred').css({
		'-webkit-animation':'pulse .5s ease both'
	})
})

// ��������������
function openred(){
	// if($('.cont2 .btn-lott').hasClass('btn-lotted')){
		$('.btn-openred').addClass('active')
		amsSubmit(360463,740290);
		//amsSubmit(360463,740297);
		// var idx=Math.floor(Math.random() * 5)+1;
		// $('#dia'+idx+'').fadeIn(1000);
	// }
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
// ������ֽ�Ʒ
var m = new Date().getDate();
if(m==4){
	$('.lott1 div').html(	`
		<p class="giftlist">����Ƥ��������������</p>
		<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize4.png" alt="">
	`	);
	$('.lott2 div').html(	`
		<p class="giftlist">�����������V2��Ϸ����
		<br>Ī˹����carryţyear�޶����
		<br>Nike Air Ů��ñ��
		<br>Nike Sportswear������ͷ��ñ��
		<br>TCL����������
		<br>��Ƹ��
		</p>
	`	)
	$('.lott3 div').html(	`
		<p class="giftlist">FPXӦԮT�����
		</p>
	`	)
	$('.lott4 div').html(	`
		<p class="giftlist">��ơ���ư�
		<br>�ְ�+ս����Ʒ
		<br>�޹����մ�ˮ������24ƿװ��
		<br>TT������������
		<br>TT����T��16��������
		</p>
	`	)
}else if(m==5){
	$('.lott1 div').html(	`
		<p class="giftlist">�����ֶ�����������</p>
		<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize5.png" alt="">
	`	);
	$('.lott2 div').html(	`
		<p class="giftlist">�����������V2��Ϸ����
		<br>Ī˹����carryţyear�޶����
		<br>Nike Air Ů��ñ��
		<br>Nike Sportswear������ͷ��ñ��
		<br>TCL����������
		<br>��Ƹ��
		</p>
	`	)
	$('.lott3 div').html(	`
		<p class="giftlist">OPPO �ֻ� ʱ�а�
		<br>��ţ�ػ���Ƥ��
		<br>EDG�������޶����
		</p>
	`	)
	$('.lott4 div').html(	`
		<p class="giftlist">��ơ���ư�
		<br>�ְ�+ս����Ʒ
		<br>�޹����մ�ˮ������24ƿװ��
		<br>TT������������
		<br>TT����T��16��������
		</p>
	`	)
}else if(m==6){
	var idx=Math.floor(Math.random() * 2)+1;
	if(idx==1){
		$('.lott1 div').html(	`
			<p class="giftlist">����LPL�ֳ���羺��<br>OPPO Watch 46mm�ֱ�</p>
			<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize6-1.png" alt="">
		`	);
		$('.lott2 div').html(	`
			<p class="giftlist">�����������V2��Ϸ����
			<br>Ī˹����carryţyear�޶����
			<br>Nike Air Ů��ñ��
			<br>Nike Sportswear������ͷ��ñ��
			<br>ս��ȫ�곩����ÿ��һ�䣩
			<br>TCL����������
			<br>��Ƹ��
			</p>
		`	)
		$('.lott3 div').html(	`
			<p class="giftlist">OPPO �ֻ� ʱ�а�
			<br>��ţ�ػ���Ƥ��
			<br>JDG�������
			</p>
		`	)
		$('.lott4 div').html(	`
			<p class="giftlist">��ơ���ư�
			<br>�޹����մ�ˮ������24ƿװ��
			<br>TT������������
			<br>TT����T��16��������
			</p>
		`	)
	}else{
		$('.lott1 div').html(	`
			<p class="giftlist">����Ƥ����������羺��<br>TCL55Ӣ�糬�������</p>
			<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize6-2.png" alt="">
		`	);
		$('.lott2 div').html(	`
			<p class="giftlist">�����������V2��Ϸ����
			<br>Ī˹����carryţyear�޶����
			<br>Nike Air Ů��ñ��
			<br>Nike Sportswear������ͷ��ñ��
			<br>ս��ȫ�곩����ÿ��һ�䣩
			<br>��Ƹ��
			</p>
		`	)
		$('.lott3 div').html(	`
			<p class="giftlist">OPPO �ֻ� ʱ�а�
			<br>��ţ�ػ���Ƥ��
			<br>�ϲ����������
			</p>
		`	)
		$('.lott4 div').html(	`
			<p class="giftlist">��ơ���ư�
			<br>�޹����մ�ˮ������24ƿװ��
			<br>TT������������
			<br>TT����T��16��������
			</p>
		`	)
	}
}else if(m==7){
	var idx=Math.floor(Math.random() * 3)+1;
	$('.lotttop').css('display','block');
	$('.lotttop div').html(	`
	<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prizetop.png" alt="">
	<p class="giftlist">TCL75�����+TCL����+TCLϴ�»�
	<br>+ȫ������Ƥ��+ȫ�׸�ţ�ػ���Ƥ��
	</p>
	`	);
	if(idx==1){
		$('.lott1 div').html(	`
			<p class="giftlist">�����ֶ�����������</p>
			<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize7-1.png" alt="">
		`	);
		$('.lott2 div').html(	`
			<p class="giftlist">�����������V2��Ϸ����
			<br>Ī˹����carryţyear�޶����
			<br>Nike Air Ů��ñ��
			<br>Nike Sportswear������ͷ��ñ��
			<br>ս��ȫ�곩����ÿ��һ�䣩
			<br>��Ƹ��
			</p>
		`	)
		$('.lott3 div').html(	`
			<p class="giftlist">OPPO �ֻ� ʱ�а�
			<br>��ţ�ػ���Ƥ��
			<br>RA�������
			<br>V5�������
			</p>
		`	)
		$('.lott4 div').html(	`
			<p class="giftlist">��ơ���ư�
			<br>�޹����մ�ˮ������24ƿװ��
			<br>TT������������
			<br>TT����T��16��������
			</p>
		`	)
	}else if(idx==2){
		$('.lott1 div').html(	`
			<p class="giftlist">�����е�ۿ�羺��<br>OPPO Watch 46mm�ֱ�</p>
			<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize7-2.png" alt="">
		`	);
		$('.lott2 div').html(	`
			<p class="giftlist">�����������V2��Ϸ����
			<br>Ī˹����carryţyear�޶����
			<br>Nike Air Ů��ñ��
			<br>Nike Sportswear������ͷ��ñ��
			<br>ս��ȫ�곩����ÿ��һ�䣩
			<br>��Ƹ��
			</p>
		`	)
		$('.lott3 div').html(	`
			<p class="giftlist">OPPO �ֻ� ʱ�а�
			<br>��ţ�ػ���Ƥ��
			<br>IG�������
			</p>
		`	)
		$('.lott4 div').html(	`
			<p class="giftlist">��ơ���ư�
			<br>�޹����մ�ˮ������24ƿװ��
			<br>TT������������
			<br>TT����T��16��������
			</p>
		`	)
	}else if(idx==3){
		$('.lott1 div').html(	`
			<p class="giftlist">ȫ�׸�ţ�ػ���Ƥ��<br>TCL��ů�ǻ����յ�</p>
			<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize7-3.png" alt="">
		`	);
		$('.lott2 div').html(	`
			<p class="giftlist">�����������V2��Ϸ����
			<br>Ī˹����carryţyear�޶����
			<br>Nike Air Ů��ñ��
			<br>Nike Sportswear������ͷ��ñ��
			<br>��Ƹ��
			</p>
		`	)
		$('.lott3 div').html(	`
			<p class="giftlist">OPPO �ֻ� ʱ�а�
			<br>��ţ�ػ���Ƥ��
			</p>
		`	)
		$('.lott4 div').html(	`
			<p class="giftlist">��ơ���ư�
			<br>�޹����մ�ˮ������24ƿװ��
			<br>TT������������
			<br>TT����T��16��������
			</p>
		`	)
	}
}



//��ѯ�Ƿ�󶨵�����
amsCfg_740157={
	type : "query",
	iQueryFlowID:740156,
	success : function(bindedInfo){
		//�Ѱ�ʱ����չ����

	},
	failure : function(){
		//δ��ʱ����չ����
	}
};

//�ύ�󶨵�����
amsCfg_740156={
	type : "comit",
	needPopupRole:true,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
	roleInfo:null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
	iQueryFlowID:740157,
	service:"lol",
	success : function(bindedInfo){
		//�Ѱ�ʱ����չ����
	},
	failure : function(){
		//δ��ʱ����չ����
	}
};

// �齱��ȡ�����ܳ�ʼ��
amsCfg_740290 = {
	'iAMSActivityId' : '360463', // AMS���
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
		//alert(callbackObj.sMsg);
		$('#dia5 p').html(callbackObj.sMsg);
		$('#dia5').fadeIn(1000);
	},
	'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
		if(!callbackObj.sPackageName){
			$('#dia5 p').html(callbackObj.sMsg);
			$('#dia5').fadeIn(1000);
			return;
		}

		if(callbackObj.iPackageId == "2323504" || callbackObj.iPackageId == "2324002" || callbackObj.iPackageId == "2324019"){
			$('#dia5 p').html("���ź�����û���н�<br>�ڴ������ٴβ���");
			$('#dia5').fadeIn(1000);
		} else if (callbackObj.iPackageId == "2323285") {
			g('package_740292').options[0] = new Option(callbackObj.sPackageName, callbackObj.iPackageId + '|' + callbackObj.sPackageName);
			$('#dia3').fadeIn(1000);
		} else if (callbackObj.iPackageId == "2324203") {
			g('package_740292').options[0] = new Option(callbackObj.sPackageName, callbackObj.iPackageId + '|' + callbackObj.sPackageName);
			$('#dia3').fadeIn(1000);
		} else if (callbackObj.iPackageId == "2323462" || callbackObj.iPackageId == "2323464" || callbackObj.iPackageId == "2323466" || callbackObj.iPackageId == "2323467" || callbackObj.iPackageId == "2324225" || callbackObj.iPackageId == "2324226" || callbackObj.iPackageId == "2324228" || callbackObj.iPackageId == "2324229") {
			$('#dia2 span').html(callbackObj.sPackageName)
			$('#dia2').fadeIn(1000);
		} else {
			$('#dia1 span').html(callbackObj.sPackageName)
			g('package_740292').options[0] = new Option(callbackObj.sPackageName, callbackObj.iPackageId + '|' + callbackObj.sPackageName);
			$('#dia1').fadeIn(1000);
		}
		return;
	}
};

// ���˻񽱼�¼��ʼ��
amsCfg_740291 = {
	'iAMSActivityId' : '360463', // AMS���
	'iLotteryFlowId' : '740291', //  ��ѯ���ֲ������̺�
	'activityId' : '391192', // ģ��ʵ����
	'contentId' : 'getGiftContent_740291', //����ID
	'templateId' : 'getGiftTemplate_740291', //ģ��ID
	'contentPageId' : 'getGiftPageContent_740291',	//��ҳ����ID
	'showContentId' : 'dialogRecord', //������ID
	'isForce' : false, //false Ĭ��ǰ���л����¼�������Ҫÿ�ζ�ȥ��̨��ѯ�����Ϊtrue,
	'pageSize': 6,
	};


//�ύ������Ϣ
amsCfg_740292 = {
	'iActivityId' : '360463', // AMS���
	'iFlowId' : '740292', // ���̺�
	'_everyRead' : true,
	'success': function(res){ //�ύ�ɹ��Ļص�
		if(typeof res.jData == "object") { //�����Ѿ��ύ�����ݣ����ҳ��
			need(["biz.provincecityselector2", "util.form"], function(pcs, FormManager) {

				//�ύ��ť�¼�
				g('personInfoContentBtn_740292').onclick = function(){
					var fillData = FormManager.getAllInputValue('form_personInfo_740292');
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

					amsCfg_740292.sData = fillData;
					amsCfg_740292.sData.iShow = 0;
					amsSubmit(360463,740292);
				}

				FormManager.setAllInputValue(res.jData, 'form_personInfo_740292');

				if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //�������ʵ����Ϣ������ʾ
					
					for(var i=0; i<res.jData.arrPackageInfo.length; ++i) {
						var iPackageId = res.jData.arrPackageInfo[i].iPackageId;
						var sPackageName = res.jData.arrPackageInfo[i].sPackageName;
						g('package_740292').options[i] = new Option(sPackageName, iPackageId + '|' + sPackageName);
					}
				}
				TGDialogS('dia-address');
			});

		} else {
			// need(["biz.widget.dialog"],function(Dialog){
			// 	closeDialog();
			// 	Dialog.alert(res.sMsg);
			// });
			closeDialog();
			TGDialogS('dia-submit');
		}
	}
};
function TGDialogS(e) {
	// ����milo������dialog���
	need("biz.dialog", function (Dialog) {
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
	});
}
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
			amsInit(360463, 740157);
		}, function () {
			LoginManager.login({"sData": {"pt_no_onekey": 1}});
		});
	});
	
});



function addAddress() {
	need("biz.login", function (LoginManager) {
		LoginManager.submitLogin(function(){
			amsCfg_740292.sData = { iShow: 1 };
			amsSubmit(360463,740292);
		});
	});
}





/* #t6Hl8#85AB8F9E048A0757BF358DAC1181301A */