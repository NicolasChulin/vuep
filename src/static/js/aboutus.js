$(function() {

    $('#about-menu li').on('click', function(){
        var $this = $(this);
        $this.addClass('abm-li-act').siblings().removeClass('abm-li-act');
        var index = $this.index();
        var actLi = $('#about-cont').children('.about-li')[index];
        $(actLi).show().siblings().hide();

        if(index==2 && $('#normal-map').children().length==0){
            mapOptions();
        }
    });

    var index = parseInt(getQueryString("type"));
    if(index >=0 || index <= 3 ){
        $($('#about-menu').find('li')[index]).trigger('click');
        var mainLi = $('#header-menu').children().children('.header-li')[5];
        var subLi = $(mainLi).find('li')[index];
        $(subLi).addClass('header-li-act');
    }

	function mapOptions(){
		var mapOption = {
            mapType: BMAP_NORMAL_MAP,
            maxZoom: 18,
            drawMargin:0,
            enableFulltimeSpotClick: true,
            enableHighResolution:true
        };
        var map = new BMap.Map("normal-map", mapOption);
        var point = new BMap.Point(114.412205,30.484999);
        map.centerAndZoom(point, 18);
        var marker=new BMap.Marker(point);
        marker.enableDragging();
        map.addOverlay(marker);
        map.enableScrollWheelZoom(true);
        map.addControl(new BMap.MapTypeControl());
	}

});
