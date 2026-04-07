import { browser, expect } from '@wdio/globals'

import DeliveryGroupsPage from '../page-objects/delivery-groups.page'

describe('Delivery groups page', () => {
  before(async () => {
    await DeliveryGroupsPage.open()
  })

  it('Should have the correct page title', async () => {
    await expect(browser).toHaveTitle(/Delivery groups/)
  })

  it('Should display the hero heading', async () => {
    await expect(DeliveryGroupsPage.heroTitle).toBeDisplayed()
    await expect(DeliveryGroupsPage.heroTitle).toHaveText(/Delivery groups/)
  })

  it('Should have a follow delivery governance tile', async () => {
    await expect(DeliveryGroupsPage.followGovernanceTile).toBeDisplayed()
  })

  it('Should have a meet delivery standards tile', async () => {
    await expect(DeliveryGroupsPage.meetStandardsTile).toBeDisplayed()
  })

  it('Should navigate to follow delivery governance page', async () => {
    // await DeliveryGroupsPage.followGovernanceTile.click()
    // await expect(browser).toHaveUrl(/\/delivery-group-governance/)
  const originalWindow = await browser.getWindowHandle()
  
  await DeliveryGroupsPage.followGovernanceTile.click()

  await browser.waitUntil(
    async () => (await browser.getWindowHandles()).length > 1,
    {
      timeout: 5000,
      timeoutMsg: 'New tab did not open'
    }
  )

  const allWindows = await browser.getWindowHandles()
  const newWindow = allWindows.find(handle => handle !== originalWindow)

  await browser.switchToWindow(newWindow)
  await expect(browser).toHaveUrl(/\/delivery-group-governance/)
  

  })
})
