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
    // ��������ڱ仯����Ҫ��������
    var winWidth = document.body.clientWidth || document.documentElement.clientWidth;
    
} 
$('.nav-box li').on('click',function(){
    // $(this).addClass('on').siblings().removeClass('on');
    $('html,body').animate({scrollTop: $($(this).children().attr("href")).offset().top + "px"}, 200);
})

// �н���������
$(function(){  
    //ԭ��ͨ����ʱ������
    //���裺1.�ۼ���  2.��ʱ��
    // ���Լ���10��
    for(var i=0;i<10;i++){
        $('.carouselContent .list').append(
            '<p>'+
            '<span class="date">7��20��</span>'+
            '<span class="nickname">6704983345'+(i+1)+'</span>'+
            '<span class="prize">��е�Գ� �����(7��)'+(i+1)+'</span>'+
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
    //�������ʱ���Ĺ��ܣ���װ��һ���Զ��庯����
    function autoPlay(){ 
        //num--;//num  = num-1
        //num = num-5;
        num-=1;
        if(num < -length1*40){
            num=0;				
        }
        $('.carouselContent .list').css({'transform':'translate3d(0,'+(num/100)+'rem,0'});
    }
    //3.������ʱ��
    timer = setInterval(autoPlay,15);
    
    //��꾭����ʱ����ն�ʱ��
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
	// ����milo������dialog���
	need("biz.dialog", function(Dialog) {
		Dialog.show({
			id: e,
			bgcolor: '#000', //���������֡�����ɫ����ʽΪ"#FF6600"�����޸ģ�Ĭ��Ϊ"#fff"
			opacity: 80 //���������֡���͸���ȣ���ʽΪ��10-100������ѡ
		});
	});
}
//�رյ���
function closeDialog() {
	// ����milo������dialog���
	need("biz.dialog", function(Dialog) {
		Dialog.hide();
	});
}


function formatDate(now) { 
    var year=now.getFullYear();  //ȡ��4λ�������
    var month=now.getMonth()+1;  //ȡ�������е��·ݣ�����0��ʾ1�£�11��ʾ12��
    month=month<10? '0' + month : month;
    var date=now.getDate();      //���������·��е�������1��31��
    date=date<10? '0' + date : date;
    var hour=now.getHours();     //���������е�Сʱ����0��23��
    hour=hour<10? '0' + hour : hour;
    var minute=now.getMinutes(); //���������еķ�������0��59��
    minute=minute<10? '0' + minute : minute;
    var second=now.getSeconds(); //���������е�������0��59��
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

    // ������Ƶ
    var mainPlayer;
    /**
     * ������Ѷ��Ƶ����
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


    var liveVid = '' // ֱ��vid
    var liveA='';//teamA
    var liveB='';//teamB  
    var LiveBolist = ['Ĭ��', 'BO1', 'BO2', 'BO3', 'BO5', '����ģʽ', '�̿�ģʽ', '��¡����ս', '˫�˹���', '��������ս', '��������ս', '���޻���'];
    var liveWeek='';
    var scoreA='';
    var scoreB='';
    var logoListA = '';

    // δ��ʼ����
    // ��ȡ���� 0 ���ʱ���
    var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
    var timenow =Date.now()/1000;
    console.log(timenow)
    // һ����86400��
    var SevenDayLater = timeStamp + 86400 * 3;

    console.log(timeStamp);
    console.log(SevenDayLater);
    var matchesNotStart =[];// δ��ʼ������
    var matchtwodays=[];//��ȡ���ĺ����������

    // ¼��
    var rebroadcastList = [], // �ѽ���������(¼������)
    rebroadVid = ''; // ¼��vid

    /**
     * ��ѯ����
     * @param {String} tid ����id
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
            // ��MatchStatus����3 ���� sExt1��Ϊ�յ�����ȡ�� �ŵ� rebroadcastList ��
            if (val.MatchStatus === '3' && val.sExt1 !== '') {
                rebroadcastList.push(val);
            }
            
            if (val.MatchStatus === '1'){
                // logoListAno=getTeamById(val['TeamA'])['TeamLogo'];
                // logoListBno=getTeamById(val['TeamB'])['TeamLogo'];
                // logoListAno.push(getTeamById(val['TeamA'])['TeamLogo']);
                // logoListBno.push(getTeamById(val['TeamB'])['TeamLogo'])


                // val.MatchDate.substr(0,10) ��ȡ���ı�������
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

        // console.log(matchdaytimer)//�������ʱ���
        console.log(matchesNotStart[0].time); // δ��ʼ������
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

        $('.play-title').html('����ֱ����2020ְҵ�����ļ��������� '+liveA+' VS '+liveB+' '+liveWeek+'');
        $('.live-box ul').append(
            '<li class="live">'+
            '<p class="titl">����ֱ��</p>'+
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
                // ��MatchStatus����3 ���� sExt1��Ϊ�յ�����ȡ�� �ŵ� rebroadcastList ��
                if (val.MatchStatus === '3' && val.sExt1 !== '') {
                    rebroadcastList.push(val);
                }
            })(i,list134.msg[i]);}
        
        // ���� MatchDate �ֶ�������
        rebroadcastList.sort((a, b) => {
            return new Date(b.MatchDate.replace(/-/g, '/')).getTime() - new Date(a.MatchDate.replace(/-/g, '/')).getTime()
        })
        console.log(rebroadcastList);
        console.log(matchesNotStart[0]); // ��һ������
        

        // ��������ȡ��������ĵ�һ�� �����õ�¼��vid
        var rebroad = rebroadcastList[0]
        rebroadVid = JSON.parse(rebroad.sExt1).sVID
        console.log(rebroad) // <--- ���¼�����һ��������
        console.log(rebroadVid) // <--- ���¼��vid
    })
    }

    function matchnostart(){
        for( var j=0;j<matchtwodays.length;j++){
            $('.live-box ul').append(
                '<li class="nostart">'+
                '<p class="titl">δ��ʼ '+matchtwodays[j].time.substr(5, 11)+'</p>'+
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
    // ¼��
    // $.getJSON("https://lpl.qq.com/web201612/data/LOL_MATCH2_MATCH_HOMEPAGE_BMATCH_LIST_134.js", function(result){
    //     // console.log('��������', result.msg)
    //     // ��ȡ��¼��������
    //     for (var i = 0; i < result.msg.length; i++) {
    //         // ��MatchStatus����3 ���� sExt1��Ϊ�յ�����ȡ�� �ŵ� rebroadcastList ��
    //         if (result.msg[i].MatchStatus === '3' && result.msg[i].sExt1 !== '') {
    //             rebroadcastList.push(result.msg[i])
    //         }
    //         if (result.msg[i].MatchStatus === '1') matchesNotStart.push(result.msg[i]);
    //     }
    //     // ���� MatchDate �ֶ�������
    //     rebroadcastList.sort((a, b) => {
    //         return new Date(b.MatchDate).getTime() - new Date(a.MatchDate).getTime()
    //     })
    //     console.log(rebroadcastList);
    //     console.log(matchesNotStart[0]); // ��һ������
        

    //     // ��������ȡ��������ĵ�һ�� �����õ�¼��vid
    //     var rebroad = rebroadcastList[0]
    //     rebroadVid = JSON.parse(rebroad.sExt1).sVID
    //     console.log(rebroad) // <--- ���¼�����һ��������
    //     console.log(rebroadVid) // <--- ���¼��vid
    // })


    $('.play-box').click(function(){

        // ֱ��
        // console.log(LiveBMatchList)

        if (LiveBMatchList.msg[134] !== '') {
            playLive(liveVid);
        }else{
            useTxPlay(rebroadVid,true)
        }
    })
}
