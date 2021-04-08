
function TGDialogS(e){
    // 利用milo库引入dialog组件
    need("biz.dialog",function(Dialog){
        Dialog.show({
            id:e,
            bgcolor:'#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity:50 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
        });
    });
}
function closeDialog(){
    // 利用milo库引入dialog组件
    need("biz.dialog",function(Dialog){
        Dialog.hide();
    });
}

var player
function showVideoDia(vid) {
	player = new Txplayer({
		containerId: 'container',
		vid: vid,
		width: '100%',
		height: '100%',
		autoplay: true
		});
	TGDialogS('dia1');
}
$(".dia-close").click(function(){
	$(".video-box").html('');
	player.mute();
	
})