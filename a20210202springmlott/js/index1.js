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
	var idx=Math.floor(Math.random() * 3)+2;
	$('.cont').eq(idx).show().siblings('.cont').hide();
	cont2Show();
})

//��ѯ�Ƿ�󶨵�����
amsCfg_739615={
	type : "query",
	iQueryFlowID:739614,
	success : function(bindedInfo){
		//�Ѱ�ʱ����չ����

	},
	failure : function(){
		//δ��ʱ����չ����
	}
};

//�ύ�󶨵�����
amsCfg_739614={
	type : "comit",
	needPopupRole:true,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
	roleInfo:null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
	iQueryFlowID:739615,
	service:"lol",
	success : function(bindedInfo){
		//�Ѱ�ʱ����չ����
	},
	failure : function(){
		//δ��ʱ����չ����
	}
};

//���ã���ѯ�Ƿ��Ѿ���
milo.ready(function() {
    need("biz.login",function(LoginManager){
        LoginManager.checkLogin(function(){
            LoginManager.init({
                 needReloadPage:true
             });
            g("area_info_739615").innerHTML = LoginManager.getUin(); //��ȡQQ�Ż�ȡ�ǳ�
        });
	});
	amsInit(359979, 739615);
});


milo.addEvent(g("ptLoginBtn"), "click", function() {
	need("biz.login",function(LoginManager){
	//LoginManager.init({
	//		needReloadPage:true
	//	});
		LoginManager.login({"sData":{"pt_no_onekey":1}});
	});
	return false;
});
milo.addEvent(g("ptLogoutBtn"), "click", function() {
	need("biz.login",function(LoginManager){
		LoginManager.logout();
	});
	return false;
});







/* #t6Hl8#8A8D93D49D71EE26B8859FE5A7DC6B52 */