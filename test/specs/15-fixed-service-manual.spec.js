import { browser, expect } from '@wdio/globals'

import ServiceManualPage from '../page-objects/service-manual.page'
import ErrorPage from '../page-objects/error-page.page'

describe('Verify Service Manual workflow — Path: /service-manual', () => {
  // P1-04
  it('Given I am on /service-manual, when the page loads, then the hero title, all role-based tiles with correct links, and tile descriptions are displayed', async () => {
    await ServiceManualPage.open()
    await expect(ServiceManualPage.heroTitle).toBeDisplayed()
    await expect(ServiceManualPage.heroTitle).toHaveText(/Design and build digital services for Defra/i)
  await expect(ServiceManualPage.heroParagraph).toHaveText(/Use this manual to build consistent, usable services that put people\s+and the environment first\./i)
  // verify all tiles are present and link to expected hrefs
  await expect(ServiceManualPage.serviceAssessmentsTile).toBeDisplayed()
  await expect(await ServiceManualPage.serviceAssessmentsTile.getAttribute('href')).toMatch(/\/service-assessments$/)

  await expect(ServiceManualPage.accessibilityTile).toBeDisplayed()
  await expect(await ServiceManualPage.accessibilityTile.getAttribute('href')).toMatch(/\/accessibility$/)

  await expect(ServiceManualPage.sustainabilityTile).toBeDisplayed()
  await expect(await ServiceManualPage.sustainabilityTile.getAttribute('href')).toMatch(/\/sustainability$/)

  await expect(ServiceManualPage.userResearchTile).toBeDisplayed()
  await expect(await ServiceManualPage.userResearchTile.getAttribute('href')).toMatch(/\/user-research$/)

  await expect(ServiceManualPage.contentTile).toBeDisplayed()
  await expect(await ServiceManualPage.contentTile.getAttribute('href')).toMatch(/\/content$/)

  await expect(ServiceManualPage.designTile).toBeDisplayed()
  await expect(await ServiceManualPage.designTile.getAttribute('href')).toMatch(/\/design$/)

  await expect(ServiceManualPage.testingAndAssuranceTile).toBeDisplayed()
  await expect(await ServiceManualPage.testingAndAssuranceTile.getAttribute('href')).toMatch(/\/testing-and-assurance$/)

  await expect(ServiceManualPage.businessAnalysisTile).toBeDisplayed()
  await expect(await ServiceManualPage.businessAnalysisTile.getAttribute('href')).toMatch(/\/business-analysis$/)

  await expect(ServiceManualPage.productAndDeliveryTile).toBeDisplayed()
  await expect(await ServiceManualPage.productAndDeliveryTile.getAttribute('href')).toMatch(/\/product-and-delivery$/)

  await expect(ServiceManualPage.architectureTile).toBeDisplayed()
  await expect(await ServiceManualPage.architectureTile.getAttribute('href')).toMatch(/\/architecture-and-software-development$/)

  // tile body checks
  await expect(ServiceManualPage.serviceAssessmentsTileBody).toHaveText(/Understand and meet the GOV\.UK Service Standard for Defra services\./i)
  await expect(ServiceManualPage.accessibilityTileBody).toHaveText(/Meet accessibility standards and regulations for Defra services\./i)
  })

  // P1-05
  // single-tile navigation test removed: covered by P1-07 which iterates and verifies each major tile

  // P1-06
  it('Given I am on /service-manual, when the page loads, then it returns HTTP 200 and the hero title is displayed', async () => {
    await ServiceManualPage.open()

    const status = await browser.executeAsync(async (done) => {
      try {
        const res = await fetch(globalThis.location.href, { method: 'GET', cache: 'no-store', redirect: 'manual' })
        done(res.status)
      } catch (err) {
        /* eslint-disable-next-line no-console */
        console.warn('fetch failed while checking HTTP status:', err)
        done(-1)
      }
    })

    if (status !== 200) {
      const url = await browser.getUrl()
      throw new Error(`Unexpected HTTP status ${status} for ${url}`)
    }

    if (await ErrorPage.mainHeading.isExisting()) {
      const heading = await ErrorPage.mainHeading.getText()
      const errorHeadingRe = /page not found|archiv|unavailable|service unavailable|404|410|gone|removed|no longer available|not found|moved/i
      if (errorHeadingRe.test(heading)) {
        throw new Error(`Unexpected error/archived page shown: "${heading}"`)
      }
    }

    await expect(ServiceManualPage.heroTitle).toBeDisplayed()
    await expect(ServiceManualPage.heroTitle).toHaveText(/Design and build digital services for Defra/i)
  })

  // P1-07
  it('Given I am on /service-manual, when I click each major tile, then each destination returns HTTP 200 and is not an error page', async () => {
    const tiles = [
      ServiceManualPage.serviceAssessmentsTile,
      ServiceManualPage.accessibilityTile,
      ServiceManualPage.securityTile,
      ServiceManualPage.sustainabilityTile,
      ServiceManualPage.userResearchTile,
      ServiceManualPage.contentTile,
      ServiceManualPage.designTile,
      ServiceManualPage.testingAndAssuranceTile,
    ]

    await ServiceManualPage.open()

    for (const tileEl of tiles) {
      await tileEl.waitForDisplayed()
      const href = await tileEl.getAttribute('href')
      // skip external links (contain http or start with //)
      if (/^https?:\/\//i.test(href) || href.startsWith('//')) {
        continue
      }

      // click and verify navigation
      await tileEl.scrollIntoView()
      await tileEl.waitForClickable()
      await tileEl.click()

      // wait a short moment for navigation
      await browser.pause(500)

      const url = await browser.getUrl()
      if (!url.includes(href)) {
        throw new Error(`Expected to navigate to ${href} but arrived at ${url}`)
      }

      // check HTTP status on the landing page
      const status = await browser.executeAsync(async (done) => {
        try {
          const res = await fetch(globalThis.location.href, { method: 'GET', cache: 'no-store', redirect: 'manual' })
          done(res.status)
        } catch (err) {
          /* eslint-disable-next-line no-console */
          console.warn('fetch failed while checking HTTP status:', err)
          done(-1)
        }
      })

      if (status !== 200) {
        throw new Error(`Unexpected HTTP status ${status} for ${url}`)
      }

      // guard against error/archived H1
      if (await ErrorPage.mainHeading.isExisting()) {
        const heading = await ErrorPage.mainHeading.getText()
        const errorHeadingRe = /page not found|archiv|unavailable|service unavailable|404|410|gone|removed|no longer available|not found|moved/i
        if (errorHeadingRe.test(heading)) {
          throw new Error(`Tile ${href} landed on error page: "${heading}"`)
        }
      }

      // navigate back to the hub
      await browser.back()
      await ServiceManualPage.open()
    }
  })
})
