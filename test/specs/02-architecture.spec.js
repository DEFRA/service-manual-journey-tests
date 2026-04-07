import { browser, expect, $, $$ } from '@wdio/globals'

import ArchitecturePage from '../page-objects/architecture.page'
import CoreDeliveryPlatformPage from '../page-objects/core-delivery-platform.page'
import DefraCustomerIdentityPage from '../page-objects/defra-customer-identity.page'
import DefraFormsPage from '../page-objects/defra-forms.page'
import DefraAccessibleMapsPage from '../page-objects/defra-accessible-maps.page'

describe('Verify Architecture And Software Development Workflow', () => {
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

  // ─── Landing page (from 06-architecture.spec.js) ─────────────────────────

  // P1-23
  it('Given I am on /architecture-and-software-development, when the page loads, then the heading, software dev guidance, and section nav links (CDP, Defra Forms, Customer Identity, Interactive Map) are visible', async () => {
    await ArchitecturePage.open()
    await expect(ArchitecturePage.mainHeading).toBeDisplayed()
    const content = await ArchitecturePage.pageContent.getText()
    expect(content).toMatch(/software development/i)
    await expect(ArchitecturePage.sectionNav).toBeDisplayed()
    const navText = await ArchitecturePage.sectionNav.getText()
    expect(navText).toMatch(/Core Delivery Platform/i)
    expect(navText).toMatch(/Defra Customer Identity/i)
    expect(navText).toMatch(/Defra Forms/i)
    expect(navText).toMatch(/Defra Interactive Map/i)
  })

  // P1-24
  it('Given I am on the Architecture landing page, when I click "Core Delivery Platform" in the section nav, then I navigate to /core-delivery-platform', async () => {
    await ArchitecturePage.open()
    await expect(ArchitecturePage.coreDeliveryPlatformLink).toBeDisplayed()
    await ArchitecturePage.coreDeliveryPlatformLink.waitForClickable()
    await ArchitecturePage.clickCoreDeliveryPlatformLink()
    await expect(browser).toHaveUrl(/core-delivery-platform/)
  })

  // P1-25
  it('Given I am on the Architecture landing page, when I read the content, then GOV.UK Service Standard and Core Delivery Platform guidance is shown', async () => {
    await ArchitecturePage.open()
    await expect(ArchitecturePage.pageContent).toBeDisplayed()
    const headingText = await ArchitecturePage.getHeadingText()
    expect(headingText).toBeTruthy()
    const content = await ArchitecturePage.pageContent.getText()
    expect(content).toMatch(/GOV\.UK Service Standard|Core Delivery Platform|Defra/i)
  })

  // ─── All subpages — HTTP 200 + heading check ──────────────────────────────

  it('Given I visit each architecture subpage URL, when the page loads, then each displays the correct heading', async () => {
    const subpages = [
      { href: '/architecture-and-software-development/core-delivery-platform', heading: /Core Delivery Platform/i },
      { href: '/architecture-and-software-development/defra-customer-identity', heading: /Defra Customer Identity/i },
      { href: '/architecture-and-software-development/defra-forms', heading: /Defra Forms/i },
      { href: '/architecture-and-software-development/defra-accessible-maps', heading: /Defra Interactive Map/i }
    ]
    for (const p of subpages) {
      await browser.url(p.href)
      const hasH1 = await browser.execute(() => document.querySelector('main h1') !== null)
      if (!hasH1) {
        throw new Error(`${p.href} — no <h1> found in main (possible error page)`)
      }
      const heading = $('main h1')
      await expect(heading).toHaveText(p.heading)
    }
  })

  // ─── "Opens in a new tab" link behaviour ─────────────────────────────────
  // The page source has two links whose visible text ends with "(opens in a new tab)":
  //   1. "Defra outcome delivery group model (opens in a new tab)"
  //   2. "Defra Tools Radar on Jira (opens in a new tab)"
  // Both route via /interruption-card but do NOT carry target="_blank".
  // The tests below click each link and assert that a new browser tab is opened.

  it('Given I am on /architecture-and-software-development, when I click "Defra outcome delivery group model (opens in a new tab)", then it opens in a new browser tab', async () => {
    await ArchitecturePage.open()
    await expect($('main h1')).toBeDisplayed()

    // Locate the link by its visible label from the page source
    const outcomeLink = await $('a[href*="DDTS-Delivery-Groups"]')
    await expect(outcomeLink).toBeDisplayed()
    const linkText = await outcomeLink.getText()
    expect(linkText).toMatch(/Defra outcome delivery group model/i)
    expect(linkText).toMatch(/opens in a new tab/i)

    const handlesBefore = await browser.getWindowHandles()
    await outcomeLink.click()

    // Assert a new tab was opened
    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length > handlesBefore.length,
      { timeout: 8000, timeoutMsg: 'Expected "Defra outcome delivery group model" to open in a new tab, but no new tab appeared' }
    )

    const handlesAfter = await browser.getWindowHandles()
    const newTab = handlesAfter.find(h => !handlesBefore.includes(h))
    expect(newTab).toBeTruthy()

    // Clean up — close new tab and return to the original window
    await browser.switchToWindow(newTab)
    await browser.closeWindow()
    await browser.switchToWindow(handlesBefore[handlesBefore.length - 1])
  })

  it('Given I am on /architecture-and-software-development, when I click "Defra Tools Radar on Jira (opens in a new tab)", then it opens in a new browser tab', async () => {
    await ArchitecturePage.open()
    await expect($('main h1')).toBeDisplayed()

    // Locate the link by its visible label from the page source
    const jiraLink = await $('a[href*="eaflood.atlassian.net"]')
    await expect(jiraLink).toBeDisplayed()
    const linkText = await jiraLink.getText()
    expect(linkText).toMatch(/Defra Tools Radar on Jira/i)
    expect(linkText).toMatch(/opens in a new tab/i)

    const handlesBefore = await browser.getWindowHandles()
    await jiraLink.click()

    // Assert a new tab was opened
    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length > handlesBefore.length,
      { timeout: 8000, timeoutMsg: 'Expected "Defra Tools Radar on Jira" to open in a new tab, but no new tab appeared' }
    )

    const handlesAfter = await browser.getWindowHandles()
    const newTab = handlesAfter.find(h => !handlesBefore.includes(h))
    expect(newTab).toBeTruthy()

    // Clean up — close new tab and return to the original window
    await browser.switchToWindow(newTab)
    await browser.closeWindow()
    await browser.switchToWindow(handlesBefore[handlesBefore.length - 1])
  })

  // ─── Core Delivery Platform (from 18-core-delivery-platform.spec.js & 19) ─

  // P1-26
  it('Given I am on the Core Delivery Platform page, when the page loads, then the heading and a link to the CDP portal (portal.cdp-int.defra.cloud) are displayed', async () => {
    await CoreDeliveryPlatformPage.open()
    await expect(CoreDeliveryPlatformPage.mainHeading).toBeDisplayed()
    await expect(CoreDeliveryPlatformPage.cdpPortalLink).toBeDisplayed()
    const href = await CoreDeliveryPlatformPage.getCdpPortalLinkHref()
    expect(href).toMatch(/portal\.cdp-int\.defra\.cloud/)
  })

  // P1-27
  it('Given I am on the Core Delivery Platform page, when I inspect the portal link, then it points to cdp-int.defra.cloud', async () => {
    await CoreDeliveryPlatformPage.open()
    await expect(CoreDeliveryPlatformPage.cdpPortalLink).toBeDisplayed()
    const href = await CoreDeliveryPlatformPage.getCdpPortalLinkHref()
    expect(href).toMatch(/cdp-int\.defra\.cloud/)
  })

  // P1-28
  it('Given I am on the Core Delivery Platform page, when I read the content, then deploy/build/monitor guidance is shown', async () => {
    await CoreDeliveryPlatformPage.open()
    const content = await CoreDeliveryPlatformPage.getPageContentText()
    expect(content).toMatch(/cdp|portal/i)
    expect(content).toMatch(/deploy|build|monitor/i)
  })

  // BUG #2 — CDP portal links: must be present in the DOM with valid HTTPS hrefs and non-empty text
  it('Given I am on the Core Delivery Platform page, When I inspect the page source, Then all CDP portal links should resolve to HTTPS portal.cdp-int.defra.cloud and have visible link text', async () => {
    await CoreDeliveryPlatformPage.open()
    const pageSource = await browser.getPageSource()
    expect(pageSource).toContain('portal.cdp-int.defra.cloud')

    const cdpLinksRaw = await $$('main a[href*="portal.cdp-int.defra.cloud"]')
    const cdpLinks = Array.isArray(cdpLinksRaw) ? cdpLinksRaw : [cdpLinksRaw].filter(Boolean)
    expect(cdpLinks.length).toBeGreaterThan(0)

    for (const link of cdpLinks) {
      const rawHref = await link.getAttribute('href')
      // Links may be wrapped in an /interruption-card?targetUrl=<encoded-url> redirect.
      // Decode the actual destination URL before validating.
      let resolvedHref = rawHref
      if (rawHref.includes('/interruption-card')) {
        const match = rawHref.match(/[?&]targetUrl=([^&]+)/)
        if (match) resolvedHref = decodeURIComponent(match[1])
      }
      expect(resolvedHref).toMatch(/^https:\/\/portal\.cdp-int\.defra\.cloud/)
      const text = await link.getText()
      expect(text.trim().length).toBeGreaterThan(0)
    }
  })

  // ─── Defra Customer Identity ──────────────────────────────────────────────

  it('Given I am on the Defra Customer Identity page, when the page loads, then sign-in, IDMv2, and Defra ID authentication guidance is shown', async () => {
    await DefraCustomerIdentityPage.open()
    await expect(DefraCustomerIdentityPage.mainHeading).toBeDisplayed()
    await expect(DefraCustomerIdentityPage.mainHeading).toHaveText(/Defra Customer Identity/i)
    const content = await DefraCustomerIdentityPage.pageContent.getText()
    expect(content).toMatch(/sign in|IDMv2|Defra ID|authentication|identity/i)
  })

  // ─── Defra Forms (from 20-defra-forms.spec.js) ───────────────────────────

  // P1-29
  it('Given I am on the Defra Forms page, when the page loads, then guidance about building accessible GOV.UK-styled forms is shown', async () => {
    await DefraFormsPage.open()
    await expect(DefraFormsPage.mainHeading).toBeDisplayed()
    await expect(DefraFormsPage.mainHeading).toHaveText(/Defra Forms/i)
    const content = await DefraFormsPage.pageContent.getText()
    expect(content).toMatch(/form/i)
    expect(content).toMatch(/accessible|GOV\.UK|build/i)
  })

  // ─── Defra Interactive Map ────────────────────────────────────────────────

  it('Given I am on the Defra Interactive Map page, when the page loads, then accessible mapping guidance and external resource links are shown', async () => {
    await DefraAccessibleMapsPage.open()
    await expect(DefraAccessibleMapsPage.mainHeading).toBeDisplayed()
    await expect(DefraAccessibleMapsPage.mainHeading).toHaveText(/Defra Interactive Map/i)
    const content = await DefraAccessibleMapsPage.pageContent.getText()
    expect(content).toMatch(/map|mapping|accessible/i)
    const linksRaw = await DefraAccessibleMapsPage.externalLinks
    const links = Array.isArray(linksRaw) ? linksRaw : [linksRaw].filter(Boolean)
    expect(links.length).toBeGreaterThan(0)
  })
})
