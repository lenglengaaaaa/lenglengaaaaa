//popString(window.location.href);

var platid = getParam('platid');
var area = getParam('area');
var country = getParam('country');
var language = getParam('lang');
var sOpenid = getParam('roleid');
var channelid = getParam('channelid');
var ticket = getParam('ticket');
var nickname = getParam('nickname');
nickname = decodeURIComponent(nickname);
var levelscore = getParam('lscore');
var uid = getParam('uid');

var oriUrl = "https://west-mrms.codm.activision.com/esports/index.php?actid=1642";
var paramStr = "&ticket=" + ticket + "&sOpenid=" + sOpenid + "&platid=" + platid + "&area=" + area + "&channelid=" + channelid + "&nickname=" + nickname + "&lang=" + language + "&country=" + country + "&openid=" + sOpenid + "&level=" + levelscore + "&uid=" + uid;
if (language === "") {
    language = "en_US";
}

var lang_data = GLanguage[language];
var error_list = {

    "0": lang_data["lang_163"],  //成功
    "-998": lang_data["lang_143"],  //参数错误
    "-999": lang_data["lang_143"],  //系统错误"System busy, please try again later.",
    "-101": lang_data["lang_133"],
    "-102": lang_data["lang_133"],
    "-103": lang_data["lang_133"],
    "-104": lang_data["lang_134"],
    "-105": lang_data["lang_135"],
    "-106": lang_data["lang_136"],
    "-107": lang_data["lang_137"],
    "-108": lang_data["lang_138"],
    "-109": lang_data["lang_424"],
    "-110": lang_data["lang_442"],
    "-111": lang_data["lang_410"],
    "-112": lang_data["lang_142"],
    "-113": lang_data["lang_154"],
    "-114": lang_data["lang_436"], //"Team name exceeds 30 character max.",
    "-115": lang_data["lang_419"], //24小时5次
    "-116": lang_data["lang_443"],
    "-117": lang_data["lang_444"],
    "-118": lang_data["lang_439"],
    "-119": lang_data["lang_437"],
    "-120": lang_data["lang_420"],
    "-121": lang_data["lang_423"],
    "-122": lang_data["lang_421"],
    "-123": lang_data["lang_449"],
    "-124": lang_data["lang_448"],
    "161": lang_data["lang_438"],
    "others": lang_data["lang_143"],
}
function checkParams() {

    if (platid === "") return "invalid parameter: platid";
    if (area === "") return "invalid parameter: area";
    if (country === "") return "invalid parameter: country";
    if (language === "") return "invalid parameter: lang";
    if (sOpenid === "") return "invalid parameter: roleid";
    if (channelid === "") return "invalid parameter: channelid";
    if (ticket === "") return "invalid parameter: ticket";
    if (nickname === "") return "invalid parameter: nickname";
    if (levelscore === "") return "invalid parameter: lscore";
    if (uid === "") return "invalid parameter: uid";

    return true;
}

//popString("v6");

var cfgSoloStatus = {
    0: { "color": "bg_blue", "desc": lang_data["lang_79"] },  //即将开始
    1: { "color": "bg_blue", "desc": lang_data["lang_50"] },  //报名阶段
    2: { "color": "bg_blue", "desc": lang_data["lang_75"] },  //比赛中
    3: { "color": "bg_yellow", "desc": lang_data["lang_67"] },  //晋级
    4: { "color": "bg_green", "desc": lang_data["lang_11"] },  //完成
    5: { "color": "bg_blue", "desc": lang_data["lang_315"] },  //结束
}
var cfgTeamStatus = {
    0: { "color": "bg_blue", "desc": lang_data["lang_79"] },  //即将开始
    1: { "color": "bg_blue", "desc": lang_data["lang_50"] },  //报名阶段
    2: { "color": "bg_blue", "desc": lang_data["lang_75"] },  //比赛中
    3: { "color": "bg_yellow", "desc": lang_data["lang_67"] },  //晋级
    4: { "color": "bg_green", "desc": lang_data["lang_11"] },  //完成
    5: { "color": "bg_blue", "desc": lang_data["lang_315"] },  //结束
    6: { "color": "bg_blue", "desc": lang_data["lang_302"] },  //结算
}
var cfgRegion = {
    1: lang_data["lang_82"], //"North America",
    2: lang_data["lang_85"], //"Latin America",
    3: lang_data["lang_86"], //"Western Europe",
    4: lang_data["lang_89"], //"Japan",
    5: lang_data["lang_247"], //"Other",
}

//区域排行榜索引，分页拉取使用
var globalRankIndex = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
}

var cfgLevelMap = [
    { "begin": 1, "end": 1000, "desc": "ROOKIE", "point": "+7", "percent": "0%", "tpoint": "+7", "tpercent": "0%" },
    { "begin": 1001, "end": 2000, "desc": "VETERAN", "point": "+10", "percent": "0%", "tpoint": "+10", "tpercent": "0%" },
    { "begin": 2001, "end": 3000, "desc": "ELITE", "point": "+12", "percent": "20%", "tpoint": "+12", "tpercent": "10%" },
    { "begin": 3001, "end": 4500, "desc": "PRO", "point": "+14", "percent": "40%", "tpoint": "+15", "tpercent": "40%" },
    { "begin": 4501, "end": 6500, "desc": "MASTER", "point": "+16", "percent": "60%", "tpoint": "+16", "tpercent": "50%" },
    { "begin": 6501, "end": 99999999, "desc": "LEGENDARY", "point": "+20", "percent": "100%", "tpoint": "+20", "tpercent": "100%" },
]
function getLevelCfg(score) {
    for (var l = 0; l < cfgLevelMap.length; l++) {
        if (score >= cfgLevelMap[l]["begin"] && score <= cfgLevelMap[l]["end"]) {
            return cfgLevelMap[l];
        }
    }
    return false;
}
var canClick = true;
var canGetRank = true;
var curStage = 0;
var curSubStage = 0;
var region = 0;

function popString(text) {
    $('#pop3').find('p').html(text);
    OpenDialog('pop3');
}

$(function () {
    var ret = checkParams();
    if (ret !== true) {
        popString(lang_data["lang_350"]);
        //popString(window.location.search);
        return;
    }
    queryBase();
    freshData();
});

//报名确认逻辑
function confirm(table, num) {
    var teamName = $("#input_name").val();
    if (!teamName) {
        $("#input_name").addClass("invalid");
        return;
    }
    $("#input_name").removeClass("invalid");
    $("#pop_name").text(teamName);

    var teamMate1 = $("#input_uid1").val();
    if (!teamMate1) {
        $("#input_uid1").addClass("invalid");
        return;
    }
    $("#input_uid1").removeClass("invalid");
    $("#pop_uid1").text(teamMate1);

    var teamMate2 = $("#input_uid2").val();
    if (!teamMate2) {
        $("#input_uid2").addClass("invalid");
        return;
    }
    $("#input_uid2").removeClass("invalid");
    $("#pop_uid2").text(teamMate2);

    var teamMate3 = $("#input_uid3").val();
    if (!teamMate3) {
        $("#input_uid3").addClass("invalid");
        return;
    }
    $("#input_uid3").removeClass("invalid");
    $("#pop_uid3").text(teamMate3);

    var teamMate4 = $("#input_uid4").val();
    if (!teamMate4) {
        $("#input_uid4").addClass("invalid");
        return;
    }
    $("#input_uid4").removeClass("invalid");
    $("#pop_uid4").text(teamMate4);

    var teamMate5 = $("#input_uid5").val();
    $("#pop_uid5").text(teamMate5);

    $("#pop_leader").text(sOpenid);

    //展示区域
    var sRegion = region;
    if (sRegion == 0) {
        sRegion = getRegionByCountry();
    }
    $("#pop2 .p_select").remove();
    $("#pop2 .northBox").html(cfgRegion[sRegion])

    OpenDialog('pop2');

}

function claim(subStage, giftCur, giftNum = 0) {

    if (!canClick) return;
    canClick = false;

    loadScript(oriUrl + "&r=index/deliverGift&stage=" + curStage + "&subStage=" + subStage + "&gift=" + giftCur + "&giftNum=" + giftNum + paramStr, function () {
        //setTimeout("alert('对不起, 要你久候')", 3000 )
        var packages = {};
        if (global_searesult.iRet !== 0) {
            popString(error_list['others']);
            return;
        } else {
            var code = global_searesult.jData.code;
            if (code !== 0) {
                if (error_list[code]) {
                    popString(error_list[code]);
                }
                else {
                    popString(error_list['others']);
                }
                canClick = true;
                return;
            }
        }

        data = global_searesult.jData.data;
        if (curStage == 1) {
            freshSoloGift(subStage, data);
        } else {
            if (data['status'] == 3 || data['status'] == 4) {
                if (data["afterSettle"] == 1) {
                    freshTeamGift(data);
                }else {
                    freshFinishGift(data);
                }
            }else {
                freshFinishGift(data);
            }
        }
        canClick = true;

        //popString("the reward has been distributed to the game mailbox");
        popString(lang_data["lang_346"]);


    })
}

function queryBase() {

    loadScript(oriUrl + "&r=index/base" + paramStr, function () {
        if (global_searesult.iRet !== 0) {
            popString(error_list['others']);
        } else {
            var code = global_searesult.jData.code;
            if (code !== 0) {
                if (code == "-200") {
                    //维护中！
                    $('.bg').attr("style", "display: none");
                    $('.newBg1').removeAttr("style");

                }
                else if (error_list[code]) {
                    popString(error_list[code]);
                } else {
                    popString(error_list['others']);
                }
            } else {
                var data = global_searesult.jData.data;
                freshData(data);
            }
        }
    });

}
function freshData(data) {

    // data = {
    //     "curStage": 2,//0未开始，1单人赛，2组队赛，3赛区赛，4，全球赛
    //     "curSubStage": 0, //0无效，1-4为子阶段，仅单人赛阶段有效
    //     "region": 3, //0是未选择，参加的区域
    //     "teamStage": {
    //         "status": 4, //-1倒数天数，0即将开始, 1报名阶段，2比赛中，3晋级，4完成，5结束
    //         "giftCur": 2, //当前礼物阶段
    //         "giftStatus1": 1, //0未达成，1可领取，2已领取
    //         "giftStatus2": 1, //0未达成，1可领取，2已领取
    //         "point": 100,
    //         "result": [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     },
    //     "myTeam": {
    //         "name": "",
    //         "member": ["yingl", 500, "yyy", 3001, "name3", 3001, "name4", 3001, "name5", 3001],
    //         "myIndex": 1,
    //         "rank": 100,
    //     },
    //     "isPass": 0,
    //     "passScore": 100,
    //     "afterSettle": 0,
    //     "signedUp": 1,
    // };


    //更新当前阶段、当前子阶段
    curStage = data["curStage"];
    curSubStage = data["curSubStage"];
    region = data["region"];
    var sRegion = region; //展示区域
    if (sRegion == 0) {
        sRegion = getRegionByCountry();
    }

    //定位大阶段--参赛页面 
    $('#tab2').addClass("no");

    if (curStage == 1) {
        $('#team_going').attr("style", "display: none");
        $('.Advance').attr("style", "display: none");
        $('#team_ready').attr("style", "display: none");
        $('#solo').removeAttr("style");

        //定位当前子阶段
        var sub = (curSubStage == 0) ? 4 : curSubStage;
        if (curStage == 0) {
            sub = 1;
        }
        //$('#sub'+sub).addClass("no");
        //$('#solo'+sub).removeAttr("style");
        $('#sub' + sub).click();

        //更新每个子阶段数据
        for (var i = 1; i <= 4; i++) {
            var soloData = data["soloStage" + i];
            if (!soloData.hasOwnProperty("status")) continue;
            //状态栏
            $('#solo' + i + ' .le_title h3').html(cfgSoloStatus[soloData["status"]]["desc"]);
            $('#solo' + i + " .upSoon_bg").addClass(cfgSoloStatus[soloData["status"]]["color"]);
            if (soloData["status"] == 3 || soloData["status"] == 4) {
                $('#solo' + i).addClass("achieve");
            }

            //live标签,只有当前阶段，开始报名后再展示
            if (curSubStage == i && curStage == 1 && soloData["status"] != 0) {
                $('#sub' + sub).addClass("not_l");
            }

            //tab文字颜色变化
            if (curSubStage == i) {
                $('#sub' + i + " p").addClass("green");
            }

            //tab文字颜色变化
            if (soloData["status"] >= 3) {
                $('#sub' + i + " p").addClass("gray");
            }

            //分数
            $('#solo' + i + " .point #points").html(soloData["point"]);

            //进度条
            var percent = soloData["point"] > 160 ? 100 : soloData["point"] * 100 / 160;
            $('#solo' + i + " .point .l_bf_bg").width(percent + '%');

            //胜负矩阵
            var win = 0;
            var lose = 0;
            //$("li").remove('#solo'+i+' .Game_bg ul');
            $('#solo' + i + ' .Game_bg ul li').remove();
            for (var j = 0; j < 10; j++) {
                if (j < soloData.result.length && soloData.result[j] == 0) {
                    $('#solo' + i + ' .Game_bg ul').append('<li class="red_no"></li>');
                    lose = lose + 1;
                }
                else if (j < soloData.result.length && soloData.result[j] == 1) {
                    $('#solo' + i + ' .Game_bg ul').append('<li class="green_no"></li>');
                    win = win + 1;
                }
                else {
                    $('#solo' + i + ' .Game_bg ul').append('<li></li>');
                }
            }

            //胜负数
            $('#solo' + i + " #win").text(" " + win);
            $('#solo' + i + " #loss").text(" " + lose);
            $('#solo' + i + " .f_game em").html(" " + (win + lose) + "/10");

            //报名状态
            if (soloData["status"] == 1) {
                $('#solo' + i + " #button_sign").addClass("js_sign");
                $('#solo' + i + " #button_sign").attr("onclick", "OpenDialog('pop1')");
            }
            //奖励状态
            if ((soloData["status"] >= 2 && soloData["status"] != 5) || (soloData.giftCur != 0 || soloData.giftStatus != 0)) {
                freshSoloGift(i, soloData);
            }
        }

        //每场分数，根据段位
        var levelCfg = getLevelCfg(levelscore);
        $('#solo .y_grade #addp').text(levelCfg["point"]);

        var cfg = getLevelDescCfg(levelscore);
        $('#soloLevel img').attr("src", cfg["src"]);
        $('#soloLevel em').html(cfg["desc"]);

        //xxxxx

        //地区,所有的页面参数替换
        $('.select_s .d_select').html(cfgRegion[sRegion]);

        //报名弹窗pop1信息替换
        if (region != 0) {
            $("#pop1 .p_select").remove();
            $("#pop1 .select_s").html('<div class="d_select">' + cfgRegion[sRegion] + '</div>')
        } else {
            //$('#pop1 .p_select #region'+data["region"]).attr("selected","selected"); //默认区域选项
            $("#pop1").find("[value=" + sRegion + "]").attr("selected", "selected"); //默认区域选项
        }
        $('#pop1 .rqDiv').text(nickname); //玩家名称
    }

    //战队赛
    if (curStage == 2) {
        if (!data["teamStage"].hasOwnProperty("status")) return;

        //1、战队赛准备阶段：可以通过配置来控制开关，不需要依赖后台结果
        if (data["teamStage"]["status"] < 0) {
            //隐藏单人赛和团队赛，展示比赛倒计时页面
            $('#team_going').attr("style", "display: none");
            $('#solo').attr("style", "display: none");
            $('.Advance').attr("style", "display: none");
            $('#team_ready').removeAttr("style");

            //设置倒计时
            if (-data["teamStage"]["status"] == 1) {
                //一天
                $('#team_ready h4').text(-data["teamStage"]["status"] + " " + lang_data["lang_360"]);
            } else {
                //多天
                $('#team_ready h4').text(-data["teamStage"]["status"] + " " + lang_data["lang_361"]);
            }
            return;
        }

        if (!data.hasOwnProperty("isPass") || data["isPass"] < 1) {
            $('#team_going').attr("style", "display: none");
            $('#solo').attr("style", "display: none");
            $('#team_ready').attr("style", "display: none");
            $('.Advance').removeAttr("style");
            return;
        }

        //2、战队赛正式比赛阶段
        $('.select_s .d_select').html(cfgRegion[sRegion]); //地区,所有的页面参数替换
        $("#pop8 .team_pop .team_region").html(cfgRegion[sRegion]);
        $('#team_going').removeAttr("style");
        $('#team_ready').attr("style", "display: none");
        $('#solo').attr("style", "display: none");
        $('.Advance').attr("style", "display: none");

        //2.1、报名
        if (data["teamStage"]["status"] == 0 || (data["teamStage"]["status"] == 6 && data["signedUp"] == 0)) { //没有注册
            $('#team_going .teamNew .Player_dy #copyId').text(uid);
            $('#team_going .teamNew .Player_dy #copyId1').text(sOpenid.substr(sOpenid.length - 4));
            $('#team_going .teamNew .leader_dz .bodyTeamNew .sZing ul span').text("");
            $('#team_going .teamNew .leader_dz .bodyTeamNew .sZing ul img').attr("src", "");
            var cfg = getLevelDescCfg(levelscore);
            $('#team_going .teamNew .leader_dz .bodyTeamNew .sZing ul li').eq(0).find('.LiName img').attr("src", cfg["src"]);
            $('#team_going .teamNew .leader_dz .bodyTeamNew .sZing ul li').eq(0).find('.LiName span').text(nickname);
            $('#team_going .teamNew .leader_dz .bodyTeamNew .sZing ul li').eq(0).addClass('myNot');

            $('#team_going #going').attr("style", "display: none");
            $('#team_going .teamNew').attr("style", "display: none");
            $('#team_going .yesBg').removeAttr("style");

            if (data["teamStage"]["status"] == 6 || (data["teamStage"]["status"] == 0 && data["afterSettle"] == 1)) {
                //$('#team_going .yesBg .mytick').removeClass("coTick");
                //$('#team_going .yesBg .mytick').unbind('click');
                //$('#team_going .yesBg .not_btm a').addClass("on");
                $('#team_going .yesBg .not_btm a').removeAttr("href");
                $('#team_going .yesBg .not_btm a').attr("href", "JavaScript:OpenDialog('pop12');");
            }
        } else if (data["teamStage"]["status"] == 1) { //有队伍但还未注册
            $('#team_going #going').attr("style", "display: none");
            $('#team_going .yesBg').attr("style", "display: none");
            $('#team_going .teamNew').removeAttr("style");

            $('#team_going .teamNew .leader_dz').removeAttr("style");
            $('#team_going .teamNew .Player_dy').attr("style", "display: none");

            freshTeamInfo(data["myTeam"], 0);

            if (data["afterSettle"] == 1) {
                $('#team_going .teamNew .leader_dz .leaveBtm .fl_back .dismiss_btm').removeAttr("href");
                //$('#team_going .teamNew .leader_dz .invite_btm .sur').addClass("gray");
                $('#team_going .teamNew .leader_dz .invite_btm .sur').removeAttr("href");
                //$('#team_going .teamNew .leader_dz .leaveBtm .fr_leave .yellow_a').addClass("gray");
                $('#team_going .teamNew .leader_dz .leaveBtm .fr_leave .yellow_a').removeAttr("href");
                //$('#team_going .teamNew .leader_dz .playerBtm .sur').addClass("gray");
                $('#team_going .teamNew .leader_dz .playerBtm .sur').removeAttr("href");

                $('#team_going .teamNew .leader_dz .leaveBtm .fl_back .dismiss_btm').attr("href", "JavaScript:OpenDialog('pop12');");
                $('#team_going .teamNew .leader_dz .invite_btm .sur').attr("href", "JavaScript:OpenDialog('pop12');");
                $('#team_going .teamNew .leader_dz .leaveBtm .fr_leave .yellow_a').attr("href", "JavaScript:OpenDialog('pop12');");
                $('#team_going .teamNew .leader_dz .playerBtm .sur').attr("href", "JavaScript:OpenDialog('pop12');");
            }
        } else { //比赛阶段

            $('#team_going .teamNew').attr("style", "display: none");
            $('#team_going .yesBg').attr("style", "display: none");
            $('#team_going #going').removeAttr("style");

            if (data["teamStage"].result.length == 0) { //没有战绩
                $('#team_going .this_on').attr("style", "display: none");
                $('#team_going #going .SignUp .bt_dBox .fr_btm').removeAttr("style");
                $('#team_going #teamgift').attr("style", "display: none");
                if (data["myTeam"]['myIndex'] == 0) { //队长
                    $('#team_going #button_dismiss').removeAttr("style");
                    $('#team_going #button_quit').attr("style", "display: none");
                } else {
                    $('#team_going #button_dismiss').attr("style", "display: none");
                    $('#team_going #button_quit').removeAttr("style");
                }
                if (data["afterSettle"] == 1) {
                    $('#team_going #going .SignUp .bt_dBox .fr_btm').attr("style", "display: none");
                    if (data["teamStage"]["status"] == 2) {
                        data["teamStage"]["status"] = 5;
                    }
                }
            } else { //有战绩
                $('#team_going #going .SignUp .bt_dBox .fr_btm').attr("style", "display: none");
                //add by supersu
                freshFinishGift(data['teamStage']);
            }

            //队伍信息
            freshTeamInfo2(data["myTeam"]);

            //状态栏
            if (data["teamStage"]["status"] == 6) {
                //结算阶段需要特殊处理
                $('#team_going .this_on').attr("style", "display: none");
                $('#team_going #going .SignUp .bt_dBox .fr_btm').attr("style", "display: none");

                $('#team_going #normal').attr("style", "display: none");
                $('#team_going .liuH').removeAttr("style");
            } else {
                if (data["teamStage"]["status"] == 4 && data["afterSettle"] != 1) {
                    $('#team_going .le_title h3').html(cfgTeamStatus[2]["desc"]);
                    $('#team_going .upSoon_bg').addClass(cfgTeamStatus[2]["color"]);
                } else {
                    $('#team_going .le_title h3').html(cfgTeamStatus[data["teamStage"]["status"]]["desc"]);
                    $('#team_going .upSoon_bg').addClass(cfgTeamStatus[data["teamStage"]["status"]]["color"]);
                }
            }

            if (data["teamStage"]["status"] == 3 || data["teamStage"]["status"] == 4) {
                $('#going').addClass("achieve");
                //结算之后才有奖励状态
                if (data["afterSettle"] == 1) {
                    freshTeamGift(data["teamStage"]);
                }
            }

            //分数
            $('#team_going .point #points').html(data["teamStage"]["point"]);

            //进度条
            var curPoint = data["teamStage"]["point"];
            var passPoint = data["passScore"];
            if (passPoint <= 0) {
                $('#team_going .point .new_bfb').attr("style", "display: none");
            } else {
                $('#team_going .point .new_bfb .pass_score').html(passPoint);
                $('#team_going .point .new_bfb').removeAttr("style");
                var percent = curPoint * 60 / passPoint > 100 ? 100 : curPoint * 60 / passPoint;
                $('#team_going .point .l_bf_bg').width(percent + '%');
            }

            //胜负矩阵
            var win = 0;
            var lose = 0;
            $('#team_going .Game_bg ul li').remove();
            for (var j = 0; j < 30; j++) {
                if (j < data["teamStage"].result.length && data["teamStage"].result[j] == 0) {
                    $('#team_going .Game_bg ul').append('<li class="red_no"></li>');
                    lose = lose + 1;
                }
                else if (j < data["teamStage"].result.length && data["teamStage"].result[j] == 1) {
                    $('#team_going .Game_bg ul').append('<li class="green_no"></li>');
                    win = win + 1;
                }
                else {
                    $('#team_going .Game_bg ul').append('<li></li>');
                }
            }

            //胜负数
            $('#team_going #win').text(" " + win);
            $('#team_going #loss').text(" " + lose);
            $('#team_going .f_game em').html(" " + (win + lose) + "/30");

            //当前排名
            $('#team_going .this_on span').text(data["myTeam"]["rank"]);
        }
    }
}

//页面右下角显示完成奖励领取
function freshFinishGift(teamData) {
    //$('#team_going .this_on').removeAttr("style");
    var giftStatus1 = teamData["giftStatus1"];
    if (giftStatus1 != 1) {
        $('#team_going .this_on').removeAttr("style");
        $('#team_going #going #teamgift .btn1').attr("style", "display: none");
        $('#team_going #going #teamgift .btn2').attr("style", "display: none");
        $('#team_going #going #teamgift .button_claim1').removeClass("js_sign");
        $('#team_going #going #teamgift .button_claim1').removeAttr("href");
        $('#teamgift .button_claim2').removeAttr("href");
        return;
    }

    $('#team_going .this_on').attr("style", "display: none");
    $('#team_going #going .SignUp .bt_dBox .fr_btm').removeAttr("style");
    $('#team_going #going #button_quit').attr("style", "display: none");
    $('#team_going #going #button_dismiss').attr("style", "display: none");
    $('#team_going #going #teamgift').removeAttr("style");
    $('#team_going #going #teamgift .btn1').removeAttr("style");
    $('#team_going #going #teamgift .btn2').attr("style", "display: none");
    $('#team_going #going #teamgift .button_claim1').addClass("js_sign");
    $('#team_going #going #teamgift .button_claim1').attr("href", "JavaScript:claim(0," + teamData["giftCur"] + ",1);");


}

function joinTeam() {
    if (!$('#team_going .yse_jj .mytick').is('.coTick')) {
        return;
    }
    $('#team_going .yesBg').attr("style", "display: none");
    $('#team_going .teamNew').removeAttr("style");
    $('#team_going .teamNew .leader_dz').attr("style", "display: none");
    $('#team_going .teamNew .Player_dy').removeAttr("style");
}

function createTeam() {
    if (!$('#team_going .yse_jj .mytick').is('.coTick')) {
        return;
    }
    $('#team_going .yesBg').attr("style", "display: none");
    $('#team_going .teamNew').removeAttr("style");
    $('#team_going .teamNew .leader_dz').removeAttr("style");
    $('#team_going .teamNew .Player_dy').attr("style", "display: none");

    $('#team_going .teamNew .leader_dz .PlayerInt .one_ipt').removeClass("on");
    $('#team_going .teamNew .leader_dz .playerBtm').attr("style", "display: none");
    $('#team_going .teamNew .leader_dz .leaveBtm').removeAttr("style");
    $('#team_going .teamNew .leader_dz .leaveBtm .fl_back').removeAttr("style"); //Back
    $('#team_going .teamNew .leader_dz .leaveBtm .fl_back .dismiss_btm').attr("style", "display: none");//dismiss
    $('#team_going .teamNew .leader_dz .leaveBtm .fl_back .dismiss_btm').removeAttr("href");//dismiss
    $('#team_going .teamNew .leader_dz .leaveBtm .fl_back .cs_a.sur').removeAttr("style"); //Back

    $('#team_going .teamNew .leader_dz .leaveBtm .fr_leave .yellow_a').addClass("gray");
    $('#team_going .teamNew .leader_dz .leaveBtm .fr_leave .yellow_a').removeAttr("href");
    $('#team_going .teamNew .leader_dz .invite_btm .sur').removeClass("gray");
    $('#team_going .teamNew .leader_dz .invite_btm .sur').attr("href", "JavaScript:addConfirm();");
}

function addConfirm() {
    if ($('#team_going .teamNew .leader_dz .invite_btm .sur').hasClass('gray')) {
        if (!$('#team_going .teamNew .leader_dz .bodyTeamNew .sZing ul li').eq(0).hasClass('myNot')) {
            edBtm(3);
        }
        return;
    }
    var teamMateUid1 = $("#team_uid1").val().trim();
    if (!teamMateUid1) {
        popString(lang_data["lang_438"]);
        return;
    }

    var teamMateOpenid1 = $("#team_openid1").val().trim();
    if (!teamMateOpenid1 || teamMateOpenid1.length != 4) {
        popString(lang_data["lang_438"]);
        return;
    }

    loadScript(oriUrl + "&r=index/getUserInfoByUid&teamMateUid=" + teamMateUid1 + "&teamMate1=" + teamMateOpenid1 + paramStr, function () {
        if (global_searesult.iRet !== 0) {
            popString(error_list['others']);
            return;
        } else {
            var code = global_searesult.jData.code;
            if (code !== 0) {
                if (error_list[code]) {
                    popString(error_list[code]);
                } else {
                    popString(error_list['others']);
                }
                return;
            } else {
                //成功
                var data = global_searesult.jData.data;
                $('#pop7 .team_uid').text(teamMateUid1);
                $('#pop7 .team_openid').text(data['openid']);
                $('#pop7 .team_name').text(data['nick_name']);
                var cfg = getLevelDescCfg(data['rating']);
                $('#pop7 .team_rank img').attr("src", cfg["src"]);
                $('#pop7 .team_rank em').html(cfg["desc"]);
                var region = data['region'] == 0 ? 5 : data['region'];
                $('#pop7 .team_region').html(cfgRegion[region]);
                OpenDialog('pop7');
            }
        }
    });
}

function teamInvite() {
    var teamMateUid1 = $("#team_uid1").val().trim();
    var teamMateOpenid1 = $("#team_openid1").val().trim();
    var teamName = $("#team_going .teamNew .TeamName .sr_input input").val().trim();

    if (!canClick) return;
    canClick = false;

    loadScript(oriUrl + "&r=index/teamInvite&teamMateUid=" + teamMateUid1 + "&teamMate1=" + teamMateOpenid1 + "&teamName=" + teamName + paramStr, function () {
        if (global_searesult.iRet !== 0) {
            popString(error_list['others']);
            canClick = true;
            return;
        } else {
            var code = global_searesult.jData.code;
            if (code !== 0) {
                if (code == "-110" || code == "-111" || code == "-112") {
                    var data = global_searesult.jData.data;
                    if (data["index"] == 0 && code == "-112") {
                        popString(lang_data["lang_169"]);
                    } else if (data["index"] == 1 && code == "-112") {
                        popString(lang_data["lang_425"]);
                    } else if (data["index"] == 1 && code == "-110") {
                        popString(lang_data["lang_442"]);
                    } else {
                        popString(error_list[code]);
                    }
                } else if (error_list[code]) {
                    popString(error_list[code]);
                } else {
                    popString(error_list['others']);
                }
                canClick = true;
                return;
            } else {
                //邀请成功,页面更新
                closeDialog();
                var data = global_searesult.jData.data;
                freshTeamInfo(data, 1);
                canClick = true;
            }
        }
    });
}

function leaveInvite() {
    loadScript(oriUrl + "&r=index/leaveInvite" + paramStr, function () {
        if (global_searesult.iRet !== 0) {
            popString(error_list['others']);
            return;
        } else {
            var code = global_searesult.jData.code;
            if (code !== 0) {
                if (error_list[code]) {
                    popString(error_list[code]);
                } else {
                    popString(error_list['others']);
                }
                return;
            } else {
                //成功
                location.reload();
            }
        }
    });
}

function dismissInvite() {
    loadScript(oriUrl + "&r=index/dismissInvite" + paramStr, function () {
        if (global_searesult.iRet !== 0) {
            popString(error_list['others']);
            return;
        } else {
            var code = global_searesult.jData.code;
            if (code !== 0) {
                if (error_list[code]) {
                    popString(error_list[code]);
                } else {
                    popString(error_list['others']);
                }
                return;
            } else {
                //成功
                location.reload();
            }
        }
    });
}

function teamRegister() {
    var teamName = $("#team_going .teamNew .TeamName .sr_input input").val().trim();
    if (!teamName) {
        popString(lang_data["lang_403"]);
        return;
    }

    if (!canClick) return;
    canClick = false;

    loadScript(oriUrl + "&r=index/teamSignup&teamName=" + teamName + paramStr, function () {
        if (global_searesult.iRet !== 0) {
            popString(error_list['others']);
            canClick = true;
            return;
        } else {
            var code = global_searesult.jData.code;
            if (code !== 0) {
                if (error_list[code]) {
                    popString(error_list[code]);
                } else {
                    popString(error_list['others']);
                }
                canClick = true;
                return;
            } else {
                //报名成功
                var data = global_searesult.jData.data;
                //报名页面切换
                $('#team_going .teamNew').attr("style", "display: none");
                $('#team_going #going').removeAttr("style");

                //分数和进度条
                $('#team_going .point #points').html("0");
                $('#team_going .point .new_bfb').attr("style", "display: none");

                $('#team_going .this_on').attr("style", "display: none");
                $('#team_going #going .SignUp .bt_dBox .fr_btm').removeAttr("style");
                $('#team_going #teamgift').attr("style", "display: none");
                $('#team_going #button_dismiss').removeAttr("style");
                $('#team_going #button_quit').attr("style", "display: none");
                freshTeamInfo2(data);
                canClick = true;

                $('#team_going .le_title h3').html(cfgTeamStatus[2]["desc"]);
                $('#team_going .upSoon_bg').addClass(cfgTeamStatus[2]["color"]);

                OpenDialog('pop6');
            }
        }
    });
}

function goBack() {
    $('#team_going #going').attr("style", "display: none");
    $('#team_going .teamNew').attr("style", "display: none");
    $('#team_going .yesBg').removeAttr("style");
}

function soloSignup() {
    if (levelscore < 1001) {
        popString(error_list["-107"]);
        return;
    }
    if (region != 0) {
        var sRegion = region;
    } else {
        var sRegion = $("#pop1").find("option:selected").attr("value");
    }
    loadScript(oriUrl + "&r=index/soloSignup&subStage=" + curSubStage + "&region=" + sRegion + paramStr, function () {
        if (global_searesult.iRet !== 0) {
            popString(error_list['others']);
            return;
        } else {
            var code = global_searesult.jData.code;
            if (code !== 0) {
                if (error_list[code]) {
                    popString(error_list[code]);
                } else {
                    popString(error_list['others']);
                }
            } else {
                //报名成功,报名奖励为可领取状态
                //var data = global_searesult.jData.data;
                soloData = {
                    "giftCur": 0,
                    "giftStatus": 1,
                }
                freshSoloGift(curSubStage, soloData);

                //地区,所有的页面参数替换
                region = sRegion;
                $('.select_s .d_select').html(cfgRegion[sRegion]);

                //popString(lang_data["lang_305"]);
                //状态栏
                $('#solo' + curSubStage + ' .le_title h3').html(cfgSoloStatus[2]["desc"]);
                $('#solo' + curSubStage + " .upSoon_bg").addClass(cfgSoloStatus[2]["color"]);

                OpenDialog('pop5');
            }
        }
    })
}

function leaveTeam() {
    loadScript(oriUrl + "&r=index/leaveTeam" + paramStr, function () {
        if (global_searesult.iRet !== 0) {
            popString(error_list['others']);
            return;
        } else {
            var code = global_searesult.jData.code;
            if (code !== 0) {
                if (error_list[code]) {
                    popString(error_list[code]);
                } else {
                    popString(error_list['others']);
                }
                return;
            } else {
                //成功
                location.reload();
            }
        }
    })
}

function dismissTeam() {
    loadScript(oriUrl + "&r=index/teamDismiss" + paramStr, function () {
        if (global_searesult.iRet !== 0) {
            popString(error_list['others']);
            return;
        } else {
            var code = global_searesult.jData.code;
            if (code !== 0) {
                if (error_list[code]) {
                    popString(error_list[code]);
                } else {
                    popString(error_list['others']);
                }
                return;
            } else {
                //成功
                location.reload();
            }
        }
    })
}

function freshSoloGift(i, soloData) {
    //切换大的元素
    $('#solo' + i + " #signup").attr("style", "display: none");
    $('#solo' + i + " #claimgift").removeAttr("style");
    //更新奖励状态
    var tmpl = '\
    <ul>\
    <li id="gift1">\
        <img src="" alt="">\
        <div class="z_got sur"></div>\
    </li>\
    <li id="gift2">\
        <img src="" alt="">\
        <div class="z_got sur"></div>\
    </li>\
    <li id="gift3">\
        <img src="" alt="">\
        <div class="z_got sur"></div>\
    </li>\
    <li id="gift4">\
        <img src="" alt="">\
        <div class="z_got sur"></div>\
    </li>\
    </ul>';
    $('#solo' + i + " .got").html(tmpl);

    var cfgGift = cfgGiftSolo[i][soloData["giftCur"]];
    $('#solo' + i + " #gift1 img").attr("src", cfgGift["gift1_img"]);
    //$('#solo'+i+" #gift1 div").html(cfgGift["gift1_desc"]);

    if (cfgGift["gift2_img"] != "") {
        $('#solo' + i + " #gift2 img").attr("src", cfgGift["gift2_img"]);
        //$('#solo'+i+" #gift2 div").html(cfgGift["gift2_desc"]);
    }
    else {
        $('#solo' + i + " #gift2").remove();
    }

    if (cfgGift["gift3_img"] != "") {
        $('#solo' + i + " #gift3 img").attr("src", cfgGift["gift3_img"]);
        //$('#solo'+i+" #gift3 div").html(cfgGift["gift3_desc"]);
    }
    else {
        $('#solo' + i + " #gift3").remove();
    }

    if (cfgGift["gift4_img"] != "") {
        $('#solo' + i + " #gift4 img").attr("src", cfgGift["gift4_img"]);
        //$('#solo'+i+" #gift4 div").html(cfgGift["gift4_desc"]);
    }
    else {
        $('#solo' + i + " #gift4").remove();
    }
    $('#solo' + i + " .xSpan").html(cfgGift["desc"]);



    if (soloData["giftStatus"] == 1) {
        $('#solo' + i + " #button_claim").attr("href", "JavaScript:claim(" + i + "," + soloData["giftCur"] + ",0);");
        $('#solo' + i + " #button_claim").addClass("js_sign");
        //有可领取的奖励需要将tab标记，领奖之后要试图将其删除
        $('#sub' + i).addClass("not_s");
    }
    else if (soloData["giftStatus"] == 2) {
        $('#solo' + i + " #button_claim").removeClass("js_sign");
        $('#solo' + i + " #button_claim").removeAttr("href");
        $('#solo' + i + " #button_claim").html(lang_data["lang_340"]);
        $('#sub' + i).removeClass("not_s");
    } else {
        $('#solo' + i + " #button_claim").removeClass("js_sign");
        $('#solo' + i + " #button_claim").removeAttr("href");
        $('#sub' + i).removeClass("not_s");
    }
}

function freshTeamGift(teamData) {
    var giftStatus1 = teamData["giftStatus1"];
    var giftStatus2 = teamData["giftStatus2"];
    if (giftStatus1 == 0 && giftStatus2 == 0) {
        $('#teamgift .button_claim1').removeAttr("href");
        $('#teamgift .button_claim2').removeAttr("href");
        return;
    }
    $('#team_going .this_on').attr("style", "display: none");
    $('#team_going #going .SignUp .bt_dBox .fr_btm').removeAttr("style");
    $('#team_going #going #button_quit').attr("style", "display: none");
    $('#team_going #going #button_dismiss').attr("style", "display: none");
    $('#team_going #going #teamgift').removeAttr("style");

    if (giftStatus1 == 0) {
        $('#team_going #going #teamgift .btn1').attr("style", "display: none");
        $('#team_going #going #teamgift .button_claim1').removeAttr("href");
        $('#team_going #going #teamgift .btn2').removeAttr("style");
        if (giftStatus2 == 1) {  //只有晋级奖励可领取
            $('#team_going #going #teamgift .button_claim2').addClass("js_sign");
            $('#team_going #going #teamgift .button_claim2').attr("href", "JavaScript:claim(0," + teamData["giftCur"] + ",2);");
        } else if (giftStatus2 == 2) { //只有晋级奖励可领取，且已领取
            $('#team_going #going #teamgift .button_claim2').removeClass("js_sign");
            $('#team_going #going #teamgift .button_claim2').removeAttr("href");
            $('#team_going #going #teamgift .button_claim2').html(lang_data["lang_340"]);
        }
    } else if (giftStatus1 == 1) {
        $('#team_going #going #teamgift .btn1').removeAttr("style");
        $('#team_going #going #teamgift .btn2').attr("style", "display: none");
        $('#team_going #going #teamgift .button_claim1').addClass("js_sign");
        $('#team_going #going #teamgift .button_claim1').attr("href", "JavaScript:claim(0," + teamData["giftCur"] + ",1);");
        /*
        if (giftStatus2 == 0) {  //只有参与奖励可领取
            $('#team_going #going #teamgift .button_claim1').attr("href","JavaScript:claim(0,"+teamData["giftCur"]+",1);");
        } else if (giftStatus2 == 1) { //两个都可领，先显示参与奖励
            $('#team_going #going #teamgift .button_claim1').attr("href","JavaScript:claim(0,"+teamData["giftCur"]+",1);");
        } else if (giftStatus2 == 2) { //不合逻辑，但显示只有参与奖励可领取
            $('#team_going #going #teamgift .button_claim1').attr("href","JavaScript:claim(0,"+teamData["giftCur"]+",1);");
        }
        */
    } else if (giftStatus1 == 2) {
        if (giftStatus2 == 0) { //只有参与奖励可领，且已领取
            $('#team_going #going #teamgift .btn1').removeAttr("style");
            $('#team_going #going #teamgift .btn2').attr("style", "display: none");
            $('#team_going #going #teamgift .button_claim1').removeClass("js_sign");
            $('#team_going #going #teamgift .button_claim1').removeAttr("href");
            $('#team_going #going #teamgift .button_claim1').html(lang_data["lang_340"]);
        } else if (giftStatus2 == 1) { //两个都可领，显示晋级奖励
            $('#team_going #going #teamgift .btn1').attr("style", "display: none");
            $('#team_going #going #teamgift .btn2').removeAttr("style");
            $('#team_going #going #teamgift .button_claim2').addClass("js_sign");
            $('#team_going #going #teamgift .button_claim2').attr("href", "JavaScript:claim(0," + teamData["giftCur"] + ",2);");
        } else if (giftStatus2 == 2) { //两个都可领，显示晋级奖励已领取
            $('#team_going #going #teamgift .btn1').attr("style", "display: none");
            $('#team_going #going #teamgift .btn2').removeAttr("style");
            $('#team_going #going #teamgift .button_claim2').removeClass("js_sign");
            $('#team_going #going #teamgift .button_claim2').removeAttr("href");
            $('#team_going #going #teamgift .button_claim2').html(lang_data["lang_340"]);
        }
    }
}

function freshTeamInfo(teamData, afterAdd = 1) {
    if (afterAdd == 1) {
        $("#team_going .teamNew .TeamName .sr_input input").val(teamData["name"]);
        localStorage.setItem(sOpenid + "valuee0", teamData["name"]);
        $("#team_uid1").val("");
        localStorage.setItem(sOpenid + "valuee1", "");
        $("#team_openid1").val("");
        localStorage.setItem(sOpenid + "valuee2", "");
    }
    $('#team_going .teamNew .leader_dz .bodyTeamNew .sZing ul span').text("");
    $('#team_going .teamNew .leader_dz .bodyTeamNew .sZing ul img').attr("src", "");
    $("#pop8 .teamMat span").text("");
    $("#pop8 .teamMat img").attr("src", "");

    for (var k = 0; k < teamData["member"].length / 2; k++) {
        var name = teamData["member"][2 * k];
        var level = teamData["member"][2 * k + 1];
        var cfg = getLevelDescCfg(level);
        $('#team_going .teamNew .leader_dz .bodyTeamNew .sZing ul li').eq(k).find('.LiName img').attr("src", cfg["src"]);
        $('#team_going .teamNew .leader_dz .bodyTeamNew .sZing ul li').eq(k).find('.LiName span').text(name);

        $("#pop8 .teamMat .t" + k + " img").attr("src", cfg["src"]);
        $("#pop8 .teamMat .t" + k + " span").text(name);
    }
    var myIndex = teamData["myIndex"];
    $('#team_going .teamNew .leader_dz .bodyTeamNew .sZing ul li').eq(myIndex).addClass("myNot");

    if (myIndex == 0) { //队长
        $('#team_going .teamNew .leader_dz .PlayerInt .one_ipt').removeClass("on");

        $('#team_going .teamNew .leader_dz .playerBtm').attr("style", "display: none");
        $('#team_going .teamNew .leader_dz .leaveBtm').removeAttr("style");

        $('#team_going .teamNew .leader_dz .leaveBtm .fl_back').removeAttr("style");
        $('#team_going .teamNew .leader_dz .leaveBtm .fl_back .cs_a.sur').attr("style", "display: none"); //Back
        $('#team_going .teamNew .leader_dz .leaveBtm .fl_back .dismiss_btm').removeAttr("style");//dismiss
        $('#team_going .teamNew .leader_dz .leaveBtm .fl_back .dismiss_btm').attr("href", "JavaScript:OpenDialog('pop11');");

        $('#team_going .teamNew .leader_dz .invite_btm .sur').addClass("gray");
        $('#team_going .teamNew .leader_dz .invite_btm .sur').removeAttr("href");
        $('#team_going .teamNew .leader_dz .leaveBtm .fr_leave .yellow_a').addClass("gray");
        $('#team_going .teamNew .leader_dz .leaveBtm .fr_leave .yellow_a').removeAttr("href");

        if (teamData["member"].length >= 10) { //可注册
            $('#team_going .teamNew .leader_dz .leaveBtm .fr_leave .yellow_a').removeClass("gray");
            $('#team_going .teamNew .leader_dz .leaveBtm .fr_leave .yellow_a').attr("href", "JavaScript:regConfirm();");
        }
        if (teamData["member"].length <= 10) { //可邀请
            $('#team_going .teamNew .leader_dz .invite_btm .sur').removeClass("gray");
            $('#team_going .teamNew .leader_dz .invite_btm .sur').attr("href", "JavaScript:addConfirm();");
        }
    } else { //队员
        $('#team_going .teamNew .leader_dz .PlayerInt .one_ipt').addClass("on");

        $('#team_going .teamNew .leader_dz .leaveBtm').attr("style", "display: none");
        $('#team_going .teamNew .leader_dz .playerBtm').removeAttr("style");
        $('#team_going .teamNew .leader_dz .invite_btm .sur').addClass("gray");
    }
}

function freshTeamInfo2(teamData) {
    $("#going .sZing .teamName ul span").text("");
    $("#going .sZing .teamName ul img").attr("src", "");
    var tmpTotalLevel = 0;
    for (var k = 0; k < teamData["member"].length / 2; k++) {
        var name = teamData["member"][2 * k]
        var level = teamData["member"][2 * k + 1]
        tmpTotalLevel = tmpTotalLevel + parseInt(level);
        $('#name' + k + " span").text(name);
        //$('#name'+k+" div").text(level);
        //段位
        var cfg = getLevelDescCfg(level);
        $('#name' + k + " img").attr("src", cfg["src"]);
    }
    $('#name' + teamData["myIndex"]).addClass("myNot");
    $('#team_going .teamName p em').text(teamData["name"]);
    var avgLevel = tmpTotalLevel / (teamData["member"].length / 2);
    var levelCfg = getLevelCfg(avgLevel);
    $('#team_going .y_grade #addp').text(levelCfg["tpoint"]);

    //段位
    var cfg = getLevelDescCfg(avgLevel);
    $('#teamLevel img').attr("src", cfg["src"]);
    $('#teamLevel em').html(cfg["desc"]);
}

function regConfirm() {
    var teamName = $("#team_going .teamNew .TeamName .sr_input input").val().trim();
    $("#pop8 .team_pop .team_name").text(teamName);
    OpenDialog('pop8');
}

function getRegionByCountry() {

    var North_America = ["DO", "JM", "CU", "HT", "VI", "BL", "MQ", "GP", "AW", "CW", "SX", "US", "CA", "PR", "BQ"];
    var Latin_America = ["CL", "CO", "PE", "EC", "AR", "GT", "CR", "SV", "BO", "HN", "UY", "VE", "PY", "BZ", "GF", "FK", "BR", "MX"];
    var Western_Europe = ["VA", "DE", "FR", "GB", "IT", "ES", "NL", "CH", "SE", "PT", "NO", "DK", "IE", "FI", "BE", "LU", "MT", "IS", "AD", "IM", "MC", "LI", "FO", "SM"];
    var Japan = ["JP"];
    if (North_America.indexOf(country) !== -1) {
        return 1
    }
    if (Latin_America.indexOf(country) !== -1) {
        return 2
    }
    if (Western_Europe.indexOf(country) !== -1) {
        return 3
    }
    if (Japan.indexOf(country) !== -1) {
        return 4
    }
    return 5;
}

function myRegionRank() {
    sRegion = region == 0 ? getRegionByCountry() : region;

    $('.listM').attr("style", "display: none");
    $('#wcIon' + sRegion).attr("style", "");
    $('.leaderboard_B .phList li').removeClass("not");
    $('#rt' + sRegion).addClass("not");
    getRankList(sRegion, 0);
}
var tmpl = '\
    <div class="mcList flex spb"><h3>RANK</h3><span>NAME</span><em>POINT</em>\
    <div class="dyPlay">\
        <ul>\
            <li><div class="LiNameN"><i class="si_icon"><img src="png0" alt=""></i>MATE0</div><i class="leaderB sur"></i></li>\
            <li><div class="LiNameN"><i class="si_icon"><img src="png1" alt=""></i>MATE1</div></li>\
            <li><div class="LiNameN"><i class="si_icon"><img src="png2" alt=""></i>MATE2</div></li>\
            <li><div class="LiNameN"><i class="si_icon"><img src="png3" alt=""></i></i>MATE3</div></li>\
            <li><div class="LiNameN"><i class="si_icon"><img src="png4" alt=""></i>MATE4</div></li>\
            <li><div class="LiNameN"><i class="si_icon"><img src="png5" alt=""></i>MATE5</div></li>\
        </ul>\
    </div>\
    </div>';
function getRankList(sRegion, rankIndex) {

    if (globalRankIndex[sRegion] > rankIndex || globalRankIndex[sRegion] >= 512) return;

    if (!canGetRank) return;
    canGetRank = false;

    loadScript(oriUrl + "&r=index/getRankList&index=" + globalRankIndex[sRegion] + "&region=" + sRegion + paramStr, function () {
        if (global_searesult.iRet !== 0) {
            popString(error_list['others']);
            canGetRank = true;
            return;
        } else {
            var code = global_searesult.jData.code;
            if (code !== 0) {
                if (error_list[code]) {
                    popString(error_list[code]);
                } else {
                    popString(error_list['others']);
                }
                canGetRank = true;
            } else {
                var data = global_searesult.jData.data;
                if (rankIndex == 0) {
                    $('#region' + data["region"] + ' .mcList.flex.spb').remove();
                }
                for (var item of data.list) {
                    addItem = tmpl.replace("RANK", item["rank"]);
                    addItem = addItem.replace("NAME", item["name"]);
                    addItem = addItem.replace("POINT", item["point"]);
                    for (var k = 0; k < item["member"].length / 2; k++) {
                        var name = item["member"][2 * k];
                        var level = item["member"][2 * k + 1];
                        addItem = addItem.replace("MATE" + k, name);
                        var cfg = getLevelDescCfg(level);
                        addItem = addItem.replace("png" + k, cfg["src"]);
                    }
                    addItem = addItem.replace("MATE5", "");
                    addItem = addItem.replace("png5", "");
                    $('#region' + data["region"]).append(addItem);
                }
                //添加自己排名
                if (data.hasOwnProperty("self") && data["self"].hasOwnProperty("rank") && data["self"]["rank"] != 0) {
                    $('.myTeam').remove();
                    addItem = tmpl.replace("mcList flex spb", "mcList myTeam flex spb");
                    addItem = addItem.replace("RANK", data["self"]["rank"]);
                    addItem = addItem.replace("NAME", data["self"]["name"]);
                    addItem = addItem.replace("POINT", data["self"]["point"]);
                    for (var k = 0; k < data["self"]["member"].length / 2; k++) {
                        var name = data["self"]["member"][2 * k];
                        var level = data["self"]["member"][2 * k + 1];
                        addItem = addItem.replace("MATE" + k, name);
                        var cfg = getLevelDescCfg(level);
                        addItem = addItem.replace("png" + k, cfg["src"]);
                    }
                    addItem = addItem.replace("MATE5", "");
                    addItem = addItem.replace("png5", "");
                    $('#wcIon' + data["region"]).append(addItem);
                }

                globalRankIndex[sRegion] += data.list.length;
                canGetRank = true;
            }
        }
    })

}

var cfgLevelDescMap = [
    { "begin": 1, "end": 200, "desc": lang_data["lang_106"], "src": "images/1-1.png" },
    { "begin": 201, "end": 400, "desc": lang_data["lang_107"], "src": "images/1-2.png" },
    { "begin": 401, "end": 600, "desc": lang_data["lang_108"], "src": "images/1-3.png" },
    { "begin": 601, "end": 800, "desc": lang_data["lang_109"], "src": "images/1-4.png" },
    { "begin": 801, "end": 1000, "desc": lang_data["lang_110"], "src": "images/1-5.png" },

    { "begin": 1001, "end": 1200, "desc": lang_data["lang_111"], "src": "images/2-1.png" },
    { "begin": 1201, "end": 1400, "desc": lang_data["lang_112"], "src": "images/2-2.png" },
    { "begin": 1401, "end": 1600, "desc": lang_data["lang_113"], "src": "images/2-3.png" },
    { "begin": 1601, "end": 1800, "desc": lang_data["lang_114"], "src": "images/2-4.png" },
    { "begin": 1801, "end": 2000, "desc": lang_data["lang_115"], "src": "images/2-5.png" },

    { "begin": 2001, "end": 2200, "desc": lang_data["lang_116"], "src": "images/3-1.png" },
    { "begin": 2201, "end": 2400, "desc": lang_data["lang_117"], "src": "images/3-2.png" },
    { "begin": 2401, "end": 2600, "desc": lang_data["lang_118"], "src": "images/3-3.png" },
    { "begin": 2601, "end": 2800, "desc": lang_data["lang_119"], "src": "images/3-4.png" },
    { "begin": 2801, "end": 3000, "desc": lang_data["lang_120"], "src": "images/3-5.png" },

    { "begin": 3001, "end": 3300, "desc": lang_data["lang_121"], "src": "images/4-1.png" },
    { "begin": 3301, "end": 3600, "desc": lang_data["lang_122"], "src": "images/4-2.png" },
    { "begin": 3601, "end": 3900, "desc": lang_data["lang_123"], "src": "images/4-3.png" },
    { "begin": 3901, "end": 4200, "desc": lang_data["lang_124"], "src": "images/4-4.png" },
    { "begin": 4201, "end": 4500, "desc": lang_data["lang_125"], "src": "images/4-5.png" },

    { "begin": 4501, "end": 4900, "desc": lang_data["lang_126"], "src": "images/5-1.png" },
    { "begin": 4901, "end": 5300, "desc": lang_data["lang_127"], "src": "images/5-2.png" },
    { "begin": 5301, "end": 5700, "desc": lang_data["lang_128"], "src": "images/5-3.png" },
    { "begin": 5701, "end": 6100, "desc": lang_data["lang_129"], "src": "images/5-4.png" },
    { "begin": 6101, "end": 6500, "desc": lang_data["lang_130"], "src": "images/5-5.png" },

    { "begin": 6501, "end": 9999999999, "desc": lang_data["lang_131"], "src": "images/6-1.png" },
]
function getLevelDescCfg(score) {
    for (var l = 0; l < cfgLevelDescMap.length; l++) {
        if (score >= cfgLevelDescMap[l]["begin"] && score <= cfgLevelDescMap[l]["end"]) {
            return cfgLevelDescMap[l];
        }
    }
    return false;
}

var cfgGiftSolo = {
    1: {
        0: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "images/Icon_Frame_071_2020E_SPORTS.png",
            "gift2_desc": "Icon_Frame_071_2020E_SPORTS",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_58"]
        },
        1: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_147"]
        },
        2: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_148"]
        },
        3: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_149"]
        },
        4: {
            "gift1_img": "images/dj_1000.jpg",
            "gift1_desc": "dj_1000",
            "gift2_img": "images/Icon_Avatar_086_2020E_SPORTS.png",
            "gift2_desc": "Icon_Avatar_086_2020E_SPORTS",
            "gift3_img": "images/MainWeapon_001_M16A4_ESport.png",
            "gift3_desc": "MainWeapon_001_M16A4_ESport",
            "desc": lang_data["lang_150"]
        },
    },
    2: {
        0: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "images/Icon_Frame_071_2020E_SPORTS.png",
            "gift2_desc": "Icon_Frame_071_2020E_SPORTS",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_58"]
        },
        1: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_147"]
        },
        2: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_148"]
        },
        3: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_149"]
        },
        4: {
            "gift1_img": "images/dj_1000.jpg",
            "gift1_desc": "dj_1000",
            "gift2_img": "images/Icon_Avatar_086_2020E_SPORTS.png",
            "gift2_desc": "Icon_Avatar_086_2020E_SPORTS",
            "gift3_img": "images/LethalWeapon_001_Frag_ESport.png",
            "gift3_desc": "LethalWeapon_001_Frag_ESport",
            "gift4_img": "images/MeleeWeapon_004_knife_ESport.png",
            "gift4_desc": "MeleeWeapon_004_knife_ESport",
            "desc": lang_data["lang_150"]
        },
    },
    3: {
        0: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "images/Icon_Frame_071_2020E_SPORTS.png",
            "gift2_desc": "Icon_Frame_071_2020E_SPORTS",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_58"]
        },
        1: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_147"]
        },
        2: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_148"]
        },
        3: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_149"]
        },
        4: {
            "gift1_img": "images/dj_1000.jpg",
            "gift1_desc": "dj_1000",
            "gift2_img": "images/Icon_Avatar_086_2020E_SPORTS.png",
            "gift2_desc": "Icon_Avatar_086_2020E_SPORTS",
            "gift3_img": "images/BR_Bag_BackpackE_08_Esports.png",
            "gift3_desc": "BR_Bag_BackpackE_08_Esports",
            "desc": lang_data["lang_150"]
        },
    },
    4: {
        0: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "images/Icon_Frame_071_2020E_SPORTS.png",
            "gift2_desc": "Icon_Frame_071_2020E_SPORTS",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_58"]
        },
        1: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_147"]
        },
        2: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_148"]
        },
        3: {
            "gift1_img": "images/dj_500.jpg",
            "gift1_desc": "dj_500",
            "gift2_img": "",
            "gift2_desc": "",
            "gift3_img": "",
            "gift3_desc": "",
            "desc": lang_data["lang_149"]
        },
        4: {
            "gift1_img": "images/dj_1000.jpg",
            "gift1_desc": "dj_1000",
            "gift2_img": "images/Icon_Avatar_086_2020E_SPORTS.png",
            "gift2_desc": "Icon_Avatar_086_2020E_SPORTS",
            "gift3_img": "images/MainWeapon_027_AK47_ESport.png",
            "gift3_desc": "MainWeapon_027_AK47_ESport",
            "desc": lang_data["lang_150"]
        },
    }
}