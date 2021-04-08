var skinHeroList = [];

// ��ȡ����Ƥ������
function getSkinList() {
    $.getJSON("//game.gtimg.cn/images/lol/act/img/js/cuSkinList/cuskin_list.js", function (res) {
        skinHeroList = res.cuskin;
    })
}

getSkinList();

var eyeSkinList = [];

// ��ȡ��Ƥ������
function getEyeSkinList() {
    $.getJSON("//game.gtimg.cn/images/lol/act/img/js/eyeskinList/eyeskin_list.js", function (res) {
        eyeSkinList = res.eyeskin;
    })
}

getEyeSkinList();

var cuportraitList = [];

// ��ȡͼ������
function getCuportraitList() {
    $.getJSON("//game.gtimg.cn/images/lol/act/img/js/cuPortraitList/cuportrait_list.js", function (res) {
        cuportraitList = res.cuportrait;
    })
}

getCuportraitList();

var expressionList = [];

// ��ȡ��������
function getExpressionList() {
    $.getJSON("//game.gtimg.cn/images/lol/act/img/js/expressionList/expression_list.js", function (res) {
        expressionList = res.expression;
    })
}

getExpressionList();
//��ȡССӢ������
var MiniHeroList = [];
if (typeof (TFTItemHash_MiniHero_List) != 'undefined') {
    for (var i in TFTItemHash_MiniHero_List) {
        MiniHeroList[TFTItemHash_MiniHero_List[i]['sItemInstanceId']] = TFTItemHash_MiniHero_List[i];
    }
}
//��ȡ��ͼ����
var MapList = [];
if (typeof (TFTItemHash_Map_List) != 'undefined') {
    for (var i in TFTItemHash_Map_List) {
        MapList[TFTItemHash_Map_List[i]['sItemInstanceId']] = TFTItemHash_Map_List[i];
    }
}

//��ȡ������Ч����
var DamageList = [];
if (typeof (TFTItemHash_Damage_List) != 'undefined') {
    for (var i in TFTItemHash_Damage_List) {
        DamageList[TFTItemHash_Damage_List[i]['sItemInstanceId']] = TFTItemHash_Damage_List[i];
    }
}

//���ݵ��ߴ����ȡ������ϸ�����ơ�ͼƬ
function ItemNameCfg(t, code) {
    var _Img = "";
    var _Name = "";
    var _Type = "";
    switch (parseInt(t, 10)) {
        case 1:
            _Type = "Ӣ��";
            if (code > 1000) {
                _Name = skinHeroList[code]['name'];
            } else {
                _Name = skinHeroList[code + '000']['name'];
            }
            break;
        case 2:
            _Type = "Ƥ��";
            _Name = skinHeroList[code]['name'];
            break;
    }

    switch (parseInt(t, 10)) {
        case 1:
            if (code > 1000) {
                _Name = skinHeroList[code]['name'];
                _Img = "//game.gtimg.cn/images/lol/act/img/skinloading/" + code + ".jpg";
            } else {
                _Name = skinHeroList[code + '000']['name'];
                _Img = "//game.gtimg.cn/images/lol/act/img/skinloading/" + code + "000.jpg";
            }
            break;
        case 2:
            _Name = skinHeroList[code]['name'];
            if(skinHeroList[code]['isChromas']=='true'){
                var heroCode=Math.floor(code/1000);
                _Img = "//game.gtimg.cn/images/lol/act/img/chromas/"+heroCode+"/"+code+".png";
            }else{
                _Img = "//game.gtimg.cn/images/lol/act/img/skinloading/" + code + ".jpg";
            }
            break;
        case 6:
            _Name = cuportraitList[code]['name'];
            _Img = "//game.gtimg.cn/images/lol/act/img/profileicon/" + code + ".png";
            break;
        case 8:
            _Name = expressionList[code]['name'];
            _Img = expressionList[code]['icon'];
            break;
        case 19:
            _Name = eyeSkinList[code]['name'];
            _Img = "//game.gtimg.cn/images/lol/act/img/wardskin/wardHero_" + code + ".png";
            break;
        case 20:
            _Name = MiniHeroList[code]['sItemName'];
            _Img = MiniHeroList[code]['sItemImg'];
            break;
        case 21:
            _Name = MapList[code]['sItemName'];
            _Img = MapList[code]['sItemImg'];
            break;
        case 22:
            _Name = DamageList[code]['sItemName'];
            _Img = DamageList[code]['sItemImg'];
            break;
    }
    return {
        "img": _Img,
        "info": _Name,
        "title": _Type
    };
}