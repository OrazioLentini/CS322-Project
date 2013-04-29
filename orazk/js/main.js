var apiKey = "cf63f8b2d5f0a63ef88e575fd4c70036";


var image = Backbone.Model.extend({
    fullsize_url: function () {
        return this.image_url('medium');
    },
    thumb_url: function () {
        return this.image_url('square');
    },
    image_url: function (size) {
        var size_code;
        switch (size) {
            case 'square': size_code = '_s'; break; // 75x75
            case 'medium': size_code = '_z'; break; // 640 on the longest side
            case 'large': size_code = '_b'; break; // 1024 on the longest side
            case 'thumbnail': size_code = '_t'; break; // 1024 on the longest side
            default: size_code = '';
        }
        return "http://farm" + this.get('farm') + ".static.flickr.com/" + this.get('server') + "/" +this.get('id') + "_" + this.get('secret') + size_code + ".jpg";
    }
})

var imageCollection = Backbone.Collection.extend({
    model: image,
    key: apiKey,
    page: 1,
 
            fetch: function (str){
             s = str;
             //alert(s);
             $.ajax({
              url: "http://api.flickr.com/services/rest/?",
               data: {
            api_key: apiKey,
            format: 'json',
         method: "flickr.cameras.getBrandModels",
         brand: s,
       },
       dataType: 'jsonp',
       jsonp: 'jsoncallback',
    success: function(rsp){
      window.rsp = rsp;
      console.log(rsp);
      $("#cameraModels ul").empty();
      for (var i=0; i<10; i++) {
          camera = rsp.cameras.camera[i];
          var brand = rsp.cameras.brand;
          var model = camera.id;
          var image = camera.images.small;
          //var cameraImage="js/bypass.php?image_src="+image;
          self.add(camera.id);
          //success();
          //$("#cameraModels ul").append("<li><a onclick=getPhotos('"+model+"') href=#results><img class='ui-li-icon' src='"+image+"'>"+brand+" "+model+"</a></li>");
          //$("#cameraModels ul").listview('refresh');
        app.changePage(new Page6View({collection: self}));
      }
    }
  });
     
    },
    nextPage: function (callback) {
        this.page += 1;
        this.remove(this.models);
        this.fetch(null, callback);
    },
    prevPage: function(callback) {
        if (this.page > 1) {this.page -= 1;}
        this.remove(this.models);
        this.fetch(null, callback);
    }
});

imageView = Backbone.View.extend({
    
    tagName: "div",
    //className: "imageContainer",
    template: _.template($('#home').html()),
    
   
    intialize: function(){
        _.bindAll(this,"render");
        this.collection.bind("all",this.count);
    },
    
    
    
});

var imageCollection = new imageCollection();

//router and views



window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

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
/*
window.locationIndexView = Backbone.View.extend({

    template: _.template($('#locationIndex').html()),
    
    initialize: function(){
        _.bindAll(this,'render','loadImage');
        
    },
    
    render: function (eventName) {
       /* _.each(this.collection.models, function (item) {
            console.log(item);
        });
       

       
        console.log(this.el);
        
        
       $(this.el).html(this.template());
       $(this.el).append("<div>");
       console.log(this.collection.models.length);
       for(var i = 0; i < this.collection.models.length; i++) {
            console.log(this.collection.models[i]);
            var url = this.collection.models[i].image_url('small');
            $(this.el).append("<div class = 'listImageContainer'><img src = '" + url + "' class = 'listImage'/></div>");
       }
       $(this.el).append("</div>")
        return this;
    },
    
    loadImage: function(item){
        alert("hi");
        
    }
    

});

window.locationPageView = Backbone.View.extend({

    template:_.template($('#locationPage').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});
*/
var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
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