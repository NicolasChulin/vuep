$(document).ready(function() {
	$('#nav li').hover(function() {
		$('ul', this).stop().fadeIn(300);
		$(this).children('a:first').addClass("hov");
	}, function() {
		$('ul', this).stop().fadeOut(300);
		$(this).children('a:first').removeClass("hov");

	});
	$(".helpCenter_main .helpCenter_t>li").click(function(){
		console.log(this)
		$(this).addClass('helpCenter_active').siblings("li").removeClass("helpCenter_active");
		 var index = $(this).index();
		  $(".helpCenter_p>div:eq(" + index + ")").addClass("helpCenter_selected").siblings("div").removeClass("helpCenter_selected");
	})
	

});