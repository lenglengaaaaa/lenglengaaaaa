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
	var vid = '';
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
			autoplay: true
		});
	}
})


// ��ʼ�齱lottery->js
var msg = "��ϲ���ô�Ӵ";
function callJsToStart() {
	Act.lottery();
	PTTSendClick('lottery', 'start', '�齱_��ʼ');
	//alert("�齱��δ����Ŷ��");
}
//������ó齱��� ֪ͨlottery��ʼ����Ч�� js->lottery
function calllotteryToRoll(id) {
	PTTSendClick('lottery', 'reward_' + id, '�齱_��Ʒ_' + id);
	if (lottery) lottery.stopRoll(id);
}
//�������֪ͨjs  lottery->js
function callJsToComplete() {
	PTTSendClick('lottery', 'end', '�齱_���');
	alert(msg);
}

//��ʼ���齱�� ���Բ�֪���ڲ�
var lottery = new Lottery({
	'lighturl': '//game.gtimg.cn/images/codm/cp/a20201209codm/p/m-sel.png', //�ⲿ��Ȧpng ����д����Ĭ�ϵ�Ч��
	// 'starturl': '//game.gtimg.cn/images/codm/cp/a20201209codm/p/m-btn-cj.png', //�ⲿ��ťpng ����д����Ĭ�ϵİ�ťЧ��
	'total': 8,
	'width': 6.95,
	'height': 9.34,
	'sbtnx': 2.60,
	'sbtny': 3.41,
	'sbtnw': 1.62,
	'sbtnh': 2.61,
	'boxw': 2.11,
	'boxh': 3.09,
	'position': ".28_.11,2.35_.11,4.42_.11,4.42_3.17,4.42_6.23,2.35_6.23,.28_6.23,.28_3.17",
	'contentId': 'lotterycontent',
	'onClickRollEvent': callJsToStart,
	'onCompleteRollEvent': callJsToComplete,
	'unit': "rem",
	'isResponsive': 0
});














/* #t6Hl8#A7730AE28CF29A96FE2A4EC06FCABE9D */