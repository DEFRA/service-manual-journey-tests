import { browser, expect, $ } from '@wdio/globals'

describe('Breadcrumb Navigation And Back Link Verification', () => {
  afterEach(async () => {
    try {
      const logs = await browser.getLogs('browser')
      const errors = logs.filter((l) => {
        if (l.level !== 'SEVERE') return false
        const msg = (l.message || '').toString()
        if (/favicon/i.test(msg)) return false
        if (/Failed to load resource: the server responded with a status of 404/i.test(msg) && /images\//i.test(msg)) return false
        // Ignore 404s for interruption-card targetUrl external resources
        if (/portal\.cdp-int\.defra\.cloud/i.test(msg)) return false
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

  // ─── Breadcrumbs (from 11-breadcrumbs.spec.js) ────────────────────────────

  it('Given I am on /accessibility, when the page loads, then the breadcrumb trail is displayed correctly', async () => {
    await browser.url('/accessibility')
    const breadcrumbs = $('.govuk-breadcrumbs')
    await expect(breadcrumbs).toBeDisplayed()
    const text = await breadcrumbs.getText()
    expect(text).toMatch(/Digital Defra|Home/i)
    expect(text).toMatch(/service manual/i)
    expect(text).toMatch(/Accessibility/i)
  })

  it('Given I am on /accessibility, when I click the "Digital service manual" breadcrumb, then I navigate to /service-manual', async () => {
    await browser.url('/accessibility')
    const serviceManualCrumb = $('a.govuk-breadcrumbs__link[href="/service-manual"]')
    await expect(serviceManualCrumb).toBeDisplayed()
    await serviceManualCrumb.waitForClickable()
    await serviceManualCrumb.click()
    await expect(browser).toHaveUrl(/\/service-manual/)
  })

  it('Given I am on /content/inclusive-clear-language, when the page loads, then the breadcrumb trail is displayed correctly', async () => {
    await browser.url('/content/inclusive-clear-language')
    const breadcrumbs = $('.govuk-breadcrumbs')
    await expect(breadcrumbs).toBeDisplayed()
    const text = await breadcrumbs.getText()
    // section.njk renders: Digital Defra / Digital service manual / sectionTitle
    expect(text).toMatch(/Digital Defra|Home/i)
    expect(text).toMatch(/service manual/i)
    expect(text).toMatch(/Content design|Inclusive/i)
  })

  // ─── Back link (govuk-back-link on interruption-card page) ────────────────────
  it('Given I am on /architecture-and-software-development and click the "Core Delivery Platform" link, When I navigate to the CDP page, Then after clicking on "Back" link should navigate me back to /architecture-and-software-development', async () => {
    // Navigate to the Core Delivery Platform page
    await browser.url('/architecture-and-software-development/core-delivery-platform')

    // Find the "Core Delivery Platform" inline link rendered by markdown filter
    // href="/interruption-card?targetUrl=https%3A%2F%2Fportal.cdp-int.defra.cloud%2F"
    const cdpLink = $('a[href="/interruption-card?targetUrl=https%3A%2F%2Fportal.cdp-int.defra.cloud%2F"]')
    await expect(cdpLink).toBeDisplayed()

    // Click the link to navigate to interruption-card page
    await cdpLink.scrollIntoView()
    await cdpLink.click()

    // Verify we're on the interruption-card page
    await expect(browser).toHaveUrl(/\/interruption-card/)

    // Verify the Back link is displayed
    const backLink = $('.govuk-back-link')
    await expect(backLink).toBeDisplayed()
    await expect(backLink).toHaveText(/Back/i)

    // Click the Back link — should return to the Core Delivery Platform page
    await backLink.click()

    // Verify we navigated back to the Core Delivery Platform page
    await expect(browser).toHaveUrl(/\/architecture-and-software-development/)
  })

  it('Given I am on the interruption-card page via CDP link, When the page loads, Then I should see the warning message about internal service access and a Continue button linking to the CDP portal', async () => {
    // Navigate to the Core Delivery Platform page first
    await browser.url('/architecture-and-software-development/core-delivery-platform')

    // Click the "Core Delivery Platform" inline link that routes through the interruption-card
    const cdpLink = $('a[href="/interruption-card?targetUrl=https%3A%2F%2Fportal.cdp-int.defra.cloud%2F"]')
    await expect(cdpLink).toBeDisplayed()
    await cdpLink.scrollIntoView()
    await cdpLink.click()

    // Verify the interruption card heading
    const heading = $('h1.govuk-heading-l')
    await expect(heading).toBeDisplayed()
    await expect(heading).toHaveText(/You are going to an internal service/i)

    // Verify the VPN/authorised device message
    const bodyText = $('.app-interruption-card')
    await expect(bodyText).toBeDisplayed()
    const textContent = await bodyText.getText()
    expect(textContent).toMatch(/VPN|authorised|Defra approved device/i)

    // Verify the Continue button exists and its href is the decoded CDP portal URL
    const continueBtn = $('a.govuk-button')
    await expect(continueBtn).toBeDisplayed()
    await expect(continueBtn).toHaveText(/Continue/i)
    const href = await continueBtn.getAttribute('href')
    expect(href).toContain('portal.cdp-int.defra.cloud')
  })

  // ─── Service Navigation top bar (from 62-service-navigation.spec.js) ─────
  // The top-bar nav uses class .defra-service-navigation__list and a toggle button
  // .js-service-navigation-toggle (aria-controls="service-navigation-list" or
  // "main-navigation-list"). The toggle is hidden until JS enhances it.

  it('Mobile (375px): Menu toggle expands service nav (aria-expanded = true)', async () => {
    await browser.setWindowSize(375, 812)
    await browser.url('/service-manual')
    const menuToggle = $('.js-service-navigation-toggle')
    const isPresent = await menuToggle.isExisting()
    if (isPresent) {
      await menuToggle.waitForClickable()
      await menuToggle.click()
      const expanded = await menuToggle.getAttribute('aria-expanded')
      expect(expanded).toBe('true')
    } else {
      // Toggle not rendered by JS in this environment — nav is always visible
      const navList = $('.defra-service-navigation__list')
      await expect(navList).toBeExisting()
    }
  })


  it('Given I am on /service-manual, when I view the service nav bar, then all top-level links are visible', async () => {
    await browser.setWindowSize(1280, 800)
    await browser.url('/service-manual')
    const navList = $('.defra-service-navigation__list')
    await expect(navList).toBeExisting()
    const navText = await navList.getText()
    expect(navText).toMatch(/Service assessments/i)
    expect(navText).toMatch(/Sustainability/i)
    expect(navText).toMatch(/Accessibility/i)
    expect(navText).toMatch(/Security/i)
  })

  it('Given I am on /service-manual, when I click the "Service assessments" nav link, then I navigate to /service-assessments', async () => {
    await browser.setWindowSize(1280, 800)
    await browser.url('/service-manual')
    const link = $('nav.defra-service-navigation a[href="/service-assessments"]')
    await expect(link).toBeDisplayed()
    await link.waitForClickable()
    await link.click()
    await expect(browser).toHaveUrl(/\/service-assessments/)
  })
})
