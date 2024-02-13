import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="google-map"
export default class extends Controller {
  connect() {
    console.log("map controller connecting");
    this.map = new google.maps.Map(this.element, {
      center: { lat: 37.8, lng: -96 }, // Center map on the US
      zoom: 4 // Set initial zoom level
    });

    // Load state data and create heat map layer
    const heatmapData = [];
    // Add state data to heatmapData array
    // Example: heatmapData.push({ location: new google.maps.LatLng(LATITUDE, LONGITUDE), weight: INTENSITY });
    heatmapData.push({location: new google.maps.LatLng(36.7783, -119.4179), weight: 0.5}) //center of CA
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      dissipating: false, // Allow the heat to dissipate
      radius: 2, // Set the radius of influence for each data point
      map: this.map
    });
  }
}
