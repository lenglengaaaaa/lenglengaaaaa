var langObj = null;
	var areaLan = ["en_US","fr_FR","it_IT","de_DE","pt_BR","ru_RU","tr_TR","es_LA","ar_SA","ja_JP"];
	// en_US 英文
	// fr_FR 法语
	// it_IT 意大利语
	// de_DE 德语
	// pt_BR 巴西语
	// ru_RU 俄罗斯语
	// tr_TR 土耳其语
	// es_LA 拉丁语
	// ar_SA 阿拉伯语
	// ja_JP 日语
///a20200220codm/index3.html?lang=RU_RU&day=4&roleid=123456
var language="";

//获取url中的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);

	if (r != null) {
        return unescape(r[2]);
    } else if (q != null) {
        return unescape(q[2]);
    } else {
        return '';
    }
}



//console.log(areaLan.indexOf(getQueryString('lang')));


if (getQueryString("setLan") == null || $.trim(getQueryString("setLan")) == "") {
	var lang = sessionStorage.getItem('lang');
	//console.log(lang);
	if (getQueryString("lang") == null || $.trim(getQueryString("lang")) == "") {
		if (lang == null) {
			language = "en_US";
			sessionStorage.setItem("lang", language);
		}else{
	        language = lang;
		}
	}else{
        language = $.trim(getQueryString("lang"));
        sessionStorage.setItem("lang", language);
	}
	language=language;
	if(areaLan.indexOf(language) < 0) {
        language = "en_US";
    }
} else {
    language = $.trim(getQueryString("setLan"));
	//console.log(language);
	sessionStorage.setItem("lang", language);
}



function initLang(obj) {
	$("[data-lang]").each(function(){
		var texts = $(this).attr("data-lang");
		$(this).html(obj[texts]);
	});

	//console.log(obj['lang_348']);
	$(".leader_ipt lable input").attr("placeholder",obj['lang_351']);
	$(".player_ipt lable input").attr("placeholder",obj['lang_352']);
	$(".sr_input input").attr("placeholder",obj['lang_373']);
}


langObj = GLanguage[language];

var isLan = language;
var bodyClass = $('body');

if(isLan === "it_IT"){
	bodyClass.addClass('itClass')
}else if (isLan === "pt_BR"){
	bodyClass.addClass('ptClass')
}else if(isLan === "tr_TR"){
	bodyClass.addClass('trClass')
}else if(isLan === "es_LA"){
	bodyClass.addClass('esClass')
}else if(isLan === "ar_SA"){
	bodyClass.addClass('arClass')
}else if (isLan === "ja_JP"){
	bodyClass.addClass('jaClass')
}else if(isLan === "fr_FR"){
	bodyClass.addClass('frClass')
}else if (isLan === "ru_RU") {
	bodyClass.addClass('ruClass')
}else if (isLan === "en_US") {
	bodyClass.addClass('enClass')
}else if (isLan === 'de_DE'){
	bodyClass.addClass('deClass')
}
	document.title=GLanguage[language]["lang_37"];
initLang(langObj);


