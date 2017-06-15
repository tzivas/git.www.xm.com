$(document).ready (function() {

    var videos = new Array(0,0,0); 

    function pageTitles(_link){
        var title;
            vTitle = trimTitle(vTitle);
            title = '<div class="vtitle"><a href="'+_link+'" onClick="sessionStorage.vindex='+vIndex+'">'+vTitle+'<div class="vidcat">'+_catName+'</div></a></div>';

        return [title];
    }

    function trimTitle(vTitle){
        stRemove = [
            'Technical Analysis:',
            'XM.COM - ','Forex News: ',
            'Weekly Forex Review - ',
            'Forex News Discussion:',
            'Forex Review - ','Weekly ',
            'Forex News Discussion - ',
            '外汇新闻：'
        ];

        $.each(stRemove,function(index,key){
            replace = new RegExp(key,"g");
            vTitle= vTitle.replace(replace,'');
        })

        vTitle = vTitle.substring(0, 42);
        if (vTitle.length > 38) {
            vTitle += ' [..]';
        }

        return vTitle;
    }

    function weekly() {
        return $.get (
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                playlistId: 'PL7_Y2OxpmtRuh_GNDjfAZtYUo0HsbGVUd',
                maxResults: 1,
                key: 'AIzaSyCG-h4QAgN1me6dWpYY-AsKFSJn1Qfdv5c' },

                function(data){
                    var output = '';
                    var title;
                    $.each(data.items, function(i, item) {
                        vTitle = item.snippet.title;
                        vThumb = item.snippet.thumbnails.standard.url;
                        vId    = item.snippet.resourceId.videoId;
                        vIndex = item.snippet.position;
                        vDate = item.snippet.publishedAt;
                        newDate = new Date (vDate);

                        currentMonth = newDate .getMonth()+1;
                        if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
                        formattedDate = newDate .getDate() + '/' + currentMonth + '/' + newDate .getFullYear();
                        _catName = catWeeklyForexReviewName;
                        _link = homeLink + "/weekly-forex-review-and-outlook";


                        title=pageTitles(_link);

                        output += '<a href="'+homeLink+'/weekly-forex-review-and-outlook"' ;
                        output += 'onClick="sessionStorage.vindex='+vIndex+'">' ;
                        output += '<div style="background-image:url('+vThumb+')" class='+"thumb"+' ></div>';
                        output += '<div class="dis30 visible-xs"></div>';

                        videos[0] = new Object();
                        videos[0].thumb = vThumb;
                        videos[0].title = vTitle;
                        videos[0].date = vDate;
                        videos[0].fdate = formattedDate;
                        videos[0].link = "/weekly-forex-review-and-outlook";
                        videos[0].vIndex = vIndex;
                        videos[0].categoryName = catWeeklyForexReviewName;
                    })
                    $ ('.weekly-videos .video-thumb').append(output);
                    $ (".weekly-videos article").append(title);

                }
            
        );
    }

    function daily() {
         return $.get (
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                playlistId: 'PL7_Y2OxpmtRuM-cPfxVZvB-vu3cYX5j_w',
                maxResults: 1,
                key: 'AIzaSyCG-h4QAgN1me6dWpYY-AsKFSJn1Qfdv5c' },

                function(data){
                    var output ='';
                    var title;
                    $.each(data.items, function(i, item) {
                        vTitle = item.snippet.title;
                        vThumb = item.snippet.thumbnails.standard.url;
                        vId    = item.snippet.resourceId.videoId;
                        vIndex = item.snippet.position;
                        vDate = item.snippet.publishedAt;
                        newDate = new Date (vDate);

                        currentMonth = newDate .getMonth()+1;
                        if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
                        formattedDate = newDate .getDate() + '/' + currentMonth + '/' + newDate .getFullYear();
                        _catName = catDailyForexNewsName;
                        _link = homeLink + "/daily-forex-news";


                        title=pageTitles(_link);

                        output += '<a href="'+homeLink+'/daily-forex-news"' ;
                        output += 'onClick="sessionStorage.vindex='+vIndex+'">' ;
                        output += '<div style="background-image:url('+vThumb+')" class='+"thumb"+' ></div>';
                        output += '<div class="dis30 visible-xs"></div>';

                    videos[1] = new Object();
                    videos[1].thumb = vThumb;
                    videos[1].title = vTitle;
                    videos[1].date = vDate;
                    videos[1].fdate = formattedDate;
                    videos[1].link = "/daily-forex-news";
                    videos[1].vIndex = vIndex;
                    videos[1].categoryName = catDailyForexNewsName;
                    })
                    $ ('.daily-videos .video-thumb').append(output);
                    $ (".daily-videos article").append(title);
                }
            
        );
    }

    function technical() {
        return $.get (
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                playlistId: 'PL7_Y2OxpmtRuCcPnhccj4_hBRTyaxEHc0',
                maxResults: 1,
                key: 'AIzaSyCG-h4QAgN1me6dWpYY-AsKFSJn1Qfdv5c' },

                function(data){
                    var output='';
                    var title;
                    $.each(data.items, function(i, item) {
                        vTitle = item.snippet.title;
                        vThumb = item.snippet.thumbnails.standard.url;
                        vId    = item.snippet.resourceId.videoId;
                        vIndex = item.snippet.position;
                        vDate = item.snippet.publishedAt;

                        newDate = new Date (vDate);
                        currentMonth = newDate .getMonth()+1;
                        if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
                        formattedDate = newDate .getDate() + '/' + currentMonth + '/' + newDate .getFullYear();
                        _catName = catDailyTechnicalName;
                        _link = homeLink + "/daily-technical-analysis";

                        title=pageTitles(_link);

                        //output += '<a href="<'+homeLink+'/daily-technical-analysis"' ;
                        output += '<a href="'+homeLink+'/daily-technical-analysis"' ;
                        output += 'onClick="sessionStorage.vindex='+vIndex+'">' ;
                        output += '<div style="background-image:url('+vThumb+')" class='+"thumb"+' ></div>';
                        output += '<div class="dis30 visible-xs"></div>';

                        videos[2] = new Object();
                        videos[2].thumb = vThumb;
                        videos[2].title = vTitle;
                        videos[2].date = vDate;
                        videos[2].fdate = formattedDate;
                        videos[2].link = "/daily-technical-analysis";
                        videos[2].vIndex = vIndex;
                        videos[2].categoryName = catDailyTechnicalName;
                    })
                    $ ('.technical-videos .video-thumb').append(output);
                    $ (".technical-videos article").append(title);

                }
            
        );
    }
    
    function weekly_technical() {
        return $.get (
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                playlistId: 'PL7_Y2OxpmtRtz2SFH4MNowIntHgpCmATR',
                maxResults: 1,
                key: 'AIzaSyCG-h4QAgN1me6dWpYY-AsKFSJn1Qfdv5c' },

                function(data){
                    var output = '';
                    var title;
                    $.each(data.items, function(i, item) {
                        vTitle = item.snippet.title;
                        vThumb = item.snippet.thumbnails.standard.url;
                        vId    = item.snippet.resourceId.videoId;
                        vIndex = item.snippet.position;
                        vDate = item.snippet.publishedAt;

                        newDate = new Date (vDate);
                        currentMonth = (newDate .getMonth()+1);
                        if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
                        formattedDate = newDate .getDate() + '/' + currentMonth + '/' + newDate .getFullYear();
                        _catName = catWeeklyTechnicalName;
                        _link = homeLink + "/weekly-technical-analysis";

                        title=pageTitles(_link);

                        output += '<a href="'+homeLink+'/weekly-technical-analysis"' ;
                        output += 'onClick="sessionStorage.vindex='+vIndex+'">' ;
                        output += '<div style="background-image:url('+vThumb+')" class='+"thumb"+' ></div>';
                        output += '<div class="dis30 visible-xs"></div>';
                                
                        videos[3] = new Object();
                        videos[3].thumb = vThumb;
                        videos[3].title = vTitle;
                        videos[3].date = vDate;
                        videos[3].fdate = formattedDate;
                        videos[3].link = "/daily-technical-analysis";
                        videos[3].vIndex = vIndex;
                        videos[3].categoryName = catWeeklyTechnicalName;
                    })
                    $ ('.weekly-technical-videos .video-thumb').append(output);
                    $ (".weekly-technical-videos article").append(title);
                }
        );
    }

    if (homePrefix != 'cn' && homePrefix!='tw') {

    playlist1 = weekly();
    playlist2 = daily();
    playlist3 = technical();
    playlist4 = weekly_technical();

    $.when(playlist1, playlist2, playlist3, playlist4).done(function(a1,a2,a3) {
        position = 0;
        for (var i=1; i<4; i++) {
            if (videos[i].date > videos[position].date) {
                position = i;
            }
        }
        output='';
        output += '<a href="'+ homeLink + videos[position].link+'"' ;
        output += 'onClick="sessionStorage.vindex='+videos[position].vIndex+'">' ;
        output += '<div style="background-image:url('+videos[position].thumb+')" class='+"thumb"+' ></div>';


        var latest_cat = '<a href="'+ homeLink +videos[position].link+'">'+videos[position].categoryName+'</a>';


        title = '<a href="'+videos[position].link+'" onClick="sessionStorage.vindex='+vIndex+'">'+videos[position].title+'<div class="vidcat">'+videos[position].categoryName+'</div></a>';

        $ ('.latest .video-thumb').append(output);
        $ (".latest .vtitle").append(title);


    });

    } else {
            $.get (
                "https://www.googleapis.com/youtube/v3/playlistItems", {
                    part: 'snippet',
                    playlistId: 'PL7_Y2OxpmtRsPFPQ9mNERRqfXe0BVKBfV',
                    maxResults: 5,
                    key: 'AIzaSyCG-h4QAgN1me6dWpYY-AsKFSJn1Qfdv5c' },
    
                    function(data){
                        var output='';
                        var title;
                        var output_div;
                        var counter = 0;
                        data.items.reverse();

                        fourthvideo = '<li class="weekly-videos chinese-videos1 "><figure class="video-thumb" style="max-width: 100px"></figure><article></article></li>';
                        $('ul.video-list').append(fourthvideo);


                        $.each(data.items, function(i, item) {
                            vTitle = item.snippet.title;
                            vThumb = item.snippet.thumbnails.standard.url;
                            vId    = item.snippet.resourceId.videoId;
                            vIndex = item.snippet.position;
                            vDate = item.snippet.publishedAt;

                            _catName = catDailyForexNewsName;
                            _link = homeLink + "/daily-forex-news";


                            vTitle = vTitle.substring(0, 25);
                            if (vTitle.length > 5) {
                                vTitle += ' [..]';
                            }

                            title = '<div class="vtitle"><a href="'+_link+'" onClick="sessionStorage.vindex='+vIndex+'">'+vTitle+'<div class="vidcat">'+_catName+'</div></a></div>';

                            output += '<a href="'+homeLink+'/daily-forex-news"' ;
                            output += 'onClick="sessionStorage.vindex='+vIndex+'">' ;
                            output += '<div style="background-image:url('+vThumb+')" class='+"thumb"+' ></div>';

                            output_div = '.chinese-videos'+counter;
                            $(output_div+' .video-thumb').append(output);
                            $(output_div+" article").append(title);

                            output='';
                            counter++;
                        })
                    }
                );
        $(".hidden-cn").hide();
        

        subscribe = '<div class="top20"><div class="g-ytsubscribe pull-left" data-channel="xmglobal" data-count="default"></div></div>';

        $('.latest').append(subscribe);
    } 

});