$(document).ready(function() {
	$('#nav li').hover(function() {
		$('ul', this).stop().fadeIn(300);
		$(this).children('a:first').addClass("hov");
	}, function() {
		$('ul', this).stop().fadeOut(300);
		$(this).children('a:first').removeClass("hov");

	});
	$(".regard_main .regard_t>li").click(function(){
		console.log(this)
		$(this).addClass('regard_active').siblings("li").removeClass("regard_active");
		 var index = $(this).index();
		  $(".regard_p>div:eq(" + index + ")").addClass("regard_selected").siblings("div").removeClass("regard_selected");
		  mapOptions();
	})
	function mapOptions(){
		var mapOption = {
        mapType: BMAP_NORMAL_MAP,
        maxZoom: 18,
        drawMargin:0,
        enableFulltimeSpotClick: true,
        enableHighResolution:true
    };
    var map = new BMap.Map("normal_map", mapOption);
    var testpoint = new BMap.Point(114.412205,30.484999);
    map.centerAndZoom(testpoint, 18);
    var marker=new BMap.Marker(testpoint);
    marker.enableDragging();
    map.addOverlay(marker);
    map.enableScrollWheelZoom(true);
    map.addControl(new BMap.MapTypeControl());
    marker.addEventListener('dragend',function(e){
        panorama.setPosition(e.point); //拖动marker后，全景图位置也随着改变
        panorama.setPov({heading: -40, pitch: 6});}
    );
	}
	/*接收参数*/
    function GetQueryString(name) 
        { var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");         
         var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]);
         return null; 
    } 
    var pig= GetQueryString("index");
    console.log(pig);
		 // var index = $(this).index();
	$(".regard_main .regard_t>li:eq(" + pig + ")").addClass('regard_active').siblings("li").removeClass("regard_active");
	$(".regard_p>div:eq(" + pig + ")").addClass("regard_selected").siblings("div").removeClass("regard_selected"); 
	mapOptions();  
});