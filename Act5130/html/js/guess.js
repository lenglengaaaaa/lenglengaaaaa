OUT.user = {
    indexInitStatus: function () {
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
                    showTips(result.sMsg, function () {
                        OUT.login.logout();
                    });
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
                $('.shop-top .item').eq(0).find('p').text(result.jData.roleName);
                $('.shop-top .item').eq(1).find('p').text(result.jData.coinNum);
                $('.shop-top .item').eq(0).find('div').text(getPartitionInfo(result.jData.roleData.partition));
                if(OUT.user.selectArea == 2){
                    $('#sel6 option').eq(0).attr('selected',true);
                    $('#sel6 option').eq(1).attr('selected',false);
                }else{
                    $('#sel6 option').eq(1).attr('selected',true);
                    $('#sel6 option').eq(0).attr('selected',false);
                }

                $('#sel7 option').attr('selected',false);
                $('#sel7 option').eq(OUT.user.selectMatchGroup - 1).attr('selected',true);
                $('#sel8 option').attr('selected',false);
                $('#sel8 option').eq(OUT.user.weekNo - 1).attr('selected',true);
                OUT.user.listWithBet();
            },
            error: function (e) {
            }
        });
    },
    // 获取比赛数据
    listWithBet: function () {
        if(OUT.login.isLogin === false){
            OUT.login.doLogin();
            return;
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Match/listWithBet',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'selectArea': OUT.user.selectArea,
                'selectMatchGroup': OUT.user.selectMatchGroup,
                'weekNo': OUT.user.weekNo
            },
            success: function (result) {
                console.log('listWithBet=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.showBindRoleDialog(result.jData.signData);
                    return;
                }else if(result.iRet == -1 && result.jData.code == -111){
                    showTips(result.sMsg, function () {
                        OUT.login.logout();
                    });
                    return;
                }else if(result.iRet != 0){
                    showTips(result.sMsg);
                    return;
                }
                var data = result.jData;
                OUT.user.betList = data;
                if(OUT.user.selectArea == 2){
                    $('#sel6 option').eq(0).attr('selected',true);
                    $('#sel6 option').eq(1).attr('selected',false);
                }else{
                    $('#sel6 option').eq(1).attr('selected',true);
                    $('#sel6 option').eq(0).attr('selected',false);
                }

                $('#sel7 option').attr('selected',false);
                $('#sel7 option').eq(OUT.user.selectMatchGroup - 1).attr('selected',true);
                $('#sel8 option').attr('selected',false);
                $('#sel8 option').eq(OUT.user.weekNo - 1).attr('selected',true);
                OUT.user.createBetHtml();
            },
            error: function (e) {
            }
        });
    },
    // 整理竞猜页面数据html
    createBetHtml: function() {
        var html = '';
        var data = OUT.user.betList;
        var tmpArr = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六'];
        var status = ['end','nostart','on','on'];
        for (var k in data) {
            html += '<li class="match-guess-list"><p class="match-guess-txt1"><span>'+data[k].matchDay+'</span>·<span>第'+tmpArr[OUT.user.selectMatchGroup - 1]+'赛区</span>';
            html += '<a class="btn-match-more" href="javascript:OUT.user.showMorePlay('+k+');" onclick="PTTSendClick(\'btn\',\'btn-match-more\',\'更多玩法\');" title="更多玩法">更多玩法>></a>';
            html += '</p>';
            html += '<div class="match-guess-list-bg '+status[data[k].status]+'">';
            if(data[k].status == 0 && data[k].winnerGroupId == data[k].team1Id){
                html += '<div class="match-guess-box match-guess-left win">';
            }else {
                html += '<div class="match-guess-box match-guess-left">';
            }
            html += '<div class="competitors-information"><p class="competitors-region">'+data[k].team1AreaName+'</p>';
            html += '<p class="competitors-name"><span>'+data[k].league1Name+' </span>  <span>'+data[k].fightTeam1CoinTotal+'</span></p>';
            html += '<p class="competitors-score">战斗比分：<span>'+data[k].team1Point+'</span></p>';
            html += '<a class="btn-match-winner" href="javascript:;" onclick="PTTSendClick(\'btn\',\'btn-match-winner\',\'胜利\');" title="胜利">';
        }
    },
    // 获取任务状态
    getTaskStatus: function () {
        if(OUT.login.isLogin === false){
            OUT.login.doLogin();
            return;
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Task/status',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
            },
            success: function (result) {
                console.log('getTaskStatus=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.showBindRoleDialog(result.jData.signData);
                    return;
                }else if(result.iRet == -1 && result.jData.code == -111){
                    showTips(result.sMsg, function () {
                        OUT.login.logout();
                    });
                    return;
                }else if(result.iRet != 0){
                    showTips(result.sMsg);
                    return;
                }
                var data = result.jData.statusList;
                OUT.user.taskQual = data;
                for (var i in data) {
                    if(data[i] == 1){
                        $('.day-cont .result-list').eq(i-1).find('a').removeClass().addClass('btn-dialog-receive');
                    }else if(data[i] == 2){
                        $('.day-cont .result-list').eq(i-1).find('a').removeClass().addClass('btn-dialog-receive on');
                    }else {
                        $('.day-cont .result-list').eq(i-1).find('a').removeClass().addClass('btn-dialog-receive notreach');
                    }
                }
            },
            error: function (e) {
            }
        });
    },
    // 领取任务奖励
    prize: function (taskId) {
        if(OUT.login.isLogin === false){
            OUT.login.doLogin();
            return;
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Task/prize',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
                'taskNo': taskId
            },
            success: function (result) {
                console.log('prize=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.showBindRoleDialog(result.jData.signData);
                    return;
                }else if(result.iRet == -1 && result.jData.code == -111){
                    showTips(result.sMsg, function () {
                        OUT.login.logout();
                    });
                    return;
                }else if(result.iRet != 0){
                    closeDialog();
                    showTips(result.sMsg, function () {
                        TGDialogS('dialog-active');
                    });
                    return;
                }
                closeDialog();
                showTips('领取成功, 请到游戏邮箱内领取~', function () {
                    TGDialogS('dialog-active');
                });
                OUT.user.taskQual[taskId] = 2;
                $('.day-cont .result-list').eq(taskId-1).find('a').addClass('off');
                $('.shop-top .item').eq(1).find('p').text(result.jData.coinNum);
            },
            error: function (e) {
            }
        });
    },
    // 获取竞猜结果
    getGuessStatus: function () {
        if(OUT.login.isLogin === false){
            OUT.login.doLogin();
            return;
        }

        ulink.http.get({
            url: OUT.site.url + '?route=Task/getGuessStatus',
            params: {
                'iActId': OUT.site.iActId,
                'game': OUT.site.game,
                'sAppId': OUT.site.sAppId,
            },
            success: function (result) {
                console.log('getGuessStatus=========>' + JSON.stringify(result));
                if (result.iRet == 4001) {
                    OUT.role.showBindRoleDialog(result.jData.signData);
                    return;
                }else if(result.iRet == -1 && result.jData.code == -111){
                    showTips(result.sMsg, function () {
                        OUT.login.logout();
                    });
                    return;
                }else if(result.iRet != 0){
                    showTips(result.sMsg);
                    return;
                }
                var data = result.jData.statusList;
                var sHtml = '';
                var classArr = ['','fail','on'];
                OUT.user.taskQual = data;
                for (var i in data) {
                    sHtml += '<div class="result-list"><span>1/4决赛</span><span>XXXXX军团赢</span><span>可领取100</span>';
                    tmpClass = classArr[data[i].status];
                    sHtml += '<a class="btn-dialog-receive fail" href="javascript:;" onclick="PTTSendClick(\'btn\',\'btn-dialog-receive\',\'领取\');" title="领取"></a>';
                }
            },
            error: function (e) {
            }
        });
    }
};