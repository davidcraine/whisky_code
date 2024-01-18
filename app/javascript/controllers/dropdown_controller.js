import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dropdown"
export default class extends Controller {

  connect() {
    console.log('dropdown controller started');
  }

  handleChange(event) {
    console.log('event change');
    const selectedValue = event.target.value;

    // Replace 'your-frame-id' with the actual ID of your Turbo Frame
    //Turbo.visit(window.location.href, { frame: 'your-frame-id' });
    console.log("HERE");
  }
}
