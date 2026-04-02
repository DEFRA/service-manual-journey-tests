import { browser, expect } from '@wdio/globals'

import DeliveryGroupsPage from '../page-objects/delivery-groups.page'
import ErrorPage from '../page-objects/error-page.page'

describe('02-Delivery Groups — Page content, tile links and 404 check', () => {
  // P1-87
  it('should display links to "Meet delivery standards" and "Follow delivery governance"', async () => {
    await DeliveryGroupsPage.open()
    await expect(DeliveryGroupsPage.meetStandardsTile).toBeDisplayed()
    await expect(DeliveryGroupsPage.followGovernanceTile).toBeDisplayed()
    await expect(DeliveryGroupsPage.heroParagraph).toHaveText(/Understanding the standards, governance and assurance process for your delivery group\./i)
    await expect(DeliveryGroupsPage.followGovernanceTileBody).toHaveText(/Understand the boards, approvals and reporting required for your delivery group\./i)
    await expect(DeliveryGroupsPage.meetStandardsTileBody).toHaveText(/How to meet the standards expected of a high-performing delivery group\./i)
  })

  // P1-88
  it('should navigate to "Meet delivery standards" child section when the tile is clicked', async () => {
    await DeliveryGroupsPage.open()
    await DeliveryGroupsPage.meetStandardsTile.waitForClickable()
    await DeliveryGroupsPage.meetStandardsTile.click()
    await expect(browser).toHaveUrl(/\/delivery-groups\/meet-delivery-standards/)
  })
  

  // P1-89
  it('should load the Delivery Groups page (fail on non-200 HTTP status)', async () => {
    await DeliveryGroupsPage.open()

    // check HTTP status for the current page using the browser's fetch
    const status = await browser.executeAsync(async (done) => {
      try {
        const res = await fetch(globalThis.location.href, { method: 'GET', cache: 'no-store', redirect: 'manual' })
        done(res.status)
      } catch (err) {
        // network/error -> return -1 (log to aid debugging)
        /* eslint-disable-next-line no-console */
        console.warn('fetch failed while checking HTTP status:', err)
        done(-1)
      }
    })

    if (status !== 200) {
      const url = await browser.getUrl()
      throw new Error(`Unexpected HTTP status ${status} for ${url}`)
    }

    // additionally fail if an error page is rendered despite 200
    if (await ErrorPage.mainHeading.isExisting()) {
      const heading = await ErrorPage.mainHeading.getText()
      // treat a range of headings as error states (not found, archived, unavailable, moved, etc.)
      const errorHeadingRe = /page not found|archiv|unavailable|service unavailable|404|410|gone|removed|no longer available|not found|moved/i
      if (errorHeadingRe.test(heading)) {
        throw new Error(`Unexpected page shown: "${heading}"`)
      }
      // otherwise the H1 belongs to the real page (continue)
    }

    // sanity checks for the real page
    await expect(DeliveryGroupsPage.heroTitle).toBeDisplayed()
    await expect(DeliveryGroupsPage.heroTitle).toHaveText(/Delivery groups/i)
    await expect(DeliveryGroupsPage.heroParagraph).toBeExisting()
  })
})
