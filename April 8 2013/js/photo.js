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
       console.log(rsp);
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
        $("#photolist").empty();
	$('#photolist').html('refresh');
    }
*/

var apiKey = "cbb61449315fa2eb1cd8cda781f00b40";

$(document).ready(function(){
  $("#searchButton").click(function(){
    s = $("input#searchphoto").val();
    $.ajax({
      url: "http://api.flickr.com/services/rest/?",
      data: {
	api_key: apiKey,
	format: 'json',
	method: "flickr.photos.search",
	tags: s,
	per_page: 30
	},
    });
  });
});
    
function jsonFlickrApi(rsp) {
	window.rsp = rsp;
	console.log(rsp);
	var output='';
	for (var i=0; i<rsp.photos.photo.length; i++) {
		photo = rsp.photos.photo[i];
		var title = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "q.jpg";
		var link = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
		var blocktype = ((i%3)===2) ? 'c':
				((i%3)===1) ? 'b':
				'a';
		output += '<div class="ui-block-' + blocktype + '">';
		output += '<a href="#showphoto" data-transition="fade" onclick="showPhoto(\'' + link + '\', \'' + title + '\')">';
		output += '<a href="' + link + '">' + '<img alt="'+ photo.title + '"src="' + title + '"/>' + '</a>';
		output += '</a>';
		output += '</div>';
	} // go through each photo
	$('#photolist').html(output);
}

