// 赛程页面切换
$('.content-tab').on('click',function(){
    var idx=$(this).index();
    // if(idx==1){
    //     $('.content-tabs .login-box').hide();
    // }else{
    //     $('.content-tabs .login-box').show();
    // }
    if(idx == 1 && OUT.login.isLogin === false){
        return OUT.login.doLogin();
    }
    if(idx == 1){
        OUT.user.getGroupList();
        $('.schedule-nav-list').eq(0).addClass('on').siblings('.schedule-nav-list').removeClass('on');
        $('.integral-content').eq(0).show().siblings('.integral-content').hide();
    }
    $(this).addClass('on').siblings('.content-tab').removeClass('on');
    $('.cont-box').eq((idx-1)).show().siblings('.cont-box').hide();
    swiperVideo();
    playerFun();
});

// 入围赛，淘汰赛，对局详情页面切换
$('.schedule-nav-list').on('click',function(){
    var idx=$(this).index();
    if(idx == 1){
        showTips('暂未开放');
        return;
    }else if(idx == 2){
        OUT.user.getByWeekMG();
    }else if(idx == 0){
        OUT.user.getGroupList();
    }
    $(this).addClass('on').siblings('.schedule-nav-list').removeClass('on');
    $('.integral-content').eq((idx)).show().siblings('.integral-content').hide();
});

// 淘汰赛切换
$('.finalis-tab').on('click',function(){
    var idx=$(this).index();
    $(this).addClass('on').siblings('.finalis-tab').removeClass('on');
    $('.finalis-cont').eq((idx)).show().siblings('.finalis-cont').hide();
})

$('#sel1').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectArea = idx;
    OUT.user.getGroupList();
});

$('#sel2').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectMatchGroup = idx;
    OUT.user.getGroupList();
});

$('#sel3').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectArea = idx;
    OUT.user.getByWeekMG();
});

$('#sel4').on('change', function () {
    var idx = $(this).val();
    OUT.user.selectMatchGroup = idx;
    OUT.user.getByWeekMG();
});

$('#sel5').on('change', function () {
    var idx = $(this).val();
    OUT.user.weekNo = idx;
    OUT.user.getByWeekMG();
});







// 绑定副页面按钮
$('.btn-back').on('click', function() {
    closeSubPage();
});
$('.legion-table li a').on('click', function() {
    // openSubPage(1,'matchlist');
});
// $('.cont-box3 .swiper-slide').on('click', function() {
//     // openSubPage('114902','video');
//     swiperVideo();
// });
$('.btn-txt').on('click', function() {
    // openSubPage('img');
});

$('.btn-exrecord').on('click', function() {
    // openSubPage('exrecord');
});

// 打开副页面
function openSubPage(data,type) {
    type=type||'img';
    $('html, body').css({ 'overflow': 'hidden' });
    $('.sub-page').css({ 'display': 'none' });
    // $('.sub-page-'+n).css({ 'display': '' })
    $('.sub-page-'+type).css({ 'display': '' })
    $('.sub-wrapper').addClass('open');
    if(type=='img'){
        fillNews.detail({
            gameID: 65,
            id:data,
            type:'iTag',
            source:'client_circle_detail', // V4系统的数据上报，需要去GICP后台手动创建
            newsType:'news',
            wrap:'#img-body', // 模板处理完填充进来的容器
            tpl:document.querySelector('#tpl').innerHTML, // 模板字符串
            relWrap:'.rel', // 相关推荐的容器
            relTpl:'<p><a href="{url}"><img src="{sIMG}">{sTitle} {sCreated}</a></p>', // 相关推荐的dom结构模板
            callback:function(obj){
            console.log(obj);
                player.pause();
            }
        });
    }
}

function closeSubPage() {
    $('html, body').css({ 'overflow': '' });
    $('.sub-wrapper').removeClass('open');
}



// $('.btn-dialog-share').on('click', function() {
//     TGDialogS('dialog-share-mask');
// });



// 页面刷新时更新swiper
function swiperVideo(){
    // 视讯轮播图
    var mySwiper = new Swiper('.swiper-container', {
        // loop:true,
        observer:true,
        resistanceRatio : 0,
        observeParents:true,//swiper父元素变化时更新
        observeSlideChildren:true,//swiper子元素变化时更新
        preventClicks : false,//默认true
        preventClicksPropagation : false,
        // autoplay: {
        //     delay:3000,
        //     disableOnInteraction: false,
        // },
        // pagination: {
        //     el: '.swiper-pagination',
        // },
        on: {
            slideChangeTransitionEnd: function() {
            },
        }
    })
}

var player ;
function playerFun(){
    // $('.swiper-slide .btn-play').hide();
    // TGDialogS('dialog-video');
    player = new Txplayer({
        containerId: 'video-container', //id
        vid: 'p0833gqwz7f',
        width: '100%',
        height: '100%',
        autoplay: false,
        poster:'',
    });
}

$('.dia-close').on('click',function(){
    $('.video-container').empty();
    closeDialog();
})

function onReachBottom(params, callFn) {
    if (!params.container || !params.content) {
        console.error('缺失必要的参数');
        return;
    }

    var $container = params.container,
        $content = params.content,
        distance = params.distance || 30;

    $container.on('scroll', function() {
        var awayBtm = $content.height() - $container.scrollTop() - $container.height();
        if (awayBtm <= distance) {
            callFn && callFn()
        }
    });
}
/* 调用插件 */
onReachBottom({
    "container": $('.legion-list-box'),
    /* 容器对象 */
    "content": $('.legion-ul'),
    /* 内容对象 */
    "distance": 100 /* 触发事件距离，默认30px */
}, function() {
    /* 插件回调函数 */
    //getUserList.get();
});


// 加载新闻列表

fillNews.list({
	gameID:65,
	type:'iTag',
	newsType:'news',
    id:'114902,114903',
	// pager:{
	// 	wrap:'#pager',
	// 	type:'click', // laypage | click | scroll 默认是laypage分页 | 点击加载更多 | 滚动加载更多
	// 	scrollDistance:0, // type为scroll时候，wrap元素的顶部距离屏幕底部的触发距离,默认为0,此处使用500是便于演示
	// 	// scrollContainer:window, // type为scroll时候，检测哪个元素滚动，默认是window
	// },
	pageSize:10000, // 每一页文章条数
	source:'client_circle_detail', //数据上报用的，表明本页面用于pc或者移动；在gicp建，常见的移动官网是web_m ，PC官网是 web_pc
    detailURL:'news', // 新闻的详情页，会在后面加上?newsid=XXX
	tpl: 
    '<a class="btn-txt" href="javascript:void(0)" title="文章" onclick="openSubPage({iNewsId}),PTTSendClick(\'btn\',\'txt1\',\'文章\')"><div class="img-box"><img src="{sCoverMap.One}" alt=""></div><div class="txt-box"><p class="titl">{sTitle}</p><p class="txt"  style="opacity:0" id="content-{iNewsId}"></p></div></a>'
    // function(json){
    //     console.log(json.iNewsId,this);
    //     if(json.iNewsId==='114902'){
    //       return '<a class="btn-txt" href="javascript:void(0)" title="文章" onclick="openSubPage({iNewsId}),PTTSendClick(\'btn\',\'txt1\',\'文章\')"><div class="img-box"><img src="{sCoverMap.One}" alt=""></div><div class="txt-box"><p class="titl">{sTitle}</p><p class="txt"  style="opacity:0" id="content-{iNewsId}"></p></div></a>'
    //     }
    //   }
      , // 模板字符串。
	wrap:'#txt-list', //填充进去的容器
	callback:function(result){
        console.log(result)
		// 填充完的回调
        var dataNews=[];
        for( var i=0;i<result.msg.result.length;i++){
            dataNews.push(result.msg.result[i].iNewsId)
        }
        setTimeout(function(){initContent(dataNews)},100);
	}
});

// 新闻
var initContent = function(dataNews){
    dataNews.map(function(val){
        fillNews.detail({
            gameID: 65,
            id:val,
            type:'iTag',
            pageSize:10000, // 每一页文章条数
            source:'client_circle_detail', 
            newsType:'news',
            wrap:'#content-'+val, // 模板处理完填充进来的容器
            tpl:'{sContent}', // 模板字符串
            relWrap:'.rel', // 相关推荐的容器
            relTpl:'<p><a href="{url}"><img src="{sIMG}">{sTitle} {sCreated}</a></p>', // 相关推荐的dom结构模板
            callback:function(obj){
                setTimeout(function(){clearContentTags(val)},100);
            }
          });
    })
}
var clearContentTags = function(val){
    var t = setInterval(function(){
        if(document.getElementById('content-'+val).innerText.length > 0){
            clearInterval(t);
            document.getElementById('content-'+val).innerHTML = document.getElementById('content-'+val).innerText
            $(document.getElementById('content-'+val)).css({opacity:'1'});
        }
    },30)
}
