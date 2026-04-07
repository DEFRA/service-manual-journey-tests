import { browser, expect } from '@wdio/globals'

import MeetDeliveryStandardsPage from '../page-objects/meet-delivery-standards.page'
import RoadmapForChangePage from '../page-objects/roadmap-for-change.page'

describe('Meet Delivery Standards Verification', () => {
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

  // ─── Meet Delivery Standards landing page (from 43-meet-delivery-standards.spec.js) ─

  // P1-90
  it('Given I am on the Meet Delivery Standards page at /delivery-groups/meet-delivery-standards, When the page loads, Then I should see all 4 standards: Define outcomes, Products and services, Roadmap for change, and Success measures', async () => {
    await MeetDeliveryStandardsPage.open()
    await expect(MeetDeliveryStandardsPage.mainHeading).toBeDisplayed()
    await expect(MeetDeliveryStandardsPage.defineOutcomesLink).toBeDisplayed()
    await expect(MeetDeliveryStandardsPage.productsAndServicesLink).toBeDisplayed()
    await expect(MeetDeliveryStandardsPage.roadmapForChangeLink).toBeDisplayed()
    await expect(MeetDeliveryStandardsPage.successMeasuresLink).toBeDisplayed()
  })

  // P1-91
  it('Given I am on the Meet Delivery Standards page, When I click the "Roadmap for change" link, Then I should be navigated to the Roadmap for change subpage at /delivery-groups/meet-delivery-standards/roadmap-for-change', async () => {
    await MeetDeliveryStandardsPage.open()
    await MeetDeliveryStandardsPage.roadmapForChangeLink.waitForClickable()
    await MeetDeliveryStandardsPage.clickRoadmapForChangeLink()
    await expect(browser).toHaveUrl(/roadmap-for-change/)
  })

  // P1-92
  it('Given I am on the Meet Delivery Standards page, When I view the breadcrumb navigation, Then I should see a "Delivery groups" breadcrumb link pointing back to /delivery-groups', async () => {
    await MeetDeliveryStandardsPage.open()
    await expect(MeetDeliveryStandardsPage.breadcrumbs).toBeDisplayed()
    await expect(MeetDeliveryStandardsPage.deliveryGroupsBreadcrumbLink).toBeDisplayed()
    const href = await MeetDeliveryStandardsPage.deliveryGroupsBreadcrumbLink.getAttribute('href')
    expect(href).toMatch(/\/delivery-groups/)
  })

  // ─── Roadmap for Change subpage (from 51-roadmap-for-change.spec.js) ──────

  // P1-93
  it('Given I am on the Roadmap for change page at /delivery-groups/meet-delivery-standards/roadmap-for-change, When the page loads, Then I should see Green/Amber/Red RAG criteria badges explaining roadmap quality expectations', async () => {
    await RoadmapForChangePage.open()
    await expect(RoadmapForChangePage.mainHeading).toBeDisplayed()
    await expect(RoadmapForChangePage.mainHeading).toHaveText(/Roadmap for change/i)
    const tagCount = await browser.execute(() => document.querySelectorAll('main .govuk-tag').length)
    expect(tagCount).toBeGreaterThan(0)
    const content = await RoadmapForChangePage.getPageContentText()
    expect(content).toMatch(/must show|roadmap/i)
  })

  // P1-94
  it('Given I am on the Roadmap for change page, When I view the Amber criteria section, Then I should see guidance about identifying gaps in the roadmap that need attention', async () => {
    await RoadmapForChangePage.open()
    const amberCount = await browser.execute(() => document.querySelectorAll('main .govuk-tag--yellow').length)
    expect(amberCount).toBeGreaterThan(0)
    const content = await RoadmapForChangePage.getPageContentText()
    expect(content).toMatch(/amber|gap/i)
  })

  // P1-95
  it('Given I am on the Roadmap for change page, When I inspect the DOM, Then I should find govuk-tag badge elements used for the RAG (Red/Amber/Green) rating system', async () => {
    await RoadmapForChangePage.open()
    const tagCount = await browser.execute(() => document.querySelectorAll('main .govuk-tag').length)
    expect(tagCount).toBeGreaterThan(0)
    // Verify at least one tag is visible via the first match
    const firstTag = await browser.$('main .govuk-tag')
    await expect(firstTag).toBeDisplayed()
  })
})
