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
		alert('敬请期待');
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


// 开始抽奖lottery->js
var msg = "恭喜你获得大奖哟";
function callJsToStart() {
	Act.lottery();
	PTTSendClick('lottery', 'start', '抽奖_开始');
	//alert("抽奖暂未开放哦！");
}
//开发获得抽奖结果 通知lottery开始播放效果 js->lottery
function calllotteryToRoll(id) {
	PTTSendClick('lottery', 'reward_' + id, '抽奖_奖品_' + id);
	if (lottery) lottery.stopRoll(id);
}
//动画完成通知js  lottery->js
function callJsToComplete() {
	PTTSendClick('lottery', 'end', '抽奖_完毕');
	alert(msg);
}

//初始化抽奖的 可以不知道内部
var lottery = new Lottery({
	'lighturl': '//game.gtimg.cn/images/codm/cp/a20201209codm/p/m-sel.png', //外部光圈png 不填写就用默认的效果
	// 'starturl': '//game.gtimg.cn/images/codm/cp/a20201209codm/p/m-btn-cj.png', //外部按钮png 不填写就用默认的按钮效果
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