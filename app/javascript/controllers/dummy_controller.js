import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dummy"
export default class extends Controller {
  connect() {
    console.log("DUMMY")
  }
}
