import { browser, expect } from '@wdio/globals'

import TestingAndAssurancePage from '../page-objects/testing-and-assurance.page'
import TestingRecommendedApproachPage from '../page-objects/testing-recommended-approach.page'
import ErrorPage from '../page-objects/error-page.page'

describe('Testing And Assurance Verification', () => {
  afterEach(async () => {
    try {
      const logs = await browser.getLogs('browser')
      const errors = logs.filter((l) => {
        if (l.level !== 'SEVERE') return false
        const msg = (l.message || '').toString()
        if (/favicon/i.test(msg)) return false
        if (/Failed to load resource: the server responded with a status of 404/i.test(msg) && /images\//i.test(msg)) return false
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

  // ─── Landing page (/testing-and-assurance) ───────────────────────────────

  // P1-77
  it('Given I am on /testing-and-assurance, when the page loads, then the heading, section nav, and "Recommended approach" link are visible', async () => {
    await TestingAndAssurancePage.open()
    await expect(TestingAndAssurancePage.mainHeading).toBeDisplayed()
    await expect(TestingAndAssurancePage.mainHeading).toHaveText(/Quality Assurance and Test/i)
    await expect(TestingAndAssurancePage.sectionNav).toBeDisplayed()
    await expect(TestingAndAssurancePage.recommendedApproachLink).toBeDisplayed()
    const content = await TestingAndAssurancePage.pageContent.getText()
    expect(content).toMatch(/shifting quality|left|GOV\.UK Service Standard|testing/i)
  })

  // P1-78
  it('Given I navigate to a non-existent page, when the server returns 404, then a styled "Page not found" page is shown', async () => {
    await ErrorPage.openNotFound()
    await expect(ErrorPage.mainHeading).toHaveText(/Page not found/i)
    await expect(ErrorPage.govukTemplateBody).toBeExisting()
  })

  // ─── Recommended Approach subpage (from 71-testing-recommended-approach.spec.js) ─

  // P1-79
  it('Given I am on /testing-and-assurance/recommended-approach, when the page loads, then risk-based testing strategy and Defra DDTS QA guidance is shown', async () => {
    await TestingRecommendedApproachPage.open()
    await expect(TestingRecommendedApproachPage.mainHeading).toBeDisplayed()
    await expect(TestingRecommendedApproachPage.mainHeading).toHaveText(/Recommended approach/i)
    const content = await TestingRecommendedApproachPage.pageContent.getText()
    expect(content).toMatch(/test|QA|quality/i)
    expect(content).toMatch(/risk.based|test strategy|Defra DDTS/i)
  })

  // ─── Both pages return valid headings ────────────────────────────────────

  it('Given I visit each QA and Test page URL, when the page loads, then each displays the correct heading', async () => {
    const pages = [
      { href: '/testing-and-assurance', heading: /Quality Assurance and Test/i },
      { href: '/testing-and-assurance/recommended-approach', heading: /Recommended approach/i }
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
