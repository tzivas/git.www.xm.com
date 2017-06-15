// Get url parameter - Demand only requested parameter to url by setting unique = 1
window.getUrlParameter = function(param, unique) {
    var urlQuery = window.location.search.substring(1),
        urlParam = urlQuery.split('&');
    for (var i=0; i<urlParam.length; i++) {
        var paramName = urlParam[i].split('=');
        if (paramName[0] == param) {
            if(unique == 1 && urlParam.length > 1) {
                return false;
            }
            return paramName[1];
        }
    }
    return false;
}

$(document).ready(function() {
    var mediaMin1200 = window.matchMedia('(min-width: 1200px)'),
        mediaMax1199 = window.matchMedia('(max-width: 1199px)'),
        mediaMax991 = window.matchMedia('(max-width: 991px)'),
        mediaMin992 = window.matchMedia('(min-width: 992px)'),
        mediaMin768 = window.matchMedia('(min-width: 768px)'),
        mediaMax767 = window.matchMedia('(max-width: 767px)');
    var htmlLang = $('html').attr('lang');
    var htmltlang = htmlLang;
    var $window = $(window);
    var xmSite = $('[class*="main-site xm"]').length > 0;

    //Fixing jQuery Click Events for the iPad
    var ua = navigator.userAgent,
    event = (ua.match(/iPad/i)) ? "touchstart"   : "click";

    $(window).resize(function() {

        if(mediaMin1200.matches){
            /* Sticky Bar*/
            stickyBar(true);
        }
        if(mediaMax1199.matches){
            /* Sticky Bar*/
            stickyBar(false);
        }

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

        //Popover for contact page map
        if (mediaMin992.matches) {
            //toggleNavResize();
        }

        if (mediaMin768.matches) {
            // Clone height in clone-[name] elements
            if ($('[class*="clone-"]').length > 0) {
                cloneHeight();
            } 
          

            $('#tax-purposes,#swift-code,#swift-code1,#cpf-cnpj').popover({
                html: true,
                placement: 'bottom',
                animation: 'true',
                trigger: 'hover',
                template : '<div class="popover" role="tooltip"><div class="arrow"></div><div id="tax-content" class="popover-content"></div></div>',
                content: function() {
                    return $("#tax-content").html();
                }
            });
        }

        if (mediaMax767.matches) {
             // Remove clone elements
            if ($('[class*="clone-"]').length > 0) {
                removeClonesStyle();
            }       
            $('#tax-purposes').popover('destroy');
        }

    }).trigger('resize');


    //Support page
    initPopoverMap();

    function stickyWarningBars() {
        var $cookiesInfo = $('#cookies-block');
        var $riskInfo = $('#risk-block');

        function init(){
            if ($riskInfo.length){
                var $riskBarHeight = $riskInfo.outerHeight(); 
            }

            if($cookiesInfo.length && isCookieExist()){
                if ($riskInfo.length){
                    $cookiesInfo.css("bottom", $riskBarHeight);
                } else {
                    $cookiesInfo.css("bottom", "0px");
                }
                $cookiesInfo.fadeIn("slow");
                $cookiesInfo.find("button").on("click", function (e) {
                    createCookie();

                    $cookiesInfo.fadeOut("fast", function () {
                        // Animation complete.
                        $cookiesInfo.detach();
                    });
                });
            }
        }

        var cookieName = 'xmcplc';

        function isCookieExist(){
            if ($.cookie(cookieName) !== "1") {
                return true;
            }
            return false;
        }

        function createCookie(){
            if ($.cookie(cookieName) !== "1") {
                $.cookie(cookieName,"1",{expires:180,path:"/",domain: domainName});
            }
        }

        window.onload = init;
        window.onresize = init;

        init();
    }

    if (xmSite) {
        stickyWarningBars();
    }

    $("#owl-main").owlCarousel({
        autoPlay : 8000,
        navigationText: [
        "<i class='glyphicon glyphicon-chevron-left'></i>",
        "<i class='glyphicon glyphicon-chevron-right'></i>"
        ],
        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        transitionStyle : "fade"
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


$(window).load(function() {
    //Popover for contact page map  
    if ($("ul.navMaps").length > 0) {
        $('.contact ul.navMaps li.active').click();
    }

    if (xmSite) {
        stickyWarningBars();
    }
    
    if ($('[class*="clone-"]').length > 0) {
        cloneHeight();
    }
});

 function equalHeightBtns(e) {
    var btnList = [],
      $this = $(e),
      id,
      init = function() {
        var maxHeight = 0;

        //find max height of each button
        $.each(btnList, function(index, btn) {
          if ($(btn.obj).height() > maxHeight) {
            maxHeight = $(btn.obj).height();
          }         
        });
        
        $.each(btnList, function(index, btn) {
          var maxPadding = (maxHeight - $(btn.obj).height()) / 2,
            totalPaddingTop = btn.pTop + maxPadding,
            totalPaddingBottom = btn.pBottom + maxPadding;

          $(btn.obj).attr("style", "padding-top:" + totalPaddingTop + "px!important;" + "padding-bottom:" + totalPaddingBottom + "px!important;");
        });
      }

    $this.find(".btn").each(function(index, data) {
      btnList.push({
        "obj": data,
        "pTop": parseInt($(this).css("padding-top")),
        "pBottom": parseInt($(this).css("padding-bottom"))
      })
    });

    window.onload = function(){
       setTimeout(function(){
        init();
       }, 250);
    };
    
    window.onresize = init;

  }

  $("[data-equal-btns]").each(function(index, data) {
    equalHeightBtns(data);
  })

    /**
     * Function removes all classes regarding Clones
     */
    function removeClonesStyle() {
        $('[class*="clone-"]').removeAttr("style");
        $('[class*="area-"]').removeAttr("style");
        $('.cl-middle, .cl-bottom').removeAttr("style");
    }

/*
    $(window).bind("load", function() {
        if ($('[class*="clone-"]').length > 0) {
            cloneHeight();
        }
    });
*/

    if ($(".panel-heading").length > 0) {
        var countPanelOpen = 0;

        $(".panel-heading").on(event, function() {
            var parentID = $(this).parent().parent().attr("id"),
                $currentIcon = $(this).children('i'),
                $currentHeader = $(this).siblings(".panel-collapse");

            $currentHeader.on('hide.bs.collapse', function() {
                $currentIcon.removeClass('fa-angle-up');
                $currentIcon.addClass('fa-angle-down');
            })

            $currentHeader.on('show.bs.collapse', function() {
                $currentIcon.removeClass('fa-angle-down');
                $currentIcon.addClass('fa-angle-up');
            })

            $currentHeader.on('shown.bs.collapse', function() {
                checkButtonStatus("#" + parentID);
            })

            $currentHeader.on('hidden.bs.collapse', function() {
                checkButtonStatus("#" + parentID);
            })

            $currentHeader.collapse('toggle');

        });


        var btnText = $("#accordionText").text().split("|");
        
        $("button.btnAccordion").attr("data-init", function(i, val){
            var parentID = $(this).attr("data-parent");
            if (val == 1) {
                $(parentID + " .collapse").collapse('show');
                $(parentID).find('i').removeClass('fa-angle-down');
                $(parentID).find('i').addClass('fa-angle-up');
                $(this).addClass("in");
                $(this).text(btnText[1]);
            }else {
                $(this).text(btnText[0]);
            }
        }); 


        $("button.btnAccordion").on(event, function() {
            var parentID = $(this).attr("data-parent");

            if ($(this).hasClass("in")) {
                $(parentID + " .collapse").collapse('hide');
                $(parentID).find('i').removeClass('fa-angle-up');
                $(parentID).find('i').addClass('fa-angle-down');
                $(this).removeClass("in");
                $(this).text(btnText[0]);
            } else {
                $(parentID + " .collapse").collapse('show');
                $(parentID).find('i').removeClass('fa-angle-down');
                $(parentID).find('i').addClass('fa-angle-up');
                $(this).addClass("in");
                $(this).text(btnText[1]);
            }

        });

        function checkButtonStatus(parentID) {
            var button = $('button[data-parent="' + parentID + '"]'),
                totalPanel = $(parentID).children(".panel-heading").length,
                totalOpen = $(parentID + " .collapse.in").length;

            if (totalOpen === 0) {
                $(this).text(btnText[0]);
            }

            if (totalOpen > 0) {
                $(this).text(btnText[1]);
            }
        }

        $(".panel-heading").each(function(index, element) {
            if($(element).parent().children(".collapse").hasClass("in")){
                $(element).children('i').removeClass('fa-angle-down');
                $(element).children('i').addClass('fa-angle-up');
            }
        });
    }

    /* Stop video in Modal component  */
    $(".modalVideo").on('hidden.bs.modal', function (e) {
        var src = $(this).find('iframe').attr('src');
        $(this).find('iframe').attr('src', '');
        $(this).find('iframe').attr('src', src);
    });


    if ($(".modal").length > 0) {
        $('.modal').on('shown.bs.modal', function () {
            var modalWidth = $(this).find("iframe").width(),
             modalHeight = (modalWidth * 9)/16;
            $(this).find("iframe").css({height: modalHeight});
        })            
    }

    //FitText
    if ($("#fittext").length > 0) {
        $('.mainTitle').fitText(0.42);
    }



    /* Smooth Page Scroll */
    if ($(".scroll").length > 0) {
        $('a[href*=#]:not([href=#]).scroll').on(event, function(e) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, "slow");
                    return false;
                }
            }
        });
    }

    /* Scroll box Hide & Show */
    if ($("a.scroll-top").length > 0 && mediaMin992.matches) {
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 300) {
                $("a.scroll-top").show();
            } else {
                $("a.scroll-top").hide();
            }
        });
    }

    /* Sticky Bar */
    function stickyBar(isTrue) {
        var $stickyBar = $(".sticky-bar"),
            firstTime = false;
        var headerHeight = $("header > nav").height();

        if ($stickyBar.length > 0) {
            if (isTrue) {
                $(window).bind("scroll", function(e) {
                    scrollTopNum = $(this).scrollTop();
                    if (scrollTopNum > headerHeight) {
                        $stickyBar.show();
                        $stickyBar.removeClass("deactive");
                        $stickyBar.addClass("active");
                        firstTime = true;
                    }
                    if (scrollTopNum < headerHeight && firstTime){
                        $stickyBar.removeClass("active");
                        $stickyBar.addClass("deactive");
                    }
                });

                $stickyBar.find(".fa-times").on(event, function() {
                    $stickyBar.remove();
                });
            } else {
                $stickyBar.hide();
                $(window).unbind('scroll');
            }
        }
    }
    
    //Popover for contact page map  
    function initPopoverMap() {
        $("ul.navMaps li").each(function(index, element) {
            strFlagName = $(element).attr('data-flag');
            $('[rel=' + strFlagName + ']').popover({
                html: true,
                placement: 'top',
                animation: 'true',
                trigger: 'focus',
                content: function() {
                    return $('#' + strFlagName).html();
                }
            });

            if ($(this).hasClass("active")) {
                $('[rel=' + strFlagName + ']').popover("show");
                $('[rel=' + strFlagName + ']').addClass("active");
            }

        });
    }

    //Popover for contact page map  
    if ($("ul.navMaps").length > 0) {

        language = htmlLang;

        switch(language) {
            case 'ja':      language = 'jp'; break;
            case 'ms':      language = 'my'; break;
            case 'zh_CN':   language = 'cn'; break;
            case 'sv':      language = 'se'; break;
            case 'ko':      language = 'kr'; break;
            case 'hi':      language = 'in'; break;
            case 'cs':      language = 'cz'; break;
        }


        // Array of all the languages that are displayed as an option for the map
        var allMapLangs = allActiveLangs;
        var removeMapLangs = removeLangsFromContactMap;

        if (((allMapLangs.indexOf(language)) < 0) || (removeMapLangs.indexOf(language) >= 0)) {
            var defaultMapLang = "en";
        } else {
            var defaultMapLang = language;
        }
        
        defaultMapLang = "flag-" + defaultMapLang + "-box";

        $("[data-flag=" + defaultMapLang + "]").addClass("active");

        $("ul.navMaps li").on(event, function() {

            strFlagName = $(this).attr('data-flag');

            $('.box-contact a').not('[rel=' + strFlagName + ']').popover('hide');
            $('[rel=' + strFlagName + ']').popover("show");

            $('.box-contact a').removeClass("active");
            $('[rel=' + strFlagName + ']').addClass("active");

            $("ul.navMaps li").removeClass("active");
            $(this).addClass("active");
        });

    }

    //PATMENTS
    $("#payments-carousel").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds

        items: 8,
        itemsDesktop: [1199, 6],
        itemsDesktopSmall: [979, 4],
        itemsTablet: [768, 3],
        itemsMobile: [420, 2],
        stopOnHover: true
    });

    $("#owl-gifts").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        navigationText: [
            "<i class='fa fa-angle-left' aria-hidden='true'></i>",
            "<i class='fa fa-angle-right' aria-hidden='true'></i>"
        ],
        navigation: true, // Show next and prev buttons
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
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

    if ($("#world-championship").length > 0) {
        $("[data-tab-destination]").on('click', function() {
            var tab = $(this).attr('data-tab-destination');
            $("#" + tab).click();
        });
    }
  
    if ($("#education").length > 0) {
        var path = window.location.href.split('/');
        var allChapter = ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5', 'chapter-6'];
        var chapterClasses = ['.qa2-1', '.qa2-2', '.qa2-3', '.qa2-4', '.qa2-5', '.qa2-6'];

        for(i=0; i<allChapter.length; i++) {
            for(j=0; j < path.length; j++) {
                if (path[j] === allChapter[i]){
                    $(chapterClasses[i]).children('.slideBox ul.menu').addClass('active');
                } 
            }
        }

        $(".slideBox ul.menu li:first-child").on(event, function(){
            if($(this).parent().hasClass("active")){
                $(this).parent().removeClass("active"); 
                $(this).siblings("li").slideUp("slow");
            } else {
                $(this).parent().addClass("active"); 
                $(this).siblings("li").slideDown("slow");
            }
        });   
    }

  /***
   * Gets all elements with class flashTitle and creates
   * a hover-scrolling animation to show the text if is bigger than its parent element.
   */

   (function( $ ){
      $.fn.flashTitle = function() {
       $(".flashTitle").each(function(index) {

           var element = $(this);
           var elementText = element.html();

           element.css("overflow", "hidden");
           element.html('<span>' + elementText + '</span>');

           var elementChild = element.find('span:first');

           elementChild.css({
               'position': 'relative',
               'white-space': 'nowrap',
                'text-align': 'center'
           });

           var elementWidth = element.width();
           var elementChildWidth = elementChild.width();
           var moveleft = elementChildWidth - elementWidth;

           if (elementChildWidth > elementWidth) {
               elementChild.css("left", "10px");
               element.parent().hover(function() {
                       elementChild.animate({
                           left: -moveleft
                       }, 1000, "linear")
                   },
                   function() {
                       elementChild.animate({
                           left: 10
                       }, 400, "linear");
                   });

           } else {
               elementChild.css("display", "block");
           }

       });
      }; 
   })( jQuery );   

});


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
