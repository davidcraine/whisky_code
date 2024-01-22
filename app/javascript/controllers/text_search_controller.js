import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="text-search"
export default class extends Controller {
  paginationElement = undefined;

  connect() {
    this.paginationElement = $('.pagination');
  }

  search(event) {

    if (event.target.value.length > 0) {
      this.paginationElement.hide();
      const url = new URL(window.location.href);
      url.search = '';  // clear the existing search params
      url.searchParams.set('query', event.target.value);
      Turbo.visit(url, { action: 'replace', frame: 'distilleries-frame' });
    }
    else {
      this.paginationElement.show();
    }
  }
}
