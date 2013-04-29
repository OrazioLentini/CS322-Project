function getModels(str){
  s = str;
  //alert(s);
imageCollection.fetch(s);
console.log(s);
}

/*
var apiKey = "cf63f8b2d5f0a63ef88e575fd4c70036";

function getModels(str){
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
          $("#cameraModels ul").append("<li><a onclick=getPhotos('"+model+"') href=#results><img class='ui-li-icon' src='"+image+"'>"+brand+" "+model+"</a></li>");
          $("#cameraModels ul").listview('refresh');  
      }
    }
  });
}

function getPhotos(model){
  s = model;
  saveModel(s);
  //alert(model);
  $.ajax({
      url: "http://api.flickr.com/services/rest/?",
      data: {
        api_key: apiKey,
        format: 'json',
        method: "flickr.photos.search",
        tags: s,
        per_page: 30
      },
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      success: function(rsp){
        window.rsp = rsp;
        console.log(rsp);
        var output='';
        var head='';
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
    });
}
function getfavPhotos(model){
  s = model;
  saveModel(s);
  //alert(model);
  $.ajax({
      url: "http://api.flickr.com/services/rest/?",
      data: {
        api_key: apiKey,
        format: 'json',
        method: "flickr.photos.search",
        tags: s,
        per_page: 30
      },
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      success: function(rsp){
        window.rsp = rsp;
        console.log(rsp);
        var output='';
        var head='';
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
        $('#favorites').html(output);
        
      }
    });
}
function saveModel(s)
{
   $('#photolist').html(s);
	console.log(s);
	localStorage.setItem('favModel', s);	
}

function getFavs(){
  favM = localStorage.getItem("favModel");
  //alert(favM);
  console.log(localStorage.getItem("favModel"));
  getfavPhotos(favM);
  //$("#favorites ul").empty();
  //$("#favorites ul").append("<li>favM</li>");
  //$("#favorites ul").listview('refresh'); 
}
/*
function showPhoto(link, title) {
	var output='<a href="#results" data-transition="fade">';
	output += '<img src="' + link + '_b.jpg" alt="' +title + '" />';
	output += '</a>';
	$('#myphoto').html(output);
}

*/