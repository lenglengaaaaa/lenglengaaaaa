// 头部切换 topNav
    $('#topNav').hover(function(){
        $('#navWrap').css({'opacity':'1','pointer-events':'auto'});
        // e.stopPropagation();
        $('#navWrap').hover(function(){
            $('#navWrap').css({'opacity':'1','pointer-events':'auto'});
            // $('#navWrap').unbind();

        },function(){
            $('#navWrap').css({'opacity':'0','pointer-events':'none'});
            $('#navWrap').unbind();
        })
    },function(){
        $('#navWrap').css({'opacity':'0','pointer-events':'none'});
    })

// 合作媒体网站

// a1d_pic 官方，合作切换
    function rollSwiper(name, idN, tab) {
        var name1 = new Swiper(''+idN+' .swiper-container', {
            // navigation: {
            // 	nextEl: next,
            // 	prevEl: pre,
            // },
            noSwiping : true,
            autoplay: {
                delay: 3000,//1秒切换一次
            },
            on: {
                slideChangeTransitionStart: function(){						
                $(''+tab+' a').eq(this.activeIndex).addClass('now').siblings().removeClass('now');						
                }
            }
        });
        $(''+tab+' a').on('click', function() {
            var ind=$(this).index();
            name1.slideTo(ind,500);
        })
        return name1;
    }
    // 官方
    // 填充数据需要调用rollSwiper方法来刷新
    rollSwiper('rollSwiper1', '#roll_wrap1', '#adBtn1')
    // 合作
    // 填充数据需要调用rollSwiper方法来刷新
    rollSwiper('rollSwiper2', '#roll_wrap2', '#adBtn2')

    // 官方，合作切换
    $('.slide_roll li').on('click',function(){
        var idx =$(this).index();
        $(this).addClass('on').siblings('li').removeClass('on');
        $('.roll_pic_wrap').eq(idx).css('display','block').siblings('.roll_pic_wrap').css('display','none');
        // 填充数据需要调用rollSwiper方法来刷新
        rollSwiper('rollSwiper1', '#roll_wrap1', '#adBtn1').update();
        rollSwiper('rollSwiper2', '#roll_wrap2', '#adBtn2').update();
    })

// newsWrap  新闻，公告，活动
    $('#newsBtn .news_on').hover(function(){
        var idx=$(this).index();
        $(this).addClass('on').siblings('.news_on').removeClass('on');
        $('.newsList').eq(idx).show().siblings('.newsList').hide();
    })

// 人物切换 role_wrap
    $('.role_tab p').on('click',function(){
        var idx =$(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $('.role_title li').eq(idx).show().siblings('.role_title li').hide();
    })

// 游戏资料 self_wrap
    $('.self_tab li').on('click',function(){
        var idx = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $('.self_box').eq(idx).show().siblings('.self_box').hide();
    })

// 关卡故事 
    $('.self_box2 li').on('click',function(){
        var idx = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
    })

// 版本回顾
    var mySwiper = new Swiper('.version_wrap .swiper-container',{
        slidesPerView :'auto',
        scrollbar: {
            el: '.swiper-scrollbar',
            // hide: true,
            // draggable: true,
        },
    });


    // // 滚动条
    // var linew=parseInt(1000/$(".version_wrap dd").length)+'px';
    // $('.version_wrap dl dt').css('width',linew);
    // $(".version_wrap dl").on("mousedown", function(e) {
    //     // 判断默认行为是否可以被禁用
    //     if (e.cancelable) {
    //         // 判断默认行为是否已经被禁用
    //         if (!e.defaultPrevented) {
    //             e.preventDefault();
    //         }
    //     }   
    //     startX = e.pageX,
    //     startY = e.pageY;
    // })
    // $(".version_wrap dl").on("mouseup", function(e) {         
    //     // 判断默认行为是否可以被禁用
    //     if (e.cancelable) {
    //         // 判断默认行为是否已经被禁用
    //         if (!e.defaultPrevented) {
    //             e.preventDefault();
    //         }
    //     }               
    //     moveEndX = e.pageX,
    //     moveEndY = e.pageY,
    //     X = moveEndX - startX,
    //     Y = moveEndY - startY;
    //     var oleft=parseInt($(".version_wrap dl").css('left'));
    //     var dlw=parseInt($(".version_wrap dl").css('width'));
    //     var ddw=parseInt($(".version_wrap dd").css('width'))+40;
    //     //左滑
    //     if ( X > 0 ) {
    //         // alert('左滑'); 
    //         if((-oleft)>0){
    //             oleft+=ddw;
    //             $(".version_wrap dl").css('left',''+oleft+'px');
    //             if((-oleft)<ddw){
    //                 $(".version_wrap dl").css('left','0px');
    //             }
    //         }
    //     }
    //     //右滑
    //     else if ( X < 0 ) {
    //         // alert('右滑');
    //         if((-oleft)<=(dlw-1000-40)){
    //             oleft+=-ddw;
    //             console.log(oleft)
    //             $(".version_wrap dl").css('left',''+oleft+'px');
    //             if((-oleft)>=(dlw-1000)){
    //                 $(".version_wrap dl").css('left',''+(1000-dlw)+'px');
    //             }
    //         }
    //     }
    //     //下滑
    //     // else if ( Y > 0) {
    //     //     alert('下滑');    
    //     // }
    //     // //上滑
    //     // else if ( Y < 0 ) {
    //     //     alert('上滑');    
    //     // }
    //     // //单击
    //     // else{
    //     //     alert('单击');    
    //     // }
    // });  



