function initMap() {

var map = new google.maps.Map(document.getElementById('mapWindow'), {
              center: new google.maps.LatLng(51.50, 0.11),
              zoom: 4
});


$.ajax({
  dataType: 'json',
  url: 'https://itk-exam-api.herokuapp.com/api/offices',
  success: function(offices) {
    for(var i = 0; i < offices.length; i++) {
            var name = offices[i].name;
            var officePhoto = offices[i].photo;
            var lat = offices[i].latitude;
            var lng = offices[i].longitude;
            var myLatLng = new google.maps.LatLng(lat, lng);       
           
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: name
            });

            marker.info = new google.maps.InfoWindow({
              content: name
            });

            google.maps.event.addListener(marker, 'click', function() {
                this.info.open(map, this);
            });
    }
  }
});

}



          











