import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class SearchPage extends Page {
  get searchInput() {
    // Search input is in the header, not main content
    return $('.defra-header-search__input')
  }

  get searchButton() {
    return $('.defra-header-search__button')
  }

  get resultsCount() {
    // Try the specific search results count element first, fall back to any body-l in main
    return $('main .defra-search-results__count, main .search-results__count, main [data-testid="results-count"], main .govuk-body-l')
  }

  get firstResult() {
    return $('.defra-search-results__item a')
  }

  open(query = '') {
    const qs = query ? '?q=' + encodeURIComponent(query) : ''
    return super.open('/search' + qs)
  }
}

export default new SearchPage()
