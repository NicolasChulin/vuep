$(function() {
    $('#help-menu li').on('click', function(){
        var $this = $(this);
        $this.addClass('help-mact').siblings().removeClass('help-mact');
        var index = $this.index();
        var actLi = $('#help-cont').children('.help-li')[index];
        $(actLi).show().siblings().hide();
    });

});
