import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="image-drop"
export default class extends Controller {
  static targets = ["imageData", "preview"];

  connect() {
    this.element.addEventListener("dragover", this.dragover.bind(this));
    this.element.addEventListener("dragleave", this.dragleave.bind(this));
    this.element.addEventListener("drop", this.drop.bind(this));
  }

  dragover(event) {
    event.preventDefault();
    this.element.classList.add("dragover");
  }

  dragleave() {
    this.element.classList.remove("dragover");
  }

  drop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageDataTarget.value = e.target.result;
        this.previewTarget.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    this.element.classList.remove("dragover");
  }
}
