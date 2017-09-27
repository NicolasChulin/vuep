
$(document).ready(function() {
       $('#nav li').hover(function() {
        $('ul', this).stop().fadeIn(300);
        $(this).children('a:first').addClass("hov");
    }, function() {
        $('ul', this).stop().fadeOut(300);
        $(this).children('a:first').removeClass("hov");

    });
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });
    
});