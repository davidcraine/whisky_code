import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dropdown"
export default class extends Controller {

  connect() {
  }

  async handleChange(event) {
    const selectedValue = event.target.value
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('filter', selectedValue);
    window.location.href = url;
  }
}
