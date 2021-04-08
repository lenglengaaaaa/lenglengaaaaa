// init_ZMApp({
// 	'title':'腾讯最新飞行射击手游起飞啦！',
// 	'summery':'飞行射击再出发，超爽手感，有梗BOSS等你来体验',
// 	'subtitle' : '比特大爆炸手游 腾讯游戏 心悦 心悦俱乐部',
// 	'img':'//game.gtimg.cn/images/tgclub/act/a20201109bitxy/icon120x120.png',
// 	'url':location.href.split('?')[0],
// 	 'WXtrigger':function(res){
// 				//微信动作回调
// 		},
// 		'WXsuccess':function(res){
// 				//微信成功回调
// 				if(!res) return;
// 				if(res.errMsg == 'sendAppMessage:ok') {
// 						//微信分享个人
// 						PTTSendClick('btn','sharewx1','分享给好友');
// 				} else if(res.errMsg == 'shareTimeline:ok') {
// 						//微信分享朋友圈
// 						PTTSendClick('btn','sharewx2','分享到朋友圈');
// 				}else if(res.errMsg == 'shareQQ:ok'){
// 						//微信分享至QQ
// 						PTTSendClick('btn','shareqq','分享到QQ');
// 				}
// 		},
// 		'WXcancel':function(res){
// 				//微信分享取消动作回调
// 				PTTSendClick('btn','sharewx_cancel','分享取消');
// 		},
// 		'WXfail':function(res){
// 				//微信分享失败动作回调
// 				PTTSendClick('btn','sharewx_fail','分享失败');
// 		},
// 		'QQtrigger':function(res){
// 				//QQ动作回调

// 		},
// 		'QQcallback':function(res){
// 				//QQ分享成功
// 				PTTSendClick('btn','shareqq_succ','QQ分享成功');
// 		},
// 		'LOL_APPsuccess' : function(res){
// 				//掌盟分享成功
// 				PTTSendClick('btn','sharezm_succ','掌盟分享成功');
// 		 }
// 	});

// function delayCookie(){
// 	var cookieUin = milo.cookie.get('uin', '');
// 	if (cookieUin) {
// 			milo.cookie.set('uin_cookie', cookieUin, 365 * 24 * 60 * 60, 'qq.com', '/', false);
// 			milo.cookie.set('ied_qq', cookieUin, 365 * 24 * 60 * 60, 'qq.com', '/', false);
// 	}
// }
// 	setTimeout(delayCookie,2000);

// milo.ready(function () {
//     need("biz.login", function (LoginManager) {
//         LoginManager.init({
//             appConfig: {
//                 "avoidConflict":"false",//默认值为空，判断是否需要校验微信登录态串号，设为true，为必须校验，设为false，为不校验，默认值""表示在微信环境下校验，其它app环境下不校验
//                 "QQBrowserAppId": "xxx",  //在QQ浏览器端申请的APPID，联系内部同学
//                 "WxAppId"       : "xxxxxxxxxxx",  //需要在微信申请openLink权限，联系内部同学
//                 "AppName"       : "业务的中文名称",  //业务的中文名称
//                 "scope"         : "snsapi_base",   //默认是 snsapi_base 静默授权，如果游戏无静默权限，就需要手动改成 snsapi_userinfo
//                 "LogoUrl"       : "//ossweb-img.qq.com/images/feiji/web201507/logo.png"   //业务在授权时需要显示的正方形标准Logo，图片要求：尺寸：100x100px
//             }
//         });

//         //QQ登录
//         milo.addEvent(g('ptLoginBtn'), 'click', function (e) {
//             LoginManager.login();
//         });

//         //微信登录
//         milo.addEvent(g('wxloginBtn'), 'click', function (e) {
//             LoginManager.loginByWX();
//         });

//         //检查登录态
// //      LoginManager.checkLogin(function(userInfo){
// //          console.log("已登录");
// //          console.log("登录信息：",userInfo);
// //      },function(){
// //          console.log("未登录");
// //      });
//         //注销
//         milo.addEvent(g("ptLogoutBtn"),"click",function(){
//             LoginManager.logout(
//                 {
//                     logoutCallback:function(){
//                         alert("已注销");
//                     }
//                 }
//             );
//         })

//     });

// });

$('.nav-box a').on('click',function(){
	var ind = $(this).index();
	$(this).addClass('on').siblings().removeClass('on');
	$('.cont2').children('.prize-box').hide().eq(ind).show();
})

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
};

function isUserAgentFlag(flagName,isReg){
    if(Boolean(isReg)){
        return navigator.userAgent.toLowerCase().match(isReg) == null ? false : true;
    }else{
        return navigator.userAgent.toLowerCase().indexOf(flagName) == -1 ? false : true;
    }
} 
