
var tabcont2 = $('#main2').offset().top;
$(".btn-nav").on('click', function() {
	$('html,body').animate({
			scrollTop: tabcont2
	}, {
			duration: 600,
			easing: "linear"
	});
})


// 链接
if(/(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(navigator.userAgent)) {
	$('.btn-tq').on('click',function(){
		$('.main3 .box2 .fc-box').toggleClass('on');
	})
	$('.fc-box img').attr('src','//game.gtimg.cn/images/lol/act/a20210108newseason/m/fc1.png')

	// 分享
	$('.btn-share1').on('click',function(){
		$('#dia-sharemc').css({
			'opacity':'1',
			'z-index':'999'
		})
	})
	$('#dia-sharemc').on('click',function(){
		$('#dia-sharemc').css({
			'opacity':'0',
			'z-index':'-999'
		})
	})

	// 轮播图链接
	$('.swiper-box .slide1').attr('href','//zt.huya.com/12673/mobile/index.html?isPcClient=1?e_code=506719&rso=DONGRI')
	$('.swiper-box .slide2').attr('href','//youxi.vip.qq.com/m/act/7f554c7057_egame_559945.html?_wv=1&_wwv=4&e_code=435871')
	$('.swiper-box .slide3').attr('href','//www.douyu.com/topic/h5/s11cbH5')
}else{
	$('.swiper-box .slide1').attr('href','//hd.huya.com/huyaDIYzt/12673/pc/index.html?client=auto?e_code=435879&rso=DONGRI')
	$('.swiper-box .slide2').attr('href','//youxi.vip.qq.com/m/act/7f554c7057_egame_559945.html?_wv=1&_wwv=4&e_code=435871')
	$('.swiper-box .slide3').attr('href','//www.douyu.com/topic/s11cb')


// 测导航
$(".topon").on('click', function() {
	$('html,body').animate({
			scrollTop: '0px'
	}, {
			duration: 600,
			easing: "linear"
	});
})
$(window).scroll(function() {
	var w = document.body.clientWidth;
	var top = $('html,body').scrollTop();
//                console.log(top);
	var sTop = [
	$('#cont1').offset().top-200,
	$('#cont2').offset().top-200,
	$('#main5').offset().top-200,
	$('#rule-box').offset().top-200,
	$(document).height()
	];
	for(var i = 0; i < sTop.length-1; i++) {
		if(sTop[i] <= top && top < sTop[i+1]) {
			$(".nav li").removeClass("on").eq(i).addClass("on");
		}
	}
	if(w<1400||top<300){
		$('.nav').fadeOut();
	} else{
		$(".nav").fadeIn();
	}
})

var navcont1H = $('#cont1').offset().top;
var navcont2H = $('#cont2').offset().top;
var navcont3H = $('#main5').offset().top;
var navcont4H = $('#rule-box').offset().top; 
$('.nav li').click(function(){
	var idx = $(this).index();
	if(idx == 0) {
		$('html,body').animate({scrollTop: navcont1H}, 600);
	}
	if(idx == 1){
		$('html,body').animate({scrollTop: navcont2H}, 600);
	}
	if(idx == 2){
		$('html,body').animate({scrollTop: navcont3H}, 600);
	}
	if(idx == 3){
		$('html,body').animate({scrollTop: navcont4H}, 600);
	}
})

//导航

var tabcont1H = $('#main1').offset().top;
var tabcont2H = $('#main2').offset().top;
var tabcont3H = $('#main3').offset().top;
var tabcont4H = $('#main4').offset().top; 
$('.jd-box ul li').click(function(){
	var idx = $(this).index();
	if(idx == 0) {
		$('html,body').animate({scrollTop: tabcont1H}, 600);
	}
	if(idx == 1){
		$('html,body').animate({scrollTop: tabcont2H}, 600);
	}
	if(idx == 2){
		$('html,body').animate({scrollTop: tabcont3H}, 600);
	}
	if(idx == 3){
		$('html,body').animate({scrollTop: tabcont4H}, 600);
	}
})


	$('.btn-tq').hover(function(){
		$('.main3 .box2 span a .fc-box').css('display','inline-block')
	},function(){
		$('.main3 .box2 span a .fc-box').css('display','none')
	})
	
	$('.fc-box img').attr('src','//game.gtimg.cn/images/lol/act/a20210108newseason/fc1.png')
}


//视频组件
function useTxPlay(vid) {
	if (vid) {
		$(".btn-play").css('display','none');
		var mainPlayer = new Txplayer({
			containerId: 'video-container',
			vid: vid,
			width: '100%',
			height: '100%',
			autoplay: true
		});
	}
}
$('.btn-play').click(function(){
	// 视频
	 useTxPlay('');
	//直播
	//playLive();
})

var swiper = new Swiper('.swiper-container', {
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	// initialSlide: 3,
	loop: true,
	autoplay: {
		delay: 2000,
		stopOnLastSlide: false,
		disableOnInteraction: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},pagination: {
		el: '.swiper-pagination',
		clickable :true,
	  },
	on: {
		slideChangeTransitionEnd: function(){	
		$('.swiper-tab li').eq(this.realIndex).addClass('on').siblings().removeClass('on');						
		}
	}
});

fillSkin(0)
// 皮肤列表
$(".skin-tab a").click(function (e) {
	var idx = $(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	fillSkin(idx);
});

// 填充皮肤的数据
function fillSkin(idx){
	$(".skin-tab a").eq(idx).addClass("on").siblings().removeClass("on");
	var html = "";
	var data = skins[idx];
	if(idx==0){
		for (var i = 0; i < data.length; i++) {
			var src = "//game.gtimg.cn/images/lol/act/img/skinloading/" + data[i].id + ".jpg";
			var li = "<li class='skin1'><div class='img-box'><img src="+ src +"></div><p class='name'>"+ data[i].name +"</p></li>";
			html+=li;
		}
	}
	else if(idx == 1){
		for (var i = 0; i < data.length; i++) {
			var src = "//game.gtimg.cn/images/lol/act/img/wardskin/wardHero_" + data[i].id + ".png";
			var li = "<li><div class='img-box'><img src="+ src +"></div><p class='name'>"+ data[i].name +"</p></li>";
			html+=li;
		}
	}
	else if(idx == 2){
		for (var i = 0; i < data.length; i++) {
			var src = "//game.gtimg.cn/images/lol/act/img/chromas/" + data[i].num + "/"+data[i].id+".png";
			var li = "<li><div class='img-box'><img src="+ src +"></div><p class='name'>"+ data[i].name +"</p></li>";
			html+=li;
		}
	}
	else if(idx == 3){
		for (var i = 0; i < data.length; i++) {
			var src = "//game.gtimg.cn/images/lol/act/img/profileicon/"+data[i].id+".png";
			var li = "<li><div class='img-box'><img src="+ src +"></div><p class='name'>"+ data[i].name +"</p></li>";
			html+=li;
		}
	}
	else if(idx == 4){
		for (var i = 0; i < data.length; i++) {
			var src = data[i]['src'];
			var li = "<li><div class='img-box'><img src="+ src +"></div><p class='name'>"+ data[i].name +"</p></li>";
			html+=li;
		}
	}
	else if(idx==5){
		for (var i = 0; i < data.length; i++) {
			var src = data[i]['src'];
			// var hid = sid.substring(0,sid.length-3);
			// var src =  sid;
			var li = "<li><div class='img-box'><img src="+ src +"></div><p class='name'>"+ data[i].name +"</p></li>";
			html+=li;
		}
	}

	$('.skinul').html(html);
}


// 皮肤加英雄渲染
var html1="";
var data1 = skins[6];
for(var i=0;i<skins[6].length;i++){
	var src = "//ossweb-img.qq.com/images/lol/appskin/" + data1[i].id + ".jpg";
	var src1;
	if(i==47){
		var src1="//game.gtimg.cn/images/daoju/app/lol/medium/1-145-9.jpg";
	}else if(i==57){
		src1 = "//game.gtimg.cn/images/daoju/app/lol/medium/1-497-9.jpg";
	}else if(i==58){
		src1="//game.gtimg.cn/images/daoju/app/lol/medium/1-498-9.jpg"
	} else{
		src1 = "//ossweb-img.qq.com/images/lol/appskin/" + data1[i].num + ".jpg";
	}
	var li = "<li><div class='img-box'><img class='pic' src="+ src +"></div><p class='name'>"+ data1[i].name +"</p><p class='phone-box'><span><img src="+src1+" class='pic1'></span></p><a href='javascript:;' class='select'  onclick='PTTSendClick(\"btn\",\"select\",\"确认\");'></a></li>";
	html1+=li;
	
}
$('.heroul').html(html1);



$('.dia-receive1 .select').on('click',function(){
	var idx=$(this).parent().index();
	$(this).parent().addClass('on').siblings('li').removeClass('on');
})

$('.dia-invite .dia-select').on('click',function(){
	var idx=$(this).parent().index();
	$(this).parent().toggleClass('on');
})



/* #t6Hl8#8B9205844C0E2656E32409C7FC4AE07C */