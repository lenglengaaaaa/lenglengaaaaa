
$('.btn-box a').on('click',function(){
    var ind=$(this).index();
    $(this).addClass('on').siblings('a').removeClass('on');
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
                // 'max-width':''+(this.slides.length)*297+'px'
            })
            // var t = "0" + (swiper.activeIndex + 1);
            // $(".swiper-live .now").text(t)
            // $('.notice-box .swiper-container').css('width','1000px')
        }
    },
    // onSlideChangeEnd: function(swiper){
    //   // alert(mySwiper.activeIndex)
    //   $('.main6 .right ul li').eq(mySwiper.activeIndex).addClass('on').siblings().removeClass('on');
    // }
});
// popularSwiper: function () {
//     var swiper1 = new Swiper('.swiper-popular .swiper-container', {
//         grabCursor: true,
//         slidesPerView: 3,
//         slidesPerGroup: 3,
//         loop: true,
//         navigation: {
//             nextEl: '.swiper-popular .swiper-button-next',
//             prevEl: '.swiper-popular .swiper-button-prev',
//         },
//     });
// },

$('.btn-expand').click(function(){
    if($('.notice-box .swiper-container').css("display") == 'none'){
        $('.notice-box .swiper-container').show(1000);
    }else{
        $('.notice-box .swiper-container').hide(1000);
    }
    
})

var element = document.getElementById('rank');

$('.swiper-rank .swiper-rank-prev').click(function(){
    var num = element.scrollLeft - 116;
    $(element).animate({scrollLeft: num},500)
})
$('.swiper-rank .swiper-rank-next').click(function(){
    var num = element.scrollLeft + 116;
    $(element).animate({scrollLeft: num},500)
})

var mySwiper = new Swiper ('.schedule-box .swiper-schedule', {
    slidesPerView: "auto",

})   