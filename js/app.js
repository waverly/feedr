$(document).ready(function(){

    // Enable close functionality on pop up X
    $(".closePopUp").on("click", function(){
        $("#popUp").toggleClass("hidden");
        $("#popUp").toggleClass("loader");
    });

    // Hide loader window as soon as Reddit data loads
    var closeLoad = function(data){
      if (!data){
        console.log("no results")
      }
      else {
        $("#popUp").toggleClass("hidden");
      }
    }

    var articlePopUp = function(){$('article').on("click", function(){
      $(popUp).removeClass("loader hidden");
      var thisTitle = $(this).find('h3').html();
      popUpTitle.html(thisTitle);
      var thisHref = $(this).attr('data-url');

      $('#linkOut').attr('href', thisHref);

      var thisContent = $(this).attr('data-content');
        if (currentNews.innerText === "Reddit"){
          $(popUpDescription).css("display", "none");
        }
        else if (currentNews.innerText === "Mashable"){
          popUpDescription.html(thisContent);
        }
        else if (currentNews.innerText === "Digg"){
          popUpDescription.html(thisContent);
        }
      });
      docHeight = $('body').height();
      $("#popUp").css('height', docHeight);
    }

    // pass Handlebars element
    var source = $('#article-template').html();
    var template = Handlebars.compile(source);

    //Current news variable
    var currentNews = document.getElementById("currentSource");

    // Default article list from Reddit
    $.get("https://www.reddit.com/top.json", function(results){
      closeLoad(results);
      var items = results.data.children;
      for (i=0; i<items.length; i++){
        // determine root of the data
        var root = results.data.children[i].data;

        // retrieve image or set default
        if ((root.thumbnail == "default") || (root.thumbnail == "self")){
          if (root.preview){
            img = root.preview.images[0].source.url;
          }
          else{
            $('#articleImg').attr('src', 'images/article_placeholder_1.jpg');
          }
        }
        else{
          var img = root.thumbnail;
        }
        // handle broken image links
        $('#articleImg').on('error', function(){
          console.log('img error');
          $( this ).attr('src', 'images/article_placeholder_1.jpg');
        });

        // retrieve rest of data
        var rank = root.ups;
        var title = root.title;
        var subtitle = root.subreddit;
        var urlTest = root.url;

        // put data in Handlebars template
        var articleData = {
            imgSrc: img,
            articleTitle: title,
            articleSubtitle: subtitle,
            impressions: rank
        };

        // Compile Handlebars
        var compiledTemplate = template(articleData);
        $('#main').append(compiledTemplate);
        currentArticle = $('article')[i];
        $(currentArticle).attr('data-url', urlTest);
      }
      currentNews.innerText = "Reddit";
      articlePopUp();
    }).fail(function() {
        alert('Data could not be loaded'); // or whatever
    });



    // REDDIT get request on click - also on click for Feedr logo
    $("#outletNav #source1, header h1").on("click", function(){
        $("#popUp").toggleClass("hidden");
        $('#main').empty();
        $.get("https://www.reddit.com/top.json", function(results){
          var items = results.data.children;
          for (i=0; i<items.length; i++){
            // determine root of the data
            var root = results.data.children[i].data;

            // retrieve image or set default
            if ((root.thumbnail == "default") || (root.thumbnail == "self")){
              if (root.preview){
                img = root.preview.images[0].source.url;
              }
              else{
                $('#articleImg').attr('src', 'images/article_placeholder_1.jpg');
              }
            }
            else{
              var img = root.thumbnail;
            }
            // handle broken image links
            $('#articleImg').on('error', function(){
              console.log('img error');
              $( this ).attr('src', 'images/article_placeholder_1.jpg');
            });

            // retrieve rest of data
            var rank = root.ups;
            var title = root.title;
            var subtitle = root.subreddit;
            var url = root.url;

            // put data in Handlebars template
            var articleData = {
                imgSrc: img,
                articleTitle: title,
                articleSubtitle: subtitle,
                impressions: rank
            };

            // Compile Handlebars
            var compiledTemplate = template(articleData);
            $('#main').append(compiledTemplate);
            currentArticle = $('article')[i];
            $(currentArticle).attr('data-url', url);
          }
          currentNews.innerText = "Reddit";
          $("#popUp").toggleClass("hidden");
          articlePopUp();
        }).fail(function() {
            alert('Data could not be loaded'); // or whatever
        });
    });

    // MASHABLE get request on click
    $("#outletNav #source2").on("click", function(){
      $("#popUp").toggleClass("hidden");
      $.get("https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json", function(results){
        $('#main').empty();
        var item = results.hot;

        for (i=0; i<item.length; i++){

          var root = results.hot[i];
          var img = root.image;
          var rank = root.shares.total;
          var title = root.display_title;
          var subtitle = root.excerpt;
          var url = root.link;
          var fullArticle = root.content.plain;

          var articleData = {
              imgSrc: img,
              articleTitle: title,
              articleSubtitle: subtitle,
              impressions: rank
          };

          var compiledTemplate = template(articleData);
          $('#main').append(compiledTemplate);
          currentArticle = $('article')[i];

          $(currentArticle).attr('data-url', url);
          $(currentArticle).attr('data-content', fullArticle);
        }

        $("#popUp").toggleClass("hidden");
        // Change current new source name to Reddit
        currentNews.innerText = "Mashable";
        articlePopUp();
      }).fail(function() {
          alert('Data could not be loaded'); // or whatever
        });
    });

    // DIGG get request on click
      $("#outletNav #source3").on("click", function(){
        $("#popUp").toggleClass("hidden");
        $('#main').empty();
        $.get("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json", function(results){
          item = results.data.feed;
          for (i=0; i<item.length; i++){

            var root = results.data.feed[i];
            var img = root.content.media.images[0].url;
            var rank = root.digg_score;
            var title = root.content.title;
            var subtitle = root.content.description;
            var url = root.content.url;

            var articleData = {
                imgSrc: img,
                articleTitle: title,
                articleSubtitle: subtitle,
                impressions: rank
            };



            var compiledTemplate = template(articleData);
            $('#main').append(compiledTemplate);
            currentArticle = $('article')[i];
            $(currentArticle).attr('data-url', url);
            $(currentArticle).attr('data-content', subtitle);
          }
          $("#popUp").toggleClass("hidden");
          // Change current new source name to Reddit
          currentNews.innerText = "Digg";
          articlePopUp();
         }).fail(function() {
             alert('Data could not be loaded'); // or whatever
         });
      });


      // popUp on article click
      var popUp = document.getElementById("popUp");
      var popUpTitle = $("#popUp h1");
      var popUpLink = $("popUp a");
      var popUpDescription = $("#popUp p");

      $('article').on("click", function(){
        $(popUp).removeClass("loader hidden");
        var thisTitle = $(this).find('h3').html();
        popUpTitle.html(thisTitle);
        var thisHref = $(this).attr('data-url');
        $('#linkOut').attr('href', thisHref);
        var thisContent = $(this).attr('data-content');
        if (currentNews.innerText === "Reddit"){
          $(popUpDescription).css("display", "none");
        }
        else if (currentNews.innerText === "Mashable"){
          popUpDescription.html(thisContent);
        }
        else if (currentNews.innerText === "Digg"){
          popUpDescription.html(thisContent);
        }
      });

      var searchIcon = document.getElementById("search");

      $(searchIcon).on("click", function(){
        $(this).toggleClass('active');
      });

      if ($(searchIcon).hasClass('active')){
        if(event.keyCode == 13){
          $(this).toggleClass('active');
        }
      };

});
