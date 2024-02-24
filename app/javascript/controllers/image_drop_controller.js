import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="image-drop"
export default class extends Controller {
  static targets = ["imageData", "preview", "fileInput"];
  static currentFileList = [];

  connect() {
    this.fileInputTarget.addEventListener("click", this.openSelect.bind(this));
    this.fileInputTarget.addEventListener("change", this.change.bind(this));
    this.element.addEventListener("dragover", this.dragover.bind(this));
    this.element.addEventListener("dragleave", this.dragleave.bind(this));
    this.element.addEventListener("drop", this.drop.bind(this));
  }

  // this event is tied to the file input and is bound to the click method
  // we use this to capture the list of selected files in the file input target
  // BEFORE a file has been selected.  This allows us to incrementally append files
  // to the target rather than replacing them as the default select behavior does.
  openSelect(event) {
    this.constructor.currentFileList = this.fileInputTarget.files
  }

  change(event) {
    event.preventDefault();
    const file = event.target.files[0];
    this.createPreview(file);
    this.appendToFileTarget(file);
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
  drop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file.type.startsWith("image/")) {
        this.addFileToTarget(file);
        this.createPreview(file);
    }
    this.element.classList.remove("dragover");
  }

   // this will create the preview image for a selected/dropped image and will add a remove button
   // the preivew will be wrapped in an imageWrapper so the button can be appended to it
   // the remove button listener will remove the imageWrapper
  createPreview(file) {
    console.log(file.lastModified);
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = document.createElement("img");
      image.src = e.target.result;
      image.style.maxWidth = "200px";
      image.style.maxHeight = "200px"; // Set the max height as desired
      image.classList.add("col");
      $(image).attr('name', file.name + "_" + file.lastModified); //create a unique file name that can be reference by the remove method

      // Add a button to remove the image
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.setAttribute("type", "button");
      removeButton.id = "remove-image";
      removeButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent the click event from propagating
        this.removeFileFromTarget(image);  //this removes the image from the file input field
        imageWrapper.remove();  //this removes the preview image itself
      });

      // Wrap the image and the remove button in a div
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("col")
      imageWrapper.appendChild(image);
      imageWrapper.appendChild(removeButton);

      this.previewTarget.appendChild(imageWrapper);
    }
    reader.readAsDataURL(file);
    }

    // add a dropped image the the file target list
    addFileToTarget(file) {
        const currentFiles = this.fileInputTarget.files
        const tmpDataTransfer = new DataTransfer();
        // Add existing files to the DataTransfer object
        Array.from(currentFiles).forEach(file => {
          tmpDataTransfer.items.add(file);
        });
        tmpDataTransfer.items.add(file)
        
        this.fileInputTarget.files = tmpDataTransfer.files
    }

    // remove an image from the file input target
    // this is called from the drop() method and is used to add the dropped file to the end of the list
    // of existing files in the file input target.
    removeFileFromTarget(image) {
      const imageName = $(image).attr("name");
      const fileIndex = Array.from(this.fileInputTarget.files).findIndex((file) => (file.name + "_" + file.lastModified) === imageName);
      if (fileIndex !== -1) {
        const newFiles = new DataTransfer();
        Array.from(this.fileInputTarget.files).forEach((file, index) => {
          if (index !== fileIndex) {
            newFiles.items.add(file);
          }
        });
        this.fileInputTarget.files = newFiles.files;
      }
    }

    // append a selected file to the file target list
    // Since the normal behavior for the change evnet on a file input target is to replace
    // the current file list with the selected file list, we want to alter this behavior so that
    // successive file selections append to the existing file list rather than replacing it.  
    // We iuse the static variable currentFileList to track the contents of the file target list
    // such that whenever the fileInput is selected, the currentFileList is updated with the current
    // contents fo the file target list (see the openSelect() mnethod).
    appendToFileTarget(file) {
      const tmpDataTransfer = new DataTransfer();
      Array.from(this.constructor.currentFileList).forEach(file => {
        tmpDataTransfer.items.add(file);
      });
      tmpDataTransfer.items.add(file)
      
      this.fileInputTarget.files = tmpDataTransfer.files
    }

}
