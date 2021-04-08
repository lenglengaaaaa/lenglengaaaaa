function loadJs(url,callback){
	var script=document.createElement('script');
	script.type="text/javascript";
	if(typeof(callback)!="undefined"){
		if(script.readyState){
			script.onreadystatechange=function(){
				if(script.readyState == "loaded" || script.readyState == "complete"){
					script.onreadystatechange=null;
					callback();
				}
			}
		}else{
			script.onload=function(){
				callback();
			}
		}
	}
	script.src=url;
	document.head.appendChild(script);
}
loadJs("//res.wx.qq.com/open/js/jweixin-1.0.0.js");
loadJs("//ossweb-img.qq.com/images/js/TGMobileShare/TGMobileShare.min.js",function(){
	if(is_QQ){
		typeof(shareData) != 'undefined' && sharefriend();
	}
});
//�µĵ���
function alertMsg(msg) {
	hideDialog();
    var opt = {};
    if(typeof msg == "string"){
        opt = {'zindex':99999,'content':msg};
    }else{
        opt = msg;
    }
    need(["biz.widget.dialog"], function(Dialog) {
        Dialog.alert(opt);
    });
};
function confirmMsg(msg,callback,personality) {
	if(personality){
		hideDialog();
		var opt = {};
		opt = msg;
		
		need(["biz.widget.dialog"], function (Dialog) {
			Dialog.confirm(opt,callback);
		});
	}else{
		need("biz.dialog",function(Dialog){
			Dialog.show({
				id:"DownloadXyApp",
				bgcolor:'#000', //���������֡�����ɫ����ʽΪ"#FF6600"�����޸ģ�Ĭ��Ϊ"#fff"
				opacity:80 //���������֡���͸���ȣ���ʽΪ��10-100������ѡ
			});
		});
		
		$("#GoToDownload").on("click",function(){
			callback.call();
		});
	}
}
function hideDialog() {
	need("biz.dialog",function(Dialog) {
		Dialog.hide();
	});
}
/* �жϿͻ���ϵͳ��Ӧ�ó��� */
function isQQ() {
	var chkRes = false;
	mqq.device.isMobileQQ(function (result) {
		chkRes = result;
	});
	return chkRes;
}
var g_sUA = navigator.userAgent.toLowerCase();
var android = g_sUA.match(/(android)\s+([\d.]+)/);
var ios = g_sUA.match(/(ipad|iphone|ipod).*os\s([\d_]+)/);
var isWeixin = g_sUA.match(/micromessenger/);
var isAPP = g_sUA.indexOf('tgclub');
var is_QQ = g_sUA.match(/QQ\/[0-9]/i);

/*�µķ���*/
function sharefriend() {   //����--ִ����������ͺ���
	console.log("%c--------------------SHARE START--------------------\n%cMobileShare\u63d0\u793a\n%c\u5206\u4eab\u6807\u9898\uff1a%c"+shareData.tTitle+"\n%c\u5206\u4eab\u8be6\u60c5\uff1a%c"+shareData.tContent+"\n%c\u5206\u4eab\u56fe\u7247\uff1a%c"+shareData.imgUrl+"\n%c\u5206\u4eab\u94fe\u63a5\uff1a%c"+shareData.QQtimeLineLink+"\n%c\u70b9 \u51fb \u6d41\uff1a%c"+shareData.flowId+"\n%c--------------------SHARE END--------------------","color:#989a9d;","font-size:20px;","color:#000;","color:green;","color:#000;","color:green;","color:#000;","color:green;","color:#000;","color:green;","color:#000;","color:green;","color:#989a9d;");
	if (isWeixin == 'micromessenger') {
		var shareAppMessageData = {
			title: shareData.tTitle,
			desc: shareData.tContent,
			link: shareData.WXtimeLineLink,
			imgUrl: shareData.imgUrl,
			success: function () {
				shareData.sharesuccess();
			},
			cancel: function () {
				shareData.shareerror();
			}
		};

		var shareTimelineData = {
			title: shareData.tContent,
			link: shareData.WXtimeLineLink,
			imgUrl: shareData.imgUrl,
			success: function () {
				shareData.sharesuccess();
			},
			cancel: function () {
				shareData.shareerror();
			}
		};
		var qqShareData = {
			title: shareData.tTitle,
			desc: shareData.tContent,
			link: shareData.QQtimeLineLink,
			imgUrl: shareData.imgUrl,
			success: function () {
				shareData.sharesuccess();
			},
			cancel: function () {
				shareData.shareerror();
			}
		};

		//����Ȧ�����ѷ���
		need("biz.wxclient", function (WXClient) {
			//΢�ſͻ���ʼ���ɹ��󣬷���wx����
			WXClient.init({sAppId: "wxfeb5a65212da517c"}, function (wx) {
				//��������
				wx.onMenuShareAppMessage(shareAppMessageData);
				//��������Ȧ
				wx.onMenuShareTimeline(shareTimelineData);
				//������Q
				wx.onMenuShareQQ(qqShareData);
				//����QZone
				wx.onMenuShareQZone(qqShareData);
				//����΢����Ĭ���ǲ���Ҫ�ģ��ɸ������ʹ�ã�
				wx.onMenuShareWeibo(qqShareData);
			});
		});
	}
	if (is_QQ) {
		TGMobileShare({
			shareTitle: shareData.tTitle,
			shareDesc: shareData.tContent,
			shareImgUrl: shareData.imgUrl,
			shareLink:shareData.QQtimeLineLink,
			actName:shareData.flowId,
			onInit:function(tgms){
			},
			onShare:{
				QQToQQSuccess:function(){//����QQ����-�ɹ�
					shareData.sharesuccess();
				},
				QQToQQCancel:function(){//����QQ����-ʧ��
					shareData.shareerror();
				},
				QQToQzoneSuccess:function(){//����QQ�ռ�-�ɹ�
					shareData.sharesuccess();
				},
				QQToQzoneCancel:function(){//����QQ�ռ�-ʧ��
					shareData.shareerror();
				},
				QQToMessageSuccess:function(){//����΢�ź���-�ɹ�
					shareData.sharesuccess();
				},
				QQToMessageCancel:function(){//����΢�ź���-ʧ��
					shareData.shareerror();
				},
				QQToTimelineSuccess:function(){//��������Ȧ-�ɹ�
					shareData.sharesuccess();
				},
				QQToTimelineCancel:function(){//��������Ȧ-ʧ��
					shareData.shareerror();
				}
			}
		});
	}
	if (isAPP > -1){
		var data = {
			'title':shareData.tTitle,
			'summary':shareData.tContent,
			'icon':shareData.APPimgUrl,
			'url':shareData.APPtimeLineLink
		};
		var jsonStr = JSON.stringify(data);
		Tgclub.shareWebPage(jsonStr,function(ret){
			/*var jsonArr;
			if(typeof(ret) == "object" && Object.prototype.toString.call(ret).toLowerCase() == "[object object]" && !ret.length){
				jsonArr = ret;
			}else{
				jsonArr = JSON.parse(ret);
			}
			
			if(jsonArr.result == 1){		
				shareData.sharesuccess();
			}else{
				shareData.shareerror();
			}*/
			
			shareData.sharesuccess();
		});
	}
}

/* ����APP */
// �Զ���ת��appstore
var jumpDownApp = function(delay_time, confirm_txt, callback, personality){
	setTimeout(function () {
		confirmMsg(confirm_txt,function(callback){
			if(false != confirm_txt && 'undefined' != typeof(callback) && 'function' == typeof(callback) && callback != null){
				callback();
				return;
			}
			if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
				var app_down_url = "https://itunes.apple.com/cn/app/%E5%BF%83%E6%82%A6%E4%BF%B1%E4%B9%90%E9%83%A8-%E8%85%BE%E8%AE%AF%E6%B8%B8%E6%88%8F%E7%8E%A9%E5%AE%B6%E7%A6%8F%E5%88%A9%E5%B9%B3%E5%8F%B0/id1156439976?mt=8";
				window.location.href = app_down_url;
			}else{
				var app_down_url = "http://sj.qq.com/myapp/detail.htm?apkName=com.tencent.tgclub";
				//var app_down_url = "http://dlied5.myapp.com/myapp/6337/tgclub/apk/20190506/6eb1cd8968cb341d33c898aecd0fead4.apk";
				window.location.href = app_down_url;
			}
			if('undefined' != typeof(callback) && 'function' == typeof(callback) && callback != null){
				callback();
			}
		}, personality);
	}, delay_time);
};

function goToApp(url,confirmTxt,is_share = 0,personality = true){
	if(url.indexOf("http") > -1){
		var schemaUrl = url?"tgclub://redirect?url=" + encodeURIComponent(url) + "&share=" + is_share:"tgclub://index";
	}else{
		var schemaUrl = url;
	}
	
	var confirmTxt = confirmTxt?confirmTxt:'�������þ��ֲ�App�������ɣ�';
	if (g_sUA.indexOf('tgclub') == -1) {
		// ��App������ִ��
		switch(true){
			case (null != ios && null != isWeixin): // ios΢��
				// IOS��΢�ţ�ʹ��JSAPI����
				setTimeout(function () {
					WeixinJSBridge.invoke('launchApplication', {
						"schemeUrl": schemaUrl
					}, function (res) {
					});
				}, 500);
				jumpDownApp(3000, confirmTxt, null, personality);
				return;
				break;
			case (null != ios && null == isWeixin): // ios ��Q
				window.location.href = schemaUrl;
				var loadDateTime = Date.now();
				setTimeout(function () {
					var timeOutDateTime = Date.now();
					if (timeOutDateTime - loadDateTime < 1000) {
						confirmMsg(confirmTxt,function(){
							var app_down_url = "https://itunes.apple.com/cn/app/%E5%BF%83%E6%82%A6%E4%BF%B1%E4%B9%90%E9%83%A8-%E8%85%BE%E8%AE%AF%E6%B8%B8%E6%88%8F%E7%8E%A9%E5%AE%B6%E7%A6%8F%E5%88%A9%E5%B9%B3%E5%8F%B0/id1156439976?mt=8";
							window.location.href = app_down_url;
						},personality);
					}
				}, 25);
				return;
				break;
			case (null != android && null != isWeixin):// ��׿ ΢��
				// IOS��1΢�ţ�ʹ��JSAPI����
				setTimeout(function () {
					WeixinJSBridge.invoke('launchApplication', {
						"schemeUrl": schemaUrl
					}, function (res) {
					});
				}, 500);
				// ��Qֱ����ת
				jumpDownApp(1500, confirmTxt, null, personality);
				return;
				break;
			case (null != android && null == isWeixin): // ��׿ ��Q
				var iframe = document.createElement('iframe');
				iframe.src = schemaUrl;
				iframe.style.display = 'none';
				document.body.appendChild(iframe);
				jumpDownApp(1500, confirmTxt, null, personality);
				return;
				break;
			default:
				alertMsg('������IOS��Android');
				return;
				break;
		}
	}
};
