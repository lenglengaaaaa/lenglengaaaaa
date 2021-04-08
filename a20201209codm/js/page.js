$('.btn-box a').hover(function(){
    var idx=$(this).index();
    $(this).addClass('on').siblings('a').removeClass('on');
    if(idx==0){
        window.location.href = "./index.html";
    }
})

// 首屏预告片轮播
var noticeSwiper = new Swiper('.notice-box .swiper-container', {
    // grabCursor: true,
    slidesPerView: 'auto',
    // initialSlide: 3,
    // loop: true,
    observer:true,//修改swiper自己或子元素时，自动初始化swiper 
	observeParents:true,//修改swiper的父元素时，自动初始化swiper
    on: {
        slideChangeTransitionStart:function(){
            // alert(this.activeIndex);
            $('.notice-box .swiper-container').css({
                // 'width':''+(this.activeIndex+2)*297+'px',
                // 'width':''+2*297+'px'
                // 'max-width':''+(this.slides.length)*297+'px'
            })
            // var t = "0" + (swiper.activeIndex + 1);
            // $(".swiper-live .now").text(t)
            // $('.notice-box .swiper-container').css('width','1000px')
        }
    },
});

$('.btn-expand').click(function(){
    if($('.notice-box .swiper-container').css("display") == 'none'){
        $('.notice-box .swiper-container').show(500);
    }else{
        $('.notice-box .swiper-container').hide(500);
    }
})

var mySwiper = new Swiper ('.schedule-box .swiper-schedule', {
    slidesPerView: "auto",

})       

// 视频弹窗
function useTxPlay(vid) {
    $(".dia2 .btn-video").css('display','none');
    var mainPlayer = new Txplayer({
        containerId: 'dia-video',
        vid: vid,
        width: '100%',
        height: '100%',
        autoplay: true
    });
}

$('.dia2 .btn-video').on('click',function(){
    useTxPlay('');
})

$('.dia2 .dia-close').click(function(){
    $('.dia-video').empty();
    closeDialog();
});