// this controller proceses the change event from a drop down element
// and and uses the selected item as a filter element and adds
// the filter param to the url before redirecting
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
