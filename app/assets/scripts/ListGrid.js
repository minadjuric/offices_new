$(document).ready(function() {
	$.ajax({
	    type : 'GET',
	    url : 'https://itk-exam-api.herokuapp.com/api/offices',
	    dataType : 'json',
	    success : function displayOffices (offices) {
	    	for(var i = 0; i < offices.length; i++) {
	    		if (offices[i].photo !== null) {
	    			$(".officesList").append("<li><div class='office'><div class='officePhoto'><img src='"  + offices[i].photo + "'></div>" + "<div class='officeText'><p class='officeName'>" + offices[i].name + "</p>" + "<p class='officeDescription'>" + offices[i].description + "</p></div></div></li>");
	    		}
	    		else {
	    			var officeName = offices[i].name;
	    			$(".officesList").append("<li><div class='office'><div class='noPicture'>" + "<br/>" + officeName.charAt(0) + "</div>" + "<div class='officeText'><p class='officeName'>" + offices[i].name + "</p>" + "<p class='officeDescription'>" + offices[i].description + "</p></div></div></li>");
	    		}
	    	}
	    }
	});
});
