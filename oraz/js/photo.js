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
         method: "flickr.cameras.getBrandModels",
         brand: s
        },
     });
  });
});
 
function jsonFlickrApi(rsp) {
        window.rsp = rsp;
        console.log(rsp);
        $("#cameraModels ul").empty();
        for (var i=0; i<10; i++) {
            camera = rsp.cameras.camera[i];
            var brand = rsp.cameras.brand;
            var model = camera.id;
            var image = camera.images.small;
            var cameraImage="image_src="+image;
            console.log(image);
            $("#cameraModels ul").append("<li><a href=#results><img class='ui-li-icon' src='"+cameraImage+"'>"+brand+"  "+model+"</a></li>");
            $("#cameraModels ul").listview('refresh');
        } // go through each photo
      //  $('#cameraModels').html(output);
}

