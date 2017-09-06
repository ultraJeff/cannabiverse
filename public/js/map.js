var map;
var service;
var infowindow;
var request;

let geocodingBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
let apiKey = 'AIzaSyAljDWwIKnzMJr_yTsQMqxj3YRDWZjrDd4';

class Map {
	constructor(height, width) {
		this.height = window.innerHeight - $('header').height(),
		this.width = '50%'
	}
}

function initGeolocation() {
	navigator.geolocation.getCurrentPosition(function(position) {
	  initMap(position.coords.latitude, position.coords.longitude);
	}, function() {
		initMap();
	});
}

function initMap(lat, long) {
  let sf = new google.maps.LatLng(37.7749, -122.4194);
  var location = (lat && long) ? new google.maps.LatLng(lat, long) : sf;

  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15
  });

  request = {
    location: location,
    radius: '15',
    query: 'dispensary'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  infowindow = new google.maps.InfoWindow();

  $('.form-inline').on('keyup', '#map-search', searchMap);
}

function searchMap(e) {
	if (e.keyCode !== 13) { return false; }

	let query = e.target.value;

	let getEndpoint = geocodingBaseUrl + query.replace(' ', '+') + '&key=' + apiKey;

	$.getJSON(getEndpoint, function(data) {
		if (data) {
			var loc = data.results[0].geometry.location;
			var location = new google.maps.LatLng(loc.lat, loc.lng);

			map = new google.maps.Map(document.getElementById('map'), {
	      center: location,
	      zoom: 15
	    });

		  request = {
		    location: location,
		    radius: '15',
		    query: 'dispensary'
		  };

		  service = new google.maps.places.PlacesService(map);
		  service.textSearch(request, callback);
		}
	}, function(err) {
		console.log(err);
	});
}

function callback(results, status) {
	console.log('made it this far', status, results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
  	if (results.length === 0) {
  		$('.listings h3').text('No results! Please search again.');
  		return false;
  	}

  	// Clear the listings
  	$('.listings ul').html('');

    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);

      $('.listings h3').hide();

      //Convert this to a React JSX component
      $('.listings ul')
      	.append(`
				<li>
					<div class="top-line">
						<img src="${place.icon}" alt="icon">
						<b>${place.name}</b>
					</div>
					<div>
						<span>${place.rating} stars</span>
						<i>${place.formatted_address}</i>
					</div>
				</li>`);
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
