let Act = {
	lottery: function () {
		let self = Act;
		amsInit(358412, 738044);
		//amsSubmit(358412, 738521);
	},

	checkWXJoinGameStatus: function () {
		amsSubmit(358412, 738457);
	}
}

let lottery_map = {}

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
		let pid = 0;


		calllotteryToRoll(pid);
		console.log(callbackObj);
	}
};

amsCfg_738457 = {
	"_everyRead": true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
	"iActivityId": 358412, //�id	
	"iFlowId": 738457, //����id
	"sData": {//�Զ��崫��
	},
	"fFlowSubmitEnd": function (res) {
		console.log('��������', res);
		if (res.joined) {
			// ������Ϣ
			amsInit(358412, 738044);
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

//�ύ������AME
amsCfg_738521 = {
	"_everyRead": true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
	"iActivityId": 358412, //�id	
	"iFlowId": 738521, //����id
	"sData": {//�Զ��崫��
	},
	"fFlowSubmitEnd": function (res) {
		console.log(res);
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//ʧ�ܻ��ߵ��������
		//���������㣬ame���ش���0�Ǻ��ߵ�����
		if (res.iRet == 0) {
			Act.checkWXJoinGameStatus();
		} else if (res.iRet = 202) {
			if (confirm("�װ����ٻ�ʦ�����΢���˺���δ�󶨶����˺ţ����Ȱ󶨶����˺ţ�")) {
				location.href = "https://game.weixin.qq.com/cgi-bin/h5/static/autominiprogram/minigame.html?weapp=weapp%3A%2F%2Fwxa27e2efc122b3d0f%3Fpath%3D%253f&appid=wxa27e2efc122b3d0f#wechat_redirect";
			}
		} else {
			alert(res.sMsg);
		}
	}
};



/* #t6Hl8#50707BE97F256E0BB85878C0AB5DB11E */