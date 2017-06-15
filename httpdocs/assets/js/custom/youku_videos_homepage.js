$(document).ready (function() {

    var videos = new Array(0,0,0); 

    function pageTitles(_link){
        var thedate, title;
        vTitle = trimTitle(vTitle);
        //title = '<div class="vtitle"><a href="'+_link+'" onClick="sessionStorage.vindex=&#39'+vId+'&#39'+'">'+_catName+'<br>'+formattedDate+'</a></div>';
        title = '<div class="vtitle"><a href="'+_link+'" onClick="sessionStorage.vindex=&#39'+vId+'&#39'+'">'+vTitle+'<div class="vidcat">'+_catName+'</div></a></div>';

        

        return [title,thedate];
    }


    function trimTitle(vTitle){
        stRemove = ['XM 外汇新闻：'];
        $.each(stRemove,function(index,key){
            replace = new RegExp(key,"g");
            vTitle= vTitle.replace(replace,'');

            
        })

        vTitle = vTitle.substring(0, 25);
        if (vTitle.length > 5) {
            vTitle += ' [..]';
        }
        
        return vTitle;
    }


       $.get (
        "https://openapi.youku.com/v2/playlists/videos.json", {
            playlist_id: '49096743',
            count: 50,
            client_id: '175bd0cc94adc145'},

            function(data){
               data.videos.reverse();
                var output='';
                var output_div;
                var counter = 5;


                fourthvideo = '<li class="weekly-videos chinese-videos1 "><figure class="video-thumb" style="max-width: 100px"></figure><article></article></li>';
                $('ul.video-list').append(fourthvideo);
                
                for (var i = 0; i < 5; i++) {
                    vTitle = data.videos[i].title;
                    vThumb = data.videos[i].thumbnail;
                    vId   = data.videos[i].id;
                    vPos = data.videos[i].seq_no;
                    vDate = data.videos[i].published;

                    newDate = new Date (vDate);

                    currentMonth = newDate .getMonth()+1;
                    if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
                    formattedDate = newDate .getDate() + '/' + currentMonth + '/' + newDate .getFullYear();
                    _catName = catDailyForexNewsName;
                    _link = homeLink + "/daily-forex-news";

                    title=pageTitles(_link);

                    output += '<a href="'+_link+'"' ;
                    output += 'onClick="sessionStorage.vindex=&#39'+vId+'&#39'+'">' ;
                    output += '<div style="background-image:url('+vThumb+')" class='+"thumb"+' ></div>';
                    output += '<div class="dis30 visible-xs"></div>';

                    output_div = '.chinese-videos'+counter;
                    
                    $ (output_div+' .video-thumb').append(output);
                    $ (output_div+" article").append(title);

                    output='';
                    counter--;
                }
            }
    );
       
    $(".hidden-cn").hide();
});
