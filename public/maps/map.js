let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:  33.5506517, lng: -112.2093833},
    zoom: 18,
    mapTypeId: 'satellite'
  });
  map.setTilt(45);

  let officeimg = {
    url: "/images/icon.jpg",
    scale: 0
  };

  let marker= new google.maps.Marker({
    position: {lat:  33.5506517, lng: -112.2093833},
    map: map,
    icon:officeimg
  });
}
initMap();
