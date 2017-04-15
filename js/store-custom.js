// Store locator with customisations
// - custom marker
// - custom info window (using Info Bubble)
// - custom info window content (+ store hours)
ifrender = false;

var ICON = new google.maps.MarkerImage('../img/store-pin.png', null, null,
    new google.maps.Point(14, 13));

// var SHADOW = new google.maps.MarkerImage('../img/pinshadow.png', null, null,
//     new google.maps.Point(14, 13));

google.maps.event.addDomListener(window, 'load', function() {
  getLatlng();
});

var rendermap = function(latlng,scale){
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(latlng.lat, latlng.lng),
    zoom: scale,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
          {
            elementType: 'geometry',
            stylers: [{color: '#f5f5f5'}]
          },
          {
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [{color: '#f5f5f5'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#bdbdbd'}]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#dadada'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#c9c9c9'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          }
        
            ]
  });

  var panelDiv = document.getElementById('panel');

  var data = new StoreDataSource;

  var view = new storeLocator.View(map, data, {
    geolocation: false,
    //xfeatures: data.getFeatures()
  });

  view.createMarker = function(store) {
    var markerOptions = {
      position: store.getLocation(),
      icon: ICON,
      // shadow: SHADOW,
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
      if(ifrender==false){
        rendermap(latlng,10);
        ifrender = true;
      }
    }
    function errorCallback(e) {
      alert(e);
      var latlng = {lat:38.016210, lng:-95.838746};//lat and lng of USA
      if(ifrender==false){
        rendermap(latlng,4);
        ifrender = true;
      }
    }
  } else {
    alert("Geolocation is not supported by this browser.");
    var latlng = {lat:38.016210, lng:-95.838746};//lat and lng of USA
    if(ifrender==false){
      rendermap(latlng,4);
      ifrender = true;
    }
  }
}