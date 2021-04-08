OUT.user = {
    indexInitStatus: function ()
    {
        if(OUT.login.isLogin === false){
            OUT.login.doLogin();
            return;
        }

        var params = {
            'iActId': OUT.site.iActId,
            'game': OUT.site.game,
            'sAppId': OUT.site.sAppId,
        };

        if( ulink.isMSDK() ){
            params = {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'area': ulink.getQueryString('areaid'),
                'partition': ulink.getQueryString('partition'),
                'roleId': ulink.getQueryString('roleid'),
                'platId': ulink.getQueryString('platid'),
            };
        }

        ulink.http.get({
            url: OUT.site.url + '?route=User/init',
            params: params,
            success: function (result) {
                console.log('indexInitStatus=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.showBindRoleDialog(result.jData.signData);
                    return;
                }else if(result.iRet == -1 && result.jData.code == -111){
                    showTips(result.sMsg, 'OUT.login.logout()');
                    return;
                }else if(result.iRet != 0){
                    showTips(result.sMsg);
                    return;
                }
                OUT.role.isBindRole = 1;
                OUT.role.roleInfo = result.jData.roleData;
                OUT.user.selectMatchGroup = result.jData.selectMatchGroup;
                OUT.user.selectArea = result.jData.selectArea;
                OUT.user.weekNo = result.jData.weekNo;
                if(result.jData.selectArea == 2){
                   $('#sel1 option').eq(0).attr('selected',true);
                   $('#sel1 option').eq(1).attr('selected',false);
                }else{
                    $('#sel1 option').eq(1).attr('selected',true);
                    $('#sel1 option').eq(0).attr('selected',false);
                }

                $('#sel2 option').attr('selected',false);
                $('#sel2 option').eq(result.jData.selectMatchGroup - 1).attr('selected',true);
            },
            error: function (e) {
            }
        });
    },
    // 赛程首页排行榜接口
    matchHomeList: function (index) {
        $('.login-tab').removeClass('on');
        if(OUT.user.homeWxList && OUT.user.homeQQList){
            if(index == 2){
                $('.login-tab').eq(0).addClass('on');
                OUT.user.showHomeRankTools(OUT.user.homeQQList);
            }else if(index == 1){
                $('.login-tab').eq(1).addClass('on');
                OUT.user.showHomeRankTools(OUT.user.homeWxList);
            }
            return;
        }
        ulink.http.get({
            url: OUT.site.url + '?route=Team/matchHomeList',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
            } ,
            success: function (result) {
               if(result.iRet != 0){
                    showTips(result.sMsg);
                    return;
                }
                OUT.user.homeQQList = result.jData.qqList;
                OUT.user.homeWxList = result.jData.wxList;
                if( index == 2 ){
                    $('.login-tab').eq(0).addClass('on');
                    OUT.user.showHomeRankTools(OUT.user.homeQQList);
                }else if( index == 1 ){
                    $('.login-tab').eq(1).addClass('on');
                    OUT.user.showHomeRankTools(OUT.user.homeWxList);
                }
            },
            error: function (e) {
            }
        });
    },
    // 主页排行榜数据拼接
    showHomeRankTools: function (data) {
        // 添加其他军团
        var strHtml = '';
        for (var i = 0; i < data.length; i++) {
            switch (i){
                case 0:
                    strHtml += '<li class="legion-li legion-li-first"> '
                    break;
                case 1:
                    strHtml += '<li class="legion-li legion-li-second"> '
                    break;
                case 2:
                    strHtml += '<li class="legion-li legion-li-third"> '
                    break;
                default:
                    strHtml += '<li class="legion-li">'
            }
            strHtml += '<div class="rank-num"> <p class="rank-label">排名</p> <p class="rank-desc">'+ data[i].no +'</p> </div> <div class="msg-box"> <div class="msg-item"> <div class="msg-label">区服</div> <div class="msg-desc">'+data[i].partitionName+'</div> </div> <div class="msg-item"> <div class="msg-label">联盟简称</div> <div class="msg-desc">'+data[i].leagueName+'</div> </div> <div class="msg-item"> <div class="msg-label">军团名</div> <div class="msg-desc">'+data[i].groupName+'</div> </div> <div class="msg-item"> <div class="msg-label">积分</div> <div class="msg-desc">'+data[i].score+'</div> </div></div></li>';
        }
        $("#legion-ul").html(strHtml);
        $("#load-tip").html('正在加载');
    },
    // 获取分组队伍信息
    getGroupList: function () {
        if(OUT.login.isLogin === false){
            return OUT.login.doLogin();
        }


        ulink.http.get({
            url: OUT.site.url + '?route=Team/getGroupList',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'selectArea': OUT.user.selectArea,
                'selectMatchGroup': OUT.user.selectMatchGroup
            } ,
            success: function (result) {
                if (result.iRet == 4001) {
                    OUT.role.showBindRoleDialog(result.jData.signData);
                    return;
                }else if(result.iRet == -1 && result.jData.code == -111){
                    showTips(result.sMsg, 'LoginManager.logout()');
                    return;
                }else if(result.iRet != 0){
                    showTips(result.sMsg);
                    return;
                }
                var tmpArr = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六'];
                $('#matchGroup .text').text('第' + tmpArr[OUT.user.selectMatchGroup - 1] + '赛区');
                var sHtml = '';
                var data = result.jData.list;
                for(var i = 0; i < data.length; i++ ){
                    sHtml += "<li><a href=\"javascript:OUT.user.getByGroupId('"+data[i].groupId+"');\" onclick=\"PTTSendClick('btn','legion-list1','对局详情');\">";
                    sHtml += "<p class=\"th1\"><i></i>"+data[i].no+"</p>";
                    sHtml += "<p class=\"th2\"><em>"+data[i].partitionNoName+"</em><em>"+data[i].leagueName+"</em><em>"+data[i].groupName+"</em></p>";
                    sHtml += "<p class=\"th3\">"+data[i].winNum+"/"+data[i].loseNum+"</p>";
                    sHtml += "<p class=\"th4\">"+data[i].score+"</p>";
                }
                $('#matchGroup ul').html(sHtml);
                if(result.jData.showWinner){
                    $('#matchGroup ul li').eq(0).addClass('out');
                    $('#matchGroup ul li').eq(1).addClass('out');
                }
                console.log('getGroupList=========>' + JSON.stringify(result));
            },
            error: function (e) {
            }
        });
    },
    // 根据groupId 查找比赛信息
    getByGroupId: function (groupId) {
        if(OUT.login.isLogin === false){
            return OUT.login.doLogin();
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Match/getByGroupId',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'groupId': groupId,
            } ,
            success: function (result) {
                console.log('getByGroupId=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.showBindRoleDialog(result.jData.signData);
                    return;
                }else if(result.iRet == -1 && result.jData.code == -111){
                    showTips(result.sMsg, 'LoginManager.logout()');
                    return;
                }else if(result.iRet != 0){
                    showTips(result.sMsg);
                    return;
                }

                var data = result.jData;
                var sHtml = '';
                for(var i = 0; i < data.length; i++){
                    sHtml += '<li><div class="sub-item"><div class="box"><span><em>'+data[i].matchDay + data[i].weekDay+'</em>';
                    sHtml += '<em>小组赛</em></span></div></div><div class="sub-item"><div class="box"><div class="box-mid"><span>';
                    if(data[i].winnerGroupId == data[i].team1Id){
                        sHtml += '<em class="win">'+data[i].team1Name+'</em>vs<em>'+data[i].team2Name+'</em>';
                    }else if (data[i].winnerGroupId == data[i].team2Id){
                        sHtml += '<em>'+data[i].team1Name+'</em> vs <em class="win">'+data[i].team2Name+'</em>';
                    }else {
                        sHtml += '<em>'+data[i].team1Name+'</em> vs <em>'+data[i].team2Name+'</em>';
                    }
                    sHtml += '</span><p>'+data[i].team1Point+'分：'+data[i].team2Point+'分</p></div></div></div></li>';
                }
                $('.sub-page-matchlist ul').html(sHtml);
                openSubPage('matchlist');
            },
            error: function (e) {
            }
        });
    },
    // 对局详情
    getByWeekMG: function () {
        if(OUT.login.isLogin === false){
            return OUT.login.doLogin();
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Match/getByWeekMG',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'selectArea': OUT.user.selectArea,
                'selectMatchGroup': OUT.user.selectMatchGroup,
                'weekNo': OUT.user.weekNo
            } ,
            success: function (result) {
                console.log('getByWeekMG=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.showBindRoleDialog(result.jData.signData);
                    return;
                }else if(result.iRet == -1 && result.jData.code == -111){
                    showTips(result.sMsg, 'LoginManager.logout()');
                    return;
                }else if(result.iRet != 0){
                    showTips(result.sMsg);
                    return;
                }
                var data = result.jData;
                var sHtml = '';
                var text = '';
                for(var i = 0; i < data.length; i++){
                    if(data[i].type == 1){
                        text = '淘汰赛';
                    }else {
                        text = '小组赛';
                    }
                    sHtml += '<li><p class="time">'+data[i].matchDay+' 2021夏季半决赛-'+text+'</p><div class="match-item">';
                    if(data[i].winnerGroupId == data[i].team1Id){
                        sHtml += '<div class="item-box win"><div class="box"><div><p class="area">'+data[i].team1AreaName+'</p>';
                        sHtml += '<span><em>'+data[i].league1Name+'</em><em>'+data[i].group1Name+'</em></span><p class="num">战斗比分：'+data[i].team1Point+'</p>';
                        sHtml += '</div></div></div><i class="icon-vs">vs</i>';
                        sHtml += '<div class="item-box"><div class="box"><div><p class="area">'+data[i].team2AreaName+'</p>';
                        sHtml += '<span><em>'+data[i].league2Name+'</em><em>'+data[i].group2Name+'</em></span><p class="num">战斗比分：'+data[i].team2Point+'</p>';
                    }else if(data[i].winnerGroupId == data[i].team2Id){
                        sHtml += '<div class="item-box"><div class="box"><div><p class="area">'+data[i].team1AreaName+'</p>';
                        sHtml += '<span><em>'+data[i].league1Name+'</em><em>'+data[i].group1Name+'</em></span><p class="num">战斗比分：'+data[i].team1Point+'</p>';
                        sHtml += '</div></div></div><i class="icon-vs">vs</i>';
                        sHtml += '<div class="item-box win"><div class="box"><div><p class="area">'+data[i].team2AreaName+'</p>';
                        sHtml += '<span><em>'+data[i].league2Name+'</em><em>'+data[i].group2Name+'</em></span><p class="num">战斗比分：'+data[i].team2Point+'</p>';
                    }else {
                        sHtml += '<div class="item-box"><div class="box"><div><p class="area">'+data[i].team1AreaName+'</p>';
                        sHtml += '<span><em>'+data[i].league1Name+'</em><em>'+data[i].group1Name+'</em></span><p class="num">战斗比分：'+data[i].team1Point+'</p>';
                        sHtml += '</div></div></div><i class="icon-vs">vs</i>';
                        sHtml += '<div class="item-box"><div class="box"><div><p class="area">'+data[i].team2AreaName+'</p>';
                        sHtml += '<span><em>'+data[i].league2Name+'</em><em>'+data[i].group2Name+'</em></span><p class="num">战斗比分：'+data[i].team2Point+'</p>';
                    }

                    sHtml += '</li>';
                    $('.match-list ul').html(sHtml);
                    if(OUT.user.selectArea == 2){
                        $('#sel3 option').eq(0).attr('selected',true);
                        $('#sel3 option').eq(1).attr('selected',false);
                    }else{
                        $('#sel3 option').eq(1).attr('selected',true);
                        $('#sel3 option').eq(0).attr('selected',false);
                    }

                    $('#sel4 option').attr('selected',false);
                    $('#sel4 option').eq(OUT.user.selectMatchGroup - 1).attr('selected',true);
                    $('#sel5 option').attr('selected',false);
                    $('#sel5 option').eq(OUT.user.weekNo - 1).attr('selected',true);
                }

            },
            error: function (e) {
            }
        });
    }
};