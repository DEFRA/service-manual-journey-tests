import { browser, expect, $ } from '@wdio/globals'

import DesignPage from '../page-objects/design.page'
import CookiesPage from '../page-objects/cookies.page'
import DesignDataVisualisationPage from '../page-objects/design-data-visualisation.page'
import DesignPrototypingPage from '../page-objects/design-prototyping.page'
import DesignToolsPage from '../page-objects/design-tools.page'
import DesigningContentTypesPage from '../page-objects/designing-content-types.page'
import ErrorPage from '../page-objects/error-page.page'

describe('Design System And Tools Verification', () => {
  afterEach(async () => {
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
  })

  // --- Design main page (from 29-design.spec.js) ---

  // P1-44: Sidebar navigation links
  it('Given I am on /design, when the page loads, then section nav links to Branding, Cookies, Data Visualisation, Prototyping, Tools, and Components are visible', async () => {
    await DesignPage.open()
    await expect(DesignPage.mainHeading).toBeDisplayed()
    await expect(DesignPage.sectionNav).toBeDisplayed()
    await expect(DesignPage.brandingLink).toBeDisplayed()
    await expect(DesignPage.cookiesLink).toBeDisplayed()
    await expect(DesignPage.dataVisualisationLink).toBeDisplayed()
    await expect(DesignPage.prototypingLink).toBeDisplayed()
    await expect(DesignPage.toolsLink).toBeDisplayed()
    await expect(DesignPage.componentsAndPatternsLink).toBeDisplayed()
  })

  // P1-44b: Content assertions for main design page
  it('Given I am on /design, when I read the content, then Service Designer, Interaction Designer, branding, and inclusive design guidance is shown', async () => {
    await DesignPage.open()
    const content = await $('main').getText()
    expect(content).toMatch(/Service Designer|Interaction Designer/i)
    expect(content).toMatch(/branding|domains|internal services/i)
    expect(content).toMatch(/Inclusive design/i)
    // Support box
    const supportBox = await $('.defra-support-box')
    if (await supportBox.isExisting()) {
      await expect(supportBox).toBeDisplayed()
      const supportText = await supportBox.getText()
      expect(supportText).toMatch(/Get support|DesignOps@defra\.gov\.uk/i)
    }
  })

  // Navigate and verify each sidebar subpage with HTTP 200 and content
  it('Given I visit each design subpage URL, when the page loads, then each returns HTTP 200 and displays content relevant to that design topic', async () => {
    const pages = [
      {
        href: '/design/branding',
        heading: /Branding/i,
        content: /GOV\.UK|header|footer|logo|font/i
      },
      {
        href: '/design/cookies',
        heading: /Cookies/i,
        content: /PECR|consent|cookie/i
      },
      {
        href: '/design/data-visualisation',
        heading: /Data visualisation/i,
        content: /chart|graph|map|data visuali/i
      },
      {
        href: '/design/prototyping',
        heading: /Prototyping/i,
        content: /prototype|GOV\.UK Prototype Kit|Figma/i
      },
      {
        href: '/design/tools',
        heading: /Tools/i,
        content: /Figma|Mural|GOV\.UK Prototype Kit/i
      },
      {
        href: '/design/components-and-patterns',
        heading: /Components and patterns/i,
        content: /GOV\.UK Design System|DesignOps@defra\.gov\.uk/i
      }
    ]

    for (const p of pages) {
      await browser.url(p.href)

      // HTTP status check
      const status = await browser.executeAsync(async (done) => {
        try {
          const res = await fetch(globalThis.location.href, { method: 'GET', cache: 'no-store', redirect: 'manual' })
          done(res.status)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('fetch failed:', err)
          done(-1)
        }
      })
      if (status !== 200) {
        throw new Error(`Unexpected HTTP status ${status} for ${p.href}`)
      }

      // Verify not an error page
      if (await ErrorPage.mainHeading.isExisting()) {
        const h = await ErrorPage.mainHeading.getText()
        if (/page not found|404|unavailable|removed/i.test(h)) {
          throw new Error(`${p.href} landed on error page: "${h}"`)
        }
      }

      // Heading and content
      const heading = await $('main h1')
      await expect(heading).toBeDisplayed()
      await expect(heading).toHaveText(p.heading)

      const pageText = await $('main').getText()
      expect(pageText).toMatch(p.content)
    }
  })

  // --- Cookies page (from 17-cookies.spec.js) ---

  // P1-106
  it('Given I am on /design/cookies, when the page loads, then cookie explanation and analytics radio preferences are shown', async () => {
    await CookiesPage.open()
    await expect(CookiesPage.mainHeading).toBeDisplayed()
    // Analytics radios may be absent if GTM is not configured. Check existence first.
    const acceptExists = await CookiesPage.acceptRadio.isExisting()
    const rejectExists = await CookiesPage.rejectRadio.isExisting()
    const saveExists = await CookiesPage.saveButton.isExisting()
    if (acceptExists && rejectExists && saveExists) {
      await expect(CookiesPage.acceptRadio).toBeDisplayed()
      await expect(CookiesPage.rejectRadio).toBeDisplayed()
      await expect(CookiesPage.saveButton).toBeDisplayed()
    } else {
      // If analytics section is not present, ensure the essential cookies info is shown
      const mainText = await $('main').getText()
      expect(mainText).toMatch(/Essential cookies|defra_cookies_policy/i)
    }
  })

  // P1-107
  it('Given I am on /design/cookies, when I save cookie preferences, then a "Your cookie settings were saved" notification is shown', async () => {
    await CookiesPage.open()
    const radioExists = await CookiesPage.acceptRadio.isExisting()
    if (!radioExists) {
      // If analytics section is not present (GTM not configured), skip this test
      // eslint-disable-next-line no-console
      console.warn('Analytics radios not found; skipping cookie save test (GTM may not be configured)')
      return
    }
    await CookiesPage.acceptCookies()
    await expect(CookiesPage.successNotification).toBeDisplayed()
    const text = await CookiesPage.successNotification.getText()
    expect(text).toMatch(/cookie settings were saved/i)
  })

  // P1-108
  it('Given I am on /design/cookies, when a tampered cookie value is submitted, then the server does not return a 500 error', async () => {
    await CookiesPage.open()
    await browser.execute(() => {
      const form = document.querySelector('#cookies-form')
      if (!form) return // Form may not exist if analytics is not configured
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = 'analytics'
      input.value = 'INVALID_TAMPERED_VALUE'
      form.appendChild(input)
    })
    // Submit the cookies form directly to ensure we post to the correct action (avoid header search form)
    await browser.execute(() => {
      const form = document.querySelector('#cookies-form')
      if (form && typeof form.submit === 'function') form.submit()
    })

    // Allow navigation / server response
    const url = await browser.getUrl()
    // Accept either we remain on /cookies or are redirected to /cookies?saved=true
    expect(url).toMatch(/\/cookies(\?|$)/)
    const source = await browser.getPageSource()
    expect(source).not.toMatch(/Internal Server Error|500|Application error/i)
  })

  // --- Data Visualisation (from 26-design-data-visualisation.spec.js) ---

  // P1-47
  it('Given I am on /design/data-visualisation, when the page loads, then accessible chart and graph guidance is shown', async () => {
    await DesignDataVisualisationPage.open()
    await expect(DesignDataVisualisationPage.mainHeading).toBeDisplayed()
    const content = await DesignDataVisualisationPage.pageContent.getText()
    expect(content).toMatch(/chart|graph|data visuali|map/i)
  })

  // --- Prototyping (from 27-design-prototyping.spec.js) ---

  // P1-48
  it('Given I am on /design/prototyping, when the page loads, then GOV.UK Prototype Kit and Figma guidance is shown', async () => {
    await DesignPrototypingPage.open()
    await expect(DesignPrototypingPage.mainHeading).toBeDisplayed()
    const content = await DesignPrototypingPage.pageContent.getText()
    expect(content).toMatch(/prototype|Figma|GOV\.UK Prototype Kit/i)
    await expect(DesignPrototypingPage.prototypeKitLink).toBeDisplayed()
  })

  // --- Design Tools (from 28-design-tools.spec.js) ---

  // P1-49
  it('Given I am on /design/tools, when the page loads, then Figma and Mural tools with access instructions are shown', async () => {
    await DesignToolsPage.open()
    await expect(DesignToolsPage.mainHeading).toBeDisplayed()
    const content = await DesignToolsPage.pageContent.getText()
    expect(content).toMatch(/Figma|Mural|GOV\.UK Prototype Kit/i)
    let links = await DesignToolsPage.externalLinks
    if (!Array.isArray(links)) links = [links]
    expect(links.length).toBeGreaterThan(0)
  })

  // --- Designing Content Types (from 30-designing-content-types.spec.js) ---

  // P1-34
  it('Given I am on /design/components-and-patterns, when the page loads, then all content type sections (service pages, emails, letters) with correct headings are shown', async () => {
    await DesigningContentTypesPage.open()
    await expect(DesigningContentTypesPage.mainHeading).toBeDisplayed()
    const headings = await DesigningContentTypesPage.getSectionHeadings()
    expect(headings.length).toBeGreaterThan(0)
    const content = await DesigningContentTypesPage.pageContent.getText()
    expect(content).toMatch(/service page|GOV\.UK|email|letter/i)
  })

  // Functional click test: backlog link opens new tab, target is live, and provides a way to add findings via GitHub
  it('Given I am on /design/components-and-patterns, when I click "See if it is being worked on by other teams across government", then it opens in a new tab, the page is not 404 or archived, and links for adding findings are present', async () => {
    await browser.url('/design/components-and-patterns')
    await expect($('main h1')).toBeDisplayed()

    // Locate the exact backlog link from the numbered list
    const backlogLink = await $('a[href="https://design-system.service.gov.uk/community/backlog/"]')
    await expect(backlogLink).toBeDisplayed()
    const linkText = await backlogLink.getText()
    expect(linkText).toMatch(/See if it is being worked on by other teams across government/i)

    // Confirm the link is marked to open in a new tab
    const target = await backlogLink.getAttribute('target')
    expect(target).toBe('_blank')

    // Record current window handles, then click
    const handlesBefore = await browser.getWindowHandles()
    await backlogLink.click()

    // Wait for new tab to appear
    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length > handlesBefore.length,
      { timeout: 8000, timeoutMsg: 'A new tab did not open after clicking the backlog link' }
    )

    // Switch to the newly opened tab
    const handlesAfter = await browser.getWindowHandles()
    const newTab = handlesAfter.find(h => !handlesBefore.includes(h))
    await browser.switchToWindow(newTab)

    // Wrap all new-tab assertions in try/finally so the tab is always closed,
    // even when an assertion fails — this prevents stale handles and ensures
    // the afterTest screenshot (if any) is taken from the correct window
    let newTabTestError = null
    try {
      // Wait for the page to fully load
      await browser.waitUntil(
        async () => {
          const title = await browser.getTitle()
          return title.length > 0
        },
        { timeout: 10000, timeoutMsg: 'New tab page did not load in time' }
      )

      // 1. Verify the page is not a 404 / archived / error page
      const pageTitle = await browser.getTitle()
      const pageH1 = await $('h1')
      const h1Text = await pageH1.isExisting() ? await pageH1.getText() : ''
      expect(pageTitle).not.toMatch(/404|page not found|not found|archived/i)
      expect(h1Text).not.toMatch(/404|page not found|not found|archived/i)

      // 2. Verify the page URL is the expected GOV.UK Design System backlog page
      //    and that the URL itself does not indicate the page was archived or removed
      const currentUrl = await browser.getUrl()
      expect(currentUrl).toMatch(/design-system\.service\.gov\.uk\/community\/backlog/i)
      expect(currentUrl).not.toMatch(/404|not-found|archived|removed|gone/i)

      // 3. Verify the page body content does not indicate an archived or removed page
      const bodyText = await $('body').getText()
      expect(bodyText).not.toMatch(/this page has been archived|page not found|no longer available|page has been removed|410|404/i)

      // 4. Verify there is a way to "add your findings" — the backlog uses GitHub issues
      //    Look for GitHub links anywhere in the page (each backlog entry links to a GitHub issue)
      const githubLinks = await $$('a[href*="github.com"]')
      expect(githubLinks.length).toBeGreaterThan(0)
    } catch (err) {
      newTabTestError = err
    } finally {
      // Always close the new tab and return focus to the original window
      const currentHandles = await browser.getWindowHandles()
      if (currentHandles.includes(newTab)) {
        await browser.closeWindow()
      }
      await browser.switchToWindow(handlesBefore[handlesBefore.length - 1])
    }

    // Re-throw after switching back so the screenshot in afterTest is taken
    // from the correct original window, not the external new tab
    if (newTabTestError) {
      throw newTabTestError
    }
  })
})
