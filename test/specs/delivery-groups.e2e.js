import { browser, expect } from '@wdio/globals'

import DeliveryGroupsPage from 'page-objects/delivery-groups.page'

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
    await DeliveryGroupsPage.followGovernanceTile.click()
    await expect(browser).toHaveUrl(/\/follow-delivery-governance/)
  })
})
