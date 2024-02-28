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
    console.log(event.target.dataset.commentId);
    let commentId = event.target.dataset.commentId;
    console.log(commentId);
    console.log(this.element);
    let selector = `[data-comment-form-target="editForm"][data-comment-id="${commentId}"]`;
    console.log(selector);
    let editForm = $(this.element).find(selector);
    console.log(editForm)
    editForm.css('display', 'block')
  }

  save(event) {
    if (event.keyCode === 13) {
      this.contentTarget.contentEditable = false;
      let commentId = this.element.dataset.commentId;
      let content = this.contentTarget.innerText.trim();

      fetch(`/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/html, application/xhtml+xml",
          "X-CSRF-Token": Rails.csrfToken()
        },
        body: JSON.stringify({ comment: { content: content } })
      }).then(response => {
        if (response.ok) {
          response.text().then(html => {
            let template = document.createElement("template");
            template.innerHTML = html.trim();
            let newContent = template.content.firstChild;
            this.contentTarget.replaceWith(newContent);
          });
        }
      });
    }
  }
}
