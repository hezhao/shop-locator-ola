// Store locator with customisations
// - custom marker
// - custom info window (using Info Bubble)
// - custom info window content (+ store hours)
var ICON = new google.maps.MarkerImage('../img/olababy.png', null, null,
    new google.maps.Point(14, 13));

var SHADOW = new google.maps.MarkerImage('medicare-shadow.png', null, null,
    new google.maps.Point(14, 13));

google.maps.event.addDomListener(window, 'load', function() {
  getLatlng();
});

var rendermap = function(latlng,scale){
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(latlng.lat, latlng.lng),
    zoom: scale,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var panelDiv = document.getElementById('panel');

  var data = new MedicareDataSource;

  var view = new storeLocator.View(map, data, {
    geolocation: false,
    features: data.getFeatures()
  });

  view.createMarker = function(store) {
    var markerOptions = {
      position: store.getLocation(),
      icon: ICON,
      shadow: SHADOW,
      title: store.getDetails().title
    };
    return new google.maps.Marker(markerOptions);
  }

  new storeLocator.Panel(panelDiv, {
    view: view
  });
}

var getLatlng=function(){
  if(navigator.geolocation){
    navigator.geolocation.watchPosition(successCallback, errorCallback, {});
    function successCallback(currentPosition) {
      var lat = currentPosition.coords.latitude,
      long = currentPosition.coords.longitude;

      var latlng={lat: lat, lng: long};
      console.log(latlng);
      rendermap(latlng,10);
      }
    function errorCallback(e) {
      alert(e);
      var latlng = {lat:38.016210, lng:-95.838746};
      rendermap(latlng,4);
    }
  } else {
    alert("Geolocation is not supported by this browser.");
    var latlng = {lat:38.016210, lng:-95.838746};
    rendermap(latlng,4);
  }
}