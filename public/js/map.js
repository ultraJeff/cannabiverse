var map;
var service;
var infowindow;

function initGeolocation() {
	navigator.geolocation.getCurrentPosition(function(position) {
	  initMap(position.coords.latitude, position.coords.longitude);
	});
}

function initMap(lat, long) {
  let sf = new google.maps.LatLng(37.7749, -122.4194);
  let location = (lat && long) ? new google.maps.LatLng(lat, long) : sf;

  map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 15
    });

  var request = {
    location: location,
    radius: '500',
    query: 'dispensary'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  infowindow = new google.maps.InfoWindow();
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}
