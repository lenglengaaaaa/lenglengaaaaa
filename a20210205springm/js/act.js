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

// ת��
amsCfg_738044 = {
	'iAMSActivityId': '358412', // AMS���
	'activityId': '389808', // ģ��ʵ����
	'onBeginGetGiftEvent': function () {
		return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
	},
	'onGetGiftFailureEvent': function (callbackObj) {// �齱ʧ���¼�
		if (callbackObj.iRet = 202) {
			alert("�װ����ٻ�ʦ�����΢���˺���δ�󶨶����˺ţ����Ȱ󶨶����˺ţ�");
		}
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent': function (callbackObj) {// �齱�ɹ��¼�
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

// ������ȡ
amsCfg_738672 = {
	'iAMSActivityId': '358412', // AMS���
	'activityId': '389808', // ģ��ʵ����
	'onBeginGetGiftEvent': function () {
		return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
	},
	'onGetGiftFailureEvent': function (callbackObj) {// �齱ʧ���¼�
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent': function (callbackObj) {// �齱�ɹ��¼�
		var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
		if (packageLen && packageLen.length > 1) {
			LotteryManager.alert(callbackObj.sMsg);
			return;
		}

		LotteryManager.alert(callbackObj.sMsg);
	}
};

// ��������
amsCfg_738743 = {
	'iAMSActivityId': '358412', // AMS���
	'activityId': '389808', // ģ��ʵ����
	'onBeginGetGiftEvent': function () {
		return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
	},
	'onGetGiftFailureEvent': function (callbackObj) {// �齱ʧ���¼�
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent': function (callbackObj) {// �齱�ɹ��¼�
		var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
		if (packageLen && packageLen.length > 1) {
			LotteryManager.alert(callbackObj.sMsg);
			return;
		}

		LotteryManager.alert(callbackObj.sMsg);
	}
};

// ��ѯ�Ƿ������ϷȦ
amsCfg_738457 = {
	"_everyRead": true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
	"iActivityId": 358412, //�id	
	"iFlowId": 738457, //����id
	"sData": {//�Զ��崫��
	},
	"fFlowSubmitEnd": function (res) {
		console.log('��������', res);
		if (res.jData.joined) {
			if (Act.lottery_type == "skin") {
				// ת�̳齱
				amsSubmit(358412, 738044);
			} else {
				// �������齱
				amsSubmit(358412, 738743);
			}
		} else {
			alert("�ٻ�ʦ�����ע��Ӣ�����ˡ���ϷȦ�������齱��");
		}
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//ʧ�ܻ��ߵ��������
		//���������㣬ame���ش���0�Ǻ��ߵ�����
		alert(res.sMsg);
	}
};

// ��ѯ�ʺŰ�״̬
amsCfg_738521 = {
	"_everyRead": true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
	"iActivityId": 358412, //�id	
	"iFlowId": 738521, //����id
	"sData": {//�Զ��崫��
	},
	"fFlowSubmitEnd": function (res) {
		amsInit(358412, 738115);
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//ʧ�ܻ��ߵ��������
		//���������㣬ame���ش���0�Ǻ��ߵ�����
		console.log(res);
		if (res.iRet = 202) {
			if (confirm("�װ����ٻ�ʦ�����΢���˺���δ�󶨶����˺ţ����Ȱ󶨶����˺ţ�")) {
				location.href = "https://game.weixin.qq.com/cgi-bin/h5/static/autominiprogram/minigame.html?weapp=weapp%3A%2F%2Fwxa27e2efc122b3d0f%3Fpath%3D%253f&appid=wxa27e2efc122b3d0f#wechat_redirect";
			}
		} else {
			alert(res.sMsg);
		}
	}
};



/* #t6Hl8#E1A104B1C487C135B92F6DE73AB15F45 */