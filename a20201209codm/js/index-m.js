
$('#fullpage').fullpage({
    // verticalCentered: true,
    // navigation: true,
    scrollingSpeed: 1000,
    touchSensitivity: 15,
    normalScrollElementTouchThreshold: 5,
    resize: true,
    // slidesNavigation: true,
    scrollOverflow: false,
    loopHorizontal: false,
    // recordHistory: false,

    // easing: 'easeInOut',
    // scrollOverflowReset: true,
    anchors:['firstPage', 'secondPage', 'thirdPage','fourthPage'],
    menu: '#myMenu',
    afterRender: function(){
        $('.btn-order1').hide();
    },
    onLeave: function (index, nextIndex, direction) {
        // $('.nav span').html(i)
        // if(index==1){

        //     $('.btn-order1').show();
        // }else{

        //     $('.btn-order1').show();
        // }
        if(nextIndex!==1){
            // $('.ost_box').hide();
            $('.btn-order1').show();
            // if(document.body.clientWidth<1440){
            //     $('.nav').hide();
            // }else{
            //     $('.nav').show();
            // }

        }else{
            // $('.ost_box').show();
            $('.btn-order1').hide();
            // $('.nav').hide();
        }
      
        if(nextIndex!==4){
            $('#afooter').hide();
        }else{
            $('#afooter').show();
        }
    },
    
    // afterLoad(anchorLink, index) {
    //     if (index == 4) {
    //         // ��ҳ������������ڶ���ʱ���ı�ҳ�������ʽ
    //         $(this).fullpage.setAutoScrolling(false);
    //         // ��¼ҳ�濪ʼ������λ��
    //         let start = $(document).scrollTop();
    //         let last = 0;
    //         $(document).scroll(function () {
    //             // ���ҳ��ʵʱ������λ��
    //             let end = $(document).scrollTop();
    //             // �������λ��С��0�������ҳ���ڵ����ڶ������Ϲ������ʱ���ٸı�ҳ��Ĺ�����ʽ
    //             if (end - start < 0) {
    //                 $(this).fullpage.setAutoScrolling(true);
    //             }
    //         })
    //         // $('#afooter').show();
    //     }
    // }
});


$('.btn-box a').on('click', function(){
    var idx=$(this).index();
    $(this).addClass('on').siblings('a').removeClass('on');
    if(idx==1){
        window.location.href = "./page-m.html";
    }
})

// ����Ԥ��Ƭ�ֲ�
var noticeSwiper = new Swiper('.notice-box .swiper-container', {
    // grabCursor: true,
    slidesPerView: 'auto',
    // initialSlide: 3,
    // loop: true,
    observer:true,//�޸�swiper�Լ�����Ԫ��ʱ���Զ���ʼ��swiper 
	observeParents:true,//�޸�swiper�ĸ�Ԫ��ʱ���Զ���ʼ��swiper
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
var mySwiper = new Swiper('.swiper-img-box', {
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    loopAdditionalSlides : 3,
    loop: true,
    navigation: {
        // nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
});


$('.img-box .swiper-slide').click(function(){
    var Src = $(this).find('img').attr("src")
    $('.dia1 .tank-bg img').attr('src',Src);
})


// ��Ƶ����
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

// ����
var voice1,voice2,voice3,voice4,voice5,voice6,voice7,voice8,voice9;
var voiceArr = [voice1,voice2,voice3,voice4,voice5,voice6,voice7,voice8,voice9];
// �л���һ������
var player=$('#voice')[0];
function voiceClick(click){
    var index=0;
    $(click).on('click',function(){
        index++;
        if(index>8){
            index=0;
        }
        $('#voice').attr('src','ossweb-img/voice' +(index + 1) + '.wav');
        if(player.paused){
            player.play(); 
            $('.btn-voice span').css('display','block');
            $('.btn-voice i').css('display','none');
        }else{
            player.pause();
            $('.btn-voice span').css('display','none');
            $('.btn-voice i').css('display','block');
        }
    })
}
voiceClick(".play-next");
$('.btn-voice').on('click',function(){
    if(player.paused){
        player.play();
        $('.btn-voice span').css('display','block');
        $('.btn-voice i').css('display','none');
    }else{
        player.pause();
        $('.btn-voice span').css('display','none');
        $('.btn-voice i').css('display','block');
    }
})
