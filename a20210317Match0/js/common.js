function loadScript(url, callback) {
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
        script, options, s;
    if (typeof url === "object") {
        options = url;
        url = undefined;
    }
    s = options || {};
    url = url || s.url;
    callback = callback || s.success;
    script = document.createElement("script");
    script.async = s.async || false;
    script.type = "text/javascript";
    if (s.charset) {
        script.charset = s.charset;
    }
    if (s.cache === false) {
        url = url + (/\?/.test(url) ? "&" : "?") + "_=" + (new Date()).getTime();
    }
    script.src = url;
    head.insertBefore(script, head.firstChild);
    if (callback) {
        document.addEventListener ? script.addEventListener("load", callback, false) : script.onreadystatechange = function () {
            if (/loaded|compvare/.test(script.readyState)) {
                script.onreadystatechange = null
                callback()
            }
        }
    }
}

function getParam(para) {
    var paraArr = location.search.substring(1).split('&');
    for (var i = 0; i < paraArr.length; i++) {
        if (para == paraArr[i].split('=')[0]) {
            //如果参数nickname中=号个数大于2个
            if (para == 'nickname' && paraArr[i].match(/[=]/g).length > 1) {
                return paraArr[i].match(/=(.*)$/)[1];
            }
            return paraArr[i].split('=')[1];
        }
    }
    return '';
}