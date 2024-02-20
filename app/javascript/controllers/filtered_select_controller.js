import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="filtered-select"
export default class extends Controller {
  static targets = ["select"];
 
  connect() {
  }

  filter(event) {
    console.log('in filter')
    const filter = event.target.value.toLowerCase();
    const options = this.selectTarget.querySelectorAll("option");
    let firstVisibleOption = null;

    options.forEach(option => {
      const text = option.text.toLowerCase();
      if (text.includes(filter)) {
        if (!firstVisibleOption) {
          firstVisibleOption = option;
        }
        option.style.display = "";
      } else {
        option.style.display = "none";
      }
    });

    if (firstVisibleOption) {
      this.selectTarget.value = firstVisibleOption.value;
    }
  }
}
