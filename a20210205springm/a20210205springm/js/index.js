
        init_ZMApp({
					'title': 'Ӣ������2021�´��޶����������ʱ��ȡ',
					'summery': '���ڲ���������ȡӢ������ר��������桢��ѿ���������г������޶�Ƥ����',
					'subtitle': '���ڲ���������ȡӢ������ר��������桢��ѿ���������г������޶�Ƥ����',
					'img': 'https://game.gtimg.cn/images/lol/act/a20210205springm/share.png',
					'url': location.href.split('?')[0],
					'WXtrigger': function (res) {
							//΢�Ŷ����ص�
					},
					'WXsuccess': function (res) {
							//΢�ųɹ��ص�
							if (!res) return;
							amsSubmit(353484, 730842);
							if (res.errMsg == 'sendAppMessage:ok') {
									//΢�ŷ�������
									PTTSendClick('btn', 'sharewx1', '����������');
							} else if (res.errMsg == 'shareTimeline:ok') {
									//΢�ŷ�������Ȧ
									PTTSendClick('btn', 'sharewx2', '����������Ȧ');
							} else if (res.errMsg == 'shareQQ:ok') {
									//΢�ŷ�����QQ
									PTTSendClick('btn', 'shareqq', '������QQ');
							}
					},
					'WXcancel': function (res) {
							//΢�ŷ���ȡ�������ص�
							PTTSendClick('btn', 'sharewx_cancel', '����ȡ��');
					},
					'WXfail': function (res) {
							//΢�ŷ���ʧ�ܶ����ص�
							PTTSendClick('btn', 'sharewx_fail', '����ʧ��');
					},
					'QQtrigger': function (res) {
							//QQ�����ص�

					},
					'QQcallback': function (res) {
							//QQ�����ɹ�
							amsSubmit(353484, 730842);
							PTTSendClick('btn', 'shareqq_succ', 'QQ�����ɹ�');
					},
					'LOL_APPsuccess': function (res) {
							//���˷����ɹ�
							amsSubmit(353484, 730842);
							PTTSendClick('btn', 'sharezm_succ', '���˷����ɹ�');
					}
			});

var swiper = new Swiper('.cont1 .swiper-container', {
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	// initialSlide: 3,
	loop: true,
	autoplay: {
		delay: 2000,
		stopOnLastSlide: false,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: '.cont1 .swiper-button-next',
		prevEl: '.cont1 .swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	on: {
		slideChangeTransitionEnd: function () {
		}
	}
});
var swiper1 = new Swiper('.cont1-1 .swiper-container', {
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	// initialSlide: 3,
	loop: true,
	autoplay: {
		delay: 2500,
		stopOnLastSlide: false,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: '.cont1-1 .swiper-button-next',
		prevEl: '.cont1-1 .swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	on: {
		slideChangeTransitionEnd: function () {
		}
	}
});

$('.btn-play').on('click', function () {
	var vid = 'f3234lp6wdb';
	if (!vid) {
		alert('�����ڴ�');
		return;
	} else {
		$(this).hide();
		var player = new Txplayer({
			containerId: "video-container", //id
			vid: vid,
			width: '100%',
			height: '100%',
			autoplay: true,
			poster:'',
		});
	}
})

var skinlist=[
	{"id":164002,"name":"ħŮ ���۶�","icon":"icon1"},
	{"id":42008,"name":"������У ����","icon":"icon1"},
	{"id":81009,"name":"�������� �������","icon":"icon1"},
	{"id":102006,"name":"����ħװ���� ϣ����","icon":"icon1"},
	{"id":203002,"name":"����ħװ���� ǧ��","icon":"icon1"},
	{"id":105009,"name":"����ħװ���� ����","icon":"icon1"},
	{"id":42018,"name":"�»� ����","icon":"icon1"},
	{"id":63007,"name":"���֮�� ������","icon":"icon1"},
	{"id":83004,"name":"�����","icon":"icon1"},
	{"id":107015,"name":"��������","icon":"icon1"},
	{"id":42018,"name":"�»� ���棨7�죩"},
	{"id":105014,"name":"��ë���ȣ�7�죩"},
	{"id":83004,"name":"����ˣ�7�죩"},
	{"id":107015,"name":"����������7�죩"},
	{"id":63007,"name":"���֮�� �����£�7�죩"},
	{"id":20008,"name":"ǧֽ˫�� ŬŬ�������գ�7�죩"},
	{"id":34008,"name":"ǧֽ��� ����ά�ǣ�7�죩"},
	{"id":15016,"name":"�Ⱥ�֮�� ϣά����7�죩"},
	{"id":555009,"name":"�Ⱥ�֮�� �ɿˣ�7�죩"},
	{"id":266007,"name":"�Ⱥ�֮�� ���п�˹��7�죩"},
	{"id":127004,"name":"ħŮ ��ɣ׿��7�죩"},
	{"id":164002,"name":"ħŮ ���۶���7�죩"},
	{"id":9009,"name":"�������� �ѵ���ˣ�7�죩"},
	{"id":104018,"name":"�������� ���׸�˹��7�죩"},
	{"id":1011,"name":"����ħװ���� ���ݣ�7�죩"},
	{"id":150013,"name":"����ħװ���� �ɶ���7�죩"},
	{"id":60005,"name":"����ħװ���� ����˿��7�죩"},
	{"id":76009,"name":"����ħװ���� �ε�����7�죩"},
	{"id":42008,"name":"������У ���棨7�죩"},
	{"id":81009,"name":"�������� ���������7�죩"},
	{"id":102006,"name":"����ħװ���� ϣ���ȣ�7�죩"},
	{"id":203002,"name":"����ħװ���� ǧ�壨7�죩"},
	{"id":105009,"name":"����ħװ���� ���ȣ�7�죩"},
	{"id":163001,"name":"���׶�׿�� �����루7�죩"},
	{"id":131003,"name":"�������� �찲�ȣ�7�죩"},
	{"id":16006,"name":"Դ���� ��������7�죩"},
	{"id":127003,"name":"Դ���� ��ɣ׿��7�죩"},
	{"id":161003,"name":"�������ά���ȣ�7�죩"},
	{"id":223002,"name":"��ţ��� ��ķ��7�죩"},
	{"id":57006,"name":"������7�죩"},
	{"id":136001,"name":"�ҽ����� ����������������7�죩"},
	{"id":121003,"name":"�������� ���ȿˣ�7�죩"},
	{"id":266003,"name":"���� ���п�˹��7�죩"},
	{"id":266002,"name":"���콣ħ ���п�˹��7�죩"},
	
	]

// Ƥ����Ⱦ
var html="";
for(var i=0;i<skinlist.length;i++){
	var src = "//ossweb-img.qq.com/images/lol/appskin/" + skinlist[i].id + ".jpg";
	if(skinlist[i].icon=="icon1"){
		var li = "<li><div><img class='pic' src="+ src +"></div><p class='name'>"+ skinlist[i].name +"</p><i class='spr icon1'></i></li>";
	}else{
		var li = "<li><div><img class='pic' src="+ src +"></div><p class='name'>"+ skinlist[i].name +"</p><i class='spr icon2'></i></li>";
	}
	html+=li;
	
}
$('.skinul').html(html);


$('body').on('click','#_overlay_',function(){
	closeDialog();
})









/* #t6Hl8#30DFAAEDBF37866273777596AD7CA14E */