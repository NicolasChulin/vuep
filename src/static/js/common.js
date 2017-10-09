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
    var $tips =  $(' \
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
    ');
    $('#app-tips').remove();
    $('body').append($tips);
    $tips.fadeIn().delay(300).find('.app-body').fadeIn();
    $tips.on('click', '.app-close', function(){
        $tips.fadeOut().delay(300).remove();
    });
}

function showComIcon(){
    var $icons = $(' \
        <div class="list-right-action"> \
            <ul> \
                <li id="goUp"></li> \
                <li id="callGuest"></li> \
                <li id="cebianApp"></li> \
            </ul> \
        </div> \
    ');
    $('body').append($icons).on('click','#callGuest', function(){
        showAppTips();
    }).on('click','#cebianApp', function(){
        showAppTips();
    }).on('click','#goUp', function(){
        $('body').animate({
            'scrollTop':0
        }, 300);
    });

    $(document).scroll(function(){
        var scrollTop = $(document).scrollTop();
        if(scrollTop>400){
            $('#goUp').css('visibility','visible');
        }else{
            $('#goUp').css('visibility','hidden');
        }
    })

}

/* 通用jq插件 */
$.fn.extend({
    loading: function(){
        return this.each(function(){
            var load = '<div class="loading"><div class="loading-img"></div></div>';
            $(this).css('position','relative').append($(load));
        });
    },
    hideLoading: function(){
        return this.each(function(){
            $(this).css('position','static').empty();
        });
    }
});


$(function(){
    $('#header-app-down').on('click', function(){
        showAppTips();
    });

    showComIcon();

    /* header-li actcolor */
    var pageType = $('#pageType').val();
    if(pageType.indexOf('_')>-1){
        var types = pageType.split('_');
        var mainLi = $('#header-menu').children().children('.header-li')[types[0]];
        $(mainLi).addClass('header-li-act');
        var subLi = $(mainLi).find('li')[types[1]];
        $(subLi).addClass('header-li-act');
    }else{
        var mainLi = $('#header-menu').children().children('.header-li')[pageType];
        $(mainLi).addClass('header-li-act');
    }

});
