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
	var vid = 'w32255dgegn';
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
			autoplay: true,
			poster:'',
		});
	}
})

var skinlist=[
	{"id":164002,"name":"魔女 卡蜜尔","icon":"icon1"},
	{"id":42008,"name":"电玩上校 库奇","icon":"icon1"},
	{"id":81009,"name":"电玩勇者 伊泽瑞尔","icon":"icon1"},
	{"id":102006,"name":"银河魔装机神 希瓦娜","icon":"icon1"},
	{"id":203002,"name":"银河魔装机神 千珏","icon":"icon1"},
	{"id":105009,"name":"银河魔装机神 菲兹","icon":"icon1"},
	{"id":42018,"name":"柯基 库奇","icon":"icon1"},
	{"id":63007,"name":"苍穹之光 布兰德","icon":"icon1"},
	{"id":83004,"name":"喵里克","icon":"icon1"},
	{"id":107015,"name":"雷喵喵尔","icon":"icon1"},
	{"id":42018,"name":"柯基 库奇（7天）"},
	{"id":105014,"name":"绒毛菲兹（7天）"},
	{"id":83004,"name":"喵里克（7天）"},
	{"id":107015,"name":"雷喵喵尔（7天）"},
	{"id":63007,"name":"苍穹之光 布兰德（7天）"},
	{"id":20008,"name":"千纸双子 努努和威朗普（7天）"},
	{"id":34008,"name":"千纸凤凰 艾尼维亚（7天）"},
	{"id":15016,"name":"腥红之月 希维尔（7天）"},
	{"id":555009,"name":"腥红之月 派克（7天）"},
	{"id":266007,"name":"腥红之月 亚托克斯（7天）"},
	{"id":127004,"name":"魔女 丽桑卓（7天）"},
	{"id":164002,"name":"魔女 卡蜜尔（7天）"},
	{"id":9009,"name":"禁卫机甲 费德提克（7天）"},
	{"id":104018,"name":"禁卫机甲 格雷福斯（7天）"},
	{"id":1011,"name":"银河魔装机神 安妮（7天）"},
	{"id":150013,"name":"银河魔装机神 纳尔（7天）"},
	{"id":60005,"name":"银河魔装机神 伊莉丝（7天）"},
	{"id":76009,"name":"银河魔装机神 奈德丽（7天）"},
	{"id":42008,"name":"电玩上校 库奇（7天）"},
	{"id":81009,"name":"电玩勇者 伊泽瑞尔（7天）"},
	{"id":102006,"name":"银河魔装机神 希瓦娜（7天）"},
	{"id":203002,"name":"银河魔装机神 千珏（7天）"},
	{"id":105009,"name":"银河魔装机神 菲兹（7天）"},
	{"id":163001,"name":"弗雷尔卓德 塔莉垭（7天）"},
	{"id":131003,"name":"无限烈焰 黛安娜（7天）"},
	{"id":16006,"name":"源代码 索拉卡（7天）"},
	{"id":127003,"name":"源代码 丽桑卓（7天）"},
	{"id":161003,"name":"这货不是维克兹（7天）"},
	{"id":223002,"name":"海牛大大 塔姆（7天）"},
	{"id":57006,"name":"喵凯（7天）"},
	{"id":136001,"name":"灰烬领主 奥瑞利安·索尔（7天）"},
	{"id":121003,"name":"死亡绽放 卡兹克（7天）"},
	{"id":266003,"name":"狂鲨 亚托克斯（7天）"},
	{"id":266002,"name":"霸天剑魔 亚托克斯（7天）"},
	
	]

// 皮肤渲染
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









/* #t6Hl8#D5DAABF974E101C37D41391C03842CDC */