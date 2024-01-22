// this controller allows links within turbo-frames to redirect to their targets rather
// than using the enclosing turno frame
import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="link-redirect"
export default class extends Controller {
  connect() {
  }

  click(event) {
    window.location.href = event.currentTarget.href
    //Turbo.visit(event.currentTarget.href);
  }
}
