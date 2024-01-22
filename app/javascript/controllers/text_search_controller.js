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
      url.search = '';  // clear the existing search params - we only want to filter on search text
      url.searchParams.set('query', event.target.value);  //set the query param to the contents of the search field
      Turbo.visit(url, { action: 'replace', frame: 'distilleries-frame' });
    }
    else {
      window.location.reload(); //reload the window to initiate the existing filters in the url
      //this.paginationElement.show();
    }
  }
}
