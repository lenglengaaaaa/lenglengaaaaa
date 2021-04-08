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
//新的弹窗
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
				bgcolor:'#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
				opacity:80 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
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
/* 判断客户端系统及应用程序 */
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

/*新的分享*/
function sharefriend() {   //分享--执行这个函数就好了
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

		//朋友圈及好友分享
		need("biz.wxclient", function (WXClient) {
			//微信客户初始化成功后，返回wx对象
			WXClient.init({sAppId: "wxfeb5a65212da517c"}, function (wx) {
				//分享到朋友
				wx.onMenuShareAppMessage(shareAppMessageData);
				//分享到朋友圈
				wx.onMenuShareTimeline(shareTimelineData);
				//分享到手Q
				wx.onMenuShareQQ(qqShareData);
				//分享到QZone
				wx.onMenuShareQZone(qqShareData);
				//分享到微博（默认是不需要的，可根据情况使用）
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
				QQToQQSuccess:function(){//分享到QQ好友-成功
					shareData.sharesuccess();
				},
				QQToQQCancel:function(){//分享到QQ好友-失败
					shareData.shareerror();
				},
				QQToQzoneSuccess:function(){//分享到QQ空间-成功
					shareData.sharesuccess();
				},
				QQToQzoneCancel:function(){//分享到QQ空间-失败
					shareData.shareerror();
				},
				QQToMessageSuccess:function(){//分享到微信好友-成功
					shareData.sharesuccess();
				},
				QQToMessageCancel:function(){//分享到微信好友-失败
					shareData.shareerror();
				},
				QQToTimelineSuccess:function(){//分享到朋友圈-成功
					shareData.sharesuccess();
				},
				QQToTimelineCancel:function(){//分享到朋友圈-失败
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

/* 拉起APP */
// 自动跳转到appstore
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
	
	var confirmTxt = confirmTxt?confirmTxt:'下载心悦俱乐部App，参与活动吧！';
	if (g_sUA.indexOf('tgclub') == -1) {
		// 非App环境下执行
		switch(true){
			case (null != ios && null != isWeixin): // ios微信
				// IOS的微信，使用JSAPI唤起
				setTimeout(function () {
					WeixinJSBridge.invoke('launchApplication', {
						"schemeUrl": schemaUrl
					}, function (res) {
					});
				}, 500);
				jumpDownApp(3000, confirmTxt, null, personality);
				return;
				break;
			case (null != ios && null == isWeixin): // ios 手Q
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
			case (null != android && null != isWeixin):// 安卓 微信
				// IOS的1微信，使用JSAPI唤起
				setTimeout(function () {
					WeixinJSBridge.invoke('launchApplication', {
						"schemeUrl": schemaUrl
					}, function (res) {
					});
				}, 500);
				// 手Q直接跳转
				jumpDownApp(1500, confirmTxt, null, personality);
				return;
				break;
			case (null != android && null == isWeixin): // 安卓 手Q
				var iframe = document.createElement('iframe');
				iframe.src = schemaUrl;
				iframe.style.display = 'none';
				document.body.appendChild(iframe);
				jumpDownApp(1500, confirmTxt, null, personality);
				return;
				break;
			default:
				alertMsg('仅适用IOS或Android');
				return;
				break;
		}
	}
};
