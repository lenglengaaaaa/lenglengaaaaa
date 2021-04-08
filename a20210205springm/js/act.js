let Act = {
	lottery_type: 0,

	lottery: function (type) {
		let self = Act;
		self.lottery_type = type;
		amsSubmit(358412, 738521);
	},

	checkWXJoinGameStatus: function () {
		amsSubmit(358412, 738457);
	}
}

let lottery_map = {}

// 转盘
amsCfg_738044 = {
	'iAMSActivityId': '358412', // AMS活动号
	'activityId': '389808', // 模块实例号
	'onBeginGetGiftEvent': function () {
		return 0; // 抽奖前事件，返回0表示成功
	},
	'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
		if (callbackObj.iRet = 202) {
			alert("亲爱的召唤师，你的微信账号暂未绑定端游账号，请先绑定端游账号！");
		}
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
		var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
		if (packageLen && packageLen.length > 1) {
			LotteryManager.alert(callbackObj.sMsg);
			return;
		}
		let pid = callbackObj.iDbPackageAutoIncId;
		$("#prize_name").text(callbackObj.sPackageName);
		calllotteryToRoll(pid);
		console.log(callbackObj);
	}
};

// 二次领取
amsCfg_738672 = {
	'iAMSActivityId': '358412', // AMS活动号
	'activityId': '389808', // 模块实例号
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

		LotteryManager.alert(callbackObj.sMsg);
	}
};

// 抽红包封面
amsCfg_738743 = {
	'iAMSActivityId': '358412', // AMS活动号
	'activityId': '389808', // 模块实例号
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

		LotteryManager.alert(callbackObj.sMsg);
	}
};

// 查询是否加入游戏圈
amsCfg_738457 = {
	"_everyRead": true,//_everyRead参数用于控制缓存，设为true表示每次发请求都会读取amsCfg参数的值，建议加上
	"iActivityId": 358412, //活动id	
	"iFlowId": 738457, //流程id
	"sData": {//自定义传参
	},
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
	"sData": {//自定义传参
	},
	"fFlowSubmitEnd": function (res) {
		amsInit(358412, 738115);
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



/* #t6Hl8#E1A104B1C487C135B92F6DE73AB15F45 */