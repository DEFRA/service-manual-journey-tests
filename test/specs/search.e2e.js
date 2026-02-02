import { browser, expect } from '@wdio/globals'

import SearchPage from 'page-objects/search.page'

describe('Search page', () => {
  it('Should load the search page', async () => {
    await SearchPage.open()
    await expect(browser).toHaveTitle(/Search/)
  })

  it('Should display a search input', async () => {
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
    await SearchPage.firstResult.click()
    const url = await browser.getUrl()
    expect(url).not.toContain('/search')
  })
})
