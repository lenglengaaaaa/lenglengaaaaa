var eventUtil = {
    init: function () {
        eventUtil.videoDia();
    },
    //  ”∆µµØ¥∞
    videoDia: function () {
        $('.video-wrap .video li').click(function(){
            $('#dia_video').slideDown(500,"",function(){
                $('#dia_video .dia-con').fadeIn(600);
                $('#dia_video .btn-close').delay(200).fadeIn(1000).css('transform','rotateZ(180deg)')
            })
        })
        $('#dia_video .btn-close').click(function(){
            $('#dia_video .btn-close').fadeOut(1000).css('transform','rotateZ(0)');
            $('#dia_video .dia-con').fadeOut(600);
            $('#dia_video').delay(200).slideUp(500)
        })
    
    }
}
eventUtil.init();






