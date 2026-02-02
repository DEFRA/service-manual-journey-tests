import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page'

describe('Home page', () => {
  before(async () => {
    await HomePage.open()
  })

  it('Should have the correct page title', async () => {
    await expect(browser).toHaveTitle(/Welcome to Defra digital/)
  })

  it('Should display the hero heading', async () => {
    await expect(HomePage.heroTitle).toBeDisplayed()
  })

  it('Should have a link to the service manual', async () => {
    await expect(HomePage.serviceManualTile).toBeDisplayed()
  })

  it('Should have a link to delivery groups', async () => {
    await expect(HomePage.deliveryGroupsTile).toBeDisplayed()
  })

  it('Should navigate to service manual when tile is clicked', async () => {
    await HomePage.serviceManualTile.click()
    await expect(browser).toHaveUrl(/\/service-manual/)
  })
})
