/*var apiKey = "cbb61449315fa2eb1cd8cda781f00b40";

$(document).ready(function(){
  $("#searchButton").click(function(){
    s = $("input#searchphoto").val();
    //alert(s);
    $.ajax({
      url: "http://api.flickr.com/services/rest/?",
      data: {
        api_key: apiKey,
        format: 'json',
        method: "flickr.photos.search",
        tags: s,
        per_page: 30
        },
      // dataType: "jsonp",
      //jsonp: "jsoncallback",
    });
  });
}); 

function jsonFlickrApi(rsp) {
window.rsp = rsp;
 var s = "";
  //http://farm{id}.static.flickr.com/{server-id}/{id}_{secret}_[mstb].jpg
  // http://www.flickr.com/photos/{user-id}/{photo-id}
  //s = rsp.photos.photo.length;
  
  for (var i=0; i < rsp.photos.photo.length; i++) {
    photo = rsp.photos.photo[i];
    t_url = "http://farm" + photo.farm + ".static.flickr.com/" + 
      photo.server + "/" + photo.id + "_" + photo.secret + "_" + "q.jpg";
    p_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
    s +=  '<a href="' + p_url + '">' + '<img alt="'+ photo.title + 
      '"src="' + t_url + '"/>' + '</a>';
  }
  document.writeln(s);
  $('#results').html(t_url + "</ul>");
}

var oraz = Backbone.Model.extend({
    defaults: {
       photo:  'photo'
       t_url: 't'
       p_url: 'p'
       s: 's'
    },
    initialize: function (){
        
    }
}),
*/


//     VIEW
//=========
window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page1View = Backbone.View.extend({
    
    template:_.template($('#canon').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page2View = Backbone.View.extend({

    template:_.template($('#nikon').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page3View = Backbone.View.extend({

    template:_.template($('#sony').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page4View = Backbone.View.extend({

    template:_.template($('#about').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page5View = Backbone.View.extend({

    template:_.template($('#favs').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page6View = Backbone.View.extend({
  
    template:_.template($('#results').html()),
    
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

//   ROUTER
//=========
var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "canon":"canon",
        "nikon":"nikon",
        "sony":"sony",
        "about":"about",
        "favs":"favs",
        "results":"results"
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
        console.log('#home');
        this.changePage(new HomeView());
    },

    canon:function () {
        console.log('#canon');
        this.changePage(new Page1View());
    },

    nikon:function () {
        console.log('#nikon');
        this.changePage(new Page2View());
    },
    
    sony:function () {
        console.log('#sony');
        this.changePage(new Page3View());
    },
    
    about:function () {
        console.log('#about');
        this.changePage(new Page4View());
    },
    
    favs:function () {
        console.log('#favs');
        this.changePage(new Page5View());
    },
    
    results:function () {
        console.log('#results');
        this.changePage(new Page6View());
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});