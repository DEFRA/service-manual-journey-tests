import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class SearchPage extends Page {
  get searchInput() {
    // Search input is in the header, not main content
    return $('.defra-header-search__input')
  }

  get searchButton() {
    return $('.defra-header-search__button')
  }

  get resultsCount() {
    // Results count text in main content
    return $('main .govuk-body-l')
  }

  get firstResult() {
    return $('.defra-search-results__item a')
  }

  open(query = '') {
    return super.open(
      `/search${query ? `?q=${encodeURIComponent(query)}` : ''}`
    )
  }
}

export default new SearchPage()
