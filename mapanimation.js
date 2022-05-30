//Set the api acces token
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWwwMTI5MTIiLCJhIjoiY2wzOWpqampiMGFqdzNqbzUyN3VkbThoNSJ9.-Geofb50Jj2CZcZoYkMM4g';

//Set the map as a global variable
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 14,
});

// Request bus data from MBTA
async function getBusLocations() {
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}
var markers = [];
//Update the markers to see in where place are the buses
async function run() {
    // get bus data    
    const locations = await getBusLocations();
    //Check if there´s no marker already created
    if (markers.length > 0) {
        //If there is more than one marker created, we need to remove all of the markers to set new ones
        markers.forEach(marker => {
            marker.remove();
        });
    }
    locations.forEach(location => {
        //Set the popUp 
        const popup = new mapboxgl.Popup({ closeOnClick: false, offset: 50 })
            .setText(location.attributes.label);
        //Declare the marker
        var marker = new mapboxgl.Marker()
            .setLngLat([location.attributes.longitude, location.attributes.latitude])
            .setPopup(popup)
            .addTo(map);
        marker.togglePopup();
        markers.push(marker);
    });
    // timer
    setTimeout(run, 15000);
}
run();