var nowDialogId = false;
var reopenDialogId = false;
function TGDialogS(e){
	nowDialogId = e;
    // 利用milo库引入dialog组件
    need("biz.dialog",function(Dialog){
    	if(e == reopenDialogId){
    		reopenDialogId = false;
    	}
        Dialog.show({
            id:e,
            bgcolor:'#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity:90 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
        });
    });
}
function closeDialog(){
    // 利用milo库引入dialog组件
    need("biz.dialog",function(Dialog){
        Dialog.hide();
        if(reopenDialogId){
        	TGDialogS(reopenDialogId);
        }
    });
}

$('.tc1 .selbox .selcomm').click(function(){
	var switchFlag = true;
	var item = $('.tc1 .selbox .selcomm');
	for(var i = 0;i < item.length;i++){
		if($(item[i]).hasClass('disable')){
			switchFlag = false;
		}
	}
	if(switchFlag){
		var idx = $(this).index();	
		if($('.tc1 .selbox .selcomm').eq(idx).hasClass('selon')){
			$('.tc1 .selbox .selcomm').removeClass('selon');
		}else{
			$('.tc1 .selbox .selcomm').removeClass('selon').eq(idx).addClass('selon');
		}
	}
})

$('.tc2 .selbox .selcomm').click(function(){
	var switchFlag = true;
	var item = $('.tc2 .selbox .selcomm');
	for(var i = 0;i < item.length;i++){
		if($(item[i]).hasClass('disable')){
			switchFlag = false;
		}
	}
	if(switchFlag){
		var idx =$(this).index();		
		if($('.tc2 .selbox .selcomm').eq(idx).hasClass('selon')){
			$('.tc2 .selbox .selcomm').removeClass('selon');
		}else{
			$('.tc2 .selbox .selcomm').removeClass('selon').eq(idx).addClass('selon');
		}
	}
})


// 皮肤列表
$('.look-skin').click(function(){
	addHtml();
	TGDialogS('skin-tc');
})
// 图标列表
$('.look-icon').click(function(){
	addHtml2();
	TGDialogS('icon-tc');
})
// 全部皮肤列表
$('.btn-look').click(function(){
	addHtml3();
	TGDialogS('tc18');
})

/* #t6Hl8#CC7214F402F4F6B5751421011C6271A0 */