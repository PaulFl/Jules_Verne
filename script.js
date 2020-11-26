const options = {
    // Required: API key
    key: 'JdZVYlvyzjETRef9CZnN3pFKZ2TqPlp7', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: false,

    // Optional: Initial state of the map
    lat: 50.4,
    lon: 14.3,
    zoom: 5,
};

const gitana_icon = L.icon({
    iconUrl: 'gitana.svg',
    iconSize: [40, 40],
    className: 'gitana-marker'
})

const sodebo_icon = L.icon({
    iconUrl: 'sodebo.svg',
    iconSize: [40, 40],
    className: 'sodebo-marker'
})

var gitana_cap = 0;
var sodebo_cap = 0;

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const {map} = windyAPI;
    // .map is instance of Leaflet map

    let myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');

    let myInit = {
        method: 'GET',
        headers: myHeaders,
    };

    let myRequest = new Request('ultims_data.json');



    fetch(myRequest, myInit)
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse)

            gitana_lat_raw = jsonResponse['gitana']['lat'].split(',')
            gitana_lat = parseInt(gitana_lat_raw[0]) + (parseFloat(gitana_lat_raw[1]) + parseFloat(gitana_lat_raw[2]) / 100.0) / 60.0
            console.log(gitana_lat)
            if (gitana_lat_raw[3] === "S") {
                gitana_lat = -gitana_lat
            }

            gitana_lng_raw = jsonResponse['gitana']['lng'].split(',')
            gitana_lng = parseInt(gitana_lng_raw[0]) + (parseFloat(gitana_lng_raw[1]) + parseFloat(gitana_lng_raw[2]) / 100.0) / 60.0
            if (gitana_lng_raw[3] === "W") {
                gitana_lng = -gitana_lng
            }

            gitana_cap = jsonResponse['gitana']['cap']

            L.marker([gitana_lat, gitana_lng], {icon: gitana_icon})
                .bindTooltip("Gitana",
                    {
                        permanent: false,
                        direction: 'top'
                    })
                .addTo(map)

            sodebo_lat_raw = jsonResponse['sodebo']['lat'].split(',')
            sodebo_lat = parseInt(sodebo_lat_raw[0]) + (parseFloat(sodebo_lat_raw[1]) + parseFloat(sodebo_lat_raw[2]) / 100.0) / 60.0
            console.log(sodebo_lat)
            if (sodebo_lat_raw[3] === "S") {
                sodebo_lat = -sodebo_lat
            }

            sodebo_lng_raw = jsonResponse['sodebo']['lng'].split(',')
            sodebo_lng = parseInt(sodebo_lng_raw[0]) + (parseFloat(sodebo_lng_raw[1]) + parseFloat(sodebo_lng_raw[2]) / 100.0) / 60.0
            if (sodebo_lng_raw[3] === "W") {
                sodebo_lng = -sodebo_lng
            }

            sodebo_cap = jsonResponse['sodebo']['cap']

            L.marker([sodebo_lat, sodebo_lng], {icon: sodebo_icon})
                .bindTooltip("Sodebo",
                    {
                        permanent: false,
                        direction: 'top',
                    })
                .addTo(map)

            document.getElementById("datetime").innerHTML = jsonResponse['datetime']

            map.setView([gitana_lat, gitana_lng])
            map.fire("zoomend");
        })

    map.on("zoomend", function (ev) {
        var icons = document.getElementsByClassName("gitana-marker");
        for (let icon of icons) {
            console.log("icon")
            icon.style.transformOrigin = "center";
            icon.style.transform += " rotate(" + gitana_cap.toString() + "deg)";
            icon.style.visibility = "";
        }

        icons = document.getElementsByClassName("sodebo-marker");
        for (let icon of icons) {
            console.log("icon_sodebo")
            icon.style.transformOrigin = "center";
            icon.style.transform += " rotate(" + sodebo_cap.toString() + "deg)";
            icon.style.visibility = "";
        }
    });

    map.fire("zoomend");


});