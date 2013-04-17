var apiKey = "cbb61449315fa2eb1cd8cda781f00b40";
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
	      per_page: 100
	      },
	    // dataType: "jsonp",
	    //jsonp: "jsoncallback",
	  });
	});
      }); 

/* on enter
var apiKey = "cbb61449315fa2eb1cd8cda781f00b40";
      $(document).ready(function(){
	$("#searchphoto").keypress(function(event){
	  var keycode = (event.keyCode ? event.keyCode : event.which);
	  if(keycode == '13'){
	    s = $("input#searchphoto").val();
	  //alert(s);
	  }
	  s = $("input#searchphoto").val();
	  //alert(s);
	  $.ajax({
	    url: "http://api.flickr.com/services/rest/?",
	    data: {
	      api_key: apiKey,
	      format: 'json',
	      method: "flickr.photos.search",
	      tags: s,
	      per_page: 20
	      },
	    // dataType: "jsonp",
	    //jsonp: "jsoncallback",
	  });
	});
      }); */
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
	$('#result').html(t_url + "</ul>");
    }