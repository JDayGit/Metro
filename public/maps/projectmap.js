let map;
function initMap() {

  let locations = [
    ["Tangar Outlets", 33.5506517, -112.2093833],
    ["El Mirage Road TI at Loop 303", 33.6106019, -112.3252968],
    ["Loop 303 Outfall", 33.6989942, -112.3205858],
    ["Ehrenberg Port of Entry", 33.613305, -114.47043],
    ["University of Phoenix Stadium", 33.5276247, -112.2625593]
  ];

  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:  33.5506517, lng: -112.2093833},
    zoom: 8
  });

  let trafficimg = {
    url: "https://cdn2.iconfinder.com/data/icons/gur-project-1/32/1_2.png"
  };

  for (let i = 0; i <locations.length; i++){
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      icon: trafficimg
    });
  }
}

  initMap();
