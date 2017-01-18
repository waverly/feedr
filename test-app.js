$(document).ready(function(){

    // Enable close functionality on pop up X
    $(".closePopUp").on("click", function(){
      $("#popUp").toggleClass("hidden");
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

    //Current news variable
    var currentNews = document.getElementById("currentSource");


    var articlePopUp = function(){
      $('article .articleContent').on("click", function(){
         $(popUp).removeClass("loader hidden");
        var thisTitle = $(this).find('h3').html();
        popUpTitle.html(thisTitle);
        var thisHref = $(this).find('section .url');
        console.log(thisHref);
        // $('#linkOut').attr('href', thisHref);
        // var thisContent = $(this).attr('data-content');
        // if ($('#currentSource').html() === "Reddit"){
        //   $(popUpDescription).css("display", "none");
        //   console.log('we have reddit');
        // }
        // else if ($('#currentSource').html() === "Mashable"){
        //   popUpDescription.html(thisContent);
        // }
        // else if ($('#currentSource').html() === "Digg"){
        //   popUpDescription.html(thisContent);
        // }
        console.log('article click, fuck eveyr ting');
      });
    }

    // pass Handlebars element
    var source = $('#article-template').html();
    var template = Handlebars.compile(source);


    var articleDataArray = [];

    // create default feed
    $.get("https://www.reddit.com/top.json", function(results){
      closeLoad(results)
    // $('#main').empty();
      console.log(results);
      var items = results.data.children;
      for (i=0; i<items.length; i++){
        // determine root of the data
        var root = results.data.children[i].data;
        // retrieve image or set default
        if ((root.thumbnail == "default") || (root.thumbnail == "self")){
          if (root.preview){
            var img = root.preview.images[0].source.url;
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
            impressions: rank,
            url: url
        };

        // Compile Handlebars
        var compiledTemplate = template(articleData);
      //  $('article').attr('data-url', url);
        articleDataArray.push(compiledTemplate);
      }
      // end for loop

      // push array to #main
      $('#main').append(articleDataArray);

      // make sure article data feeds into pop up
     articlePopUp();
    }).fail(function() {
        alert('Data could not be loaded'); // or whatever
    });

    // Default article list from Reddit
    // $.get("https://www.reddit.com/top.json", function(results){
    //   closeLoad(results);
    //
    //   var items = results.data.children;
    //
    //   console.log(items.length);
    //
    //   for (i=0; i<items.length; i++){
    //
    //     // determine root of the data
    //     var root = results.data.children[i].data;
    //
    //     // retrieve image or set default
    //     if ((root.thumbnail == "default") || (root.thumbnail == "self")){
    //       if (root.preview){
    //         img = root.preview.images[0].source.url;
    //       }
    //       else{
    //         $('#articleImg').attr('src', 'images/article_placeholder_1.jpg');
    //       }
    //     }
    //     else{
    //       console.log('we have reached else')
    //       var img = root.thumbnail;
    //     }
    //     // handle broken image links
    //     $('#articleImg').on('error', function(){
    //       console.log('img error');
    //       $( this ).attr('src', 'images/article_placeholder_1.jpg');
    //     });
    //
    //     // retrieve rest of data
    //     var rank = root.ups;
    //     var title = root.title;
    //     var subtitle = root.subreddit;
    //     var url = root.url;
    //
    //     // put data in Handlebars template
    //     var articleData = {
    //         imgSrc: img,
    //         articleTitle: title,
    //         articleSubtitle: subtitle,
    //         impressions: rank
    //     };
    //
    //     // Compile Handlebars
    //     var compiledTemplate = template(articleData);
    //     $('#main').append(compiledTemplate);
    //     $('article').attr('data-url', url);
    //
    //   }
    // }).fail(function() {
    //     alert('Data could not be loaded'); // or whatever
    // });

    // REDDIT get request on click - also on click for Feedr logo
    $("#outletNav #source1, header h1").on("click", function(){
        $("#popUp").toggleClass("hidden");
        //$('#main').empty();
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
            $('article').attr('data-url', url);
            // make sure article data feeds into pop up
          }
          $('article').on("click",function(){
            console.log('mashable article was clicked');
          })
        }).fail(function() {
            alert('Data could not be loaded'); // or whatever
        });
    });

    // MASHABLE get request on click
    $("#outletNav #source2").on("click", function(){
      $("#popUp").toggleClass("hidden");
      $.get("https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json", function(results){
    //    $('#main').empty();
        var item = results.hot;
        console.log(item);
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

          $('article').attr('data-url', url);
          $('article').attr('data-content', fullArticle);

          var compiledTemplate = template(articleData);
          $('#main').append(compiledTemplate);
          //$('article').attr('data-url', url);

        }
        $("#popUp").toggleClass("hidden");
        // Change current new source name to Reddit
        currentNews.innerText = "Mashable";

      }).fail(function() {
          alert('Data could not be loaded'); // or whatever
        });
    });

    // DIGG get request on click
      $("#outletNav #source3").on("click", function(){
        $("#popUp").toggleClass("hidden");
      //  $('#main').empty();
        $.get("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json", function(results){
          console.log(results);
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

            $('article').attr('data-url', url);
            $('article').attr('data-content', subtitle);

            var compiledTemplate = template(articleData);
            $('#main').append(compiledTemplate);
            $('article').attr('data-url', url);
          }
          $("#popUp").toggleClass("hidden");
          // Change current new source name to Reddit
          currentNews.innerText = "Digg";
         }).fail(function() {
             alert('Data could not be loaded'); // or whatever
         });
      });


      // popUp on article click
      var popUp = document.getElementById("popUp");
      var popUpTitle = $("#popUp h1");
      var popUpLink = $("popUp a");
      var popUpDescription = $("#popUp p");

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



$(document).ready(function(){

    // Enable close functionality on pop up X
    $(".closePopUp").on("click", function(){
      $("#popUp").toggleClass("hidden");
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

    // pass Handlebars element
    var source = $('#article-template').html();
    var template = Handlebars.compile(source);



    // Define variables of the list <li> structure
    // Should be refactored with Handlebars
    // var featuredImage = $(".featuredImage img");
    // var articleTitle = $(".articleContent a h3");
    // var articleLink = $(".articleContent a");
    // var articleSubtitle = $(".articleContent h6");
    // var articleScore = $(".impressions");
    // var listLeng = $("article").length
    // var article = $('article');

    //Current news variable
    var currentNews = document.getElementById("currentSource");


    // Default article list from Reddit
    $.get("https://www.reddit.com/top.json", function(results){
      closeLoad(results);

      var items = results.data.children;

      console.log(items.length);

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
          console.log('we have reached else')
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
        $('article').attr('data-url', url);

      }
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
              console.log('we have reached else')
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
            $('article').attr('data-url', url);

          }
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
        console.log(item);
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

          $('article').attr('data-url', url);
          $('article').attr('data-content', fullArticle);

          var compiledTemplate = template(articleData);
          $('#main').append(compiledTemplate);
          $('article').attr('data-url', url);

        }
        $("#popUp").toggleClass("hidden");
        // Change current new source name to Reddit
        currentNews.innerText = "Mashable";

      }).fail(function() {
          alert('Data could not be loaded'); // or whatever
        });
    });

    // DIGG get request on click
      $("#outletNav #source3").on("click", function(){
        $("#popUp").toggleClass("hidden");
        $('#main').empty();
        $.get("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json", function(results){
          console.log(results);
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

            $('article').attr('data-url', url);
            $('article').attr('data-content', subtitle);

            var compiledTemplate = template(articleData);
            $('#main').append(compiledTemplate);
            $('article').attr('data-url', url);
          }
          $("#popUp").toggleClass("hidden");
          // Change current new source name to Reddit
          currentNews.innerText = "Digg";
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
