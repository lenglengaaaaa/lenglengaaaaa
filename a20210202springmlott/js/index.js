// 7号要显示特等奖区域
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
	// var idx=Math.floor(Math.random() * 3)+2;
	$(this).addClass('btn-lotted');
	$('.btn-openred').css({
		'-webkit-animation':'pulse .5s ease both'
	})
	cont2Show();
})

// 点击红包开启动画
function openred(){
	if($('.cont2 .btn-lott').hasClass('btn-lotted')){
		$('.btn-openred').addClass('active')
		amsSubmit(360375,740207);
		//var idx=Math.floor(Math.random() * 5)+1;
		//$('#dia'+idx+'').fadeIn(1000);
	}
}
// 自定义关闭按钮
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

// 随机出现奖品







//查询是否绑定的配置
amsCfg_740211={
	type : "query",
	iQueryFlowID:740210,
	success : function(bindedInfo){
		//已绑定时的扩展处理

	},
	failure : function(){
		//未绑定时的扩展处理
	}
};

//提交绑定的配置
amsCfg_740210={
	type : "comit",
	needPopupRole:true,//是否弹默认角色框选角色
	roleInfo:null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
	iQueryFlowID:740211,
	service:"lol",
	success : function(bindedInfo){
		//已绑定时的扩展处理
	},
	failure : function(){
		//未绑定时的扩展处理
	}
};

// 抽奖领取主功能初始化
amsCfg_740207 = {
	'iAMSActivityId' : '360375', // AMS活动号
	'activityId' : '391192', // 模块实例号
	
	//可选扩展参数sData，
	/**	
	"sData":{						
			"sPlatId":1,
			"sArea":4,   
			"appid":"100584625",
			"sServiceType":"pao"
			},
	**/
					
	'onBeginGetGiftEvent' : function(){
		return 0; // 抽奖前事件，返回0表示成功
	},
	'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
		if(!callbackObj.sPackageName){
			LotteryManager.alert(callbackObj.sMsg);
			return;
		}
		//1：实物
		var str = "恭喜您获得了 " + callbackObj.sPackageName + " !";
		if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
			/*
			 * 0：虚拟游戏物品
			 * 1：实际物品，需要填写个人收货信息
			 * 2：cdkey
			 */
			str += "请您准确填写个人信息，官方将有工作人员联系您。";
			LotteryManager.alert(str);
			return;
		}
		//2：cdkey
		if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
		
			LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageCDkey ? callbackObj.sPackageCDkey : callbackObj.sPackageOtherInfo);
			//LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageOtherInfo + '<input type="button" value="复制" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'复制成功。\');">');
			return;
		}
		str += "请您注意查收！";
		LotteryManager.alert(str);
		return;
	}
};

//调用，查询是否已经绑定
milo.ready(function() {
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
			amsInit(360375, 740211);
		}, function () {
			LoginManager.login({"sData": {"pt_no_onekey": 1}});
		});
	});
});







/* #t6Hl8#C1FF78AEDC705AB232D09AE5B4203CAC */