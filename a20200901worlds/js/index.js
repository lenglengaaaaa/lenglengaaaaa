// function setScrollLength(targetId, length) {
//     EventUtil1.addEventHandler(document.getElementById(targetId), "mousewheel", function (e) {
//         if (e.stopPropagation) {
//             e.stopPropagation();
//         } else {
//             e.cancelBubble = true;
//         }
//         if (e.preventDefault) {
//             e.preventDefault();
//         } else {
//             e.returnValue = false;
//         }
//         let nowScroll = document.getElementById(targetId).scrollTop;
//         let top;
//         if (e.wheelDeltaY < 0) {
//             top = nowScroll + length;
//         } else if (e.wheelDeltaY > 0) {
//             top = nowScroll - length;
//         }
//         $("#" + targetId).animate({scrollTop: top}, 0);
//     })
// }

// EventUtil1 = {
//     addEventHandler(target, event, handler) {
//         if (target.addEventListener) {
//             target.addEventListener(event, handler, false);
//         } else if (target.attachEvent) {
//             target.attachEvent("on" + event, handler);
//         } else {
//             target["on" + event] = handler;
//         }
//     },

//     removeEventHandler(target, event, handler) {
//         if (target.removeEventListener) {
//             target.removeEventListener(event, handler, false);
//         } else if (target.detachEvent) {
//             target.detachEvent("on" + event, handler);
//         } else {
//             target["on" + event] = null;
//         }
//     }
// }


// 隐藏头部
var cont1 = $('.cont1');
var headHeight = $('.head').height();
var bodyHeight = document.documentElement.clientHeight;
// 到cont1
function scrollToHead() {
    $('html,body').animate({
        scrollTop: 50
    }, 500);
};

$('html,body').animate({ 'scrollTop': '0' }, 500, 'linear', function() {
    // $('.header').css({ 'height': '1080px', 'overflow': 'hidden' });
    setTimeout(function() {
        $(window).on('scroll', function() {
            // console.log(document.documentElement.scrollTop)
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 || window.pageYOffset > 100) {
                // document.body.scrollTop=100;
                // document.documentElement.scrollTop=100;
                // window.pageYOffset=100;
            }
            hideSideBar();
            // var c1Top = $('#cont1')[0].getClientRects()[0].top;
            var sTop = $(window).scrollTop();
            // if (c1Top <= 0 && $('.header').attr('data-is-hided') !== '1') {
            //  $ ('.header').attr({'data-is-hided':'1'}).animate({ 'height': '0px' }, 800);
            //  $('html,body').animate({'scrollTop': (sTop-1080+1)+'px'}, 800);
            // }
            var num1, num2, num3, num4;
            num1 = $('#cont1').offset().top;
            num2 = $('#cont3').offset().top - 200;
            num3 = $('#cont4').offset().top - 200;
            // num4 = $('#cont6').offset().top - 500;
            // if(sTop>(headHeight+42-bodyHeight)){
            if (sTop > 10) {


            }
            // $('html,body').animate({
            //  sTop: bodyHeight
            // }, 500);
            if(sTop>0){
             $('.nav-box .btn').removeClass('on').eq(0).addClass('on');
             // $('.header').css({'visibility':'hidden'});
             // $('.header').hide();
             // $('html,body').animate({
             //  sTop: 42
             // }, 800);
            }
            if (sTop > num1) {
                $('.nav-box .btn').removeClass('on').eq(1).addClass('on');
            }
            if (sTop > num2) {
                $('.nav-box .btn').removeClass('on').eq(2).addClass('on');
            }
            if (sTop > num3) {
                $('.nav-box .btn').removeClass('on').eq(3).addClass('on');
            }
        });
    }, 500)
}, 500);
// 隐藏导航栏
function hideSideBar() {
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    var w = document.body.clientWidth;
    //  console.log(t,w)
    if (w > 2125) {
        $('.nav-box').fadeIn();
    } else if (w < 1430) {
        $('.nav-box').fadeOut();
    } else {
        $('.nav-box').fadeIn();
    }
}

// 收起导航栏
$('.nav-box .btn-collection').click(function() {
    $('.navbar').hide();
    $('.nav-box').css({ 'width': '39px', 'height': '149px', 'background': 'none', 'right': '0' });
    $('.nav-box .btn-expand').css('display', 'block');
})
// 展开导航栏
$('.nav-box .btn-expand').click(function() {
    $('.navbar').show();
    $('.nav-box').css({ 'width': '200px', 'height': '692px', 'background': 'url(//game.gtimg.cn/images/lpl/act/a20200901worlds/nav-bg.png) no-repeat', 'right': '18px' });
    $(this).css('display', 'none');
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

var eventUtil = {
    toysSwiperLock: false,
    citySwiperLock: false,
    musicSwiperLock: false,
    init: function() {
        // eventUtil.headSwiper();//首图与第二屏切换
        // eventUtil.navFun();
        eventUtil.gameList(); //游戏周边
        eventUtil.cont1Tab(); //赛事直播模块切换
        // eventUtil.liveVideo();//赛事直播
        // eventUtil.toysSwiper();//游戏周边
        // eventUtil.citySwiper();//举办城市
        eventUtil.activeHover(); //hover效果
        // eventUtil.musicSwiper(); //音乐与视频
        eventUtil.cont3Tab(); //赛事进度切换
        eventUtil.daySwiper(); //小组赛天数切换
        eventUtil.cont4Tab(); //精彩节目切换
        eventUtil.cont5Swiper(); //战队和解说切换
        eventUtil.cont6Swiper(); //冠军年份切换
        // eventUtil.carousel();//跑马灯
    },
    // 游戏周边 随机
    gameList: function() {
        var html = '';
        var jsonArr = [{
                'title': 'LPL出征鹅手办',
                'img': '//game.gtimg.cn/images/lpl/act/a20200901worlds/cont1-part2-product1.png',
                'link': '//lolriotmall.qq.com/act/a20200830lplxqq/index.html'
            },
            {
                'title': '2020 全球总决赛 LPL出征服',
                'img': '//game.gtimg.cn/images/lpl/act/a20200901worlds/cont1-part2-product2.png',
                'link': '//lolriotmall.qq.com/act/a20200830lplfight/index.html'
            },
            {
                'title': 'LPL出征鹅手办套装',
                'img': '//game.gtimg.cn/images/lpl/act/a20200901worlds/cont1-part2-product3.png',
                'link': '//lolriotmall.qq.com/index.shtml'
            }
        ];
        shuffle(jsonArr);

        jsonArr.forEach(function(value, index) {
            html += `<a class="swiper-slide" href="${value.link}" target="_blank" onclick="PTTSendClick('btn','toys-slide1','toys-slide1');">
                                            <img src="${value.img}" alt="">
                                            <em>${value.title}</em>
                    </a>`;
        });
        $(".swiper-product .swiper-wrapper").html(html);
    },
    headSwiper: function() {
        //首图与第二屏切换
        var mySwiper = new Swiper('.headSwiper.swiper-container', {
            resistanceRatio: 0,
            direction: 'vertical',
            slidesPerView: 'auto',
            // autoHeight:true,
            speed: 500,
            mousewheel: {
                releaseOnEdges: true,
                forceToAxis: true,
                invert: true,
            },
            on: {
                slideChangeTransitionStart: function() {
                    if ($('.cont1').hasClass('swiper-slide-active')) {
                        mySwiper.removeSlide(0);
                        $('.nav-box').fadeIn();
                    } else {
                        // mySwiper.addSlide(0);
                    }
                }
            }
        })
        $('.btn-slide').click(function() {
            mySwiper.slideTo(1);
        })
    },
    cont1Tab: function() {
        $('.tabbox a').on('click', function() {
            // toysSwiper();
            // eventUtil.init.eventUtil.toysSwiper();
            var idx = $('.tabbox a').index(this);
            $('.tabbox a').eq(idx).addClass('on').siblings('.tabbox a').removeClass('on');
            $('.tab-box').eq(idx).css('display', 'block').siblings('.tab-box').css('display', 'none');
            if (idx != 0) {
                $('.top-bg1').css('background', 'url(//game.gtimg.cn/images/lpl/act/a20200901worlds/part1-bg1.png) no-repeat')
                // eventUtil.liveVideo('vid',true);
                // mainPlayer.pause();
            } else if (idx === 0) {
                $('.top-bg1').css('background', 'url(//game.gtimg.cn/images/lpl/act/a20200901worlds/part1-bg.png) no-repeat')
            }
            if (idx === 1 && !eventUtil.toysSwiperLock) {
                eventUtil.toysSwiper(); //游戏周边
                eventUtil.toysSwiperLock = true
            } else if (idx == 2 && !eventUtil.citySwiperLock) {
                eventUtil.citySwiper(); //举办城市
                eventUtil.citySwiperLock = true
            } else if (idx == 4 && !eventUtil.musicSwiperLock) {
                eventUtil.musicSwiper(); //音乐与视频
                eventUtil.musicSwiperLock = true
            }
        })
    },
    // 赛事直播
    liveVideo: function() {
        //视频组件
        var mainPlayer;

        function useTxPlay(vid) {
            $(".btn-golive").css('display', 'none');
            mainPlayer = new Txplayer({
                containerId: 'liveCon',
                vid: vid,
                width: '100%',
                height: '100%',
                autoplay: true
            });
        }

        // 直播
        // 有直播则直接播放，不用点击btn-golive按钮
        function playLive() {
            $(".btn-golive").css('display', 'none');
            var liveHost = '';
            var isH5 = /(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(navigator.userAgent);
            if (isH5) {
                liveHost = '//lpl.qq.com/es/live.shtml?tag=899617728';
            } else {
                liveHost = '//lpl.qq.com/es/live.shtml?tag=899617728';
            }

            $("<iframe width='100%' height='100%' id='liveIframe' name='liveIframe' src=" + liveHost + " frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true' autoPlay='true'></iframe>").appendTo('#liveCon');

        }


        $('.btn-golive').click(function() {
            $(this).css('display', 'none');
            // 视频
            useTxPlay('z3148memem9');
            console.log(mainPlayer)
            //直播
            // playLive();
        })
    },
    // 游戏周边
    toysSwiper: function() {
        var toys1 = new Swiper('.swiper-product', {
            initialSlide: 0,
            // resistanceRatio : 0,
            slidesPerView: 'auto',
            // spaceBetween : 100,
            slideToClickedSlide: true,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.part2-btn-next',
                prevEl: '.part2-btn-prev'
            },
            on: {
                init: function() {}
            }
        });
        var toys2 = new Swiper('.swiper-skin', {
            initialSlide: 0,
            // resistanceRatio : 0,
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 50,
            slideToClickedSlide: true,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-skin .swiper-pagination',
                clickable: true,
            },
            on: {
                init: function() {}
            }
        });
        if (toys2.slides.length <= 3) {
            toys2.destroy();
            $('.swiper-skin .swiper-pagination').hide();
        } else {
            $('.swiper-skin .swiper-pagination').show();
        }
    },
    // 举办城市
    citySwiper: function() {
        // var city1 = new Swiper('.swiper-active1', {
        //     initialSlide: 0,
        //     // resistanceRatio : 0,
        //     slidesPerView: 'auto',
        //     loop: true,
        //     spaceBetween: 50,
        //     slideToClickedSlide: true,
        //     observer: true,
        //     observeParents: true,
        //     autoplay: {
        //         delay: 3000,
        //         disableOnInteraction: false,
        //     },
        //     pagination: {
        //         el: '.swiper-active1 .swiper-pagination',
        //         clickable: true,
        //     },
        //     on: {
        //         init: function() {}
        //     }
        // });
        // if (city1.slides.length <= 3) {
        //     city1.destroy();
        //     $('.swiper-active1  .swiper-pagination').hide();
        // } else {
        //     $('.swiper-active1  .swiper-pagination').show();
        // }
        var city = new Swiper('.swiper-active', {
            initialSlide: 0,
            // resistanceRatio : 0,
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 50,
            slideToClickedSlide: true,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-active .swiper-pagination',
                clickable: true,
            },
            on: {
                init: function() {}
            }
        });
        if (city.slides.length <= 3) {
            city.destroy();
            $('.swiper-active  .swiper-pagination').hide();
        } else {
            $('.swiper-active  .swiper-pagination').show();
        }
        $('.main-city .btn-expand').click(function() {
            $(this).css('display', 'none');
            $('.main-city .btn-collection').css('display', 'block');
            $('.table-data').removeClass('on');
            $('.introduced').css('display', 'none');
            $('.content').css('display', 'block');
        })
        $('.main-city .btn-collection').click(function() {
            $(this).css('display', 'none');
            $('.main-city .btn-expand').css('display', 'block');
            $('.table-data').addClass('on');
            $('.introduced').css('display', 'block');
            $('.content').css('display', 'none');
        })
    },
    //hover效果
    activeHover: function() {
        // $('.main-active .left>div1').on('mouseover', function(e) {
        $('.main-active .left .div1').on('mouseover', function(e) {
            $(this).children('a').css({ 'border': '3px solid #43e9fb' });
            $(this).children('.hover-box').css('display', 'block');
            $('.main-active .right').css('display', 'none');
        });
        // $('.main-active .left>div1').on('mouseout', function(e) {
        $('.main-active .left .div1').on('mouseout', function(e) {
            $(this).children('a').css({ 'border': 'none' });
            $(this).children('.hover-box').css('display', 'none');
            $('.main-active .right').css('display', 'block');
        });
        // $('.main-active .left').on('mouseover', function(e) {
        //     $('.main-active .right').css('display', 'none');
        // });
        // $('.main-active .left').on('mouseout', function(e) {
        //     $('.main-active .right').css('display', 'block');
        // });
        // $('.main-active .right>div').on('mouseover', function(e) {
        //     $(this).children('a').css({ 'border': '3px solid #43e9fb' });
        //     $(this).children('.hover-box').css('display', 'block');
        //     $('.main-active .left').css('display', 'none');
        // });
        // $('.main-active .right>div').on('mouseout', function(e) {
        //     $(this).children('a').css({ 'border': 'none' });
        //     $(this).children('.hover-box').css('display', 'none');
        //     $('.main-active .left').css('display', 'block');
        // });
        // $('.main-active .right').on('mouseover', function(e) {
        //     $('.main-active .left').css('display', 'none');
        // });
        // $('.main-active .right').on('mouseout', function(e) {
        //     $('.main-active .left').css('display', 'block');
        // });
        // $('.main-music').on('mouseover', '.link3', function(e) {
        //     $(this).children('a').css({ 'border': '3px solid #43e9fb' });
        //     $(this).children('.hover-box').css('display', 'block');
        //     $('.main-music .right').css('display', 'none');
        // });
        // $('.main-music').on('mouseout', '.link3', function(e) {
        //     $(this).children('a').css({ 'border': 'none' });
        //     $(this).children('.hover-box').css('display', 'none');
        //     $('.main-music .right').css('display', 'block');
        // });
        $('#urbanExplorat_2').on('mouseover', '.publicity2', function(e) {
            $(this).css({ 'border': '3px solid #43e9fb' });
            $(this).children('.hover-box').css('display', 'block');
            $('.swiper-active').hide();
        });
        $('#urbanExplorat_2').on('mouseout', '.publicity2', function(e) {
            $(this).css({ 'border': 'none' });
            $(this).children('.hover-box').css('display', 'none');
            $('.swiper-active').show();
        });
    },
    // 音乐与视频
    musicSwiper: function() {
        var html = '';
        var htmlSmall = '';
        var jsonArr = [{
                'vid': 'a3152tk7oyj',
                'title': '2020 英雄联盟全球总决赛主题曲《所向无前》MV',
                'img': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_2.jpg',
                'smallImg': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_2_m.jpg'
            },
            {
                'vid': 'p3144mi7gst',
                'title': '2020全球总决赛东道主品牌宣传片《出手即英雄》',
                'img': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_3.jpg',
                'smallImg': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_3_m.jpg'
            },
            {
                'vid': 'n315204fk2g',
                'title': '准备好看全球总决赛了吗？',
                'img': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_4.jpg',
                'smallImg': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_4_m.jpg'
            },
            {
                'vid': 't3154pxcsq7',
                'title': '什么是全球总决赛？',
                'img': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_1.jpg',
                'smallImg': '//game.gtimg.cn/images/lpl/act/a20200901worlds/video_1_m.jpg'
            }
        ];
        shuffle(jsonArr);

        jsonArr.forEach(function(value, index) {
            html += `<a class="swiper-slide" href="javascript:;" onclick="PTTSendClick('btn','slide-music${index}','slide-music${index}');">
                                                <img src="${value.smallImg}" alt="">
                                                <h2>${value.title}</h2>
                                                <span class="mask">
                                                    <p><i class="spr"></i></p>
                                                </span>
                    </a>`;


            htmlSmall += `<div class="swiper-slide ${index==0?'swiper-slide-active':''}">
                        <div>
                            <img src="${value.smallImg}" alt="">
                            <p>${value.title}</p>
                        </div>
                    </div>`;
        });
        $(".swiper-music .swiper-wrapper").html(html);
        $("#music_small").html(htmlSmall);

        var cartoon = new Swiper('.swiper-cartoon', {
            initialSlide: 0,
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 50,
            slideToClickedSlide: true,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-cartoon .swiper-pagination',
                clickable: true,
            },
            on: {
                init: function() {}
            }
        });
        if (cartoon.slides.length <= 3) {
            cartoon.destroy();
            $('.swiper-cartoon .swiper-pagination').hide();
        } else {
            $('.swiper-cartoon .swiper-pagination').show();
        }
        var music = new Swiper('.swiper-music', {
            initialSlide: 0,
            // resistanceRatio : 0,
            slidesPerView: 'auto',
            // spaceBetween : 100,
            slideToClickedSlide: true,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.part5-btn-next',
                prevEl: '.part5-btn-prev'
            },
            on: {
                // slideChangeTransitionStart: function() {
                //  islide=this.activeIndex;
                //  console.log(islide)
                // }
            }
        });
        var diaVideo = new Swiper('.dia-video .swiper-container', {
            // resistanceRatio : 0,
            slidesPerView: 'auto',
            // spaceBetween : 100,
            slideToClickedSlide: true,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.dia-next',
                prevEl: '.dia-prev'
            },
            on: {
                slideChangeTransitionEnd: function() {
                    player.pause();
                    player1.pause();
                },
            }
        });
        // 视频弹窗
        // var jsonArr = [
        //     { vid: 'a3152tk7oyj' },
        //     { vid: 'p3144mi7gst' }
        // ];
        var player;
        var player1;
        $(".swiper-music .swiper-slide").click(function() {
            var idx = $(this).index();
            if (!jsonArr[idx]['vid']) {
                alert('敬请期待');
                return;
            }
            diaVideo.slideTo(idx);
            $('.dia-video .swiper-slide').eq(idx).addClass('on').siblings('.swiper-slide').removeClass('on');
            TGDialogS('dia-video');
            player = new Txplayer({
                containerId: "diaVideo-container1", //id
                vid: jsonArr[idx].vid,
                width: '100%',
                height: '100%',
                autoplay: true
            });
        })
        $('.dia-video .swiper-slide').click(function() {
            var idx = $(this).index();
            if (!jsonArr[idx]['vid']) {
                alert('敬请期待');
                return;
            }
            player.pause();
            $('.dia-video .swiper-slide').removeClass('on').eq(idx).addClass('on');
            player1 = new Txplayer({
                containerId: "diaVideo-container1", //id
                vid: jsonArr[idx].vid,
                width: '100%',
                height: '100%',
                autoplay: true
            });
        })
        $('.dia-close').click(function() {
            if (player) {
                player.pause();
            };
            if (player1) {
                player1.pause();
            }


        })
    },
    cont3Tab: function() {
        // cont3赛事进度切换
        $('.cont3 .tab').on('click', 'a', function() {
            var open = $(this).data('open');
            var idx = $(this).index();
            if (+open == 1) {
                $('.cont3 .tab a').removeClass('on').eq(idx).addClass('on');
                $('.cont3-box').hide().eq(idx).fadeIn();
            }

        })
        // 入围赛 积分耪 ABCD切换
        $('.cont3-box1 .selbox a').click(function() {
            var idx = $(this).index();
            $('.cont3-box1 .selbox a').removeClass('on').eq(idx).addClass('on');
            $('.cont3-teambox').hide().eq(idx).fadeIn();
        })
        // 小组赛 积分耪 ABCD切换
        $('.cont3-box2 .integralbox a').click(function() {
            var idx = $(this).index();
            $('.cont3-box2 .integralbox a').removeClass('on').eq(idx).addClass('on');
            $('.team-message').hide().eq(idx).fadeIn();
        })
    },
    // 小组赛 天数点击
    daySwiper: function() {
        // var daysw = new Swiper('.day-sw', {
        //     initialSlide: 0, 
        //     resistanceRatio : 0,
        //     slidesPerView: 5,
        //     // spaceBetween : -1,
        //     slideToClickedSlide: true,
        //     observer: true,
        //     observeParents: true,
        //     navigation: {
        //         nextEl: '.day-next',
        //         prevEl: '.day-prev'
        //     },
        //     on: {
        //         init: function() {
        //             // $('.day-sw .swiper-slide').eq(islide).addClass('on').siblings().removeClass('on'); // 
        //         }
        //     }
        // });
        $('.day-sw').on('click', '.swiper-slide', function() {
            var idx = $(this).index();
            $('.day-sw .swiper-slide').removeClass('on').eq(idx).addClass('on');
            // $('.cont3 .message-ul').hide().eq(idx).fadeIn();
        })
    },
    // 精彩节目切换
    cont4Tab: function() {
        $('.cont4-btn-box a').click(function() {
            var idx = $(this).index();
            $('.cont4-btn-box a').removeClass('on').eq(idx).addClass('on');
            // $('.cont4-video-box').hide().eq(idx).fadeIn();
        })
    },
    cont5Swiper: function() {
        // // 参赛队伍
        // var mySwiper1 = new Swiper('.cont5-swone .swiper-container',{
        //     initialSlide: 0,
        //     slidesPerGroup: 5, 
        //     slidesPerView: 'auto',
        //     slideToClickedSlide: true,
        //     observer: true,
        //     observeParents: true,
        //     navigation: {
        //         nextEl: '.cont5-swone-next',
        //         prevEl: '.cont5-swone-prev'
        //     }
        // })
        // 解说阵容
        var mySwiper2 = new Swiper('.cont5-swtwo .swiper-container', {
            slidesPerView: 'auto',
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.cont5-swtwo-next',
                prevEl: '.cont5-swtwo-prev'
            }
        })
        var jsList = [
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name37.png", "name": "余霜" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name38.png", "name": "希然" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name39.png", "name": "刘航" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name40.png", "name": "小钰" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name41.png", "name": "骆歆" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name1.png", "name": "米勒" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name2.png", "name": "记得" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name3.png", "name": "泽元" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name4.png", "name": "wAwa" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name5.png", "name": "Cat" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name6.png", "name": "瞳夕" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name7.png", "name": "王多多" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name8.png", "name": "长毛" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name9.png", "name": "957" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name10.png", "name": "鼓鼓" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name11.png", "name": "柯基" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name12.png", "name": "赵志铭" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name13.png", "name": "小伞" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name14.png", "name": "十一" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name15.png", "name": "雨童" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name16.png", "name": "PYL" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name17.png", "name": "MacT" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name18.png", "name": "俊日" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name19.png", "name": "Rita" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name20.png", "name": "淑怡" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name21.png", "name": "Kris" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name22.png", "name": "小米" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name23.png", "name": "彭彭" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name24.png", "name": "Summer" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name25.png", "name": "千寻" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name26.png", "name": "硕硕" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name27.png", "name": "天识" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name28.png", "name": "西朴" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name29.png", "name": "奶弟" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name30.png", "name": "毛毛" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name31.png", "name": "Suki" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name32.png", "name": "Mage" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name33.png", "name": "重越" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name34.png", "name": "一凡" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name35.png", "name": "李瓒" },
            { "img": "//game.gtimg.cn/images/lpl/act/a20200901worlds/js-name36.png", "name": "圈圈" }
        ]
        var html = '';
        var li = '';
        for (var i = 0; i <= parseInt(jsList.length / 16); i++) {
            li = '';
            if (i < parseInt(jsList.length / 16)) {
                for (var j = 0; j < 16; j++) {
                    var item = jsList[i * 16 + j];
                    if (i == parseInt(jsList.length / 16)) {
                        // item=jsList[i*16+j-(16-jsList.length%16)];
                        j <= 16 - jsList.length % 16;
                    }
                    li += '<li>';
                    li += '<span class="team-logo"><img src=' + item['img'] + ' alt=""></span>';
                    li += '<span class="name">' + item['name'] + '</span>';
                    li += '</li>';
                }
            } else {
                for (var j = 0; j < jsList.length % 16; j++) {
                    var item = jsList[i * 16 + j];
                    console.log(j)
                    li += '<li>';
                    li += '<span class="team-logo"><img src=' + item['img'] + ' alt=""></span>';
                    li += '<span class="name">' + item['name'] + '</span>';
                    li += '</li>';
                }
            }



            console.log(i)
            html += '<div class="swiper-slide"><ul class="slide-ul">' + li + '</ul></div>';
        }
        $('.cont5-swtwo .swiper-wrapper').html(html);
        mySwiper2.update();
        mySwiper2.slideTo(0);

    },
    // 英雄联盟全球总决赛
    cont6Swiper: function() {
        // 参赛队伍
        var mySwiper3 = new Swiper('.swiper-container.championsw', {
            initialSlide: 0,
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            resistanceRatio: 0,
            observer: true,
            observeParents: true
        })
        $('.bottombox a').click(function() {
            var idx = $(this).index();
            $('.bottombox a').removeClass('on').eq(idx).addClass('on');
            mySwiper3.slideTo(idx);
        })
    },
    //跑马灯效果
    carousel: function() {
        function sel(obj) {
            //原理：通过定时器来做
            //步骤：1.累加器  2.定时器
            // 测试加入10条
            for (var i = 0; i < 10; i++) {
                $(obj).append(
                    '<li><a href="javascript:;" onclick="PTTSendClick(\'btn\',\'list1\',\'信息\');">前往虎牙S10专题直播间，参与S10活动，获得精彩好礼！</a></li>'
                )
            }

            var length1 = $(obj).children('li').length;
            var tag = $(obj).children('li').clone();
            $(obj).append(tag);
            var num = 0;
            var timer = null;
            //把这个定时器的功能，封装到一个自定义函数中
            function autoPlay() {
                //num--;//num  = num-1
                //num = num-5;
                num -= 40;
                if (num < -length1 * 40) {
                    num = 0;
                    $(obj).css({
                        'transform': 'translate3d(0,' + num + 'px,0',
                        'transition': 'none'
                    });
                } else {
                    $(obj).css({
                        'transform': 'translate3d(0,' + num + 'px,0',
                        'transition': 'all linear 1s',
                        'transition-delay': '1s'
                    });
                }

            }
            //3.开启定时器
            timer = setInterval(autoPlay, 3000);
            //鼠标经过的时候，清空定时器
            $(obj).mouseover(function(event) {
                clearInterval(timer);
            }).mouseout(function(event) {
                clearInterval(timer);
                timer = setInterval(autoPlay, 3000);
            });


            // $(obj).touchstart(function(event){
            //  clearInterval(timer);
            // }).touchmove(function(event){
            //     clearInterval(timer);
            //     timer = setInterval(autoPlay,75);
            // });
        }
        sel($('#broadcastContent'));
        sel($('#broadcastContent1'));
        sel($('#broadcastContent2'));

    }
}
eventUtil.init();

/* #t6Hl8#ED223EBF4B57521B08E4B75C1A6BB0B2 */