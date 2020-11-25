const options = {
    // Required: API key
    key: 'JdZVYlvyzjETRef9CZnN3pFKZ2TqPlp7', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: 50.4,
    lon: 14.3,
    zoom: 5,
};

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const { map } = windyAPI;
    // .map is instance of Leaflet map

    fetch('ultims_data.json')
  .then(response => response.json())
  .then(jsonResponse => {
      console.log(jsonResponse)
      gitana_lat_raw = jsonResponse['gitana']['lat'].split(',')
      gitana_lat = parseInt(gitana_lat_raw[0]) + (parseFloat(gitana_lat_raw[1])+parseFloat(gitana_lat_raw[2])/100.0)/60.0
      console.log(gitana_lat)

      gitana_lng_raw = jsonResponse['gitana']['lng'].split(',')
      gitana_lng = parseInt(gitana_lng_raw[0]) + (parseFloat(gitana_lng_raw[1])+parseFloat(gitana_lng_raw[2])/100.0)/60.0
      gitana_lng = -gitana_lng
      console.log(gitana_lng)

      L.marker([gitana_lat, gitana_lng])
          .bindTooltip("Gitana",
    {
        permanent: true,
        direction: 'top'
    })
    .addTo(map)

      sodebo_lat_raw = jsonResponse['sodebo']['lat'].split(',')
      sodebo_lat = parseInt(sodebo_lat_raw[0]) + (parseFloat(sodebo_lat_raw[1])+parseFloat(sodebo_lat_raw[2])/100.0)/60.0
      console.log(sodebo_lat)

      sodebo_lng_raw = jsonResponse['sodebo']['lng'].split(',')
      sodebo_lng = parseInt(sodebo_lng_raw[0]) + (parseFloat(sodebo_lng_raw[1])+parseFloat(sodebo_lng_raw[2])/100.0)/60.0
      sodebo_lng = -sodebo_lng
      console.log(sodebo_lng)

      L.marker([sodebo_lat, sodebo_lng])
          .bindTooltip("Sodebo",
    {
        permanent: true,
        direction: 'top'
    })
    .addTo(map)

      map.setView([gitana_lat, gitana_lng])
  })


});