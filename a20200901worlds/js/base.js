window.singerPlayer = '';
var Base = {
    iLS: 0, // 临时数据,
    dGameTopId: 1,
    dGameId: 128,
    dRecommendId: 175, // 一级推荐位ID
    dDefaultGameType: 1,
    dDefaultChat: 101,
    dcurrBMatchInfo: {},
    dLoadCurrBMatchFlag: false,
    videoOn: {},
    dGroupData: [], //小组赛赛程
    dStartTime: '2020-09-25 16:00:00', //赛事开始时间
    dRecommendCfg: {
        banner: 176,
        aroundGame1: 177, //游戏周边-1
        aroundGame2: 178, //游戏周边-2-轮播
        urbanExplorat1: 179, //城市探索-1-轮播
        urbanExplorat2: 180, //城市探索-2
        urbanExplorat3: 181, //城市探索-3
        wonderActiv1: 182, //精彩活动-横幅
        wonderActiv2: 183, //精彩活动-大-1
        wonderActiv3: 184, //精彩活动-大-2
        wonderActiv4: 185, //精彩活动-小-1
        wonderActiv5: 186, //精彩活动-小-2
        wonderActiv6: 187, //精彩活动-小-3
        wonderActiv7: 188, //精彩活动-小-4
        musicEntrance1: 189, //音乐视频-入口-1
        musicEntrance2: 190, //音乐视频-入口-2
        musicEntrance3: 191, //音乐视频-入口-3
        musicEntrance4: 192, //音乐视频-轮播-1
    }, // 推荐配置

    dRefreshFlag: 0, // 刷新标识 0 初始状态， 1 刷新前为直播，2 刷新前为点播
    dNoLive: true, // 当前页面是否已经有直播，true没有
    dGameData: [], //赛程数据
    GameModeList: ['默认', 'BO1', 'BO2', 'BO3', 'BO5', '射手模式', '刺客模式', '克隆大作战', '双人共玩', '魄罗王大战', '极限闪击战', '无限火力'],
    dLivePage: "https://lpl.qq.com/es/live.shtml", // 直播页面
    dNewsUrl: "//apps.game.qq.com/lol/match/apis/searchNewsInfo.php",
    dPreUrl: "//lpl.qq.com/web201612/data/",
    stats: "//lpl.qq.com/es/stats.shtml?bmid=", //数据
    video_detail: "//lpl.qq.com/es/video_detail.shtml?nid=", //视频
    init: function() {
        var self = Base;
        self.InitNews(); //头部资讯
        self.InitGameType(); //赛事进度
        self.InitGameList(); //赛程
        self.InitRecommendNews(); //广告位
        self.InitGameBaseInfo(); //参赛战队
        self.InitVideoNews();
        self.InitLive(); // 判断是直播还是点播

    },
    /*头部资讯*/
    InitNews: function() {
        var self = Base;
        var goUrl = '//apps.game.qq.com/cmc/cross?serviceId=3&tagids=1283&source=web_pc&typeids=1';
        $.getJSON(goUrl, function(res) {
            if (res.status == 0) {
                var data = res.data.items;
                self.carousel(data);
            }

        });
    },
    //跑马灯效果
    carousel: function(data) {
        function sel(obj) {
            var html = '';
            //原理：通过定时器来做
            //步骤：1.累加器  2.定时器
            for (var k in data) {
                html += `<li><a href="//lol.qq.com/news/detail.shtml?type=1&docid=${data[k]['iDocID']}" target="_blank"></a>${data[k]['sTitle']}</li>`;
            };
            $(obj).html(html)
            var length1 = $(obj).children('li').length;
            var tag = $(obj).children('li').clone();
            $(obj).append(tag);
            var num = 0;
            var timer = null;
            //把这个定时器的功能，封装到一个自定义函数中
            function autoPlay() {
                num -= 1;
                if (num < -length1 * 40) {
                    num = 0;
                }
                $(obj).css({ 'transform': 'translate3d(0,' + num + 'px,0' });
            }
            //3.开启定时器
            timer = setInterval(autoPlay, 50);
        }
        sel($('#broadcastContent'));
        sel($('#broadcastContent1'));
        sel($('#broadcastContent2'));

    },
    /*赛程*/
    InitGameList: function() {
        var self = Base;
        var goUrl = '//lpl.qq.com/web201612/data/LOL_MATCH2_MATCH_HOMEPAGE_BMATCH_LIST_' + self.dGameId + '.js';
        $.ajax({
            type: "get",
            url: goUrl,
            dataType: 'json',
            async: false,
            success: function(res) {
                if (res.status == 0) {
                    var matchList = res.msg;
                    var start = matchList.length - 1;
                    var dLoadCurrBMatchFlag = false;
                    for (var i = start; i >= 0; i--) {
                        if (!dLoadCurrBMatchFlag) {
                            if (+matchList[i]['MatchStatus'] == 3) {
                                self.dcurrBMatchId = matchList[i]['bMatchId'];
                                self.dcurrBMatchInfo = matchList[i]; //最近结束的场 用于点播
                                dLoadCurrBMatchFlag = true;
                            }
                        }

                    }
                    self.dGameData = res.msg;

                }
            }
        })
    },
    /*直播*/
    InitLive: function(obj) {
        var self = Base;
        var startDate = new Date(self.dStartTime).getTime();
        var liveMatchLIst = LiveBMatchList.msg;
        if (!$.isEmptyObject(liveMatchLIst[self.dGameTopId])) {
            var liveObjList = liveMatchLIst[self.dGameTopId];
            self.dNoLive = false;
        } else if (!$.isEmptyObject(liveMatchLIst[self.dGameId])) {
            var liveObjList = liveMatchLIst[self.dGameId];
            self.dNoLive = false;
        } else {
            var now = new Date().getTime();
            self.dNoLive = true;
            /*-----------测试-------------*/
            self.MatchLive("764502578"); //直播
            self.FillLivePlayerInfo('.left', 2);
            self.FillLivePlayerInfo('.right', 4);
            return;
            /*-----------测试-------------*/
            if (now < startDate) { // 回放
                var obj = {
                    "GameName": "2019全球总决赛",
                    "GameModeName": "BO5",
                    "TeamA": "7",
                    "TeamB": "117",
                    "sExt1": "{\"iVid\":\"110892\",\"sVID\":\"u00325hqvgk\",\"iTotal\":\"601595\",\"iScore\":\"0\",\"sDesc\":\"【回放】S9决赛 FPX vs G2 第二局\",\"sName\":\"S9决赛 FPX vs G2_02\",\"sImg\":\"//puui.qpic.cn/vpic/0/u00325hqvgk.png/0\",\"iTime\":\"2887\",\"sImg_s\":\"//puui.qpic.cn/vpic/0/u00325hqvgk.png/0\",\"iBattleid\":\"0\",\"iAreaid\":\"0\",\"iGametime\":\"0\",\"iComment\":\"4395813114\"}",
                };
                self.ShowGameScheduleVod(obj);
                return;
            } else { //点播
                self.ShowGameScheduleVod(self.dcurrBMatchInfo);
                return;
            }
        }
        if (typeof(liveObjList[0]) != 'undefined') {
            var liveObj = liveObjList[0];
            var teamList = TeamList.msg;
            $('#game_name').html(liveObj.GameName + ' ' + teamList[liveObj.TeamA].TeamName + ' vs ' + teamList[liveObj.TeamB].TeamName + ' ' + self.GameModeList[+obj.GameMode]);
            $('#live-status').html('正在直播:');
            $(".against-fc .team-logo1 img").attr('src', teamList[liveObj.TeamA].TeamLogo);
            $(".against-fc .team-logo2 img").attr('src', teamList[liveObj.TeamB].TeamLogo);
            $(".against-fc .team-num1").html(liveObj.ScoreA);
            $(".against-fc .team-num2").html(liveObj.ScoreB);
            self.MatchLive(liveObj.Video3); //直播
            self.FillLivePlayerInfo('.left', liveObj.TeamA);
            self.FillLivePlayerInfo('.right', liveObj.TeamB);
        }
    },
    /*直播下 查看对阵信息*/
    FillLivePlayerInfo: function(flag, teamId) {
        var self = Base;
        var goUrl = '//lpl.qq.com/web201612/data/LOL_MATCH2_TEAM_TEAM' + teamId + '_INFO.js';
        $.getJSON(goUrl, function(res) {
            if (res.status == 0) {
                var data = res.msg.activePlayers;
                var sHtml = '';
                for (var x in data) {
                    if (data[x]['Sex'] == '2') {
                        sHtml += `<span>
                                    <img class="hreo" src="${data[x]['UserIcon']}" alt="" title="${data[x]['NickName']}">
                                    <div><img src="//game.gtimg.cn/images/lpl/act/a20200901worlds/icon-hreo.png" alt=""></div>
                                </span>`;
                    }
                }
                $('.against-fc ' + flag + '').html(sHtml);
            }
        })
    },
    /*点播*/
    ShowGameScheduleVod: function(obj) {
        var self = Base;
        var teamList = TeamList.msg;
        var title = obj.GameName + ' ' + teamList[obj.TeamA].TeamName + ' vs ' + teamList[obj.TeamB].TeamName + ' ' + obj.GameModeName;
        var sExt1 = JSON.parse(obj.sExt1);
        self.ShowVideo(sExt1.sVID, title);
    },
    ShowVideo: function(vid, title) {
        var self = Base;
        self.loadVideo(vid);
        $('#live-status').html('正在回放：');
        $('#game_name').html(title);
    },
    loadVideo: function(vid) {
        var videoConId = 'liveCon';
        var $videoCon = $('#' + videoConId);
        if (window.singerPlayer) {
            setTimeout(function() {
                window.singerPlayer.play({
                    vid: vid,
                    autoplay: true
                });
            }, 1000)

        } else {
            window.singerPlayer = new Txplayer({
                containerId: videoConId,
                vid: vid,
                width: $videoCon.width(),
                height: $videoCon.height(),
                autoplay: true
            });

        }
    },
    /*中台播放器*/
    MatchLive: function(video3) {
        var self = Base;
        var goUrl = '//lol.sw.game.qq.com/lol/commact/?proj=a20200415livelink&c=a20200415livelink&a=getMatchScheduleList';
        $.getScript(goUrl, function() {
            if (J_SWOOLE.status == 0) {
                // var anchorList = J_SWOOLE.data.anchorList;
                var anchorList = [{
                    "anchorInfo": {
                        "anchorIcon": "",
                        "anchorId": 764502578,
                        "anchorLabel": null,
                        "anchorName": "LPL上海",
                        "anchorType": null,
                        "isAuth": false,
                        "lastStartTime": 0,
                        "open": 1,
                        "originTag": null,
                        "prePlatId": 9,
                        "sAnchorId": "9_764502578"
                    },
                    "extInfo": {
                        "gameProgram": "{\"subTitle\":\"TES VS JDG\",\"promotionUrl\":\"\",\"barrageSwitch\":false,\"memoContent\":\"\"}"
                    },
                    "gameInfo": {
                        "gameBanner": "http://livelink-75088.pictestsz.qpic.cn/157406442554490668.png",
                        "gameDesc": "英雄，一起去超越！",
                        "gameIcon": "https://midas.gtimg.cn/midas/images/logo/lol/90.png",
                        "gameId": "lol",
                        "gameLabel": "MOBA",
                        "gameName": "英雄联盟",
                        "heroId": ""
                    },
                    "playInfo": {
                        "height": 0,
                        "hvDirection": 0,
                        "livePlatIcon": "",
                        "livePlatId": "livelink",
                        "livePlatName": "",
                        "streamInfo": [{
                                "bitrate": 2000,
                                "desc": "超清",
                                "flvUrl": "http://37055.liveplay.myqcloud.com/live/198183848_3000p.flv",
                                "hlsUrl": "http://37055.liveplay.myqcloud.com/live/198183848_3000p.m3u8",
                                "rtmpUrl": ""
                            },
                            {
                                "bitrate": 1500,
                                "desc": "高清",
                                "flvUrl": "http://37055.liveplay.myqcloud.com/live/198183848_1500p.flv",
                                "hlsUrl": "http://37055.liveplay.myqcloud.com/live/198183848_1500p.m3u8",
                                "rtmpUrl": ""
                            },
                            {
                                "bitrate": 900,
                                "desc": "标清",
                                "flvUrl": "http://37055.liveplay.myqcloud.com/live/198183848_800p.flv",
                                "hlsUrl": "http://37055.liveplay.myqcloud.com/live/198183848_800p.m3u8",
                                "rtmpUrl": ""
                            }
                        ],
                        "width": 0
                    },
                    "roomInfo": {
                        "pid": "764502578",
                        "roomDetail": "2020全球总决赛即将到来，在盛典来临之际，我们来回顾一下这场惊心动魄的JDG与TES的巅峰之战！\n2020赛季LPL夏季赛总决赛巅峰大战举行，由常规赛排名第一的TES对阵第二的JDG。双方在分别淘汰SN和LGD后会师决赛，这也是春季赛决赛后两队再次相遇在夏季赛决赛，春季赛决赛中JDG3-2险胜TES夺得冠军。最终，TES3-2逆转JDG获得夏季赛冠军，战胜春季赛苦主队史首次夺得银龙杯，TES中单选手Knight夺得夏季赛决赛FMVP，TES成为LPL一号种子出征2020全球总决赛。",
                        "roomIcon": "https://livelink-75088.picgzc.qpic.cn/159229873524923339.png",
                        "roomTitle": "LPL上海",
                        "viewers": 0
                    }
                }];
                if (anchorList) {
                    var live = {};
                    anchorList.forEach(function(value, index) {
                        if (value['anchorInfo']['anchorId'] == +(video3)) {
                            var streamInfo = value['playInfo']['streamInfo'];
                            var arr = [];
                            streamInfo.forEach(function(v, i) {
                                var obj = {
                                    'value': v['flvUrl'].replace("http:", ""),
                                    'type': v['desc']
                                };
                                arr.push(obj)

                            });


                            live['anchorId'] = video3;
                            live['streamUrl'] = arr;
                            live['containerId'] = 'liveCon';
                        }
                    });
                    if (!$.isEmptyObject(live)) {
                        Base.LiveLinkVideo(live);

                    }
                }

            }

            console.log(anchorList)
        })
    },
    LiveLinkVideo: function(live) {
        const player = LiveLink.Player({
            channelCode: "l_live",
            autoPlay: true,
            // streamUrl: live.streamUrl,
            streamUrl: "https://hlstct.douyucdn2.cn/dyliveflv1a/1126960rjaFUqNbu_550.m3u8?txSecret=4303345fe2a68b2c5e8fef9251a68215&txTime=5f647cd5&token=cpg-tengxun-0-1126960-ab3e3ff62b208a8eb668f74f70bdff93&did=&origin=all&vhost=play2&tp=36a6dbf4",
            anchorId: live.anchorId,
            platCode: "lol", //待定
            gameCode: "lol",
            // 主播所在的房间id
            // 视频正在下载时显示的图像 默认无
            poster: "",
            defaultSharpnessType: "高清", // 拉流时选择的清晰度
            preload: false,
            muted: true,
            playInline: false,
            inactivityTimeout: 4000,
            containerId: live.containerId,
            //视频上部配置的按钮,数组和对象均可，默认reloadBtn和liveTitle
            controlTitle: ["liveTitle"],
            //视频下部配置的按钮，默认空，如果不传barrageBtn;则不会拉取弹幕，
            controlBar: ["sharpnessBtn"],
            baseSize: 1,
            //飘屏弹幕默认配置 可不传
            speed: 90, //弹幕速度
            commentHeight: 36, //弹幕高度
            fontSize: 16, // 弹幕字体大小
            opacity: 100, //弹幕透明度
            max: 100, // 弹幕的预上屏的最大条数限制
            mode: "full", //弹幕模式
            factor: 1 //全屏缩放因子
        })
        // player.on('ready', function() {
        //     console.log($("#liveCon .egp-big-play-button"))
        //     console.log(111)
        //     $("#liveCon .egp-big-play-button").trigger("click");
        // })
    },

    /*赛事类型*/
    InitGameType: function() {
        var self = Base;
        var goUrl = "//lpl.qq.com/web201612/data/LOL_MATCH2_GAME_" + self.dGameId + "_GAMETYPE_INFO.js";
        var sHtml = "";
        self.isOpen = true;
        $.getScript(goUrl, function() {
            if (GameTypeList.status == 0) {
                var data = GameTypeList.msg;
                if (data) {
                    self.dDefaultGameType = +data[0].GameTypeId;
                    for (var k in data) {
                        if (+data[k].iDefault == 1) {
                            self.dDefaultGameType = +data[k].GameTypeId;
                        }
                        sHtml += `<a href="javascript:;" onclick="Base.InitGameSchedule2(${data[k]['GameTypeId']})" class="btn${+k+1}" id="game_type_${data[k]['GameTypeId']}" onclick="PTTSendClick('btn','cont3btn${+k+1}','${data[k]['GameTypeName']}');"><span>${data[k]['GameTypeName']}</span></a>`;
                    };
                }

                $("#gameType").html(sHtml);
                $("#game_type_" + self.dDefaultGameType).click();
                // self.InitGameSchedule2(self.dDefaultGameType); // 比赛进度
            }
        });
    },
    /*赛事进度*/
    InitGameSchedule2: function(gameType) {
        var self = Base;
        var goUrl = "//lpl.qq.com/web201612/data/LOL_MATCH2_GAME_" + self.dGameId + "_PROC_INFO_NEW.js";
        $("[id^=game_type_]").removeClass('on');
        $("#game_type_" + gameType).addClass('on');
        // 根据赛制模板类型渲染数据
        switch (+gameType) {
            case 19:
                // 小组赛
                $.getScript(goUrl, function() {
                    if (GameProcList.status == 0) {
                        var returnObj = GameProcList['msg'][+gameType];
                        var data = returnObj.data;
                        if (data) {
                            self.InitTeamScoreBoard02(gameType, 0); // 战队积分榜(小组)
                            self.ShowBMatchsByList(returnObj);
                            return;
                        }
                    }
                });
                break;
            case 28:
                // 入围赛
                self.InitTeamScoreBoard02(gameType); // 战队积分榜（入围）
                self.ShowBMatchsByTmpl28(gameType); //入围赛
                break;
            case 18:
                // 淘汰赛
                self.ShowBMatchsByTmpl18(gameType);
                break;
        }
    },
    // 战队积分榜
    InitTeamScoreBoard02: function(gameType) {
        var self = Base;
        var goUrl = self.dPreUrl + 'LOL_MATCH2_GAME_' + self.dGameId + '_' + gameType + '_GROUP_TEAM_SCORE_TOP.js';
        var teamList = TeamList.msg;
        $.getScript(goUrl, function() {
            if (GroupTeamScores.status == 0) {
                var groups = (+gameType == 28 ? ['A', 'B'] : ['C', 'D', 'E', 'F']);
                var scores = GroupTeamScores.msg.score;
                if (scores) {
                    for (var x in groups) {
                        var sHtml = "";
                        var temarr = scores[groups[x]];
                        temarr.forEach(function(value, index) {
                            sHtml += `<li>
                                        <div class="data1">${+index+1}</div>
                                        <div class="data2">
                                            <div class="team-logo"><img src="${teamList[value.TeamId].TeamLogo}"></div>
                                            <p class="team-name">${teamList[value.TeamId].TeamName}</p>
                                        </div>
                                        <div class="data3"><span class="font1">${value.Value1}</span>/<span class="font2">${value.Value3}</span></div>
                                        <div class="data4">${value.Score}</div>
                                    </li>`;
                        });
                        $("#team_score_board_" + groups[x]).html(sHtml);
                        //处理入围赛积分头部
                        if (+gameType == 28) {
                            if (new Date('2020/9/29 8:00:00') > new Date()) {
                                var left = `<p class="txt1">晋级2020全球总决赛小组赛队伍</p>
                                    <p class="team-promotion spr"><img src="//img.crawler.qq.com/lolwebvideo/20171204150327/6fa86a8e4d50f72b5fb016beb8492153/0"><span class="team-name">待定</span><span class="team-num">A组 第一名</span></p>`
                            } else {
                                var left = `<p class="txt1">晋级2020全球总决赛小组赛队伍</p>
                                    <p class="team-promotion promotion spr"><img src="${teamList[scores['A'][0]['TeamId']].TeamLogo}"><span class="team-name">${teamList[scores['A'][0]['TeamId']].TeamName}</span><span class="team-num">A组 第一名</span></p>`
                            }

                            if (new Date('2020/9/29 8:00:00') > new Date()) {
                                var right = `<p class="txt1">晋级2020全球总决赛小组赛队伍</p>
                                    <p class="team-promotion spr"><img src="//img.crawler.qq.com/lolwebvideo/20171204150327/6fa86a8e4d50f72b5fb016beb8492153/0"><span class="team-name">待定</span><span class="team-num">B组 第一名</span></p>`
                            } else {
                                var right = `<p class="txt1">晋级2020全球总决赛小组赛队伍</p>
                                    <p class="team-promotion promotion spr"><img src="${teamList[scores['B'][0]['TeamId']].TeamLogo}"><span class="team-name">${teamList[scores['B'][0]['TeamId']].TeamName}</span><span class="team-num">B组 第一名</span></p>`
                            }
                            $(".promotion-box .left").html(left);
                            $(".promotion-box .right").html(right);

                        }

                    }
                }
            }
        });
    },
    /*入围赛模板*/
    ShowBMatchsByTmpl28: function(gameType, flag) {
        var self = Base;
        var goUrl = '//lpl.qq.com/web201612/data/LOL_MATCH2_GAME_PROCDATA_' + self.dGameId + '_' + gameType + '_GAMETYPE_INFO_SP.js';
        var teamList = TeamList.msg;
        var sHtml = '';
        $.getJSON(goUrl, function(res) {
            if (res.status == 0) {
                var data = jQuery.parseJSON(res.msg.ChartData);
                var line = '<span class="line"></span>';
                var line1 = '<span class="line line1"></span>';
                var htmlArr = [];
                if (data) {
                    for (var x in data) {
                        var matchobj = data[x];
                        switch (x) {
                            case '1':
                                if (+matchobj[0].GameId != 0) {
                                    htmlArr[0] = self.ReturnTmpl01Element(matchobj[0], '');
                                } else {
                                    htmlArr[0] = self.ReturnTmpl01ElementT(matchobj[1], '');
                                }
                                sHtml += line;
                                if (+matchobj[1].GameId != 0) {
                                    htmlArr[1] = self.ReturnTmpl01Element(matchobj[1], '');
                                } else {
                                    htmlArr[1] = self.ReturnTmpl01ElementT(matchobj[1], '');
                                }
                                break;
                            case '2':
                                if (+matchobj[0].GameId != 0) {
                                    htmlArr[2] = self.ReturnTmpl01Element(matchobj[0], 'vs-left2');
                                } else {
                                    htmlArr[2] = self.ReturnTmpl01ElementT(matchobj[1], 'vs-left2');
                                }
                                if (+matchobj[1].GameId != 0) {
                                    htmlArr[3] = self.ReturnTmpl01Element(matchobj[1], 'vs-left2');
                                } else {
                                    htmlArr[3] = self.ReturnTmpl01ElementT(matchobj[1], 'vs-left2');
                                }
                                break;
                            case 'fir':
                                htmlArr[4] = self.ReturnTmpl01ElementS(matchobj);
                                break;
                            case 'sec':
                                htmlArr[5] = self.ReturnTmpl01ElementS(matchobj);
                                break;
                        }
                    }
                    $(".right-vsbox1").html(htmlArr[0] + line + htmlArr[2] + line1 + htmlArr[4]);
                    $(".right-vsbox2").html(htmlArr[1] + line + htmlArr[3] + line1 + htmlArr[5]);
                }
            }
        });
    },
    // 入围赛
    ReturnTmpl01Element: function(data, flag) {
        var self = Base;
        var teamList = TeamList.msg;
        var sHtml = '';
        var NewsId = false;

        if (+data.MatchStatus == 3 && data.NewsId != 0) {
            NewsId = true;
        }
        if (+data.TeamA == 85) {
            var htmlA = `<span class="team-name">待定</span><span class="team-num">-</span>`;
        } else {
            var htmlA = `<img src="${teamList[data.TeamA].TeamLogo}">
                          <span class="team-name">${teamList[data.TeamA].TeamName}</span><span class="team-num">${data.ScoreA}</span>`;
        }
        if (+data.TeamB == 85) {
            var htmlB = `<span class="team-name">待定</span><span class="team-num">-</span>`;
        } else {
            var htmlB = `<img src="${teamList[data.TeamB].TeamLogo}">
                          <span class="team-name">${teamList[data.TeamB].TeamName}</span><span class="team-num">${data.ScoreB}</span>`;
        }
        sHtml += `<div class="vs-left ${flag} ${data.MatchStatus==1?'vs-dd':''}">
                        <p class="spr team-one ${data.MatchWin==1?'win':''}">${htmlA}</p>
                        <p class="spr team-two ${data.MatchWin==2?'win':''}">${htmlB}</p>
                        <p class="txt1">${self.getDateStr(data.MatchDate)}</p>
                        <a href="${NewsId==true?self.stats+data.bMatchId:'javascript:;'}" target="${NewsId==true?'_blank':''}" class="btn btn-data on" onclick="PTTSendClick('btn','box3-data1','数据');"><span>数据</span></a>
                        <a href="${NewsId==true?self.video_detail+data.NewsId+'&bMatchId='+data.bMatchId:'javascript:;'}" target="${NewsId==true?'_blank':''}" class="btn btn-video on" onclick="PTTSendClick('btn','box3-video1','视频');"><span>视频</span></a>
                    </div>`;

        return sHtml;
    },
    // 入围赛待定
    ReturnTmpl01ElementT: function(data, flag) {
        var self = Base;
        var teamList = TeamList.msg;
        var sHtml = '';
        var NewsId = false;
        if (data.MatchStatus == 3 && data.NewsId != 0) {
            NewsId = true;
        }
        sHtml += `<div class="vs-left vs-dd ${flag}">
                                    <p class="spr team-one">
                                     <span class="team-name">待定</span>
                                     <span class="team-num">-</span>
                                    </p>
                                    <p class="spr team-two">
                                    <span class="team-name">待定</span>
                                     <span class="team-num">-</span>
                                    </p>
                                    <p class="txt1"></p>
                                    <a href="${NewsId==true?self.stats+data.bMatchId:'javascript:;'}" target="${NewsId==true?'_blank':''}" class="btn btn-data on" onclick="PTTSendClick('btn','box3-data1','数据');"><span>数据</span></a>
                                    <a href="${NewsId==true?self.video_detail+data.NewsId+'&bMatchId='+data.bMatchId:'javascript:;'}" target="${NewsId==true?'_blank':''}" class="btn btn-video on" onclick="PTTSendClick('btn','box3-video1','视频');"><span>视频</span></a>
                        </div>`;

        return sHtml;
    },
    //入围赛胜出
    ReturnTmpl01ElementS: function(data) {
        var self = Base;
        var teamList = TeamList.msg;
        var sHtml = '';
        if (data.TeamId && data.TeamId != 0 && data.TeamId != 85) {
            sHtml += `<div class="result promotion">
                    <p class="txt1">晋级2020全球总决赛小组赛队伍</p>
                    <p class="team-promotion spr"><img src="${teamList[data.TeamId].TeamLogo}"><span class="team-name">${teamList[data.TeamId].TeamName}</span><span class="team-num">胜者</span></p>
                </div>`;
        } else {
            sHtml += `<div class="result">
                        <p class="txt1">晋级2020全球总决赛小组赛队伍</p>
                        <p class="pending spr"><span class="team-name">待定</span></p>
                    </div>`;
        }


        return sHtml;
    },
    /*小组赛列表*/
    ShowBMatchsByList: function(returnObj) {
        var self = Base;
        var arr = [];
        var sHtml = '';
        var data = returnObj.data;
        var gameProcId = 0;
        data.forEach(function(value, index) {
            sHtml += `<div class="swiper-slide" id="process_1_${value.GameProcId}" onclick="Base.ShowGroupList(${value.GameProcId})">${value.GameProcName}</div>`;
        });
        $("#day-sw_2").html(sHtml);
        if (+returnObj.liveFlag == 1) {
            gameProcId = data[+returnObj.liveNo].GameProcId;
        } else {
            if (self.dcurrBMatchInfo && self.dcurrBMatchInfo.GameTypeId == 19) {
                gameProcId = self.dcurrBMatchInfo.GameProcId
            } else {
                gameProcId = data[+returnObj.currNo].GameProcId;
            }
        }
        $("#process_1_" + gameProcId).click();

    },
    ShowGroupList: function(GameProcId) {
        var self = Base;
        var data = self.dGameData;
        var sHtml = '';
        var teamList = TeamList.msg;
        var NewsId = false;
        var txt = '';
        for (var k in data) {
            if (data[k]['GameProcId'] == GameProcId && data[k]['GameTypeId'] == 19) {
                if (data[k].MatchStatus == 3 && data[k].NewsId != 0) {
                    NewsId = true;
                }

                if (+data[k]['MatchStatus'] == 1) {
                    txt = `<a href="javascript:;" class="btn-video" onclick="PTTSendClick('btn','box2-video2','未开始');">未开始</a>`;
                } else if (+data[k]['MatchStatus'] == 2) {
                    var shref = self.dLivePage + '?bgid=' + data[k].GameId + '&bmid=' + data[k].bMatchId;
                    txt = `<a href="${shref}" class="btn-video" onclick="PTTSendClick('btn','box2-video3','观看直播');">观看直播</a>`;
                } else {
                    txt = `<a href="${NewsId==true?self.video_detail+data[k].NewsId+'&bMatchId='+data[k].bMatchId:'javascript:;'}" target="${NewsId==true?'_blank':''}" class="btn-video" onclick="PTTSendClick('btn','box2-video1','视频');">视频</a>`;
                }
                sHtml += `<li class="${+data[k]['MatchStatus']==1?'nostart':'ending'}">
                                    <div class="timebox"><span class="txt1">${data[k].MatchDate.split(' ')[0]}</span><span class="txt2">${data[k].MatchDate.split(' ')[1].substr(0, 5)}</span></div>
                                    <div class="vsbox">
                                        <div class="team-logo team-logo1"><img src="${teamList[data[k].TeamA].TeamLogo}"></div>
                                        <span class="team-name1">${teamList[data[k].TeamA].TeamName}</span>
                                        <span class="team-num1 ${data[k].MatchWin==1?'on':''}">${data[k].ScoreA}</span>
                                        <span class="bf">:</span>
                                        <span class="team-num2 ${data[k].MatchWin==2?'on':''}">${data[k].ScoreB}</span>
                                        <span class="team-name2">${teamList[data[k].TeamB].TeamName}</span>
                                        <div class="team-logo team-logo2"><img src="${teamList[data[k].TeamB].TeamLogo}"></div>
                                    </div>${txt}
                                </li>`;
            }

        }
        $(".message-ul1").html(sHtml);

    },

    /*淘汰赛模板*/
    ShowBMatchsByTmpl18: function(gameType, flag) {
        var self = Base;
        var goUrl = '//lpl.qq.com/web201612/data/LOL_MATCH2_GAME_PROCDATA_' + self.dGameId + '_' + gameType + '_GAMETYPE_INFO_SP.js';
        $.getJSON(goUrl, function(res) {
            if (res.status == 0) {
                var data = jQuery.parseJSON(res.msg.ChartData);
                if (data) {
                    for (var x in data) {
                        var sHtmlArr = [];
                        var sHtml = '';
                        var matchobj = data[x];
                        switch (x) {
                            case '1':
                                self.ShowBMatchsByTmpl02(matchobj, 'quarter-knockout');
                                break;
                            case '2':
                                self.ShowBMatchsByTmpl02(matchobj, 'quarter-final');
                                break;
                            case '3':
                                self.ShowBMatchsByTmpl02(matchobj, 'final');
                                break;
                        }

                    }
                }
            }
        });
    },
    /*淘汰赛*/
    ShowBMatchsByTmpl02: function(data, flag) {
        var self = Base;
        var teamList = TeamList.msg;
        var sHtml = '';
        var NewsId = false;
        for (var k in data) {
            if (data[k].MatchStatus == 3 && data[k].NewsId != 0) {
                NewsId = true;
            }
            if (+data[k].GameId == 0) {
                sHtml += `<div class="vs-box no-play">
                                    <p class="spr team-one ">
                                      <span class="team-name">待定</span><span class="team-num">-</span>
                                    </p>
                                    <p class="spr team-two ">
                                      <span class="team-name">待定</span><span class="team-num">-</span>
                                    </p>
                                    <p class="txt1"></p>
                    </div>`;
            } else {
                sHtml += `<div class="vs-box ${data[k].MatchStatus==1?'no-play':(data[k].MatchStatus==2?'playing':'')}">
                                    <p class="spr team-one ${data[k].MatchWin==1?'win':''}">
                                      <img src="${teamList[data[k].TeamA].TeamLogo}">
                                      <span class="team-name">${teamList[data[k].TeamA].TeamName}</span><span class="team-num">${data[k].ScoreA}</span>
                                    </p>
                                    <p class="spr team-two ${data[k].MatchWin==2?'win':''}">
                                      <img src="${teamList[data[k].TeamB].TeamLogo}">
                                      <span class="team-name">${teamList[data[k].TeamB].TeamName}</span><span class="team-num">${data[k].ScoreB}</span>
                                    </p>
                                    <p class="txt1">${self.getDateStr(data[k].MatchDate)}</p>
                                    <a href="${NewsId==true?self.stats+data[k].bMatchId:'javascript:;'}" target="${NewsId==true?'_blank':''}" class="btn btn-data on" onclick="PTTSendClick('btn','box3-data1','数据');"><span>数据</span></a>
                                    <a href="${NewsId==true?self.video_detail+data[k].NewsId+'&bMatchId='+data[k].bMatchId:'javascript:;'}" target="${NewsId==true?'_blank':''}" class="btn btn-video on" onclick="PTTSendClick('btn','box3-video1','视频');"><span>视频</span></a>
                    </div>`;
            }

        };
        $("." + flag + " .team-vs-list").html(sHtml);
    },
    getDateStr: function(matchDate) {
        var date = new Date(matchDate.replace(/-/g, '/'));
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var dateArr = matchDate.split(' ');
        var week = date.getDay();
        var weekMap = {
            0: '星期日',
            1: '星期一',
            2: '星期二',
            3: '星期三',
            4: '星期四',
            5: '星期五',
            6: '星期六'
        };
        return month + '月' + day + '日 ' + weekMap[week] + ' ' + dateArr[1].substring(0, 5);
    },
    // 资讯推荐位
    InitRecommendNews: function() {
        var self = Base;
        var goUrl = "//lpl.qq.com/web201612/data/LOL_MATCH2_NEWS_RECOMMEND_" + self.dRecommendId + "_INFO.js";
        $.getJSON(goUrl, function(data) {
            if (data.status == 0) {
                var banner = data.msg[self.dRecommendCfg.banner]; //通栏
                var aroundGame1 = data.msg[self.dRecommendCfg.aroundGame1]; //游戏周边-1
                var aroundGame2 = data.msg[self.dRecommendCfg.aroundGame2]; //游戏周边-2-轮播
                var urbanExplorat1 = data.msg[self.dRecommendCfg.urbanExplorat1]; //城市探索-1-轮播
                var urbanExplorat2 = data.msg[self.dRecommendCfg.urbanExplorat2]; //城市探索-2
                var urbanExplorat3 = data.msg[self.dRecommendCfg.urbanExplorat3]; //城市探索-3

                var bannerHtml = "";
                var aroundGame1Html = ""; //游戏周边-1
                var aroundGame2Html = ""; //游戏周边-2-轮播
                var urbanExplorat1Html = ""; //城市探索-1-轮播
                var urbanExplorat2Html = ""; //城市探索-2
                var urbanExplorat3Html = ""; //城市探索-3
                //大广告位
                if (banner) {
                    banner.forEach(function(value, index) {
                        bannerHtml += `<a href="${value["sUrl"]}" target="_blank" class="btn-go" onclick="PTTSendClick('btn','btn-go','广告图');">
                            <img src="${value["sIMG"]}" title="${value["sTitle"]}">
                        </a>`
                    })
                    $(".banner_Adver1").html(bannerHtml);
                };
                //游戏周边-1
                if (aroundGame1) {
                    aroundGame1.forEach(function(value, index) {
                        aroundGame1Html += `<a href="${value["sUrl"]}" target="_blank" class="btn-link" onclick="PTTSendClick('btn','link${index}','link${index}');">
                            <img src="${value["sIMG"]}" title="${value["sTitle"]}">
                            <em>${value["sTitle"]}</em>
                        </a>`
                    })
                    $("#aroundGame_1").html(aroundGame1Html);
                };
                //游戏周边-2-轮播
                if (aroundGame2) {
                    aroundGame2.forEach(function(value, index) {
                        aroundGame2Html += `<a href="${value["sUrl"]}" target="_blank" class="swiper-slide" onclick="PTTSendClick('btn','skin${index}','skin');">
                            <img src="${value["sIMG"]}" title="${value["sTitle"]}">
                            <em>${value["sTitle"]}</em>
                        </a>`
                    })
                    $("#aroundGame_2").html(aroundGame2Html);
                };
                //城市探索-1-轮播
                if (urbanExplorat1) {
                    urbanExplorat1.forEach(function(value, index) {
                        urbanExplorat1Html += `<a href="${value["sUrl"]}" target="_blank" class="swiper-slide" onclick="PTTSendClick('btn','active${index}','活动');">
                            <img src="${value["sIMG"]}" title="${value["sTitle"]}">
                            <em>${value["sTitle"]}</em>
                        </a>`
                    })
                    $("#urbanExplorat_1").html(urbanExplorat1Html);
                };
                //城市探索-2
                if (urbanExplorat2) {
                    urbanExplorat2.forEach(function(value, index) {
                        urbanExplorat2Html += `<a href="${value["sUrl"]}" target="_blank" class="publicity" onclick="PTTSendClick('btn','publicity1','宣传片');">
                            <img src="${value["sIMG"]}" title="${value["sTitle"]}">
                            <span class="txt">
                                <p>${value["sTitle"]}</p>
                            </span>
                        </a>`
                    })

                };
                //城市探索-3
                if (urbanExplorat3) {
                    urbanExplorat3.forEach(function(value, index) {
                        urbanExplorat2Html += `<a href="${value["sUrl"]}" target="_blank" class="publicity" onclick="PTTSendClick('btn','publicity2','宣传片');">
                            <img src="${value["sIMG"]}" title="${value["sTitle"]}">
                            <span class="txt">
                                <p>${value["sTitle"]}</p>
                            </span>
                        </a>`
                    })
                };
                $("#urbanExplorat_2").html(urbanExplorat2Html);



            }
        });
    },
    /*赛事视频*/
    InitVideoNews: function() {
        var self = Base;
        var sHtml = "";
        var goUrl = '//lpl.qq.com/web201612/data/LOL_MATCH2_NEWS_HOMEPAGE_LATEST_VIDEOS_LIST_1_20.js';
        $.getJSON(goUrl, function(res) {
            if (res.status == 0) {
                var data = res.msg;
                data.forEach(function(value, index) {
                    if (index > 9) {
                        return;
                    }
                    var sExt1 = JSON.parse(value.sExt1);
                    sHtml += `<li>
                                <img src="${sExt1.sImg}">
                                <i class="mask"></i>
                                <span class="u-video-time">14:37</span>
                                <div class="m-video-info">
                                    <p>${value.Title}</p>
                                    <span>播放量<em>${Base.calNum(sExt1.iTotal)}次</em></span>
                                    <span class="day">${Base.ReloadPubdate(value.indexDate)}</span>
                                </div>
                                <a href="//lpl.qq.com/es/video_detail.shtml?nid=${value.NewsId}&bMatchId=${value.bMatchId}" onclick="PTTSendClick('btn','cont4-video${index}','视频');" target="_blank" class="mask-href"></a>
                            </li>`;
                });
                $(".cont4-video-ul").html(sHtml);
            }
        })
    },
    /*gicp视频*/
    getKolVideoList: function(collectionid) {
        var self = Base;
        var sHtml = "";
        var goUrl = '//apps.game.qq.com/cmc/zmMcnCollectionContentList?collectionid=' + collectionid + '&page=1&num=10';
        $.getJSON(goUrl, function(res) {
            if (res.status == 1) {
                var data = res.data.result;
                data.forEach(function(value, index) {
                    sHtml += `<li>
                                <img src="${value.sIMG}">
                                <i class="mask"></i>
                                <span class="u-video-time">14:37</span>
                                <div class="m-video-info">
                                    <p>${value.sTitle}</p>
                                    <span>播放量<em>${Base.calNum(value.iTotalPlay)}次</em></span>
                                    <span class="day">${Base.ReloadPubdate(value.sIdxTime)}</span>
                                </div>
                                <a href="//lol.qq.com/v/v2/detail.shtml?docid=${value.iDocID}" onclick="PTTSendClick('btn','cont4-video${index}','视频');" target="_blank" class="mask-href"></a>
                            </li>`;
                })
                $(".cont4-video-ul").html(sHtml);
            }

        });
    },
    calNum: function(data) {
        var num = parseFloat(data);
        var totle = 0;
        if (num < 10000) {
            totle = num;
        } else {
            totle = (num / 10000).toFixed(1)
        }
        return totle;
    },
    // 格式化时间
    ReloadPubdate: function(string) {
        var re = /^(\d{2,4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        if (re.test(string)) {
            var t = string.match(re);
            var d = new Date(t[1], t[2] - 1, t[3], t[4], t[5], t[6]);
            var c = new Date();
            var s = (c.getTime() - d.getTime()) / 1000;
            var m = Math.floor(s / 60);
            var h = Math.floor(s / 3600);
            var d = Math.floor(s / 86400);
            var n = Math.floor(s / (86400 * 30));
            var y = Math.floor(s / (86400 * 365));
            if (y > 0)
                return y + "年以前";
            if (n > 0)
                return n + "个月以前";
            if (d > 0)
                return d + "天以前";
            if (h > 0)
                return h + "小时以前";
            if (m > 0)
                return m + "分钟以前";
        }
        return "刚刚";
    },
    /*参赛战队*/
    InitGameBaseInfo: function() {
        var self = Base;
        var teamList = TeamList.msg;
        var goUrl = self.dPreUrl + 'LOL_MATCH2_GAME_GAME' + self.dGameId + '_INFO.js';
        $.getJSON(goUrl, function(data) {
            if (data.status == 0) {
                var sHtml = '';
                var team = {
                    0: { 'value': [42, 29, 41, 4], 'name': 'LPL' },
                    1: { 'value': [117, 17, 697, 696], 'name': 'LEC' },
                    2: { 'value': [591, 691, 137], 'name': 'LCK' },
                    3: { 'value': [25, 695, 476], 'name': 'LCS' },
                    4: { 'value': [701, 702], 'name': 'PCS' },
                    5: { 'value': [623], 'name': 'LCL' },
                    6: { 'value': [699], 'name': 'LLA' },
                    7: { 'value': [703], 'name': 'TCL' },
                    8: { 'value': [136], 'name': 'CBLOL' },
                    9: { 'value': [698], 'name': 'LJL' },
                    10: { 'value': [700], 'name': 'OPL' }
                };
                for (var k in team) {
                    var item = team[k]['value']
                    for (var i in item) {
                        sHtml += `<a class="swiper-slide" onclick="PTTSendClick('btn','btn-team1','队伍');">
                                    <div>
                                        <img src="${teamList[item[i]].TeamLogo}" alt="">
                                    </div>
                                    <p>${team[k]['name']}赛区：<span>${teamList[item[i]].TeamName}</span></p>
                                    </a>`;
                    }
                };
                $("#team_list").html(sHtml);
            }
        });
    },
    InitGameBaseInfo1: function() {
        var self = Base;
        var teamList = TeamList.msg;
        var goUrl = self.dPreUrl + 'LOL_MATCH2_GAME_GAME' + self.dGameId + '_INFO.js';
        $.getJSON(goUrl, function(data) {
            if (data.status == 0) {
                var sHtml = '';
                var team = data.msg.gameTeam;
                team.forEach(function(value, index) {
                    sHtml += `<a class="swiper-slide" onclick="PTTSendClick('btn','btn-team${+index+1}','队伍');">
                                        <div>
                                            <img src="${teamList[value.TeamId].TeamLogo}" alt="">
                                        </div>
                                        <p>LPL赛区：<span>${teamList[value.TeamId].TeamName}</span></p>
                                    </a>`;
                });
                $("#team_list").html(sHtml);
            }
        });
    },
    /*上报初始化*/
    EASInit: function() {
        EAS.need('iu', function() {
            EAS.iu.init({
                'serviceType': 'lol',
                'iuName': 'iu_lol_homepage'

            }, function() {})
        })
    },
    /*曝光上报*/
    EAS_Pop: function(contentId, contentType, clickUrl) {
        EAS.need('iu', function() {
            EAS.iu.click({
                'actionType': 'pop',
                'contentId': contentId,
                'contentType': contentType,
                'clickUrl': clickUrl
            });
        })

    },
    /*点击上报*/
    EAS_Click: function(contentId, contentType, clickUrl) {
        EAS.need('iu', function() {
            EAS.iu.click({
                'actionType': 'click',
                'contentId': contentId,
                'contentType': contentType,
                'clickUrl': clickUrl
            });
        })
    }

}
Base.init();
/* #t6Hl8#3199A777A1F072893EDB4B884A6817A0 */