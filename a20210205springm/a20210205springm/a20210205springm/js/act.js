let role_name = "";
let area_name = "";
let bind_area_type = 0;
let is_his = 0;
let has_package = 0;

//��ѯ�Ƿ�󶨵�����
amsCfg_738115 = {
	type: "query",
	iQueryFlowID: 738115,
	service: "lol",
	success: function (bindedInfo) {
		//�Ѱ�ʱ����չ����
		Act.area_id = bindedInfo.jData.data.Farea;
		area_name = decodeURI(bindedInfo.jData.data.FareaName);
		role_name = decodeURI(bindedInfo.jData.data.FroleName);
		if (Act.has_got == 0) {
			$("#role_info").text(area_name);
		}
		if (!is_his) {
			amsSubmit(358412, 738044);
		}
	},
	failure: function (res) {
		//δ��ʱ����չ����
		amsInit(358412, 738114);
	}
};

//�ύ�󶨵�����
amsCfg_738114 = {
	type: "comit",
	needPopupRole: true,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
	roleInfo: null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
	iQueryFlowID: 738115,
	service: "lol",
	success: function (bindedInfo) {
		//�Ѱ�ʱ����չ����
		Act.area_id = bindedInfo.jData.data.Farea;
		area_name = decodeURI(bindedInfo.jData.data.FareaName);
		role_name = decodeURI(bindedInfo.jData.data.FroleName);
		if (Act.has_got == 0) {
			$("#role_info").text(area_name);
		}
		if (!bind_area_type) {
			if (!is_his) {
				amsSubmit(358412, 738044);
			}
		} else {
			bind_area_type = 0;
			TGDialogS('dia1');
		}
	},
	failure: function () {
		//δ��ʱ����չ����
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
	has_got: 0,
	act_key: 'a20210205springm',

	init: function () {
		let self = Act;
		need("biz.login", function (LoginManager) {
			LoginManager.checkLogin(function (userInfo) {
				// ��ѯ�ʺŰ�״̬
				self.getSkinHistory();
				self.getPackageHistory();
			}, function () {
				need("biz.login", function (LoginManager) {
					LoginManager.loginByWX({
						appConfig: {
							"WxAppId": "wx0abed84681090cfd", //Ҫ��Ȩ��appid
							"scope": "snsapi_userinfo",   //Ĭ���� snsapi_base ��Ĭ��Ȩ������д��snsapi_userinfo,����û�취��ȡ�ǳơ�ͷ���
						}
					});
				});
				console.log("δ��¼");
			});
		});
	},

	lottery: function (type) {
		let self = Act;
		self.lottery_type = type;
		need("biz.login", function (LoginManager) {
			LoginManager.checkLogin(function (userInfo) {
				// ��ѯ�ʺŰ�״̬
				self.checkWxAndQQ();
			}, function () {
				need("biz.login", function (LoginManager) {
					LoginManager.loginByWX({
						appConfig: {
							"WxAppId": "wx0abed84681090cfd", //Ҫ��Ȩ��appid
							"scope": "snsapi_userinfo",   //Ĭ���� snsapi_base ��Ĭ��Ȩ������д��snsapi_userinfo,����û�취��ȡ�ǳơ�ͷ���
						}
					});
				});
				console.log("δ��¼");
			});
		});
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
		if (milo.cookie.get(Act.act_key + ':is_join:' + openid)) {
			if (Act.lottery_type == "skin") {
				// Ƥ���齱
				Act.checkArea();
			} else {
				// �������
				amsSubmit(358412, 738743);
			}
		} else {
			// ��ѯ�Ƿ������ϷȦ
			amsSubmit(358412, 738457);
		}
	},

	getSkinHistory: function () {
		amsSubmit(358412, 738996);
	},

	getPackageHistory: function () {
		if (milo.cookie.get(Act.act_key + ':has_package:' + openid)) {
			$("#btn_lottery_package").addClass("btn-got").attr("href", "javascript: ;");
		} else {
			amsSubmit(358412, 738958);
		}
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

// ��Ƥ��
amsCfg_738044 = {
	'iAMSActivityId': '358412', // AMS���
	'activityId': '389808', // ģ��ʵ����
	"sNeedSubmitPopDiv": true, // �Ƿ���loading��
	'onBeginGetGiftEvent': function () {
		return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
	},
	'onGetGiftFailureEvent': function (callbackObj) {// �齱ʧ���¼�
		if (callbackObj.iRet = "202") {
			alert("�װ����ٻ�ʦ�����΢���˺���δ�󶨶����˺ţ����Ȱ󶨶����˺ţ�");
		} else {
			alert(callbackObj.sMsg);
		}
	},
	'onGetGiftSuccessEvent': function (callbackObj) {// �齱�ɹ��¼�
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

// ������ȡ
amsCfg_738672 = {
	'iAMSActivityId': '358412', // AMS���
	'activityId': '389808', // ģ��ʵ����
	"sNeedSubmitPopDiv": true, // �Ƿ���loading��
	"sData": {},
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

		Act.has_got = 1;
		$("#change_area").hide();
		$("#get_prize").addClass("btn-got").attr("href", "javascript:;");
		$("#skin_text1").text("�����ѷ�������" + LOLServerSelect.zoneToName(Act.area_id) + "��");
		$("#skin_text2").hide();
		$("#skin_text3").hide();
		$("#btn_lottery_skin").addClass("btn-awardinfo").attr("href", "javascript: TGDialogS('dia1');");
		closeDialog();
		alert("��ȡ�ɹ�");
	}
};

// ��ȡ�������
amsCfg_738743 = {
	'iAMSActivityId': '358412', // AMS���
	'activityId': '389808', // ģ��ʵ����
	"sNeedSubmitPopDiv": true, // �Ƿ���loading��
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

		$("#btn_lottery_package").addClass("btn-got").attr("href", "javascript: ;");
		TGDialogS('dia2');
		return;
	}
};

// ��ѯ�Ƿ������ϷȦ
amsCfg_738457 = {
	"_everyRead": true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
	"iActivityId": 358412, //�id	
	"iFlowId": 738457, //����id
	"sNeedSubmitPopDiv": false, // �Ƿ���loading��
	"fFlowSubmitEnd": function (res) {
		if (res.jData.joined) {
			milo.cookie.set(Act.act_key + ':is_join:' + openid, 1)
			if (Act.lottery_type == "skin") {
				// Ƥ���齱
				Act.checkArea();
			} else {
				// �������
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
	"sNeedSubmitPopDiv": false, // �Ƿ���loading��
	"fFlowSubmitEnd": function (res) {
		// ��ѯ��״̬
		Act.checkWXJoinGameStatus();
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//ʧ�ܻ��ߵ��������
		//���������㣬ame���ش���0�Ǻ��ߵ�����
		if (res.iRet = 202) {
			if (confirm("�װ����ٻ�ʦ�����΢���˺���δ�󶨶����˺ţ����Ȱ󶨶����˺ţ�")) {
				location.href = "https://game.weixin.qq.com/cgi-bin/h5/static/autominiprogram/minigame.html?weapp=weapp%3A%2F%2Fwxa27e2efc122b3d0f%3Fpath%3D%253f&appid=wxa27e2efc122b3d0f#wechat_redirect";
			}
		} else {
			alert(res.sMsg);
		}
	}
};

// ��ѯ���������ȡ״̬
amsCfg_738958 = {
	"_everyRead": true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
	"iActivityId": 358412, //�id	
	"iFlowId": 738958, //����id
	"fFlowSubmitEnd": function (res) {
		console.log('��������Ϊ', res);
		has_package = +res.result;
		if (has_package > 0) {
			milo.cookie.set(Act.act_key + ':has_package:' + openid, 1)
			$("#btn_lottery_package").addClass("btn-got").attr("href", "javascript: ;");
		} else {
			Act.getRestPackage();
		}
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//ʧ�ܻ��ߵ��������
		//���������㣬ame���ش���0�Ǻ��ߵ�����
		//alert(res.sMsg);
	}
};

// ��ѯ��ȡƤ��
amsCfg_738996 = {
	"_everyRead": true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
	"iActivityId": 358412, //�id	
	"iFlowId": 738996, //����id
	"sNeedSubmitPopDiv": false, // �Ƿ���loading��
	"fFlowSubmitEnd": function (res) {
		console.log('��������Ϊ', res);
		if (res.myGiftList.length > 0) {
			if (res.myGiftList[0].iStatus == "2") {
				// ����ȡ
				Act.has_got = 1;
				$("#btn_lottery_skin").addClass("btn-awardinfo");
				$("#change_area").hide();
				$("#get_prize").addClass("btn-got").attr("href", "javascript:;");
				$("#skin_text1").text("�����ѷ�������" + res.myGiftList[0].sAreaName + "��");
				$("#skin_text2").hide();
				$("#skin_text3").hide();
			} else if (res.myGiftList[0].iStatus == "3") {
				// δ��ȡ
				is_his = 1;
				Act.checkArea();
				Act.pid = res.myGiftList[0].id;
			}
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
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//ʧ�ܻ��ߵ��������
		//���������㣬ame���ش���0�Ǻ��ߵ�����
		//alert(res.sMsg);
	}
};

// ʣ������
amsCfg_739485 = {
	"_everyRead": true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
	"iActivityId": 358412, //�id
	"iFlowId": 739485, //����id
	"sNeedSubmitPopDiv": false, // �Ƿ���loading��
	"fFlowSubmitEnd": function (res) {
		console.log('��������Ϊ', res);
		if (+res.sOutValue2 == 0) {
			$("#btn_lottery_package").attr("href", "javascript: TGDialogS('dia5');");
		} else {
			if (+res.sOutValue1 == 0 && has_package == 0) {
				// ������ʣ������
				$("#btn_lottery_package").attr("href", "javascript: TGDialogS('dia4');");
			}
		}
		return;
	},
	"fFlowSubmitFailed": function (res) {
		//ʧ�ܻ��ߵ��������
		//���������㣬ame���ش���0�Ǻ��ߵ�����
		//alert(res.sMsg);
	}
};/* #t6Hl8#9E41903021ABEADB980860784CC4BD14 */