var mediaMin992 = window.matchMedia('(min-width: 992px)'),
    mediaMax991 = window.matchMedia('(max-width: 991px)');


$(document).ready(function() {
	
    //Fixing jQuery Click Events for the iPad
    var ua = navigator.userAgent,
    event = (ua.match(/iPad/i)) ? "touchstart"   : "click";
	
	$(window).resize(function() {
		
		if(mediaMax991.matches){
			if($("body").hasClass('menu-visible')){
				$("body").removeClass('menu-visible');
			}
		}

	}).trigger('resize');
	
  $("#payments-carousel").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 8,
      itemsDesktop : [1199,6],
      itemsDesktopSmall : [979,6],
      itemsTablet : [768, 6]
  });

 /*** 
  * Run this code when the #toggle-menu link has been tapped
  * or clicked
  */
 $('[id="toggle-menu"]' ).on( 'touchstart click', function(e) {
  e.preventDefault();
  var $body = $( 'body' ),
      $page = $( '#main-wrapper' ),
      $menu = $( '#canvas-menu' ),
 
      /* Cross browser support for CSS "transition end" event */
      transitionEnd = 'transitionend webkitTransitionEnd otransitionend MSTransitionEnd';
 
  /* When the toggle menu link is clicked, animation starts */
  $body.addClass( 'animating' );
 
  /***
   * Determine the direction of the animation and
   * add the correct direction class depending
   * on whether the menu was already visible.
   */
  if ( $body.hasClass( 'menu-visible' ) ) {
   $body.addClass( 'right' );
  } else {
   $body.addClass( 'left' );
  }
  
  /***
   * When the animation (technically a CSS transition)
   * has finished, remove all animating classes and
   * either add or remove the "menu-visible" class 
   * depending whether it was visible or not previously.
   */
  $page.on( transitionEnd, function() {
   $body
    .removeClass( 'animating left right' )
    .toggleClass( 'menu-visible' );
 
   $page.off( transitionEnd );
  } );
 } );

    $('.qq').on('click', function() {
        qq();
        return false;
    });

    function qq() {
        var qqUrl = "http://b.qq.com/webc.htm?new=0&sid=800005224&eid=2188z8p8p8p8p8R8K8K8Q&o=www.trading-point.com/zh&q=7&ref=http://www.trading-point.com/zh/old",
            qqTarget = "support",
            qqWindowFeatures = "toolbar=no, resizable=yes, status=no, menubar=no, location=no, width=500, height=400, copyhistory=no, scrollbars=yes, directories=no";

        qqWindow = window.open(qqUrl, qqTarget, qqWindowFeatures);
        if (window.focus)
            qqWindow.focus();
        return;
    }

    /* Dummy value - delete on next file update */
    var dummy = "a";
});