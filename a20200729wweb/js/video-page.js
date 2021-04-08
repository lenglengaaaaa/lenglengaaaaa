var eventUtil = {
    init: function () {
        eventUtil.videoDia();
        eventUtil.navDia();
    },
    // 视频弹窗
    videoDia: function () {
        $('.video-wrap .video li').click(function(){
            $('#dia_video').slideDown(500,"",function(){
                $('#dia_video .dia-con').fadeIn(600);
                $('#dia_video .btn-close').delay(200).fadeIn(1000).css('transform','rotateZ(180deg)');
                $('#dia_video video').attr('src','https://nie.v.netease.com/nie/2019/0319/a8c02803b9a74f2e0e3c29a5e9b69f0aqt.mp4');
            })
        })
        $('#dia_video .btn-close').click(function(){
            $('#dia_video .btn-close').fadeOut(1000).css('transform','rotateZ(0)');
            $('#dia_video .dia-con').fadeOut(600);
            $('#dia_video').delay(200).slideUp(500)
            $('#dia_video video')[0].pause();
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
}
eventUtil.init();






