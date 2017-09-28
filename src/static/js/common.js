var GLOBAL = {
    // domain: 'http://192.168.1.254:8070',
    domain: 'http://api.buoumall.com',
    imgDomain: 'http://image.buoumall.com',
    // imgDomain: 'http://buoumall-pre.img-cn-hangzhou.aliyuncs.com',
    base: 'http://192.168.1.254:8070',
}

/*
* name 参数名称
*/
function getQueryString(name) {
	 var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	 var r = window.location.search.substr(1).match(reg);
	 if (r != null) {
	     return r[2];
	 }
	 return null;
}
/*
* addr  图片路径
* size  缩放的宽度尺码，可以是字符串，也可是数字
*/
function getResizeImgUrl(addr, size){
    if(!addr) return;
    var address = addr;
    var pos = addr.indexOf('?');
    if(pos>-1){
        address = addr.slice(0,pos);
    }
    if(!address) return addr;

    var sizeType = {
        'lg': 1000,
        'md': 750,
        'sm': 600,
        'xs': 414,
        'avatar': 100,
    }
    if(typeof size == 'string'){
        var s = sizeType[size] ? sizeType[size] : 750;
    }else if(typeof size == 'number'){
        var s = size;
    }else{
        var s = 750;
    }

    return  GLOBAL.imgDomain + '/' + address + '?x-oss-process=image/resize,w_' + s;
}


/* app-down */
function showAppTips(){
    var div =  ' \
        <div class="app-tips" id="app-tips"> \
            <div class="app-body"> \
                <span class="app-close"></span> \
                <div class="app-ew"> \
                    <img class="cover" src="/static/images/qrcode-app.png" alt="app二维码"> \
                </div> \
                <p>扫描二维码，下载布偶猫APP查看更多</p> \
                <p>在布偶猫，和最会生活的人做朋友</p> \
            </div> \
        </div> \
    ';
    var $tips = $(div);
    $('#app-tips').remove();
    $('body').append($tips);
    $tips.fadeIn().find('.app-body').slideDown();
    $tips.on('click', '.app-close', function(){
        $tips.fadeOut(500).remove();
    });
}
$(function(){
    $('#header-app-down, #cebianApp, #callGuest').on('click', function(){
        showAppTips();
    });
})
