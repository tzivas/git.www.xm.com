$(window).load(function() {
    if ($('[class*="clone-"]').length > 0) {
        cloneHeight();
    }
});


$(document).ready(function(){
     var mediaMin1200 = window.matchMedia('(min-width: 1200px)'),
        mediaMax1199 = window.matchMedia('(max-width: 1199px)'),
        mediaMax991 = window.matchMedia('(max-width: 991px)'),
        mediaMin992 = window.matchMedia('(min-width: 992px)'),
        mediaMin768 = window.matchMedia('(min-width: 768px)'),
        mediaMax767 = window.matchMedia('(max-width: 767px)');
    var $window = $(window);
       
    //Fixing jQuery Click Events for the iPad
    var ua = navigator.userAgent,
    event = (ua.match(/iPad/i)) ? "touchstart"   : "click";


 $(window).resize(function() {


        if (mediaMax991.matches) {
            /* Close Navigation */
            //$('.toggleLeftNav, .toggleRightNav').addClass('animated bounceIn');
            $('#dashboard-wrap').appendTo('#dashboard');
            $('.symbols-table').appendTo('#symbols');


            var htmlString = $('.flags-wrap').html(),
            tempString = htmlString,
            reg = /(flags-sprite sm-|flags-sprite  sm-)/g;

            if(htmlString!=null){
                $('#languages').html(tempString.replace(reg, "flags-sprite lg-"));
            }

        } else {
            $('#dashboard-wrap').appendTo('#dashboard-container');
            $('.symbols-table').appendTo('#symbols-container');
        }

        if (mediaMin768.matches) {
            // Clone height in clone-[name] elements
            if ($('[class*="clone-"]').length > 0) {
                cloneHeight();
            } 
        }

        if (mediaMax767.matches) {
             // Remove clone elements
            if ($('[class*="clone-"]').length > 0) {
                removeClonesStyle();
            }       
        }

    }).trigger('resize');

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

    $('#payments-slideshow').slick({
      dots: true,
      infinite: false,
      speed: 300,
      arrows: false,
      slidesToShow: 8,
      slidesToScroll: 8,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        }
      ]
    });

  /*** 
  * Run this code when the #toggle-menu link has been tapped
  * or clicked
  */
 $( '.toggleLeftNav, .toggleRightNav' ).on(event, function(e) {
  e.preventDefault();
 
  var $body = $( 'body' ),
      $page = $( '.site-canvas' ),
      $menu = $( '#menu' ),
  /* Cross browser support for CSS "transition end" event */
  transitionEnd = 'transitionend webkitTransitionEnd otransitionend MSTransitionEnd',
  menuName = $(this).attr('class');
 
  $body.removeClass('showNavLeft');
  $body.removeClass('showNavRight');

  if(menuName === "toggleLeftNav"){
      /* When the toggle menu link is clicked, animation starts */
      $body.addClass( 'animating showNavLeft' );
      
      var bodyHeight = $('.site-canvas').height() - $('#main-nav .toggle-bar').height();
      $('#navigation-collapse').css('max-height', bodyHeight);
  }

  if(menuName === "toggleRightNav"){
      /* When the toggle menu link is clicked, animation starts */
      $body.addClass( 'animating showNavRight' );

       var bodyHeight = $('.site-canvas').height() - $('#main-nav .toggle-bar').height();
       $('ul#languages').css('max-height', bodyHeight);
  }

  /***
   * Determine the direction of the animation and
   * add the correct direction class depending
   * on whether the menu was already visible.
   */
  if ( $body.hasClass( 'menu-visible' ) ) {
   $body.addClass( 'right-side' );
  } else {
   $body.addClass( 'left-side' );
  }

  /***
   * When the animation (technically a CSS transition)
   * has finished, remove all animating classes and
   * either add or remove the "menu-visible" class 
   * depending whether it was visible or not previously.
   */
  $page.on(transitionEnd, function() {
   $body
    .removeClass( 'animating left-side right-side' )
    .toggleClass( 'menu-visible' );

   $page.off( transitionEnd );

  });
 });


    //MAIN NAVIGATION  
    $("ul#main-nav > li").on(event, function(e) {

        if ($(this).children(".dropdown").length > 0) {

            //Select button active
            $("ul#main-nav > li").removeClass("selected");
            $(this).addClass("selected");

            if ($(this).children(".dropdown").css('display') === "none") {
                e.preventDefault();
                e.stopPropagation();

                //$("ul#main-nav > li > .dropdown").stop(true, true).fadeOut("slow");
                $("ul#main-nav > li > .dropdown").hide();
                $(this).children(".dropdown").show();
                isNavOpened = true;

                //SHOW
            } else {
                //HIDE
                var clickElement = $(e.target);
                if ($(clickElement).closest(".dropdown").length === 0) {
                    $(this).removeClass("selected");
                    $(this).children(".dropdown").hide();
                    isNavOpened = false;
                }
            }

        } else {
            //HIDE
            $("ul#main-nav > li").removeClass("selected");
            $("ul#main-nav li").children(".dropdown").hide();
        }

    });

    //General Click
    $(window).on(event, function(e) {
        if ($(e.target).closest("ul#main-nav > li > .dropdown").length === 0) {
            $("ul#main-nav > li > .dropdown").hide();
            $("ul#main-nav > li").removeClass("selected");
        }
    });

})

/*************   Set same height to boxes with class .clonebox   ************/
/**
 * Function sets equal height to:
 * - elements with class clone-[x]
 * - sub-elements with class area-[y]
 * where [x], [y] strings
 */

function cloneHeight() {

    var i, k, l, m,
        cloneSelector = $('[class*="clone-"]'),
        cloneClasses = getClassesContain('clone-', cloneSelector);

    for (i = 0; i < cloneClasses.length; i++) {

        var cloneName = $('.' + cloneClasses[i]),
            areaSelector = cloneName.find('[class*="area-"]'),
            areaClasses = new Array();

        // Find all classes start with area- inside elements have class clone-[x]
        for (k = 0; k < cloneName.length; k++) {
            areaClasses = getClassesContain('area-', areaSelector);
        }

        // Set equal height to elements have class area-[y]
        for (k = 0; k < areaClasses.length; k++) {
            areaSelector = $('.' + areaClasses[k]);
            equalHeight(areaSelector);
        }

        // Set equal height to elements have class clone-[x] & not class notself
        if (cloneName.hasClass('notself') === false) {
            equalHeight(cloneName);
        }

    }

    // Adjust position of elements with classes cl-middle & cl-bottom
    $('.cl-middle').each(function() {
        $(this).css('margin-top', ($(this).parent().height() - $(this).outerHeight()) / 2);
    });
    $('.cl-bottom').each(function() {
        $(this).css('margin-top', $(this).parent().height() - $(this).outerHeight());
    });

}

/**
 * Function sets equal height to elements with given selector
 */
function equalHeight(sel) {

    var i,
        heights = new Array(),
        heighest;

    sel.css('height', 'auto');
    for (i = 0; i < sel.length; i++) {
        heights.push(sel.eq(i).outerHeight());
    }

    heighest = Math.max.apply(Math, heights);
    sel.css('height', heighest);
}

/**
 * Function gets all classes contain given string inside given selector
 */
function getClassesContain(str, sel) {

    var i, k,
        allClasses,
        classes = new Array();

    for (i = 0; i < sel.length; i++) {
        allClasses = sel.eq(i).attr('class').split(' ');
        for (k = 0; k < allClasses.length; k++) {
            if (allClasses[k].substring(0, str.length) == str) {
                if ($.inArray(allClasses[k], classes) == -1) {
                    classes.push(allClasses[k]);
                }
            }
        }
    }
    return classes;
}

    /**
     * Function removes all classes regarding Clones
     */
    function removeClonesStyle() {
        $('[class*="clone-"]').removeAttr("style");
        $('[class*="area-"]').removeAttr("style");
        $('.cl-middle, .cl-bottom').removeAttr("style");
    }
