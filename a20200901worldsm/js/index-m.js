
$(".nav-box a").click(function (e) { 
    e.preventDefault();
    var idx = $(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $(".content-box").eq(idx).addClass("on").siblings().removeClass("on");
    if (idx==1) {
        mySwiper.init();
    }
    if (idx==2) {
        mySwiper2.init();
    }
});

$(".wonderful-nav a").click(function (e) { 
    e.preventDefault();
    let idx = $(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $(".wonderful-video-box").eq(idx).addClass("on").siblings().removeClass("on");
});


// �ܱ�
var mySwiper = new Swiper('.skin-swiper', {
    init: false,
    // autoplay: true,//��ѡѡ��Զ�����
    centeredSlides: true,
	slidesPerView: 'auto',
	loopedSlides: 3,
    spaceBetween: 42,
    navigation: {
        nextEl: '.skin-swiper .swiper-button-next',
        prevEl: '.skin-swiper .swiper-button-prev',
    },
})

// ����̽��
var mySwiper2 = new Swiper('.gorge-swiper', {
    init: false,
    // autoplay: true,//��ѡѡ��Զ�����
    centeredSlides: true,
	slidesPerView: 'auto',
	loopedSlides: 3,
    spaceBetween: 42,
    navigation: {
        nextEl: '.gorge-swiper .swiper-button-next',
        prevEl: '.gorge-swiper .swiper-button-prev',
    },
})

// ��Ƶ����
var jsonArr=[
    {vid:'z314611yv54'},
    {vid:'z314611yv54'},
    {vid:'z314611yv54'},
    {vid:'z314611yv54'},
    {vid:'z314611yv54'},
    {vid:'z314611yv54'},
];
var musicimg=[
    {img:'ossweb-img/m/music-cover1.png'},
    {img:'ossweb-img/m/cover2.png'},
    {img:'ossweb-img/m/music-cover1.png'},
    {img:'ossweb-img/m/cover2.png'},
    {img:'ossweb-img/m/music-cover1.png'},
    {img:'ossweb-img/m/cover2.png'},
]
// ������Ƶ
var mySwiper3 = new Swiper('.swiper-box .swiper-container', {
    // autoplay: true,//��ѡѡ��Զ�����
    slidesPerView: 4,
    slideToClickedSlide: true,
    observer: true,
    observeParents: true,
    loop: true,
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    navigation: {
        nextEl: '.swiper-box .swiper-button-next',
        prevEl: '.swiper-box .swiper-button-prev',
    },
    on: {
        slideChangeTransitionStart: function(){
            $('.cover-bg img').attr('src',musicimg[this.realIndex].img);
        },
    }
})
$('.swiper-box .swiper-slide').click(function() {
    var idx = $(this).index();
    mySwiper3.slideTo(idx);
    // $('.swiper-box .swiper-slide').removeClass('on').eq(idx).addClass('on');
    // TGDialogS('dia-video');
    

});
var player;
$('.btn-play').click(function(){
    TGDialogS('dia-video');
    player = new Txplayer({
        containerId:"diaVideo-container1",//id
        vid:jsonArr[mySwiper3.realIndex].vid,
        width:'100%',
        height:'100%',
        autoplay: true
    });
    console.log(mySwiper3.realIndex);
})
$('.dia-close').click(function(){
    player.pause();
})

// ͷͼ�жϻ�������
$('.head-box').on('touchstart', function(e) {
    var touch = e.originalEvent,
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
    $('.head-box').on('touchmove', function(e) {
        var spanX = event.changedTouches[0].pageX - startX;
        var spanY = event.changedTouches[0].pageY - startY;
        if(Math.abs(spanX) < Math.abs(spanY)) { //�϶�Ϊˮƽ���򻬶�
            //�϶�Ϊ��ֱ���򻬶�
            if(spanY > 50) { 
                //����
            } else if(spanY < -50) { //����
                $(".head-box").css({
                    "transform":"translateY("+ spanY +"px)",
                });
                $(".main-box").css({
                    "top": spanY +"px",
                })
            }
        }
        });
    $('.head-box').on('touchend', function(e) {
        var spanX = event.changedTouches[0].pageX - startX;
        var spanY = event.changedTouches[0].pageY - startY;
        if(Math.abs(spanX) < Math.abs(spanY)) { //�϶�Ϊˮƽ���򻬶�
            //�϶�Ϊ��ֱ���򻬶�
            if(spanY > 50) { 
                //����
            } else if(spanY < -50) { //����
                $(".head-box").addClass("on");
                $(".head-box").css({
                    "transform": "translateY(-100vh)"
                });
                $(".main-box").addClass("on");
                $(".main-box").css({
                    "top": "-100vh"
                });
            }
        }
    });
});

// ������������
function isIPhoneX(){
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios�ն�
    if (isIOS) {    	
        if (screen.height == 812 && screen.width == 375){
            //��iphoneX
            $('.head-box').css({'background':'url(ossweb-img/m/head-bg.jpg) top center no-repeat'},
            {'background-size':'750px 1650px'}
            )
        }else{
            //����iphoneX
            $('.head-box').css({'background':'url(ossweb-img/m/head-bg1.jpg) top center no-repeat'},
            {'background-size':'750px 1334px'}
            )
        } 
    }
}

isIPhoneX();













