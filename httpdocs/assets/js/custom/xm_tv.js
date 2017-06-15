
// Asynchronously load the client library
(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/platform.js?onload=startProcess';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();


var startProcess = function(){
    window.request = data;
   // console.log(window.request.info,'here');
    generate();
}


function generate(){
    id = window.request.lists;
    item = window.request.videos;
    skip =window.request.skip;

    if (window.request.lists.length > 1) {
        maxvideos = 50;  
        data = getVideoData(id[0],item,maxvideos);
        for (var i = 1; i < window.request.lists.length; i++) {
            (function (i) {
                data = data.then(function() {
                    getVideoData(id[i],item);
                });
            }(i));
        }    
    } else {
        maxvideos = ( $('.xmvideo[data-max]').data("max") == null || $('.xmvideo[data-max]').data("max") == '' )? 50 : $('.xmvideo[data-max]').data("max");
        //maxvideos = 25;
        data = getVideoData(id[0],item,maxvideos);
    }

    playlistItems = '<ul class="vlist">'; 
    mergedList=[]; 
}



function getVideoData(id, item, maxvideos) {

    if (window.request.info.kind == 'youtube') {  
        return  $.get( "https://www.googleapis.com/youtube/v3/playlistItems",{
                    part : 'snippet',
                    playlistId : id,
                    maxResults : maxvideos,
                    key: 'AIzaSyCG-h4QAgN1me6dWpYY-AsKFSJn1Qfdv5c'
                }).done(function(data) {
                    if (request.videos.length > 0) {
                        vId=data.items[item].snippet.resourceId.videoId;
                        vList=data.items[item].snippet.playlistId;
                        source = '"https://www.youtube.com/embed/'+vId+'?autoplay=1&rel=0&showinfo=0"';
                        renderVideoPlayer(data, item)
                    } else {
                        playlistTotalItems = (request.lists.length == 1) ? data.pageInfo.totalResults : 50;
                        $.each(data.items, function(index, video) {
                           if(jQuery.inArray(video.snippet.resourceId.videoId, skip) == -1) {return mergedList.push(video);}
                        })
                        getPlaylistVideos(data, id, playlistTotalItems);
                    }
                })
    } else {

        if (window.request.info.page != 'home') {
            return  $.get( "https://openapi.youku.com/v2/playlists/videos.json",{
                        playlist_id : id,
                        count : maxvideos,
                        client_id: '175bd0cc94adc145'
                    }).done(function(data) {
                        if (request.videos.length > 0) {
                            vId=data.videos[item].id;
                            source = '"https://player.youku.com/embed/'+vId+'?autoplay=1"';
                            renderVideoPlayer(data, item);
                        } else {
                            playlistTotalItems = (request.lists.length == 1) ? data.total : 50;
                            pages = Math.ceil(data.total/50);
                            $.get( "https://openapi.youku.com/v2/playlists/videos.json",{
                                playlist_id : id,
                                count : maxvideos,
                                client_id: '175bd0cc94adc145',
                                page:pages
                            }).done(function(data) {
                                $.each(data.videos, function(index, video) {
                                   if(jQuery.inArray(video.id, skip) == -1) {return mergedList.push(video);}
                                })
                                getPlaylistVideos(data, id, playlistTotalItems);
                            })
                        }
                    })
        }

    }

}


function renderVideoPlayer(data,item) {
    $('.xmvideo[data-role="listing"]').addClass('videowrapper').append('<iframe src='+source+' frameborder="0" allowfullscreen></iframe>');
}



function getPlaylistVideos(data,id,playlistTotalItems) {
    if (request.lists[(request.lists.length)-1] == id) {
        if ($('.xmvideo[data-role="player"]').length) {
            //alert('playerHere');
            renderPlaylistVideos(mergedList);
            setActive();
            addVideoTrigger();
            //setEqualHeight();
            scrollTrigger2(playlistTotalItems);
            addMobileTrigger();
        } else {
            //alert('playermissing');
            renderPlaylistVideos(mergedList);
            setActive();
            addVideoTrigger();
            setEqualHeight();


        } 
    }  

    $("*").flashTitle();
}



function renderPlaylistVideos(mergedList) {

    vListPos=1;
    playerNodes='<div class="vplayer"><div class="videowrapper"><div id="ytplayer"></div></div></div><div class="vplaylist"></div><div class="morevideos"><h4>more</h4></div>';
    owlItems ='';

    for (var i = 0; i < mergedList.length; i++) {

        if (window.request.info.kind == 'youtube') {  
            vTitle = mergedList[i].snippet.title;        
            vThumb = mergedList[i].snippet.thumbnails.medium.url;
            vId    = mergedList[i].snippet.resourceId.videoId;
            vIndex = mergedList[i].snippet.position;
            vPlaylistId = mergedList[i].snippet.playlistId;
        } else {
            mergedList.reverse();
            vTitle = mergedList[i].title;
            vThumb = mergedList[i].thumbnail;
            vId    = mergedList[i].id;
            vIndex = mergedList[i].seq_no;
            vPlaylistId = 'youku';
        }
                //vTitle = mergedList[i].snippet.title.replace(/Peter McGuire |XM.COM - /g,'')+'<span>Peter McGuire</span>';
                //vTitle += '<span>Peter McGuire</span>';
        vTitle = trimTitle(vTitle);
        totalItems=mergedList.length;
        
        //playlistItems += '<li class="vlist-item" data-video="'+id+'\|'+vIndex+'\|'+vId+'">';
        playlistItems += '<li class="vlist-item" data-video="'+vPlaylistId+'\|'+vListPos+'\|'+vId+'">';
        playlistItems += '<i></i>';
        playlistItems += '<span>'+vListPos+'</span>';
        playlistItems += '<div class="vthumb" style="background-image:url('+vThumb+');"></div>';
        playlistItems += '<div class="vtitle">'+vTitle+'</div></li>';

        owlItems += '<div class="vlist-item" data-video="'+vPlaylistId+'\|'+vListPos+'\|'+vId+'">';
        owlItems += '<div style="background-image:url('+vThumb+');" class="vthumb"></div>';
        owlItems += '<div class="vtitle">'+vTitle+'</div></div>';  
        vListPos ++;
    }



    $('.xmvideo[data-role |= "listing"]:not(.single-video)').append(playlistItems);
    $('.xmvideo[data-role |= "listing"]:not(.single-video) .vlist-item').children("i,span").remove();
    





    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // choose  col-md-4 vs col-md-3
    if (window.request.info.page == "mt4" || window.request.info.page == "tutorials" || window.request.info.page == "xm-on-tv") {
        $('.xmvideo[data-role="listing"]:not(.single-video)').find(".vlist-item").addClass("col-md-4");
    } else {
        $('.xmvideo[data-role="listing"]:not(.single-video)').find(".vlist-item").addClass("col-md-3");
    }

    //Copy first item of the list to .single-video
    $('.xmvideo[data-role |= "listing"] .vlist-item:first').clone().appendTo('.xmvideo.single-video').wrap("<ul class='vlist'/>");
    $('.xmvideo.single-video .vlist-item').append('<div class="xm-category">XM on TV</div>');
    $('.xmvideo.single-video .vlist-item .xm-category').css({
                                    "color": "#d51820",
                                    "font-size": "14px",
                                    "font-weight": "bold"
                                });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    $('.xmvideo[data-role="player"]').append(playerNodes);    
    $('.xmvideo[data-role="player"]').find(".vplaylist").append(playlistItems);
    $('.xmvideo[data-role="player"]').find(".vlist").append('<li class="pl-btn">View More</li>');

    $('.xmvideo[data-role="slider"]').append(owlItems);
    //$('.xmvideo[data-role="slider"] .vlist-item h4').addClass("flashTitle");
    $('.xmvideo[data-role="slider"]').owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        lazyLoad: true,
        lazyFollow: true,
        lazyEffect: "fade",
        navigation: true,
        pagination:false,
        stopOnHover:true,
        navigationText: [
            "<i class='fa fa-angle-left' aria-hidden='true'></i>",
            "<i class='fa fa-angle-right' aria-hidden='true'></i>"
        ],
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [991, 2],
        itemsTablet: [767, 1]
    });



}

function trimTitle(vTitle){
    polo = window.request.trim;
    $.each(polo,function(index,key){
        re = new RegExp(key,"g");
        vTitle= vTitle.replace(re,'');
        
    })
    if (window.request.info.page == "xm-on-tv") {vTitle += '<span>Peter McGuire</span>';}

    return vTitle;
}


function setActive(){

    items = $(".vlist-item[data-video='"+sessionStorage.video+"']");
    slider = $('.xmvideo[data-role="slider"]');

    if (sessionStorage.video == null || sessionStorage.video == '' || items.length == 0 ) {

       vActive = $('.xmvideo .vlist-item:nth-child(1)').data("video").split("\|")[2];
       //source = '"https://www.youtube.com/embed/'+vActive+'?autoplay=0&showinfo=0&rel=0"';

       if (window.request.info.kind == 'youtube') {
           source = '"https://www.youtube.com/embed/'+vActive+'?autoplay=1&showinfo=0&rel=0"';
       } else {
           source = '"https://player.youku.com/embed/'+vActive+'?autoplay=0"';
       }

        $('.xmvideo > .vplaylist > ul > li:nth-child(1)').addClass("active").find("span:first").css("display","none");
        $('.xmvideo ul li:nth-child(1)').addClass("active");
        $(".xmvideo #ytplayer").append('<iframe width="100%" height="100%" src='+source+' frameborder="0" allowfullscreen></iframe>');

    } else {
        vActive = sessionStorage.video.split("\|")[2];
        //source = '"https://www.youtube.com/embed/'+vActive+'?autoplay=1&showinfo=0&rel=0"';

        if (window.request.info.kind == 'youtube') {
            source = '"https://www.youtube.com/embed/'+vActive+'?autoplay=0&showinfo=0&rel=0"';
        } else {
            source = '"https://player.youku.com/embed/'+vActive+'?autoplay=0"';
        }

        // Set active for all data-roles
        $(".vlist-item[data-video='"+sessionStorage.video+"']").addClass("active");


        // Load video and scroll to active for xm player
        $(".vplaylist ul li[data-video='"+sessionStorage.video+"']").find("span:first").css("display","none"),
        $(".xmvideo #ytplayer:first").append('<iframe width="100%" height="100%" src='+source+' frameborder="0" allowfullscreen></iframe>');
        $(".vplaylist").animate({scrollTop: ($(".vplaylist").scrollTop()+$(".vlist-item.active").position().top)}, 400);


        // Slide to active and stop for slider
        if ( $('.xmvideo[data-role="slider"]').length) {           
            $('.xmvideo[data-role="slider"]').trigger('owl.stop');
            owl = $('.xmvideo[data-role="slider"]').data('owlCarousel');
            current = $('.xmvideo[data-role="slider"] .vlist-item[data-video="'+sessionStorage.video+'"]:first').parent().index();
            owl.goTo(current);
        };        
    }

    if (window.request.info.page == "home") {
        $('.xmvideo[data-role="listing-horizontal"] .vlist-item:first').removeClass("active").remove();
    }
};

function addVideoTrigger (){

    $('.xmvideo .vlist-item').on('click', function(ev) {  

        vLink = $ (this).closest("[data-link]").data("link");
        sessionStorage.video = $(this).data("video");


        vId = $(this).data("video").split("\|")[2];
        vPlaylistId = $(this).data("video").split("\|")[0];


        if (window.request.info.kind == 'youtube') {
            source = '"https://www.youtube.com/embed/'+vId+'?autoplay=1&showinfo=0&rel=0"';
        } else {
            source = '"https://player.youku.com/embed/'+vId+'?autoplay=1"';
        }

        //source = '"https://www.youtube.com/embed/'+vId+'?autoplay=1&showinfo=0&rel=0"';

        if (vLink == null || vLink == '') {
            vLink = ''; 
        } else {
            if (vLink =='_blank') {
                vloader(vId,vPlaylistId)
            } else {
                window.location = vLink;
            }
        };    

        // Scroll to player if exists //(!$(this).parents('[data-role="player"]').length && vLink !='_blank')
        // if (!$(this).parents('[data-role="player"]').length && vLink !='_blank' || vLink != null) {
        //     $('html, body').animate({scrollTop: ($('.xmvideo[data-role="player"]').offset().top -250)},400);
        // } 


        if ($('.xmvideo[data-role="player"]').length && vLink == '') {
          $('html, body').animate({scrollTop: ($('.xmvideo[data-role="player"]').offset().top -250)},400);
        } 

        // Set active for all data-roles
        $('.xmvideo .vlist-item').removeClass("active");
        $('.xmvideo .vlist-item[data-video="'+sessionStorage.video+'"]').addClass("active");

        // Load video and scroll to active item for xm player
        $('.xmvideo #ytplayer').empty();
        $('.xmvideo #ytplayer').append('<iframe width="100%" height="100%" src='+source+' frameborder="0" allowfullscreen></iframe>');
        $('.xmvideo .vplaylist .vlist-item').find("i + span").css("display","block");
        $('.xmvideo .vplaylist .vlist-item[data-video="'+sessionStorage.video+'"]').find("span:first").css("display","none");
        $('.xmvideo .vplaylist').animate({scrollTop: ($('.vplaylist').scrollTop()+$('.vlist-item.active').position().top)}, 400);

        // Slide to active  and stop for slider
        if ( $('.xmvideo[data-role="slider"]').length) {           
            $('.xmvideo[data-role="slider"]').trigger('owl.stop');
            owl = $('.xmvideo[data-role="slider"]').data('owlCarousel');
            current = $('.xmvideo[data-role="slider"] .vlist-item[data-video="'+sessionStorage.video+'"]:first').parent().index();
            owl.goTo(current);
        }; 

        //window.location = vLink;
          ev.preventDefault();

    });
}

function addMobileTrigger() {
    page=1;
    //Add click functionality for xmplayer more videos
    if($(window).width() < 1200) {$('.xmvideo[data-role="player"] .pl-btn').css("display","none");}
    
    $('.xmvideo[data-role="player"] .morevideos').on('click', function(ev) {
        totalItems = (totalItems <= 50)? totalItems : 50;
        itemHeight = $('.xmvideo[data-role="player"] .vplaylist .vlist-item').outerHeight();
        totalHeight = totalItems * itemHeight;
        groupHeight =itemHeight * 5;
        totalPages = Math.floor(totalHeight/groupHeight);
        currentHeight = $('.xmvideo[data-role="player"] .vplaylist ').outerHeight(); 
        page++;

        if (page < totalPages  ) {
            $('.xmvideo[data-role="player"] .vplaylist ').outerHeight(currentHeight+groupHeight);
           // console.log('currentHeight: '+currentHeight+" page: "+page);

        } else {
            restItems = (totalItems - ((page - 1) * 5)) * itemHeight;
            $('.xmvideo[data-role="player"] .vplaylist ').outerHeight(currentHeight+restItems);  
            $('.xmvideo[data-role="player"] .morevideos').css({'display':'none'});
        }
        ev.preventDefault();
    });
}



function scrollTrigger2(playlistTotalItems){
    if (playlistTotalItems>50) {
        $('.xmvideo[data-role="player"] .pl-btn').css("display","block");
    }
    vId = $('.xmvideo[data-role="player"] .vplaylist .vlist-item:last').data("video").split("\|")[2];
    vPlaylistId = $('.xmvideo[data-role="player"] .vplaylist .vlist-item:last').data("video").split("\|")[0];
    $('.xmvideo[data-role="player"] .pl-btn').on('click', function(ev) {
        ev.preventDefault();
        if (player == 'youtube') {
            window.open('https://www.youtube.com/watch?v='+vId+'&list='+vPlaylistId+'','_blank');
        } else {
            window.open('https://v.youku.com/v_show/id_'+vId+'.html?f='+vPlaylistId+'','_blank');
        }
        //window.location = 'https://www.youtube.com/watch?v='+vId+'&list='+vPlaylistId+'';
    });
}

function setEqualHeight () {
    var maxHeight = -1;

    $('.xmvideo[data-role="listing"] .vlist-item,.xmvideo[data-role="slider"] .vlist-item').each(function() {
        maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    });

    $('.xmvideo[data-role="listing"] .vlist-item,.xmvideo[data-role="slider"] .vlist-item').each(function() {
        $(this).height(maxHeight);
    });

    
    //$(".api-tutorials.video-player.single-video a h4").replaceWith( "<h4 class="+'text-center'+"><?php echo $singleTitle; ?></h4>" );

}

function vloader(vId,vPlaylistId) {
    var myWindow = window.open("", "MsgWindow", "width=853,height=480");
    if (vPlaylistId =='youku') {
       // vId = vId.replace(/==/g,'');
        var source = '"https://players.youku.com/player.php/sid/'+vId+'/v.swf"';
        //var source = '"https://player.youku.com/embed/'+vId+'?autoplay=1"';
    } else {
        var source = '"https://www.youtube.com/embed/'+vId+'?list='+vPlaylistId+'&autoplay=1"';
    }

    myWindow.document.body.innerHTML='';
    myWindow.document.body.innerHTML= '<iframe width="100%" height="100%" src='+source+' frameborder="0" allowfullscreen></iframe>';
    myWindow.focus();
    myWindow.document.body.style.margin = 0;
    return false;
}

//$("*").flashTitle();



            

            