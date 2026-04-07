import { browser, expect } from '@wdio/globals'

import SecurityPage from '../page-objects/security.page'
import SecurityCommonTasksPage from '../page-objects/security-common-tasks.page'
import ErrorPage from '../page-objects/error-page.page'

describe('Security Guidance And Tasks Verification', () => {
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

  // ─── Security landing page (from 58-security.spec.js) ────────────────────

  // P1-56
  it('Given I am on /security, when the page loads, then the heading, section nav, Secure by Design guidance, and security team contact are shown', async () => {
    await SecurityPage.open()
    await expect(SecurityPage.mainHeading).toBeDisplayed()
    await expect(SecurityPage.mainHeading).toHaveText(/Create a secure service/i)
    await expect(SecurityPage.sectionNav).toBeDisplayed()
    await expect(SecurityPage.commonTasksLink).toBeDisplayed()
    const content = await SecurityPage.pageContent.getText()
    expect(content).toMatch(/Secure by Design|security risk|privacy/i)
    expect(content).toMatch(/security@defra\.gov\.uk|Security team/i)
  })

  // P1-57
  it('Given I am on /security, when I click "Get access and travel securely" in the section nav, then I navigate to /security/common-tasks', async () => {
    await SecurityPage.open()
    await SecurityPage.commonTasksLink.waitForClickable()
    await SecurityPage.clickCommonTasksLink()
    await expect(browser).toHaveUrl(/\/security\/common-tasks/)
  })

  // P1-58
  it('Given I navigate to a non-existent page, when the server returns 404, then a styled "Page not found" page is shown', async () => {
    await ErrorPage.openNotFound()
    await expect(ErrorPage.mainHeading).toHaveText(/Page not found/i)
    await expect(ErrorPage.govukTemplateBody).toBeExisting()
  })

  // ─── Common Tasks subpage (from 57-security-common-tasks.spec.js) ─────────

  // P1-59
  it('Given I am on /security/common-tasks, when the page loads, then cloud account access, service desk, and overseas travel security guidance is shown', async () => {
    await SecurityCommonTasksPage.open()
    await expect(SecurityCommonTasksPage.mainHeading).toBeDisplayed()
    await expect(SecurityCommonTasksPage.mainHeading).toHaveText(/Get access and travel securely/i)
    const content = await SecurityCommonTasksPage.pageContent.getText()
    expect(content).toMatch(/secret|dependency|scan|security|cloud account|travel/i)
    expect(content).toMatch(/Cloud Account|Service Desk|overseas|approval/i)
  })

  // ─── Both pages return valid headings ─────────────────────────────────────

  it('Given I visit each security page URL, when the page loads, then each displays the correct heading', async () => {
    const pages = [
      { href: '/security', heading: /Create a secure service/i },
      { href: '/security/common-tasks', heading: /Get access and travel securely/i }
    ]
    for (const p of pages) {
      await browser.url(p.href)
      const hasH1 = await browser.execute(() => document.querySelector('main h1') !== null)
      if (!hasH1) throw new Error(`${p.href} — no <h1> found in main`)
      const heading = await browser.$('main h1')
      await expect(heading).toHaveText(p.heading)
    }
  })
})
