var eventUtil = {
    init: function () {
        eventUtil.liveDia();
        eventUtil.navDia();
        eventUtil.nmSelect();

    },
    // 视频弹窗
    liveDia: function () {
        $('.live-wrap .live li').click(function(){
            $('#dia_live').slideDown(500,"",function(){
                $('#dia_live .dia-con').fadeIn(600);
                $('#dia_live .btn-close').delay(200).fadeIn(1000).css('transform','rotateZ(180deg)')
                $('#dia_live video').attr('src','https://nie.v.netease.com/nie/2019/0319/a8c02803b9a74f2e0e3c29a5e9b69f0aqt.mp4');
            })
        })
        $('#dia_live .btn-close').click(function(){
            $('#dia_live .btn-close').fadeOut(1000).css('transform','rotateZ(0)');
            $('#dia_live .dia-con').fadeOut(600);
            $('#dia_live').delay(200).slideUp(500);
            $('#dia_live video')[0].pause();
        })
    
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
    nmSelect: function (){
        $('.live-wrap .nm-select a').click(function(){
            $('.live-wrap .nm-select ul').toggle();
        })
    }
}
eventUtil.init();






