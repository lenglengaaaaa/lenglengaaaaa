/*弹框*/
var popIsShow = false;
var popDom = null;
function OpenDialog(id) {
    closeDialog();
    var p = $('#'+id);
    popDom = p;
    console.log(popDom.height()/2);
    if (p) {
        p.show().css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: -popDom.innerHeight() / 2 + 'px',
            marginLeft: -popDom.innerWidth() / 2 + 'px',
            zIndex: 998
        });
        p.attr('for', 'pop');
        popIsShow = true;
        if ($('[for="' + id + '"]').length >= 1) return;
        $('body').append('<div name="overlay" onclick="closeDialog()" for='
+ id
+ ' style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:997;background:rgba(0,0,0,0.8);"></div>');
    }
}
function closeDialog() {
    $('[for="pop"]').hide().attr('style', 'display:none');
    $('[name="overlay"]').remove();
}

/*二级弹框*/
var popIsShow = false;
var popDom = null;
function OpenDialog1(id) {
    closeDialog1();
    var p = $('#'+id);
    popDom = p;
    console.log(popDom.height()/2);
    if (p) {
        p.show().css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: -popDom.innerHeight() / 2 + 'px',
            marginLeft: -popDom.innerWidth() / 2 + 'px',
            zIndex: 998
        });
        p.attr('for', 'pop');
        popIsShow = true;
        if ($('[for="' + id + '"]').length >= 1) return;
        $('body').append('<div name="overlay2" onclick="closeDialog1()" for='
+ id
+ ' style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:997;background:url(images/pop2-bg.png) no-repeat;background-size: 100% 100%;"></div>');
    }
}
function closeDialog1() {
    $('[for="pop"]').hide().attr('style', 'display:none');
    $('[name="overlay2"]').remove();
}