import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="google-map"
export default class extends Controller {
  connect() {
    this.initMap($('#dropdown').val())
  }

  initMap(state) {
    const stateCenterData = JSON.parse($('#state-center-data').text());
    console.log("map controller connecting");
    const stateCenter = stateCenterData[state]
    this.map = new google.maps.Map($('#heatmap')[0], {
      center: { lat: stateCenter[0], lng: stateCenter[1]}, // Center map on the US
      zoom: 6 // Set initial zoom level
    });

    const heatmapData = [];
    this.fetchHeatmapData(state)
    .then(data => {
      if (data) {
        data.forEach(coordinates => {
          heatmapData.push({location: new google.maps.LatLng(coordinates[0], coordinates[1])})
      })
    }});

    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      dissipating: false, // Allow the heat to dissipate
      radius: 0.3, // Set the radius of influence for each data point,
      map: this.map
    });
  }

  // I can't seem to get the map to re-visualize when updating the heatmapt data
  // so in this case we just redirect to the same page but with a new state param
  // so the connect() method can re-initalize the map with the heatmap overaly
  handleChange(event) {
    const selectedValue = event.target.value
    console.log(selectedValue)
    console.log(window.location.href)
    const url = new URL(window.location.href);
    url.search = '';  // clear the existing search params
    url.searchParams.set('state', selectedValue); 
    window.location.href = url
  }

  fetchHeatmapData(state) {
    return fetch("/map/heatmap_data?state="+state)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      return null;
    });
  }
}
