TGshare({
	iconSize : 16, // ����ͼ��Ĵ�С, 16Ϊ 16px X 16px��24Ϊ 24px X 24px
	snsModule : ['qq', 'qzone', 'sina'], // �������� wechat, qq, qzone, weibo, pengyou, sina, douban, kaixin, renren
	title : '������ǰ��2020Ӣ������ȫ���ܾ���', // ��Ҫ�Զ������ʱ���õ���Ĭ����ȡҳ�����
	url : '', // ��Ҫ�Զ���ҳ��urlʱ���õ���Ĭ����ȡҳ��url
	picUrl : 'https://game.gtimg.cn/images/lpl/act/a20200801message/share' + Math.floor(Math.random() * 4) + '.jpg', // ��Ҫ�Զ�������ͼƬ���õ���Ĭ����ȡҳ���е�һ��ͼƬ
	snsID :'tg-sns', // �Զ���SNS����ID
	isWindow : true, // ��������ͣ�trueΪ�����򿪣�falseΪ��ҳ��򿪣�Ĭ��Ϊ������
	tcss : true // �Ƿ���ӵ������trueΪ��ӣ�falseΪ����ӣ�Ĭ�����
});

// ���ƶ���
$('.home-tbox').css({'pointer-events':'none','opacity':'1'});
$('.act-img-box').addClass('card-ready');
for (var i=0; i<$('.act-img-box').length; i++) {(function(k,v) {
	v.find('img').css({'animation-delay':140*k+'ms'});
	v.addClass('card-play');
})(i,$('.act-img-box').eq(i));}
$('.act-img-box').eq(9).one('animationend', function() {
	$('.home-tbox').css({'pointer-events':''});
	$('.act-img-box').removeClass('card-ready card-play');
	$('.act-img-box img').css({'animation-delay':''});
});

$('.act-img-box').on('animationstart',function() {$(this)[0].canAni = false;});
$('.act-img-box').on('animationend',function() {
	$(this)[0].canAni = true;
	if ($(this)[0].mOver===false && $(this).hasClass('on')) $(this).removeClass('on').addClass('off');
	else if ($(this)[0].mOver===true && !$(this).hasClass('on')) $(this).removeClass('off').addClass('on');
});
$('.act-img-box').on('mouseenter',function() {
	$(this)[0].mOver = true;
	if ($(this)[0].canAni && (!$(this).hasClass('on') || $(this).hasClass('off'))) $(this).removeClass('off').addClass('on');
});
$('.act-img-box').on('mouseleave',function() {
	$(this)[0].mOver = false;
	if ($(this)[0].canAni && !$(this).hasClass('off')) $(this).removeClass('on').addClass('off');
});


// ���ֲ���
var $audio = $('#audio'), audioIsPlaying = false, audioNeedPlay = false;
$audio.html('<source src="//game.gtimg.cn/images/lpl/act/a20200801message/music.mp3" type="audio/mpeg">');
var promise = $audio[0].play();
if (promise !== undefined) {
  promise.then(function() {
    // Autoplay started!
  }).catch(function(error) {
    // Autoplay was prevented.
    // Show a "Play" button so that user can start playback.
  });
}
$audio.on('play',function() { $('.btn-music').addClass('on'); audioIsPlaying=true; });
$audio.on('pause',function() { $('.btn-music').removeClass('on'); audioIsPlaying=false });
$('.btn-music').on('click',function() {
	if (!audioIsPlaying) $audio[0].play();
	else $audio[0].pause();
});

// ��Ƶ����
var diaVideo = $('#video-container')[0];
$('.btn-pvideo').on('click',function() { playDialogVideo('n312723e75q'); });
$('.btn-play-icon').on('click',function() { playDialogVideo('u3127jy03dx'); });
$('.btn-ckxq').on('click',function() { playDialogVideo('l312721wruw'); });

// ��Ƶ��������
function playDialogVideo(vid) {
	// ��ͣ����
	$audio[0].pause();
	// �رյ������Ƿ���Ҫ���²��ű�������
	if (audioIsPlaying) audioNeedPlay = true; else audioNeedPlay = false;
	TGDialogS('dialog-video');
	if (!window.diaPlayer) {
		window.diaPlayer = new Txplayer({
			containerId: 'video-container',
			vid: vid,
			width: '1200',
			height: '675',
			autoplay: true
		});
	} else {
		diaPlayer.play(vid);
	}
}

// ������
function TGDialogS(e){
	// ����milo������dialog���
	need("biz.dialog",function(Dialog){
		Dialog.show({
			id:e,
			bgcolor:'#000', //���������֡�����ɫ����ʽΪ"#FF6600"�����޸ģ�Ĭ��Ϊ"#fff"
			opacity:50, //���������֡���͸���ȣ���ʽΪ��10-100������ѡ
            onCloseCallback: function() {
                // ��ͣ��Ƶ
                if (typeof diaPlayer != 'undefined') {
					diaPlayer.pause();
					if (audioNeedPlay) $audio[0].play();
				}
            }
		});
	});
}
function closeDialog(){
	// ����milo������dialog���
	need("biz.dialog",function(Dialog){
		Dialog.hide();
	});
}

// ��������
AOS.init({
	duration: 500
});

// var headIsHide = false;
// $(window).on('scroll',function() {
// 	var headH = $('.home-tbox').height()+42;
// 	if (!headIsHide && $(this).scrollTop()>headH) {
// 		headIsHide = true;
// 	}
// 	if (headIsHide && $(this).scrollTop()<=headH) $('html,body').animate({'scrollTop': headH+'px'},0);
// });
$('.btn-home').on('click',function() {
	// headIsHide = false;
	$('html,body').animate({'scrollTop': '0px'},500);
});


// ��������
// �����л�
$('.btn-tc-prev').on('click',function(){
	tcPosterSwitch(-1);
});
$('.btn-tc-next').on('click',function(){
	tcPosterSwitch(1);
});
function tcPosterSwitch(step) {
	var curr = $('.poster-item.on').index(),
		len = $('.poster-item').length,
		aim = curr+step;
	if (aim<0) aim = len+aim;
	if (aim>=len) aim = aim-len;
	$('.poster-item').removeClass('on').css({'z-index':''});
	$('.poster-item').eq(aim).addClass('on').css({'z-index':'1'});
}
// ��ť��
$('.btn-show-poster').on('click', function() {
	var idx = $('.btn-show-poster').index(this);
	console.log(idx)
	$('.poster-item').removeClass('on').css({'z-index':''});
	$('.poster-item').eq(idx).addClass('on').css({'z-index':'1'});
	TGDialogS('dialog-poster');
});

function delayCookie(){
	var cookieUin = milo.cookie.get('uin', '');
	if (cookieUin) {
			milo.cookie.set('uin_cookie', cookieUin, 365 * 24 * 60 * 60, 'qq.com', '/', false);
			milo.cookie.set('ied_qq', cookieUin, 365 * 24 * 60 * 60, 'qq.com', '/', false);
	}
}
setTimeout(delayCookie,2000);/* #t6Hl8#64C6B8F9196678752A9D560DB4D63F00 */