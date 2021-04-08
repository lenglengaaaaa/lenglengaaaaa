$(window).scroll(function () {
    var top = $(window).scrollTop();
    var num1 =$('#part-lottery').offset().top-100;
    var num2 =$('#part-task').offset().top-100;
    var num3 =$('#part-invite').offset().top-100;
    var num4 =$('#part-news').offset().top-100;
    	if(top>num1){
    		 $('.nav-box li').removeClass('on').eq(0).addClass('on');
    	}
    	if(top>num2){
    		$('.nav-box li').removeClass('on').eq(1).addClass('on');
    	}
    	if(top>num3){
    		$('.nav-box li').removeClass('on').eq(2).addClass('on');
    	}
		if(top>num4){
    		$('.nav-box li').removeClass('on').eq(3).addClass('on');
		}
 })
window.onresize = function() {
    // 浏览器窗口变化后需要做的事情
    var winWidth = document.body.clientWidth || document.documentElement.clientWidth;
    
} 
$('.nav-box li').on('click',function(){
    // $(this).addClass('on').siblings().removeClass('on');
    $('html,body').animate({scrollTop: $($(this).children().attr("href")).offset().top + "px"}, 200);
})

// 中将名单加载
$(function(){  
    //原理：通过定时器来做
    //步骤：1.累加器  2.定时器
    // 测试加入10条
    for(var i=0;i<10;i++){
        $('.carouselContent .list').append(
            '<p>'+
            '<span class="date">7月20日</span>'+
            '<span class="nickname">6704983345'+(i+1)+'</span>'+
            '<span class="prize">机械迷城 加里奥(7天)'+(i+1)+'</span>'+
            '</p>'
            )
        var nick =$('.carouselContent p:eq('+i+') .nickname');
        var str=nick.html(); 
        var str1 =  (str.length%2==0)
                    ?str.substr(0,Math.floor(parseInt(str.length/2-2)))+'***'+str.substr(Math.floor(parseInt(str.length/2+1),str.length))
                    :str.substr(0,Math.ceil(parseInt(str.length/2-1)))+'***'+str.substr(Math.ceil(parseInt(str.length/2+2),str.length));
        $('.carouselContent p:eq('+i+') .nickname').html(str1);
    }
        
    var length1 = $('.carouselContent p').length;
    var tag = $('.carouselContent p').clone();
    $('.carouselContent .list').append(tag);
    var num=0;
    var timer = null;
    //把这个定时器的功能，封装到一个自定义函数中
    function autoPlay(){ 
        //num--;//num  = num-1
        //num = num-5;
        num-=1;
        if(num < -length1*40){
            num=0;				
        }
        $('.carouselContent .list').css({'transform':'translate3d(0,'+(num/100)+'rem,0'});
    }
    //3.开启定时器
    timer = setInterval(autoPlay,15);
    
    //鼠标经过的时候，清空定时器
    // $('.carouselContent').mouseover(function(event) {
    //     clearInterval(timer);
    // }).mouseout(function(event) {
    //     clearInterval(timer);
    //     timer = setInterval(autoPlay,30);
    // });


    // $('.carouselContent').touchstart(function(event){
    // 	clearInterval(timer);
    // }).touchmove(function(event){
    //     clearInterval(timer);
    //     timer = setInterval(autoPlay,30);
    // });
})

var li1=$('.invite-time li');
for(var i=0;i<li1.length;i++){
    var get1=$('.invite-time li:eq('+i+') .btn-get1');
    if(get1.hasClass('got')){
        $('.invite-time li:eq('+i+')').removeClass('on');
    }
}

function TGDialogS(e) {
	// 利用milo库引入dialog组件
	need("biz.dialog", function(Dialog) {
		Dialog.show({
			id: e,
			bgcolor: '#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
			opacity: 80 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
		});
	});
}
//关闭弹窗
function closeDialog() {
	// 利用milo库引入dialog组件
	need("biz.dialog", function(Dialog) {
		Dialog.hide();
	});
}


function formatDate(now) { 
    var year=now.getFullYear();  //取得4位数的年份
    var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    month=month<10? '0' + month : month;
    var date=now.getDate();      //返回日期月份中的天数（1到31）
    date=date<10? '0' + date : date;
    var hour=now.getHours();     //返回日期中的小时数（0到23）
    hour=hour<10? '0' + hour : hour;
    var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
    minute=minute<10? '0' + minute : minute;
    var second=now.getSeconds(); //返回日期中的秒数（0到59）
    second=second<10? '0' + second : second;
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
}

window.onload = function () {
    function hidediv(){
        setTimeout(function(){
            $('.header').css({
                width:'6.7rem',
                height:'3.24rem',
                transition:'.5s linear'
            });
            $('.header .img1').css({opacity:0,transition:'.5s linear'});
            $('.header .img2').css({opacity:1,transition:'.5s linear'});
            $('.header .login-info').css({
                bottom:'.4rem',
                color:'#fff',
                transition:'.5s linear'
            });
            $('.header .login-info a').css({color:'#fff'})
            $('.header .slogan').css({
                width:'3.6rem',
                height:'1.23rem',
                background:'url(//game.gtimg.cn/images/lpl/act/a20200706partner/slogan1.png) 0 0 /3.6rem 1.23rem',
                margin:'.75rem 0 0 .15rem',
                transition:'.5s linear'
            });
            $('.header .time').css({
                width:'2.9rem',
                height:'.46rem',
                'background-size':'100% 100%',
                margin:'.05rem 0 0 .15rem',
                transition:'.5s linear'
            })
            $('.logo').css({top:'.4rem',left:'.15rem', width:'.95rem',height:'.29rem'});
            $('.logo1').css({top:'.44rem',left:'1.2rem', width:'1.13rem',height:'.2rem'});
    
        },3000)
    }
    hidediv();


    function playLive(liveid) {
        var liveHost = '';
        var isH5 = /(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(navigator.userAgent);
        if (isH5) {
            liveHost = '//qt.qq.com/zhibo/mobile.html?tag=' + liveid + '&ish5pages=1';
        } else {
            liveHost = '//qt.qq.com/zhibo/index.html?tag=' + liveid  + '&ADTAG=zhibo.inner.lolweb.match2&usebarrage=1';
        }
        $("<iframe width='100%' height='100%' id='liveIframe' name='liveIframe' src="+liveHost+" frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true'></iframe>").appendTo('#video-container');
        $('.play-box img,.play-box i').css({'display':'none'});
    }

    // 播放视频
    var mainPlayer;
    /**
     * 调用腾讯视频播放
     * @param {String} vid 
     * @param {Boolean} autoplay 
     */
    function useTxPlay(vid,autoplay) {
        if (vid) {
            $(".play-box img,.play-box i").css('display','none');
            mainPlayer = new Txplayer({
                containerId: 'video-container',
                vid: vid,
                width: '100%',
                height: '100%',
                autoplay: autoplay
            });
        }
    }


    var liveVid = '' // 直播vid
    var liveA='';//teamA
    var liveB='';//teamB  
    var LiveBolist = ['默认', 'BO1', 'BO2', 'BO3', 'BO5', '射手模式', '刺客模式', '克隆大作战', '双人共玩', '魄罗王大战', '极限闪击战', '无限火力'];
    var liveWeek='';
    var scoreA='';
    var scoreB='';
    var logoListA = '';

    // 未开始赛程
    // 获取当天 0 点的时间戳
    var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
    var timenow =Date.now()/1000;
    console.log(timenow)
    // 一天是86400秒
    var SevenDayLater = timeStamp + 86400 * 3;

    console.log(timeStamp);
    console.log(SevenDayLater);
    var matchesNotStart =[];// 未开始的赛程
    var matchtwodays=[];//获取到的后两天的赛程

    // 录播
    var rebroadcastList = [], // 已结束的赛程(录播赛程)
    rebroadVid = ''; // 录播vid

    /**
     * 查询队伍
     * @param {String} tid 队伍id
     */
    function getTeamById(tid) {
        var oTeams = TeamList.msg;
        for(var i in oTeams) {
            if (oTeams[i]['TeamId'] === tid) return oTeams[i];
        }
    }

    // console.log(list134.msg.length)
    $.getJSON("//lpl.qq.com/web201612/data/LOL_MATCH2_MATCH_HOMEPAGE_BMATCH_LIST_134.js", function(list134){
        for (var i = 0; i < list134.msg.length; i++) {(function(key,val) {
            // 将MatchStatus等于3 并且 sExt1不为空的数据取出 放到 rebroadcastList 里
            if (val.MatchStatus === '3' && val.sExt1 !== '') {
                rebroadcastList.push(val);
            }
            
            if (val.MatchStatus === '1'){
                // logoListAno=getTeamById(val['TeamA'])['TeamLogo'];
                // logoListBno=getTeamById(val['TeamB'])['TeamLogo'];
                // logoListAno.push(getTeamById(val['TeamA'])['TeamLogo']);
                // logoListBno.push(getTeamById(val['TeamB'])['TeamLogo'])


                // val.MatchDate.substr(0,10) 获取到的比赛日期
                matchesNotStart.push({'time': new Date(val.MatchDate.replace(/-/g, '/')).getTime()/1000,
                    'teamA':getTeamById(val['TeamA'])['TeamName'],
                    'teamB':getTeamById(val['TeamB'])['TeamName'],
                    'scoreA':val.ScoreA,
                    'scoreB':val.ScoreB,
                    'modename':val.GameModeName,
                    'logoListAno':getTeamById(val['TeamA'])['TeamLogo'],
                    'logoListBno':getTeamById(val['TeamB'])['TeamLogo'],
                    'gameProcName':val.GameProcName
                });
            }
        })(i,list134.msg[i]);}

        // console.log(matchdaytimer)//后两天的时间戳
        console.log(matchesNotStart[0].time); // 未开始的赛程
        // alert(matchesNotStart[0].time)
        for(var j=0;j<matchesNotStart.length;j++){
            if(matchesNotStart[j].time<=SevenDayLater && matchesNotStart[j].time>timenow){
                matchtwodays.push({'time':formatDate(new Date(matchesNotStart[j].time*1000)),
                    'teamA':matchesNotStart[j].teamA,
                    'teamB':matchesNotStart[j].teamB,
                    'scoreA':matchesNotStart[j].scoreA,
                    'scoreB':matchesNotStart[j].scoreB,
                    'modename':matchesNotStart[j].modename,
                    'logoListAno':matchesNotStart[j].logoListAno,
                    'logoListBno':matchesNotStart[j].logoListBno,
                    'gameProcName':matchesNotStart[j].gameProcName
                });
            }
        }
        matchnostart();
    })
    if (LiveBMatchList.msg[134] !== '') {
        for (var i = 0; i < LiveBMatchList.msg[134].length; i++) {(function(key,val) {
            logoListA=getTeamById(val['TeamA'])['TeamLogo'];
            logoListB=getTeamById(val['TeamB'])['TeamLogo'];

            // $('.live .team1 img').attr('src',getTeamById(val['TeamA'])['TeamLogo']);
            // $('.live .team2 img').attr('src',getTeamById(val['TeamB'])['TeamLogo']);
            
            console.log(val.Video3)
            liveVid = val.Video3;
            liveA=val.TeamNameA;
            liveB=val.TeamNameB;
            liveWeek=val.GameProcName;
            scoreA=val.ScoreA;
            scoreB=val.ScoreB;

        })(i,LiveBMatchList.msg[134][i]);}

        $('.play-title').html('正在直播：2020职业联赛夏季赛常规赛 '+liveA+' VS '+liveB+' '+liveWeek+'');
        $('.live-box ul').append(
            '<li class="live">'+
            '<p class="titl">正在直播</p>'+
                '<div>'+
                    '<p class="team team1">'+
                       '<img src='+logoListA+' class="head-photo" alt="">'+
                        '<span class="name">'+liveA+'</span>'+
                    '</p>'+
                    '<p class="score">'+
                        '<i>'+scoreA+':'+scoreB+'</i>'+
                        '<span>'+liveWeek+'</span>'+
                    '</p>'+
                    '<p class="team team2">'+
                        '<img src='+logoListB+' class="head-photo" alt="">'+
                        '<span class="name">'+liveB+'</span>'+
                    '</p>'+
                '</div>'+
            '</li>'
        )
    }else{
        $.getJSON("//lpl.qq.com/web201612/data/LOL_MATCH2_MATCH_HOMEPAGE_BMATCH_LIST_134.js", function(list134){
            for (var i = 0; i < list134.msg.length; i++) {(function(key,val) {
                // 将MatchStatus等于3 并且 sExt1不为空的数据取出 放到 rebroadcastList 里
                if (val.MatchStatus === '3' && val.sExt1 !== '') {
                    rebroadcastList.push(val);
                }
            })(i,list134.msg[i]);}
        
        // 根据 MatchDate 字段来排序
        rebroadcastList.sort((a, b) => {
            return new Date(b.MatchDate.replace(/-/g, '/')).getTime() - new Date(a.MatchDate.replace(/-/g, '/')).getTime()
        })
        console.log(rebroadcastList);
        console.log(matchesNotStart[0]); // 下一场比赛
        

        // 下面这里取出排序完的第一场 并且拿到录播vid
        var rebroad = rebroadcastList[0]
        rebroadVid = JSON.parse(rebroad.sExt1).sVID
        console.log(rebroad) // <--- 这个录播最后一场的数据
        console.log(rebroadVid) // <--- 这个录播vid
    })
    }

    function matchnostart(){
        for( var j=0;j<matchtwodays.length;j++){
            $('.live-box ul').append(
                '<li class="nostart">'+
                '<p class="titl">未开始 '+matchtwodays[j].time.substr(5, 11)+'</p>'+
                    '<div>'+
                        '<p class="team team1">'+
                        '<img src='+matchtwodays[j].logoListAno+' class="head-photo" alt="">'+
                            '<span class="name">'+matchtwodays[j].teamA+'</span>'+
                        '</p>'+
                        '<p class="score">'+
                            '<i>'+matchtwodays[j].scoreA+':'+matchtwodays[j].scoreB+'</i>'+
                            '<span>'+matchtwodays[j].gameProcName+'</span>'+
                        '</p>'+
                        '<p class="team team2">'+
                            '<img src='+matchtwodays[j].logoListBno+' class="head-photo" alt="">'+
                            '<span class="name">'+matchtwodays[j].teamB+'</span>'+
                        '</p>'+
                    '</div>'+
                '</li>'
            )
        }
    }
    // 录播
    // $.getJSON("https://lpl.qq.com/web201612/data/LOL_MATCH2_MATCH_HOMEPAGE_BMATCH_LIST_134.js", function(result){
    //     // console.log('赛程数据', result.msg)
    //     // 截取有录播的赛程
    //     for (var i = 0; i < result.msg.length; i++) {
    //         // 将MatchStatus等于3 并且 sExt1不为空的数据取出 放到 rebroadcastList 里
    //         if (result.msg[i].MatchStatus === '3' && result.msg[i].sExt1 !== '') {
    //             rebroadcastList.push(result.msg[i])
    //         }
    //         if (result.msg[i].MatchStatus === '1') matchesNotStart.push(result.msg[i]);
    //     }
    //     // 根据 MatchDate 字段来排序
    //     rebroadcastList.sort((a, b) => {
    //         return new Date(b.MatchDate).getTime() - new Date(a.MatchDate).getTime()
    //     })
    //     console.log(rebroadcastList);
    //     console.log(matchesNotStart[0]); // 下一场比赛
        

    //     // 下面这里取出排序完的第一场 并且拿到录播vid
    //     var rebroad = rebroadcastList[0]
    //     rebroadVid = JSON.parse(rebroad.sExt1).sVID
    //     console.log(rebroad) // <--- 这个录播最后一场的数据
    //     console.log(rebroadVid) // <--- 这个录播vid
    // })


    $('.play-box').click(function(){

        // 直播
        // console.log(LiveBMatchList)

        if (LiveBMatchList.msg[134] !== '') {
            playLive(liveVid);
        }else{
            useTxPlay(rebroadVid,true)
        }
    })
}
