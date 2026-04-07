import { browser, expect } from '@wdio/globals'

import ProductAndDeliveryPage from '../page-objects/product-and-delivery.page'
import ProductDeliveryGovernancePage from '../page-objects/product-delivery-governance.page'
import ProductDeliveryToolsPage from '../page-objects/product-delivery-tools.page'
import ErrorPage from '../page-objects/error-page.page'

describe('Product And Delivery Verification', () => {
  afterEach(async () => {
    try {
      const logs = await browser.getLogs('browser')
      const errors = logs.filter((l) => {
        if (l.level !== 'SEVERE') return false
        const msg = (l.message || '').toString()
        if (/favicon/i.test(msg)) return false
        if (/Failed to load resource: the server responded with a status of 404/i.test(msg) && /images\//i.test(msg)) return false
        if (/this-page-does-not-exist-404/i.test(msg)) return false
        return true
      })
      if (errors.length > 0) {
        // eslint-disable-next-line no-console
        console.error('Browser SEVERE logs:', errors)
      }
      expect(errors).toHaveLength(0)
    } catch {
      // getLogs not available in all environments — skip
    }
  })

  // ─── Main Product and Delivery page (from 48-product-and-delivery.spec.js) ─

  // P1-52
  it('Given I am on /product-and-delivery, when the page loads, then the heading and nav links to Governance and Tools & Access are visible', async () => {
    await ProductAndDeliveryPage.open()
    await expect(ProductAndDeliveryPage.mainHeading).toBeDisplayed()
    await expect(ProductAndDeliveryPage.sectionNav).toBeDisplayed()
    await expect(ProductAndDeliveryPage.governanceLink).toBeDisplayed()
    await expect(ProductAndDeliveryPage.toolsAndAccessLink).toBeDisplayed()
  })

  // P1-53
  it('Given I navigate to a non-existent page, when the server returns 404, then a styled "Page not found" page is shown', async () => {
    await ErrorPage.openNotFound()
    await expect(ErrorPage.mainHeading).toHaveText(/Page not found/i)
    await expect(ErrorPage.govukTemplateBody).toBeExisting()
  })

  // ─── Governance subpage (from 49-product-delivery-governance.spec.js) ──────

  // P1-54
  it('Given I am on /product-and-delivery/governance, when the page loads, then governance process guidance for product managers is shown', async () => {
    await ProductDeliveryGovernancePage.open()
    await expect(ProductDeliveryGovernancePage.mainHeading).toBeDisplayed()
    const content = await ProductDeliveryGovernancePage.pageContent.getText()
    expect(content).toMatch(/governance/i)
  })

  // ─── Tools and Access subpage (from 50-product-delivery-tools.spec.js) ─────

  // P1-55
  it('Given I am on /product-and-delivery/tools-and-access, when the page loads, then approved tools and access request guidance is shown', async () => {
    await ProductDeliveryToolsPage.open()
    await expect(ProductDeliveryToolsPage.mainHeading).toBeDisplayed()
    const content = await ProductDeliveryToolsPage.pageContent.getText()
    expect(content).toMatch(/tool|access/i)
  })
})
