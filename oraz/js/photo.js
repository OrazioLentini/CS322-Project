var apiKey = "cbb61449315fa2eb1cd8cda781f00b40";

function getModels(str){
  s = str;
  saveBrand(s);
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
      for (var i=0; i<15; i++) {
          camera = rsp.cameras.camera[i];
          var brand = rsp.cameras.brand;
          var model = camera.id;
          var image = camera.images.small;
          //var cameraImage="js/bypass.php?image_src="+image;
          //$("#cameraModels ul").append("<li><a onclick=getPhotos('"+model+"') href=#results><img class='ui-li-icon' src='"+cameraImage+"'>"+brand+" "+model+"</a></li>");
	  $("#cameraModels ul").append("<li><a onclick=getPhotos('"+ brand + "_" +model+"') href=#results>"+brand+" "+model+"</a></li>");
          $("#cameraModels ul").listview('refresh');  
      }
    }
  });
}

function getPhotos(model){
  s = model;
  saveModel(s);
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
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      success: function(rsp){
        window.rsp = rsp;
        console.log(rsp);
        var output='';
        var head='';
	output += '<div data-role="header"><h1><center>'+s+'</center></h1></div>';
        for (var i=0; i<rsp.photos.photo.length; i++) {
          photo = rsp.photos.photo[i];
          var title = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "z.jpg";
          var link = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
          output += '<div class="ui-block-' + 'a' + '">';
	  output += '<img alt="'+ photo.title + '"src="' + title + '"/>' + '</a>';
          output += '</a>';
          output += '</div>';
        } // go through each photo
        $('#photolist').html(output);
        
      }
    });
}

// FOR FAVORITES --------------------------------------------------------------------------------------------------

function saveModel(s){
	console.log(s);
	sessionStorage.setItem('favModel', s);	
}

function addFavs(){
  favM = sessionStorage.getItem("favModel");
  alert('Added to Favorites.');

  var favModels = JSON.parse(localStorage.getItem("key")) || [];
  favModels.push(favM);
  localStorage.setItem('key', JSON.stringify(favModels));
  
  //console.log(JSON.parse(localStorage.getItem("key")));
}

function loadFavs() {
  console.log(JSON.parse(localStorage.getItem("key")));
  var array = JSON.parse(localStorage.getItem("key"));
  //alert(array[5]);
 
  $("#fav ul").empty();
  for (var i=0; i<array.length; i++) {
    var favCam = array[i];
    $("#fav ul").append("<li><a onclick=getPhotos('"+favCam+"') href=#favResults>"+favCam+"</a></li>");
    $("#fav ul").listview('refresh');  
  }
}

function clearFavs(){
  localStorage.clear();
  location.reload();
}

function removeFav() {
  
}


// RELOAD MODELS--------------------------------------------------------------------------------------------

function saveBrand(s){
	console.log(s);
	sessionStorage.setItem('saveBrand', s);	
}

function reloadModels(){
  s = sessionStorage.getItem("saveBrand");
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
      for (var i=0; i<15; i++) {
          camera = rsp.cameras.camera[i];
          var brand = rsp.cameras.brand;
          var model = camera.id;
          var image = camera.images.small;
          //var cameraImage="js/bypass.php?image_src="+image;
          //$("#cameraModels ul").append("<li><a onclick=getPhotos('"+model+"') href=#results><img class='ui-li-icon' src='"+cameraImage+"'>"+brand+" "+model+"</a></li>");
	  $("#cameraModels ul").append("<li><a onclick=getPhotos('"+ brand + "_" +model+"') href=#results>"+brand+" "+model+"</a></li>");
          $("#cameraModels ul").listview('refresh');  
      }
    }
  });
}

