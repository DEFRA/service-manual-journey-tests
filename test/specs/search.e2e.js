import { browser, expect } from '@wdio/globals'

import SearchPage from 'page-objects/search.page'
import { isMobileDevice } from '../helpers/device-detection.js'

describe('Search page', () => {
  it('Should load the search page', async () => {
    await SearchPage.open()
    await expect(browser).toHaveTitle(/Search/)
  })

  it('Should display a search input', async function () {
    // Skip on mobile - header search is hidden
    if (isMobileDevice()) {
      this.skip()
    }
    await SearchPage.open()
    await expect(SearchPage.searchInput).toBeDisplayed()
  })

  it('Should display results for a valid search term', async () => {
    await SearchPage.open('accessibility')
    await expect(SearchPage.resultsCount).toBeDisplayed()
    await expect(SearchPage.firstResult).toBeDisplayed()
  })

  it('Should navigate to a result when clicked', async () => {
    await SearchPage.open('accessibility')
    await SearchPage.firstResult.waitForClickable()
    await SearchPage.firstResult.click()
    // Wait for navigation to complete
    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl()
        return !url.includes('/search')
      },
      {
        timeout: 10000,
        timeoutMsg: 'Expected to navigate away from search page'
      }
    )
  })
})
