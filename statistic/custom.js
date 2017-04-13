// Store locator with customisations
// - custom marker
// - custom info window (using Info Bubble)
// - custom info window content (+ store hours)

var ICON = new google.maps.MarkerImage('../img/olababy.png', null, null,
    new google.maps.Point(14, 13));

var SHADOW = new google.maps.MarkerImage('../img/pinshadow.png', null, null,
    new google.maps.Point(14, 13));

google.maps.event.addDomListener(window, 'load', function() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(-28, 135),
    zoom: 4,
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
});
