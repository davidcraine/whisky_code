import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="image-drop"
export default class extends Controller {
  static targets = ["imageData", "preview", "fileInput"];

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

  // The idea here is to get the file from the drop event and then add it to the element
  // associated with the fileInputTarget. This should be an iunput element of type file
  // e.g.  <%= form.file_field :images, multiple: true,lass: 'form-control form-control-lg', data: {image_drop_target: "fileInput"} %>
  // that accepts multiple files.  It also generates a preview image that gets added to the lement desingated by 
  // previewTarget, e.g. <div class="row align-items-start"" data-image-drop-target="preview">
  // the preview image gets wrapped in an imagewrapper along with a remove button.
  //
  // TODO:  update the logic of the remove button to remove the file from the fileInputTarget
  // list of files.
  drop(event) {
    event.preventDefault();
    console.log(event.dataTransfer.files)
    const file = event.dataTransfer.files[0];
    console.log(file)
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
          imageWrapper.remove();
        });

        // Wrap the image and the remove button in a div
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("col")
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(removeButton);

        this.previewTarget.appendChild(imageWrapper);

        const currentFiles = this.fileInputTarget.files
        const tmpDataTransfer = new DataTransfer();
        // Add existing files to the DataTransfer object
        Array.from(currentFiles).forEach(file => {
          tmpDataTransfer.items.add(file);
        });
        tmpDataTransfer.items.add(file)
        
        this.fileInputTarget.files = tmpDataTransfer.files
        console.log(this.fileInputTarget.files)

      };
      reader.readAsDataURL(file);
    }
    this.element.classList.remove("dragover");
  }
}
