var startProcess = function(){
    window.request = data;
    generate();
}

function generate(){
    id = window.request.lists;
    item = window.request.videos;
    skip =window.request.skip;

    maxvideos =  5 ;
    data = getVideoData(id[0],item,maxvideos);

    playlistItems = '<ul class="vlist">'; 
    mergedList=[]; 
}



function getVideoData(id, item, maxvideos) {

return  $.get( "https://www.googleapis.com/youtube/v3/playlistItems",{
            part : 'snippet',
            playlistId : id,
            maxResults : maxvideos,
            key: 'AIzaSyCG-h4QAgN1me6dWpYY-AsKFSJn1Qfdv5c'
        }).done(function(data) {
            $.each(data.items, function(index, video) {
               if(jQuery.inArray(video.snippet.resourceId.videoId, skip) == -1) {return mergedList.push(video);}
            })
            renderPlaylistVideos(mergedList);
            addVideoTrigger();
        })
}



function renderPlaylistVideos(mergedList) {
    vListPos=1;
    for (var i = 0; i < mergedList.length; i++) {

        vTitle = mergedList[i].snippet.title;        
        vThumb = mergedList[i].snippet.thumbnails.medium.url;
        vId    = mergedList[i].snippet.resourceId.videoId;
        vIndex = mergedList[i].snippet.position;
        vPlaylistId = mergedList[i].snippet.playlistId;

        vTitle = trimTitle(vTitle);

        playlistItems += '<li class="vlist-item" data-video="'+vPlaylistId+'\|'+vListPos+'\|'+vId+'">';
        playlistItems += '<i></i>';
        playlistItems += '<span>'+vListPos+'</span>';
        playlistItems += '<div class="vthumb" style="background-image:url('+vThumb+')"></div>';
        playlistItems += '<div class="vtitle">'+vTitle+'</div></li>';

  
        vListPos ++;
    }

    $('.xmvideo[data-role |= "listing"]:not(.single-video)').append(playlistItems);
    $('.xmvideo[data-role |= "listing"]:not(.single-video) .vlist-item').children("i,span").remove();
    

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
    $('.xmvideo[data-role="listing-horizontal"] .vlist-item:first').removeClass("active").remove();
}

function trimTitle(vTitle){
    polo = window.request.trim;
    $.each(polo,function(index,key){
        re = new RegExp(key,"g");
        vTitle= vTitle.replace(re,'');
        
    })
    return vTitle;
}


function addVideoTrigger (){

    $('.xmvideo .vlist-item').on('click', function(ev) {  

        vLink = $ (this).closest("[data-link]").data("link");
        sessionStorage.video = $(this).data("video");

        vId = $(this).data("video").split("\|")[2];
        vPlaylistId = $(this).data("video").split("\|")[0];

        source = '"https://www.youtube.com/embed/'+vId+'?autoplay=1&showinfo=0&rel=0"';

        if (vLink == null || vLink == '') {
            vLink = ''; 
        } else {
            if (vLink =='_blank') {
                vloader(vId,vPlaylistId)
            } else {
                window.location = vLink;
            }
        };    

        $('.xmvideo .vlist-item').removeClass("active");
        $('.xmvideo .vlist-item[data-video="'+sessionStorage.video+'"]').addClass("active");

          ev.preventDefault();
    });
}