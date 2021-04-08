let role_name = "";
let area_name = "";
let bind_area_type = 0;
let is_his = 0;
let has_package = 0;

//查询是否绑定的配置
amsCfg_738115 = {
	type: "query",
	iQueryFlowID: 738115,
	service: "lol",
	success: function (bindedInfo) {
		//已绑定时的扩展处理
		Act.area_id = bindedInfo.jData.data.Farea;
		area_name = decodeURI(bindedInfo.jData.data.FareaName);
		role_name = decodeURI(bindedInfo.jData.data.FroleName);
		$("#role_info").text(area_name + "-" + role_name);
		if (!is_his) {
			Act.checkWXJoinGameStatus();
		} else {
			is_his = 0;
		}
	},
	failure: function (res) {
		//未绑定时的扩展处理
		amsInit(358412, 738114);
	}
};

//提交绑定的配置
amsCfg_738114 = {
	type: "comit",
	needPopupRole: true,//是否弹默认角色框选角色
	roleInfo: null,//如果needPopupRole为false，需要自定义传入角色信息，roleInfo需要传角色信息对象
	iQueryFlowID: 738115,
	service: "lol",
	success: function (bindedInfo) {
		//已绑定时的扩展处理
		Act.area_id = bindedInfo.jData.data.Farea;
		area_name = decodeURI(bindedInfo.jData.data.FareaName);
		role_name = decodeURI(bindedInfo.jData.data.FroleName);
		$("#role_info").text(area_name + "-" + role_name);
		if (!bind_area_type) {
			if (!is_his) {
				Act.checkWXJoinGameStatus();
			} else {
				is_his = 0;
			}
		} else {
			bind_area_type = 0;
			TGDialogS('dia1');
		}
	},
	failure: function () {
		//未绑定时的扩展处理
		if (bind_area_type) {
			bind_area_type = 0;
			TGDialogS('dia1');
		}
	}
};

let Act = {
	lottery_type: "",
	area_id: 0,
	pid: 0,

	init: function () {
		let self = Act;
		self.getSkinHistory();
		self.getPackageHistory();
	},

	lottery: function (type) {
		let self = Act;
		self.lottery_type = type;
		// 查询帐号绑定状态
		self.checkWxAndQQ();
	},

	getPrize: function () {
		amsCfg_738672.sData.id = Act.pid;
		amsSubmit(358412, 738672);
	},

	checkWxAndQQ: function () {
		amsSubmit(358412, 738521);
	},

	checkArea: function () {
		amsInit(358412, 738115);
	},

	checkWXJoinGameStatus: function () {
		amsSubmit(358412, 738457);
	},

	getSkinHistory: function () {
		amsSubmit(358412, 738996);
	},

	getPackageHistory: function () {
		amsSubmit(358412, 738958);
	},

	changeBindArea: function () {
		bind_area_type = 1;
		amsInit(358412, 738114);
	},

	getRestPackage: function () {
		amsSubmit(358412, 739485);
	},

	getIconLimit: function (skin_name) {
		let icon_limit = 0;
		icon_limit = skin_name.search("7") != -1 ? 0 : 1;
		return icon_limit;
	}
}

// 抽皮肤
amsCfg_738044 = {
	'iAMSActivityId': '358412', // AMS活动号
	'activityId': '389808', // 模块实例号
	"sNeedSubmitPopDiv": true, // 是否开启loading层
	'onBeginGetGiftEvent': function () {
		return 0; // 抽奖前事件，返回0表示成功
	},
	'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
		if (callbackObj.iRet = "202") {
			alert("亲爱的召唤师，你的微信账号暂未绑定端游账号，请先绑定端游账号！");
		} else {
			alert(callbackObj.sMsg);
		}
	},
	'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
		var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
		if (packageLen && packageLen.length > 1) {
			LotteryManager.alert(callbackObj.sMsg);
			return;
		}
		Act.pid = callbackObj.iDbPackageAutoIncId;
		let skin_id = callbackObj.all_item_list[0].iItemCode;
		let skin_name = callbackObj.all_item_list[0].sItemName;
		let src = "//ossweb-img.qq.com/images/lol/appskin/" + skin_id + ".jpg";

		if (Act.getIconLimit(skin_name)) {
			$("#icon_limit").addClass("icon1").removeClass("icon2");
		} else {
			$("#icon_limit").addClass("icon2").removeClass("icon1");
		}
		$("#skin_name").text(skin_name);
		$("#skin_icon").attr("src", src);
		$("#btn_lottery_skin").attr("href", "javascript: TGDialogS('dia1');");
		TGDialogS('dia1');
	}
};

// 二次领取
amsCfg_738672 = {
	'iAMSActivityId': '358412', // AMS活动号
	'activityId': '389808', // 模块实例号
	"sNeedSubmitPopDiv": true, // 是否开启loading层
	"sData": {},
	'onBeginGetGiftEvent': function () {
		return 0; // 抽奖前事件，返回0表示成功
	},
	'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
		var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
		if (packageLen && packageLen.length > 1) {
			LotteryManager.alert(callbackObj.sMsg);
			return;
		}

		$("#btn_lottery_skin").addClass("btn-got").attr("href", "javascript: ;");
		closeDialog();
		alert("领取成功");
	}
};

// 领取红包封面
amsCfg_738743 = {
	'iAMSActivityId': '358412', // AMS活动号
	'activityId': '389808', // 模块实例号
	"sNeedSubmitPopDiv": true, // 是否开启loading层
	'onBeginGetGiftEvent': function () {
		return 0; // 抽奖前事件，返回0表示成功
	},
	'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
		var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
		if (packageLen && packageLen.length > 1) {
			LotteryManager.alert(callbackObj.sMsg);
			return;
		}

		$("#btn_lottery_package").addClass("btn-got").attr("href", "javascript: ;");
		TGDialogS('dia2');
		return;
	}
};

// 查询是否加入游戏圈
amsCfg_738457 = {
	"_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
	"iActivityId": 358412, //活动id	
	"iFlowId": 738457, //流程id
	"sNeedSubmitPopDiv": false, // 是否开启loading层
	"fFlowSubmitEnd": function (res) {
		console.log('返回数据', res);
		if (res.jData.joined) {
			if (Act.lottery_type == "skin") {
				// 转盘抽奖
				amsSubmit(358412, 738044);
			} else {
				// 红包封面抽奖
				amsSubmit(358412, 738743);
			}
		} else {
			alert("召唤师，请关注‘英雄联盟’游戏圈后再来抽奖！");
		}
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//失败会走到这个函数
		//条件不满足，ame返回大于0是后走到这里
		alert(res.sMsg);
	}
};

// 查询帐号绑定状态
amsCfg_738521 = {
	"_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
	"iActivityId": 358412, //活动id	
	"iFlowId": 738521, //流程id
	"sNeedSubmitPopDiv": false, // 是否开启loading层
	"fFlowSubmitEnd": function (res) {
		// 查询绑定状态
		Act.checkArea();
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//失败会走到这个函数
		//条件不满足，ame返回大于0是后走到这里
		console.log(res);
		if (res.iRet = 202) {
			if (confirm("亲爱的召唤师，你的微信账号暂未绑定端游账号，请先绑定端游账号！")) {
				location.href = "https://game.weixin.qq.com/cgi-bin/h5/static/autominiprogram/minigame.html?weapp=weapp%3A%2F%2Fwxa27e2efc122b3d0f%3Fpath%3D%253f&appid=wxa27e2efc122b3d0f#wechat_redirect";
			}
		} else {
			alert(res.sMsg);
		}
	}
};

// 查询红包封面领取状态
amsCfg_738958 = {
	"_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
	"iActivityId": 358412, //活动id	
	"iFlowId": 738958, //流程id
	"fFlowSubmitEnd": function (res) {
		console.log('返回数据为', res);
		has_package = +res.result;
		if (has_package > 0) {
			$("#btn_lottery_package").addClass("btn-got").attr("href", "javascript: ;");
		}
		Act.getRestPackage();
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//失败会走到这个函数
		//条件不满足，ame返回大于0是后走到这里
		//alert(res.sMsg);
	}
};

// 查询抽取皮肤
amsCfg_738996 = {
	"_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
	"iActivityId": 358412, //活动id	
	"iFlowId": 738996, //流程id
	"sNeedSubmitPopDiv": false, // 是否开启loading层
	"fFlowSubmitEnd": function (res) {
		console.log('返回数据为', res);
		if (res.myGiftList.length > 0) {
			if (res.myGiftList[0].iStatus == "2") {
				$("#btn_lottery_skin").addClass("btn-got").attr("href", "javascript: ;");
			} else if (res.myGiftList[0].iStatus == "3") {
				is_his = 1;
				Act.checkArea();
				Act.pid = res.myGiftList[0].id;
				let skin_id = res.myGiftList[0].sExtend3;
				let skin_name = res.myGiftList[0].sPackageName;
				let src = "//ossweb-img.qq.com/images/lol/appskin/" + skin_id + ".jpg";
				if (Act.getIconLimit(skin_name)) {
					$("#icon_limit").addClass("icon1").removeClass("icon2");
				} else {
					$("#icon_limit").addClass("icon2").removeClass("icon1");
				}
				$("#skin_name").text(skin_name);
				$("#skin_icon").attr("src", src);
				$("#btn_lottery_skin").attr("href", "javascript: TGDialogS('dia1');");
			}
		}
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//失败会走到这个函数
		//条件不满足，ame返回大于0是后走到这里
		//alert(res.sMsg);
	}
};

// 剩余数量
amsCfg_739485 = {
	"_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
	"iActivityId": 358412, //活动id
	"iFlowId": 739485, //流程id
	"sNeedSubmitPopDiv": false, // 是否开启loading层
	"fFlowSubmitEnd": function (res) {
		console.log('返回数据为', res);
		if (+res.sOutValue2 == 0) {

		} else {
			if (+res.sOutValue1 == 0 && has_package == 0) {
				// 今日无剩余数量
				$("#btn_lottery_package").attr("href", "javascript: TGDialogS('dia4');");
			}
		}
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//失败会走到这个函数
		//条件不满足，ame返回大于0是后走到这里
		//alert(res.sMsg);
	}
};/* #t6Hl8#CEEC8D5D37B4CC749F7995217EDC10A8 */