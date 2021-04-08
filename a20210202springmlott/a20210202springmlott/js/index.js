// 点击开始抽奖进入抽奖页面
$('.cont1 .btn-lott').on('click',function(){
	$('.cont2').show().siblings('.cont').hide();
})

// 点击抽奖进入奖励页面
$('.cont2 .btn-lott').on('click',function(){
	// 暂时取随机数进入虚拟奖励页面或实物奖励页面
	// var idx=Math.floor(Math.random() * 3)+2;
	$(this).addClass('btn-lotted');
	$('.btn-openred').css({
		'-webkit-animation':'pulse .5s ease both'
	})
})

// 点击红包开启动画
function openred(){
	// if($('.cont2 .btn-lott').hasClass('btn-lotted')){
		$('.btn-openred').addClass('active')
		amsSubmit(360463,740290);
		//amsSubmit(360463,740297);
		// var idx=Math.floor(Math.random() * 5)+1;
		// $('#dia'+idx+'').fadeIn(1000);
	// }
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
// 随机出现奖品
var m = new Date().getDate();
if(m==4){
	$('.lott1 div').html(	`
		<p class="giftlist">傲风皮卡丘联名款座椅</p>
		<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize4.png" alt="">
	`	);
	$('.lott2 div').html(	`
		<p class="giftlist">雷蛇旋风黑鲨V2游戏耳麦
		<br>莫斯利安carry牛year限定礼盒
		<br>Nike Air 女子帽衫
		<br>Nike Sportswear男子套头连帽衫
		<br>TCL空气净化器
		<br>猎聘金卡
		</p>
	`	)
	$('.lott3 div').html(	`
		<p class="giftlist">FPX应援T恤礼盒
		</p>
	`	)
	$('.lott4 div').html(	`
		<p class="giftlist">哈啤发财包
		<br>手办+战马饮品
		<br>娃哈哈苏打水（整箱24瓶装）
		<br>TT语音欢欢公仔
		<br>TT语音T娘16定制鼠标垫
		</p>
	`	)
}else if(m==5){
	$('.lott1 div').html(	`
		<p class="giftlist">傲风胖丁联名款座椅</p>
		<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize5.png" alt="">
	`	);
	$('.lott2 div').html(	`
		<p class="giftlist">雷蛇旋风黑鲨V2游戏耳麦
		<br>莫斯利安carry牛year限定礼盒
		<br>Nike Air 女子帽衫
		<br>Nike Sportswear男子套头连帽衫
		<br>TCL空气净化器
		<br>猎聘金卡
		</p>
	`	)
	$('.lott3 div').html(	`
		<p class="giftlist">OPPO 手环 时尚版
		<br>福牛守护者皮肤
		<br>EDG七周年限定礼盒
		</p>
	`	)
	$('.lott4 div').html(	`
		<p class="giftlist">哈啤发财包
		<br>手办+战马饮品
		<br>娃哈哈苏打水（整箱24瓶装）
		<br>TT语音欢欢公仔
		<br>TT语音T娘16定制鼠标垫
		</p>
	`	)
}else if(m==6){
	var idx=Math.floor(Math.random() * 2)+1;
	if(idx==1){
		$('.lott1 div').html(	`
			<p class="giftlist">傲风LPL现场款电竞椅<br>OPPO Watch 46mm手表</p>
			<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize6-1.png" alt="">
		`	);
		$('.lott2 div').html(	`
			<p class="giftlist">雷蛇旋风黑鲨V2游戏耳麦
			<br>莫斯利安carry牛year限定礼盒
			<br>Nike Air 女子帽衫
			<br>Nike Sportswear男子套头连帽衫
			<br>战马全年畅饮（每月一箱）
			<br>TCL空气净化器
			<br>猎聘金卡
			</p>
		`	)
		$('.lott3 div').html(	`
			<p class="giftlist">OPPO 手环 时尚版
			<br>福牛守护者皮肤
			<br>JDG新年礼盒
			</p>
		`	)
		$('.lott4 div').html(	`
			<p class="giftlist">哈啤发财包
			<br>娃哈哈苏打水（整箱24瓶装）
			<br>TT语音欢欢公仔
			<br>TT语音T娘16定制鼠标垫
			</p>
		`	)
	}else{
		$('.lott1 div').html(	`
			<p class="giftlist">傲风皮卡丘联名款电竞椅<br>TCL55英寸超高清电视</p>
			<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize6-2.png" alt="">
		`	);
		$('.lott2 div').html(	`
			<p class="giftlist">雷蛇旋风黑鲨V2游戏耳麦
			<br>莫斯利安carry牛year限定礼盒
			<br>Nike Air 女子帽衫
			<br>Nike Sportswear男子套头连帽衫
			<br>战马全年畅饮（每月一箱）
			<br>猎聘金卡
			</p>
		`	)
		$('.lott3 div').html(	`
			<p class="giftlist">OPPO 手环 时尚版
			<br>福牛守护者皮肤
			<br>滔搏三周年礼盒
			</p>
		`	)
		$('.lott4 div').html(	`
			<p class="giftlist">哈啤发财包
			<br>娃哈哈苏打水（整箱24瓶装）
			<br>TT语音欢欢公仔
			<br>TT语音T娘16定制鼠标垫
			</p>
		`	)
	}
}else if(m==7){
	var idx=Math.floor(Math.random() * 3)+1;
	$('.lotttop').css('display','block');
	$('.lotttop div').html(	`
	<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prizetop.png" alt="">
	<p class="giftlist">TCL75寸电视+TCL冰箱+TCL洗衣机
	<br>+全套至臻皮肤+全套福牛守护者皮肤
	</p>
	`	);
	if(idx==1){
		$('.lott1 div').html(	`
			<p class="giftlist">傲风胖丁联名款座椅</p>
			<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize7-1.png" alt="">
		`	);
		$('.lott2 div').html(	`
			<p class="giftlist">雷蛇旋风黑鲨V2游戏耳麦
			<br>莫斯利安carry牛year限定礼盒
			<br>Nike Air 女子帽衫
			<br>Nike Sportswear男子套头连帽衫
			<br>战马全年畅饮（每月一箱）
			<br>猎聘金卡
			</p>
		`	)
		$('.lott3 div').html(	`
			<p class="giftlist">OPPO 手环 时尚版
			<br>福牛守护者皮肤
			<br>RA新年礼盒
			<br>V5新年礼盒
			</p>
		`	)
		$('.lott4 div').html(	`
			<p class="giftlist">哈啤发财包
			<br>娃哈哈苏打水（整箱24瓶装）
			<br>TT语音欢欢公仔
			<br>TT语音T娘16定制鼠标垫
			</p>
		`	)
	}else if(idx==2){
		$('.lott1 div').html(	`
			<p class="giftlist">傲风机械臂款电竞椅<br>OPPO Watch 46mm手表</p>
			<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize7-2.png" alt="">
		`	);
		$('.lott2 div').html(	`
			<p class="giftlist">雷蛇旋风黑鲨V2游戏耳麦
			<br>莫斯利安carry牛year限定礼盒
			<br>Nike Air 女子帽衫
			<br>Nike Sportswear男子套头连帽衫
			<br>战马全年畅饮（每月一箱）
			<br>猎聘金卡
			</p>
		`	)
		$('.lott3 div').html(	`
			<p class="giftlist">OPPO 手环 时尚版
			<br>福牛守护者皮肤
			<br>IG新年礼盒
			</p>
		`	)
		$('.lott4 div').html(	`
			<p class="giftlist">哈啤发财包
			<br>娃哈哈苏打水（整箱24瓶装）
			<br>TT语音欢欢公仔
			<br>TT语音T娘16定制鼠标垫
			</p>
		`	)
	}else if(idx==3){
		$('.lott1 div').html(	`
			<p class="giftlist">全套福牛守护者皮肤<br>TCL冷暖智慧柔风空调</p>
			<img src="//game.gtimg.cn/images/lpl/act/a20210202springmlott/prize7-3.png" alt="">
		`	);
		$('.lott2 div').html(	`
			<p class="giftlist">雷蛇旋风黑鲨V2游戏耳麦
			<br>莫斯利安carry牛year限定礼盒
			<br>Nike Air 女子帽衫
			<br>Nike Sportswear男子套头连帽衫
			<br>猎聘金卡
			</p>
		`	)
		$('.lott3 div').html(	`
			<p class="giftlist">OPPO 手环 时尚版
			<br>福牛守护者皮肤
			</p>
		`	)
		$('.lott4 div').html(	`
			<p class="giftlist">哈啤发财包
			<br>娃哈哈苏打水（整箱24瓶装）
			<br>TT语音欢欢公仔
			<br>TT语音T娘16定制鼠标垫
			</p>
		`	)
	}
}



//查询是否绑定的配置
amsCfg_740157={
	type : "query",
	iQueryFlowID:740156,
	success : function(bindedInfo){
		//已绑定时的扩展处理

	},
	failure : function(){
		//未绑定时的扩展处理
	}
};

//提交绑定的配置
amsCfg_740156={
	type : "comit",
	needPopupRole:true,//是否弹默认角色框选角色
	roleInfo:null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
	iQueryFlowID:740157,
	service:"lol",
	success : function(bindedInfo){
		//已绑定时的扩展处理
	},
	failure : function(){
		//未绑定时的扩展处理
	}
};

// 抽奖领取主功能初始化
amsCfg_740290 = {
	'iAMSActivityId' : '360463', // AMS活动号
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
		//alert(callbackObj.sMsg);
		$('#dia5 p').html(callbackObj.sMsg);
		$('#dia5').fadeIn(1000);
	},
	'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
		if(!callbackObj.sPackageName){
			$('#dia5 p').html(callbackObj.sMsg);
			$('#dia5').fadeIn(1000);
			return;
		}

		if(callbackObj.iPackageId == "2323504" || callbackObj.iPackageId == "2324002" || callbackObj.iPackageId == "2324019"){
			$('#dia5 p').html("很遗憾，您没有中奖<br>期待您的再次参与");
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

// 个人获奖记录初始化
amsCfg_740291 = {
	'iAMSActivityId' : '360463', // AMS活动号
	'iLotteryFlowId' : '740291', //  查询获奖轮播的流程号
	'activityId' : '391192', // 模块实例号
	'contentId' : 'getGiftContent_740291', //容器ID
	'templateId' : 'getGiftTemplate_740291', //模板ID
	'contentPageId' : 'getGiftPageContent_740291',	//分页容器ID
	'showContentId' : 'dialogRecord', //弹出层ID
	'isForce' : false, //false 默认前端有缓存记录，如果需要每次都去后台查询，则改为true,
	'pageSize': 6,
	};


//提交个人信息
amsCfg_740292 = {
	'iActivityId' : '360463', // AMS活动号
	'iFlowId' : '740292', // 流程号
	'_everyRead' : true,
	'success': function(res){ //提交成功的回调
		if(typeof res.jData == "object") { //返回已经提交的数据，填充页面
			need(["biz.provincecityselector2", "util.form"], function(pcs, FormManager) {

				//提交按钮事件
				g('personInfoContentBtn_740292').onclick = function(){
					var fillData = FormManager.getAllInputValue('form_personInfo_740292');
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

					amsCfg_740292.sData = fillData;
					amsCfg_740292.sData.iShow = 0;
					amsSubmit(360463,740292);
				}

				FormManager.setAllInputValue(res.jData, 'form_personInfo_740292');

				if(typeof res.jData.arrPackageInfo != 'undefined' && res.jData.arrPackageInfo.length > 0) { //如果存在实物信息，则显示
					
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
	// 利用milo库引入dialog组件
	need("biz.dialog", function (Dialog) {
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
	});
}
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