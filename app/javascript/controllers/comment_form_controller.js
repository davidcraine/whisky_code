import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="comment-form"
// This is used to clear the input field once the turbo:submit action ahs been completed
// This is necessary since we're using a turbo stream to eplace content, the form
// does not get reloaded so we have to clear the input field manually.
export default class extends Controller {
  static targets = ["content", "editForm"];

  connect() {
    console.log('connected comment-form');
    document.addEventListener('turbo:submit-end', this.handleFormSubmitEnd.bind(this));
  }

  disconnect() {
    console.log('disconneted comment form');
    document.removeEventListener('turbo:submit-end', this.handleFormSubmitEnd.bind(this));
  }

  handleFormSubmitEnd(event) {
    // Your code here
    console.log('Form submitted!');
    event.target.reset();
  }

  edit(event) {
    console.log('in edit');
    event.preventDefault();
    let commentId = event.target.dataset.commentId;
    let selector = `[data-comment-form-target="editForm"][data-comment-id="${commentId}"]`;
    let editForm = $(this.element).find(selector);
    editForm.toggle();
  }
}
