import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class SearchPage extends Page {
  get searchInput() {
    return $('#defra-search')
  }

  get searchButton() {
    return $('[class*="search"] button[type="submit"]')
  }

  get resultsCount() {
    return $('[class*="search-results"] p')
  }

  get firstResult() {
    return $('[class*="search-results"] a')
  }

  open(query = '') {
    return super.open(
      `/search${query ? `?q=${encodeURIComponent(query)}` : ''}`
    )
  }
}

export default new SearchPage()
