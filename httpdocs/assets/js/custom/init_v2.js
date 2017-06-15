$(document).ready(function(){
    $('#hero-content .single-item').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'linear',
        slidesToShow: 1,
        adaptiveHeight: true
    });
})
