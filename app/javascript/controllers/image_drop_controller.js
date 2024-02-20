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
        const image = document.createElement("img");
        image.src = e.target.result;
        image.style.maxWidth = "200px";
        image.style.maxHeight = "200px"; // Set the max height as desired
        image.classList.add("col");

        // Add a button to remove the image
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("type", "button");
        removeButton.id = "remove-image";
        removeButton.addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent the click event from propagating
          // image.remove(); // Remove the image element when the button is clicked
          // removeButton.remove();
          imageWrapper.remove();
        });

        // Wrap the image and the remove button in a div
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("col")
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(removeButton);

        this.previewTarget.appendChild(imageWrapper);
        //this.imageDataTarget.value = e.target.result;
        //this.previewTarget.src = e.target.result;


      };
      reader.readAsDataURL(file);
    }
    this.element.classList.remove("dragover");
  }
}
