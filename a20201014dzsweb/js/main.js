// ͷ���л� topNav
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

// ����ý����վ

// a1d_pic �ٷ��������л�
    function rollSwiper(name, idN, tab) {
        var name1 = new Swiper(''+idN+' .swiper-container', {
            // navigation: {
            // 	nextEl: next,
            // 	prevEl: pre,
            // },
            noSwiping : true,
            autoplay: {
                delay: 3000,//1���л�һ��
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
    // �ٷ�
    // ���������Ҫ����rollSwiper������ˢ��
    rollSwiper('rollSwiper1', '#roll_wrap1', '#adBtn1')
    // ����
    // ���������Ҫ����rollSwiper������ˢ��
    rollSwiper('rollSwiper2', '#roll_wrap2', '#adBtn2')

    // �ٷ��������л�
    $('.slide_roll li').on('click',function(){
        var idx =$(this).index();
        $(this).addClass('on').siblings('li').removeClass('on');
        $('.roll_pic_wrap').eq(idx).css('display','block').siblings('.roll_pic_wrap').css('display','none');
        // ���������Ҫ����rollSwiper������ˢ��
        rollSwiper('rollSwiper1', '#roll_wrap1', '#adBtn1').update();
        rollSwiper('rollSwiper2', '#roll_wrap2', '#adBtn2').update();
    })

// newsWrap  ���ţ����棬�
    $('#newsBtn .news_on').hover(function(){
        var idx=$(this).index();
        $(this).addClass('on').siblings('.news_on').removeClass('on');
        $('.newsList').eq(idx).show().siblings('.newsList').hide();
    })

// �����л� role_wrap
    $('.role_tab p').on('click',function(){
        var idx =$(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $('.role_title li').eq(idx).show().siblings('.role_title li').hide();
    })

// ��Ϸ���� self_wrap
    $('.self_tab li').on('click',function(){
        var idx = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $('.self_box').eq(idx).show().siblings('.self_box').hide();
    })

// �ؿ����� 
    $('.self_box2 li').on('click',function(){
        var idx = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
    })

// �汾�ع�
    var mySwiper = new Swiper('.version_wrap .swiper-container',{
        slidesPerView :'auto',
        scrollbar: {
            el: '.swiper-scrollbar',
            // hide: true,
            // draggable: true,
        },
    });


    // // ������
    // var linew=parseInt(1000/$(".version_wrap dd").length)+'px';
    // $('.version_wrap dl dt').css('width',linew);
    // $(".version_wrap dl").on("mousedown", function(e) {
    //     // �ж�Ĭ����Ϊ�Ƿ���Ա�����
    //     if (e.cancelable) {
    //         // �ж�Ĭ����Ϊ�Ƿ��Ѿ�������
    //         if (!e.defaultPrevented) {
    //             e.preventDefault();
    //         }
    //     }   
    //     startX = e.pageX,
    //     startY = e.pageY;
    // })
    // $(".version_wrap dl").on("mouseup", function(e) {         
    //     // �ж�Ĭ����Ϊ�Ƿ���Ա�����
    //     if (e.cancelable) {
    //         // �ж�Ĭ����Ϊ�Ƿ��Ѿ�������
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
    //     //��
    //     if ( X > 0 ) {
    //         // alert('��'); 
    //         if((-oleft)>0){
    //             oleft+=ddw;
    //             $(".version_wrap dl").css('left',''+oleft+'px');
    //             if((-oleft)<ddw){
    //                 $(".version_wrap dl").css('left','0px');
    //             }
    //         }
    //     }
    //     //�һ�
    //     else if ( X < 0 ) {
    //         // alert('�һ�');
    //         if((-oleft)<=(dlw-1000-40)){
    //             oleft+=-ddw;
    //             console.log(oleft)
    //             $(".version_wrap dl").css('left',''+oleft+'px');
    //             if((-oleft)>=(dlw-1000)){
    //                 $(".version_wrap dl").css('left',''+(1000-dlw)+'px');
    //             }
    //         }
    //     }
    //     //�»�
    //     // else if ( Y > 0) {
    //     //     alert('�»�');    
    //     // }
    //     // //�ϻ�
    //     // else if ( Y < 0 ) {
    //     //     alert('�ϻ�');    
    //     // }
    //     // //����
    //     // else{
    //     //     alert('����');    
    //     // }
    // });  



