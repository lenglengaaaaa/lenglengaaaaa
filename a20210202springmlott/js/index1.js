// 判断用户是否登录，cont1奖品页面显示
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

// 点击开始抽奖进入抽奖页面
$('.cont1 .btn-lott').on('click',function(){
	$('.cont2').show().siblings('.cont').hide();
	cont2Show();
})

// 点击抽奖进入奖励页面
$('.cont2 .btn-lott').on('click',function(){
	// 暂时取随机数进入虚拟奖励页面或实物奖励页面
	var idx=Math.floor(Math.random() * 3)+2;
	$('.cont').eq(idx).show().siblings('.cont').hide();
	cont2Show();
})

//查询是否绑定的配置
amsCfg_739615={
	type : "query",
	iQueryFlowID:739614,
	success : function(bindedInfo){
		//已绑定时的扩展处理

	},
	failure : function(){
		//未绑定时的扩展处理
	}
};

//提交绑定的配置
amsCfg_739614={
	type : "comit",
	needPopupRole:true,//是否弹默认角色框选角色
	roleInfo:null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
	iQueryFlowID:739615,
	service:"lol",
	success : function(bindedInfo){
		//已绑定时的扩展处理
	},
	failure : function(){
		//未绑定时的扩展处理
	}
};

//调用，查询是否已经绑定
milo.ready(function() {
    need("biz.login",function(LoginManager){
        LoginManager.checkLogin(function(){
            LoginManager.init({
                 needReloadPage:true
             });
            g("area_info_739615").innerHTML = LoginManager.getUin(); //获取QQ号获取昵称
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