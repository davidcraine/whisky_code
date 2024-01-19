import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="text-search"
export default class extends Controller {
  connect() {
  }

  search(event) {
    if (event.target.value.length >= 0) {
      const url = new URL(window.location.href);
      url.search = '';  // clear the existing search params
      url.searchParams.set('query', event.target.value);
      Turbo.visit(url, { action: 'replace', frame: 'distilleries-frame' });
    }
  }
}
