// init_ZMApp({
// 	'title':'��Ѷ���·�����������������',
// 	'summery':'��������ٳ�������ˬ�ָУ��й�BOSS����������',
// 	'subtitle' : '���ش�ը���� ��Ѷ��Ϸ ���� ���þ��ֲ�',
// 	'img':'//game.gtimg.cn/images/tgclub/act/a20201109bitxy/icon120x120.png',
// 	'url':location.href.split('?')[0],
// 	 'WXtrigger':function(res){
// 				//΢�Ŷ����ص�
// 		},
// 		'WXsuccess':function(res){
// 				//΢�ųɹ��ص�
// 				if(!res) return;
// 				if(res.errMsg == 'sendAppMessage:ok') {
// 						//΢�ŷ������
// 						PTTSendClick('btn','sharewx1','���������');
// 				} else if(res.errMsg == 'shareTimeline:ok') {
// 						//΢�ŷ�������Ȧ
// 						PTTSendClick('btn','sharewx2','��������Ȧ');
// 				}else if(res.errMsg == 'shareQQ:ok'){
// 						//΢�ŷ�����QQ
// 						PTTSendClick('btn','shareqq','����QQ');
// 				}
// 		},
// 		'WXcancel':function(res){
// 				//΢�ŷ���ȡ�������ص�
// 				PTTSendClick('btn','sharewx_cancel','����ȡ��');
// 		},
// 		'WXfail':function(res){
// 				//΢�ŷ���ʧ�ܶ����ص�
// 				PTTSendClick('btn','sharewx_fail','����ʧ��');
// 		},
// 		'QQtrigger':function(res){
// 				//QQ�����ص�

// 		},
// 		'QQcallback':function(res){
// 				//QQ����ɹ�
// 				PTTSendClick('btn','shareqq_succ','QQ����ɹ�');
// 		},
// 		'LOL_APPsuccess' : function(res){
// 				//���˷���ɹ�
// 				PTTSendClick('btn','sharezm_succ','���˷���ɹ�');
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
//                 "avoidConflict":"false",//Ĭ��ֵΪ�գ��ж��Ƿ���ҪУ��΢�ŵ�¼̬���ţ���Ϊtrue��Ϊ����У�飬��Ϊfalse��Ϊ��У�飬Ĭ��ֵ""��ʾ��΢�Ż�����У�飬����app�����²�У��
//                 "QQBrowserAppId": "xxx",  //��QQ������������APPID����ϵ�ڲ�ͬѧ
//                 "WxAppId"       : "xxxxxxxxxxx",  //��Ҫ��΢������openLinkȨ�ޣ���ϵ�ڲ�ͬѧ
//                 "AppName"       : "ҵ�����������",  //ҵ�����������
//                 "scope"         : "snsapi_base",   //Ĭ���� snsapi_base ��Ĭ��Ȩ�������Ϸ�޾�ĬȨ�ޣ�����Ҫ�ֶ��ĳ� snsapi_userinfo
//                 "LogoUrl"       : "//ossweb-img.qq.com/images/feiji/web201507/logo.png"   //ҵ������Ȩʱ��Ҫ��ʾ�������α�׼Logo��ͼƬҪ�󣺳ߴ磺100x100px
//             }
//         });

//         //QQ��¼
//         milo.addEvent(g('ptLoginBtn'), 'click', function (e) {
//             LoginManager.login();
//         });

//         //΢�ŵ�¼
//         milo.addEvent(g('wxloginBtn'), 'click', function (e) {
//             LoginManager.loginByWX();
//         });

//         //����¼̬
// //      LoginManager.checkLogin(function(userInfo){
// //          console.log("�ѵ�¼");
// //          console.log("��¼��Ϣ��",userInfo);
// //      },function(){
// //          console.log("δ��¼");
// //      });
//         //ע��
//         milo.addEvent(g("ptLogoutBtn"),"click",function(){
//             LoginManager.logout(
//                 {
//                     logoutCallback:function(){
//                         alert("��ע��");
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
