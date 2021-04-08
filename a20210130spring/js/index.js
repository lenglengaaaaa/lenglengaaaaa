// 视频弹窗
//视频组件
function useTxPlay(vid) {
	if (vid) {
		// $(".btn-play").css('display','none');
		var mainPlayer = new Txplayer({
			containerId: 'topVideo',
			vid: vid,
			width: '100%',
			height: '100%',
			autoplay: true
		});
	}
	musicStop();
}

function useTxPlay1(vid) {
	TGDialogS('dialogVideo1');
	if (vid) {
		// $(".btn-play").css('display','none');
		var mainPlayer = new Txplayer({
			containerId: 'fightVideo',
			vid: vid,
			width: '100%',
			height: '100%',
			autoplay: true
		});
	}
	musicStop();
}
// 页面打开直接弹出视频弹窗
var videoVid=['p0833gqwz7f','j3219rm0eas','p0833gqwz7f','j3219rm0eas']
var random= Math.floor(Math.random()*4);
TGDialogS('dialogVideo');
$('.dia-play').on('click',function(){
	$(this).hide();
	useTxPlay(videoVid[random]);
})


// 点击播放按钮弹出视频弹窗
$('.btn-play').on('click',function(){
	useTxPlay1('p0833gqwz7f');
})

// 视频弹窗关闭
$('.dia-VideoClose').on('click',function(){
	$('#topVideo').empty();
	$('#fightVideo').empty();
	closeDialog();
    musicStart()
})

// 日历
var mySwiper = new Swiper ('.swiper-box .swiper-container', {
    slidesPerView: "auto",

})


// 奖池弹窗 皮肤加英雄渲染
var html1="";
var data1 = skins[0];
for(var i=0;i<skins[0].length;i++){
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
	var li = "<li><div class='img-box'><img class='pic' src="+ src +"></div><p class='name'>"+ data1[i].name +"</p><p class='phone-box'><span><img src="+src1+" class='pic1'></span></p></li>";
	html1+=li;
	
}
$('.heroul').html(html1);