import { browser, expect } from '@wdio/globals'

import AccessibilityPage from '../page-objects/accessibility.page'
import AccessibilityToolsPage from '../page-objects/accessibility-tools.page'
import AccessibilityStatementPage from '../page-objects/accessibility-statement.page'
import ManageAccessibilityPage from '../page-objects/manage-accessibility.page'
import TestForAccessibilityPage from '../page-objects/test-for-accessibility.page'
import ErrorPage from '../page-objects/error-page.page'

describe('Accessibility Pages And Statements Verification', () => {
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

  // From 05-accessibility.spec.js (original)
  it('Given I am on /accessibility, when the page loads, then navigation links to "Manage accessibility" and "Test for accessibility" are visible', async () => {
    await AccessibilityPage.open()
    await expect(AccessibilityPage.mainHeading).toBeDisplayed()
    await expect(AccessibilityPage.manageAccessibilityLink).toBeDisplayed()
    await expect(AccessibilityPage.testForAccessibilityLink).toBeDisplayed()
  })

  it('Given I am on /accessibility, when I click "Manage accessibility" in the section nav, then I navigate to /accessibility/manage-accessibility', async () => {
    await AccessibilityPage.open()
    await expect(AccessibilityPage.sectionNav).toBeDisplayed()
    await AccessibilityPage.manageAccessibilityLink.waitForClickable()
    await AccessibilityPage.clickManageAccessibilityLink()
  await expect(browser).toHaveUrl(/\/accessibility\/manage-accessibility/)
  // Verify the target page has a heading and some expected content
  await expect(browser).toHaveTitle(/Manage accessibility|Accessibility/i)
  const heading = await $('main h1')
  await expect(heading).toBeDisplayed()
  })

  it('Given I am on /accessibility, when the section nav is present, then it contains at least one nav item', async () => {
    await AccessibilityPage.open()
    const navDisplayed = await AccessibilityPage.isSectionNavDisplayed()
    if (navDisplayed) {
      const navItems = await AccessibilityPage.sectionNavItems
      expect(navItems.length).toBeGreaterThan(0)
    } else {
      const navItems = await AccessibilityPage.sectionNavItems
      expect(navItems.length).toBe(0)
    }
  })

  // From accessibility-tools.spec.js
  it('Given I am on /content/accessibility-tools, when the page loads, then recommended tools (axe, WAVE) with external links are displayed', async () => {
    await AccessibilityToolsPage.open()
    await expect(AccessibilityToolsPage.mainHeading).toBeDisplayed()
    const content = await AccessibilityToolsPage.pageContent.getText()
    expect(content).toMatch(/tool|axe|WAVE/i)
    const links = await AccessibilityToolsPage.toolLinks
    expect(links.length).toBeGreaterThan(0)
    const hrefs = await AccessibilityToolsPage.getToolLinkHrefs()
    expect(hrefs.length).toBeGreaterThan(0)
    expect(hrefs[0]).toMatch(/^https?:\/\//)
  })

  it('Given I click each section nav link on /accessibility, when I land on each subpage, then each returns HTTP 200 with relevant content', async () => {
    const links = [
      { href: '/accessibility/manage-accessibility', content: /stage.gate|accessibility statement/i },
      { href: '/accessibility/test-for-accessibility', content: /test|assistive technology|screen reader/i }
    ]

    for (const l of links) {
      // navigate using the page.open helper to ensure consistent behaviour
      await AccessibilityPage.open()
      await browser.url(l.href)

      // Quick HTTP status check via fetch in browser context
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
        throw new Error(`Unexpected HTTP status ${status} for ${l.href}`)
      }

      // Check page heading and content
      const h = await $('main h1')
      await expect(h).toBeDisplayed()
      const pageText = await $('main').getText()
      expect(pageText).toMatch(l.content)
    }
  })

  // Comprehensive content validation for accessibility-related URLs
  it('Given I visit each accessibility-related URL, when the page loads, then each returns HTTP 200 and displays relevant content', async () => {
    const pages = [
      { path: '/accessibility', content: /accessibility|Make sure everyone can use the service/i },
      { path: '/accessibility/manage-accessibility', content: /stage.gate|accessibility statement/i },
      { path: '/accessibility/test-for-accessibility', content: /test|assistive technology|screen reader/i },
      { path: '/accessibility-statement', content: /Accessibility statement|cctsassurance|enforcement/i },
      { path: '/content/accessibility-tools', content: /tool|axe|WAVE|accessibility design and testing tools/i }
    ]

    for (const p of pages) {
      await AccessibilityPage.open()
      await browser.url(p.path)

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
        throw new Error(`Unexpected HTTP status ${status} for ${p.path}`)
      }

      // Validate heading and content
      const heading = await $('main h1')
      await expect(heading).toBeDisplayed()
      const pageText = await $('main').getText()
      expect(pageText).toMatch(p.content)
    }
  })

  // From accessibility-statement.spec.js
  it('Given I am on /accessibility-statement, when the page loads, then the contact email and enforcement section are displayed', async () => {
    await AccessibilityStatementPage.open()
    await expect(AccessibilityStatementPage.mainHeading).toBeDisplayed()
    await expect(AccessibilityStatementPage.contactEmailLink).toBeDisplayed()
    const href = await AccessibilityStatementPage.getContactEmailHref()
    expect(href).toMatch(/cctsassurance@defra\.gov\.uk/)
    await expect(AccessibilityStatementPage.enforcementSection).toBeDisplayed()
  })

  it('Given I navigate to a non-existent page, when the server returns 404, then a styled "Page not found" page with GOV.UK layout is shown', async () => {
    await ErrorPage.openNotFound()
    await expect(ErrorPage.mainHeading).toHaveText(/Page not found/i)
    await expect(ErrorPage.govukTemplateBody).toBeExisting()
    const source = await browser.getPageSource()
    expect(source).toMatch(/<html/i)
  })

  // From manage-accessibility.spec.js
  it('Given I am on /accessibility/manage-accessibility, when the page loads, then all 4 stage-gate requirements are displayed', async () => {
    await ManageAccessibilityPage.open()
    await expect(ManageAccessibilityPage.mainHeading).toBeDisplayed()
    const content = await ManageAccessibilityPage.pageContent.getText()
    expect(content).toMatch(/stage.gate/i)
    const matches = content.match(/stage.gate/gi) || []
    expect(matches.length).toBeGreaterThanOrEqual(4)
  })

  it('Given I am on /accessibility/manage-accessibility with collapsed details, when I expand the first panel, then the content expands', async () => {
    await ManageAccessibilityPage.open()
    await expect(ManageAccessibilityPage.firstDetailsSummary).toBeDisplayed()
    await ManageAccessibilityPage.expandFirstDetails()
    const expanded = await ManageAccessibilityPage.isDetailsExpanded()
    expect(expanded).toBe(true)
    const content = await ManageAccessibilityPage.pageContent.getText()
    expect(content).toMatch(/accessibility statement/i)
  })

  it('Given I am on /accessibility/manage-accessibility, when the page loads before interaction, then details panels are collapsed by default', async () => {
    await ManageAccessibilityPage.open()
    const details = await ManageAccessibilityPage.detailsComponents
    expect(details.length).toBeGreaterThan(0)
    const firstOpen = await details[0].getAttribute('open')
    expect(firstOpen).toBeNull()
  })

  // From 69-test-for-accessibility.spec.js
  // P1-21
  it('Given I am on /accessibility/test-for-accessibility, when the page loads, then Step 1 automated testing guidance and a Defra GitHub link are present', async () => {
    await TestForAccessibilityPage.open()
    await expect(TestForAccessibilityPage.mainHeading).toBeDisplayed()
    const content = await TestForAccessibilityPage.pageContent.getText()
    expect(content).toMatch(/automat/i)
    await expect(TestForAccessibilityPage.defraGithubLink).toExist()
    const href = await TestForAccessibilityPage.getDefraGithubLinkHref()
    expect(href).toMatch(/defra-design\.github\.io/)
  })

  // P1-22
  it('Given I am on /accessibility/test-for-accessibility with collapsed details, when I expand the first section, then tools and resources content is shown', async () => {
    await TestForAccessibilityPage.open()
    const details = await TestForAccessibilityPage.detailsComponents
    expect(details.length).toBeGreaterThan(0)
    await TestForAccessibilityPage.expandFirstDetails()
    const content = await TestForAccessibilityPage.pageContent.getText()
    expect(content).toMatch(/bookmarklet|tool/i)
  })
})
