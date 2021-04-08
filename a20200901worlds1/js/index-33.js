$(".nav-box a").click(function(e) {
    e.preventDefault();
    var idx = $(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $(".content-box").eq(idx).addClass("on").siblings().removeClass("on");
    if (idx == 1) {
        mySwiper.init();
    }
    if (idx == 2) {
        mySwiper2.init();
    }
});

$(".wonderful-nav").on('click', 'a', function(e) {
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
});
var jsonArr = [{
        'vid': 'a3152tk7oyj',
        'title': '2020 Ӣ������ȫ���ܾ�����������������ǰ��MV',
        'img': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_2_m.jpg'
    },
    {
        'vid': 'p3144mi7gst',
        'title': '2020ȫ���ܾ���������Ʒ������Ƭ�����ּ�Ӣ�ۡ�',
        'img': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_3_m.jpg'
    },
    {
        'vid': 'n315204fk2g',
        'title': '׼���ÿ�ȫ���ܾ�������',
        'img': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_4_m.jpg'
    },
    {
        'vid': '',
        'title': 'ʲô��ȫ���ܾ�����',
        'img': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_1_m.jpg'
    }
];
shuffle(jsonArr);
//������Ƶ
var musicVideo = '';
jsonArr.forEach(function(value, index) {
    musicVideo += `<div class="swiper-slide">
                                <div><img src="${value.img}" alt=""></div>
                        </div>`;
});
$("#music_box").html(musicVideo);
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
        slideChangeTransitionStart: function() {
            if (this.realIndex < jsonArr.length) {
                $('.cover-bg img').attr('src', jsonArr[this.realIndex].img);
                $('.content5 h3').html(jsonArr[this.realIndex].title);
            } else {
                $('.cover-bg img').attr('src', jsonArr[0].img);
                $('.content5 h3').html(jsonArr[0].title);
            }
        },
    }
});

function shuffle(a) {
    var len = a.length;
    for (var i = 0; i < len - 1; i++) {
        var index = parseInt(Math.random() * (len - i));
        var temp = a[index];
        a[index] = a[len - i - 1];
        a[len - i - 1] = temp;
    }
    return a
};


$('.swiper-box .swiper-slide').click(function() {
    var idx = $(this).index();
    mySwiper3.slideTo(idx);
    // $('.swiper-box .swiper-slide').removeClass('on').eq(idx).addClass('on');
    // TGDialogS('dia-video');
});

var player;
$('body').on('click', '.btn-play', function() {
    var vid = $(this).data('play') == 0 ? (jsonArr[mySwiper3.realIndex] ? jsonArr[mySwiper3.realIndex].vid : jsonArr[0].vid) : $(this).data('video');
    if (!vid) {
        alert('�����ڴ�');
        return;
    }
    TGDialogS('dia-video');
    player = new Txplayer({
        containerId: "diaVideo-container1", //id
        vid: vid,
        width: '100%',
        height: '100%',
        autoplay: true
    });
})
$('.dia-close').click(function() {
    player.pause();
})

// // ͷͼ�жϻ�������
// $('.head-box').on('touchstart', function(e) {
//     var touch = e.originalEvent,
//         startX = event.touches[0].pageX;
//     startY = event.touches[0].pageY;
//     $('.head-box').on('touchmove', function(e) {
//         var spanX = event.changedTouches[0].pageX - startX;
//         var spanY = event.changedTouches[0].pageY - startY;
//         if (Math.abs(spanX) < Math.abs(spanY)) { //�϶�Ϊˮƽ���򻬶�
//             //�϶�Ϊ��ֱ���򻬶�
//             if (spanY > 50) {
//                 //����
//             } else if (spanY < -50) { //����
//                 $(".head-box").css({
//                     "transform": "translateY(" + spanY + "px)",
//                 });
//                 $(".main-box").css({
//                     "top": spanY + "px",
//                 })
//             }
//         }
//     });
//     $('.head-box').on('touchend', function(e) {
//         var spanX = event.changedTouches[0].pageX - startX;
//         var spanY = event.changedTouches[0].pageY - startY;
//         if (Math.abs(spanX) < Math.abs(spanY)) { //�϶�Ϊˮƽ���򻬶�
//             //�϶�Ϊ��ֱ���򻬶�
//             if (spanY > 50) {
//                 //����
//             } else if (spanY < -50) { //����
//                 $(".head-box").addClass("on");
//                 $(".head-box").css({
//                     "transform": "translateY(-100vh)"
//                 });
//                 $(".main-box").addClass("on");
//                 $(".main-box").css({
//                     "top": "-100vh"
//                 });
//             }
//         }
//     });
// });

// // �ж����ݻ���
// $('.main-box').on('touchstart', function(e){
//     e.stopPropagation();
//     e.preventDefault();
// })

// $('.wrap').on('touchmove', function(e){
//     e.stopPropagation();
//     e.preventDefault();
// })
$("body").on("touchstart", function(e) {
    // ��������e.preventDefault();
    ��������startX = e.originalEvent.changedTouches[0].pageX,
    ��������startY = e.originalEvent.changedTouches[0].pageY;

    ����});


$("body").on("touchend", function(e) {
    // ��������e.preventDefault();
    moveEndX = e.originalEvent.changedTouches[0].pageX,
    moveEndY = e.originalEvent.changedTouches[0].pageY,
    X = moveEndX - startX,
    Y = moveEndY - startY;
    var top=$('.content-box.on').offset().top;
    // alert(top)
    if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
console.log(top)
        // �ϵ���
        // ������������alert("top 2 bottom");
        if(top>=-200){
        $(".head-box").css({
            "transform": "translateY(0)",
            });
            $(".main-box").css({
            "top": '0',
        })
    }
    }
    else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
        // �µ���
        // ������������alert("bottom 2 top");
        
            $(".head-box").css({
            "transform": "translateY(-100vh)",
            });
            $(".main-box").css({
            "top": '-100vh',
            })
        }

��������
});



// $('.main-box').on('touchstart', function(e) {
//     var touch = e.originalEvent,
//         startX = event.touches[0].pageX;
//         startY = event.touches[0].pageY;
//     $('.main-box').on('touchmove', function(e) {
//         var spanX = event.changedTouches[0].pageX - startX;
//         var spanY = event.changedTouches[0].pageY - startY;
//         if(Math.abs(spanX) < Math.abs(spanY)) { //�϶�Ϊˮƽ���򻬶�
//             //�϶�Ϊ��ֱ���򻬶�
//             if(spanY > 50) { 
//                 //����
//                 $(".head-box").css({
//                     "transform":"translateY("+ spanY +"px)",
//                 });
//                 $(".main-box").css({
//                     "top": spanY +"px",
//                 })
//             } else if(spanY < -50) { //����
//             }
//         }
//         });
//     $('.main-box').on('touchend', function(e) {
//         var spanX = event.changedTouches[0].pageX - startX;
//         var spanY = event.changedTouches[0].pageY - startY;
//         if(Math.abs(spanX) < Math.abs(spanY)) { //�϶�Ϊˮƽ���򻬶�
//             //�϶�Ϊ��ֱ���򻬶�
//             if(spanY > 50) { 
//                 //����
//                 $(".head-box").addClass("on");
//                 $(".head-box").css({
//                     "transform": "translateY(0)"
//                 });
//                 $(".main-box").removeClass("on");
//                 $(".main-box").css({
//                     "top": "100vh"
//                 });
//             } else if(spanY < -50) { //����
//             }
//         }
//     });
// });

// ������������
// function isIPhoneX() {
//     var u = navigator.userAgent;
//     var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios�ն�
//     if (isIOS) {
//         if (screen.height == 812 && screen.width == 375) {
//             //��iphoneX
//             $('.head-box').css({ 'background': 'url(//game.gtimg.cn/images/lpl/act/a20200901worlds/m/head-bg.jpg) top center no-repeat' }, { 'background-size': '750px 1650px' })
//         } else {
//             //����iphoneX
//             $('.head-box').css({ 'background': 'url(//game.gtimg.cn/images/lpl/act/a20200901worlds/m/head-bg1.jpg) top center no-repeat' }, { 'background-size': '750px 1334px' })
//         }
//     }
// }

// isIPhoneX();














/* #t6Hl8#C4C0B5D6ABB4C988F46C620098B58E81 */