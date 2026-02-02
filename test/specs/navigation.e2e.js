import { browser, expect, $ } from '@wdio/globals'

import HomePage from 'page-objects/home.page'

describe('Site navigation', () => {
  it('Should display the Defra header with service name', async () => {
    await HomePage.open()
    const header = $('header')
    await expect(header).toBeDisplayed()
  })

  it('Should have a service manual navigation link', async () => {
    await HomePage.open()
    const navLink = $('a[href="/service-manual"]')
    await expect(navLink).toBeDisplayed()
  })

  it('Should have a delivery groups navigation link', async () => {
    await HomePage.open()
    const navLink = $('a[href="/delivery-groups"]')
    await expect(navLink).toBeDisplayed()
  })

  it('Should have a search form in the header', async () => {
    await HomePage.open()
    const searchInput = $('#defra-search')
    await expect(searchInput).toBeDisplayed()
  })

  it('Should navigate to search results when searching from the header', async () => {
    await HomePage.open()
    const searchInput = $('#defra-search')
    await searchInput.setValue('design')
    const searchButton = $('header button[type="submit"]')
    await searchButton.click()
    await expect(browser).toHaveUrl(/\/search\?q=design/)
  })
})
