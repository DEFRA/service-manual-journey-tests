import { browser, expect, $ } from '@wdio/globals'

import HomePage from 'page-objects/home.page'
import { isMobileDevice } from '../helpers/device-detection.js'

describe('Site navigation - Desktop', () => {
  before(function () {
    if (isMobileDevice()) {
      this.skip()
    }
  })

  it('Should display the Defra header with service name', async () => {
    await HomePage.open()
    const header = $('header')
    await expect(header).toBeDisplayed()
  })

  it('Should have a service manual navigation link', async () => {
    await HomePage.open()
    const navLink = $('nav a[href="/service-manual"]')
    await expect(navLink).toBeDisplayed()
  })

  it('Should have a delivery groups navigation link', async () => {
    await HomePage.open()
    const navLink = $('nav a[href="/delivery-groups"]')
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
    await searchInput.waitForClickable()
    await searchInput.setValue('design')
    const searchButton = $('header button[type="submit"]')
    await searchButton.waitForClickable()
    await searchButton.click()
    await expect(browser).toHaveUrl(/\/search\?q=design/)
  })
})

describe('Site navigation - Mobile', () => {
  before(function () {
    if (!isMobileDevice()) {
      this.skip()
    }
  })

  it('Should display the Defra header', async () => {
    await HomePage.open()
    const header = $('header')
    await expect(header).toBeDisplayed()
  })

  it('Should display the Defra logo', async () => {
    await HomePage.open()
    const logo = $('header .defra-header__logo')
    await expect(logo).toBeDisplayed()
  })

  it('Should display the service name', async () => {
    await HomePage.open()
    const serviceName = $('header .defra-header__service-name')
    await expect(serviceName).toBeDisplayed()
  })

  it('Should be able to navigate via content links', async () => {
    await HomePage.open()
    const contentLink = $('main a[href="/service-manual"]')
    await expect(contentLink).toBeDisplayed()
    await contentLink.waitForClickable()
    await contentLink.click()
    await expect(browser).toHaveUrl(/\/service-manual/)
  })
})
