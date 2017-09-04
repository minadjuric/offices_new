var officesData = [];
$(document).ready(function() {

	loadDataFromServer();

	$('[data-launch-view]').click(function (e) {
        e.preventDefault();
        var viewName = $(this).attr('data-launch-view');
        showView(viewName);
    });

});



function loadDataFromServer() {
	$.ajax({
		type: 'GET',
		url: 'https://itk-exam-api.herokuapp.com/api/offices',
		dataType: 'json',
		success: function(offices) {
			for(var i = 0; i < offices.length; i++) {
				officesData.push(offices[i]);
			}
			displayOffices(officesData);
			$('.sk-fading-circle').addClass('hide');
			
		},
		error: function () {
			console.log("Web service is not available");
			$('.sk-fading-circle').addClass('hide');
		}
	});
}


function showView(viewName) {
    $('.view').hide();
    $('#' + viewName).show();
    if(viewName === 'map' && officesData.length > 0) {
        initMap(officesData);
    }
}

function renderAvatar(office) {
	return  office.photo != null ? "<div class='officePhoto'><img src='"  + office.photo + "'></div>"
		: "<div class='officePhoto noPhoto'>" + "<br/>" + office.name.charAt(0) + "</div>";
}

function displayOffices(officesData) {
	for(var i = 0; i < officesData.length; i++) {
		$(".officesList").append("<li><div class='office'>" + renderAvatar(officesData[i]) + "<div class='officeText'><p class='officeName'>" + officesData[i].name + "</p>" + "<p class='officeDescription'>" + officesData[i].description + "</p></div></div></li>");
	}
}

function initMap(officesData) {

	var map = new google.maps.Map(document.getElementById('mapWindow'), {
        center: new google.maps.LatLng(30, -3),
        zoom: 3
    });

	var center;
    var infowindow = new google.maps.InfoWindow();

	for(var i = 0; i < officesData.length; i++) {
		var name = officesData[i].name;
		var lat = officesData[i].latitude;
		var lng = officesData[i].longitude;
		var myLatLng = new google.maps.LatLng(lat, lng);


    	var marker = new google.maps.Marker({
	    	position: myLatLng,
	    	map: map,
	    	title: name
    	});

    	marker.mycontent = "<div id='officeMarker'>" + renderAvatar(officesData[i]) + "</div>"
		
		marker.addListener('click', function() {
            infowindow.setContent(this.mycontent);
            infowindow.open(map, this);
        });

	}

	google.maps.event.addDomListener(map, 'idle', function() {
        calculateCenter();
    });

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
    });

    function calculateCenter() {
        center = map.getCenter();
    }
}







