$(function(){
    $('#header-app-down').on('click', function(){
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
    });
})
