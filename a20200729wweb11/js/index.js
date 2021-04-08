var eventUtil = {
    init: function () {
        eventUtil.liveSwiper();
        eventUtil.popularSwiper();
        eventUtil.previewSwiper();
        eventUtil.videoSwiper();
        eventUtil.featureSwiper();
        eventUtil.navDia();
        eventUtil.codeDia();
        eventUtil.videoDia();
    },
    // 直播
    liveSwiper: function () {
        var swiper = new Swiper('.swiper-live .swiper-container', {
            grabCursor: true,
            slidesPerView: 'auto',
            // initialSlide: 3,
            // loop: true,
            pagination: {
                el: '.swiper-live .swiper-pagination',
                type : 'progressbar',
                progressbarOpposite: true,
                // clickable :true,
            },
            on: {
                slideChangeTransitionStart:function(){
                    var t = "0" + (swiper.activeIndex + 1);
                    $(".swiper-live .now").text(t)
                }
            },
        });
        $(".swiper-live .total").text("0" + swiper.slides.length);
    },
    // 人气主播
    popularSwiper: function () {
        var swiper1 = new Swiper('.swiper-popular .swiper-container', {
            grabCursor: true,
            slidesPerView: 4,
            slidesPerGroup: 4,
            loop: true,
            navigation: {
                nextEl: '.swiper-popular .swiper-button-next',
                prevEl: '.swiper-popular .swiper-button-prev',
            },
        });
    },
    // 直播预告
    previewSwiper: function () {
        var swiper2 = new Swiper('.swiper-preview .swiper-container', {
            grabCursor: true,
            slidesPerView: 2,
            slidesPerGroup: 2,
            // initialSlide: 3,
            loop: true,
            navigation: {
                nextEl: '.swiper-preview .swiper-button-next',
                prevEl: '.swiper-preview .swiper-button-prev',
            },
        });
    },
    // 游戏视频
    videoSwiper: function () {
        var swiper3 = new Swiper('.swiper-video .swiper-container', {
            grabCursor: true,
            // initialSlide: 3,
            // loop: true,
            // autoplay: {
            //     disableOnInteraction: false,
            //   },
            navigation: {
                nextEl: '.swiper-video .swiper-button-next',
                prevEl: '.swiper-video .swiper-button-prev',
            },
            runCallbacksOnInit : true, 
            on: {
                slideChangeTransitionStart:function(){
                    $('.cont2 li').eq(this.activeIndex).addClass('on').siblings('li').removeClass('on');	
                    var t = "0" + (swiper3.activeIndex + 1);
                    $(".swiper-video .now").text(t)
                }
            },
        });
        $(".swiper-video .total").text("0" + swiper3.slides.length);
        $('.cont2 li').click(function(){
            var idx=$(this).index();
            $(this).addClass('on').siblings('li').removeClass('on');
            swiper3.slideTo(idx)
        })
    },
    // 游戏特色
    featureSwiper: function () {
        var swiper4 = new Swiper('.swiper-feature .swiper-container', {
            effect: 'coverflow',
            loop:true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            coverflowEffect: {
                rotate: 0,
                stretch: 10,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            },
            loop: true,
            pagination: {
                el: '.swiper-feature .swiper-pagination',
                clickable :true,
            },
            navigation: {
                nextEl: '.swiper-feature .swiper-button-next',
                prevEl: '.swiper-feature .swiper-button-prev',
            }
        });
    },
    // 跳转弹窗
    navDia: function () {
        $('.nav').click(function(){
            $('#dia_nav').slideDown(500,function(){
                $('#dia_nav .dia-con').fadeIn(800);
            })
        })
        $('#dia_nav').click(function(){
            $(this).slideUp(500,function(){
            });
        })
    },
    // 二维码弹窗
    codeDia: function () {
        $('.wx').click(function(){
            $('#dia_code').slideDown(500,"",function(){
                $('#dia_code .dia-con').fadeIn(600);
                $('#dia_code .btn-close').delay(200).fadeIn(1000).css('transform','rotateZ(180deg)')
            })
        })
        $('#dia_code .btn-close').click(function(){
            $('#dia_code .btn-close').fadeOut(1000).css('transform','rotateZ(0)');
            $('#dia_code .dia-con').fadeOut(600);
            $('#dia_code').delay(200).slideUp(500)
        })
    
    }
}
eventUtil.init();






