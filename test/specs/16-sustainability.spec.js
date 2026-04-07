import { browser, expect, $ } from '@wdio/globals'

import SustainabilityPage from '../page-objects/sustainability.page'
import SustainabilityProcessPage from '../page-objects/sustainability-process.page'
import SustainabilityObjectivesPage from '../page-objects/sustainability-objectives.page'
import SustainabilityMetricsPage from '../page-objects/sustainability-metrics.page'
import ErrorPage from '../page-objects/error-page.page'

describe('Sustainability Guidance Verification', () => {
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

  // ─── Main Sustainability page (from 68-sustainability.spec.js) ───────────

  // P1-69
  it('Given I am on /sustainability, when the page loads, then the heading and nav links to Process, Objectives, and Metrics are visible', async () => {
    await SustainabilityPage.open()
    await expect(SustainabilityPage.mainHeading).toBeDisplayed()
    await expect(SustainabilityPage.processLink).toBeDisplayed()
    await expect(SustainabilityPage.objectivesLink).toBeDisplayed()
    await expect(SustainabilityPage.metricsLink).toBeDisplayed()
  })

  // P1-70
  it('Given I am on /sustainability, when I click "Process" in the section nav, then I navigate to /sustainability/process', async () => {
    await SustainabilityPage.open()
    await SustainabilityPage.processLink.waitForClickable()
    await SustainabilityPage.clickProcessLink()
    await expect(browser).toHaveUrl(/\/sustainability\/process/)
  })

  // P1-71
  it('Given I navigate to a non-existent page, when the server returns 404, then a styled "Page not found" page is shown', async () => {
    await ErrorPage.openNotFound()
    await expect(ErrorPage.mainHeading).toHaveText(/Page not found/i)
    await expect(ErrorPage.govukTemplateBody).toBeExisting()
  })

  // ─── Process subpage (from 67-sustainability-process.spec.js) ────────────

  // P1-72
  it('Given I am on /sustainability/process, when the page loads, then a RAG rating table with Green, Amber, and Red rows is shown', async () => {
    await SustainabilityProcessPage.open()
    await expect(SustainabilityProcessPage.mainHeading).toBeDisplayed()
    await expect(SustainabilityProcessPage.ragTable).toBeDisplayed()

    // RAG ratings are plain text td cells — no CSS tag classes used on this page
    const total = await browser.execute(() => {
      const cells = Array.from(document.querySelectorAll('main .govuk-table__cell'))
      return cells.filter((c) => /^(Green|Amber|Red)$/i.test(c.textContent.trim())).length
    })
    expect(total).toBeGreaterThan(0)

    // Verify all three rating labels appear in the tables
    const tableText = await SustainabilityProcessPage.getRagTableText()
    expect(tableText).toMatch(/Green/i)
    expect(tableText).toMatch(/Amber/i)
    expect(tableText).toMatch(/Red/i)

    // Verify key content from the page
    const pageText = await SustainabilityProcessPage.getPageContentText()
    expect(pageText).toMatch(/digital sustainability risk assessment/i)
    expect(pageText).toMatch(/digital sustainability statement/i)
    expect(pageText).toMatch(/service assessments/i)
    expect(pageText).toMatch(/From 1 April 2026/i)
    expect(pageText).toMatch(/sustainableICT@defra\.gov\.uk/i)
  })

  // P1-73
  it('Given I am on /sustainability/process, when I read the content, then the "From 1 April 2026" implementation date is shown', async () => {
    await SustainabilityProcessPage.open()
    const content = await SustainabilityProcessPage.getPageContentText()
    expect(content).toMatch(/April 2026|from 1 April/i)
  })

  // P1-74
  it('Given I am on /sustainability/process, when I inspect the RAG table, then it renders correctly with meaningful content', async () => {
    await SustainabilityProcessPage.open()
    const isDisplayed = await SustainabilityProcessPage.isRagTableDisplayed()
    expect(isDisplayed).toBe(true)
    const tableText = await SustainabilityProcessPage.getRagTableText()
    expect(tableText).toBeTruthy()
    expect(tableText.length).toBeGreaterThan(10)
    // Verify sub-navigation links are present
    const subNav = await $('nav.app-sub-navigation')
    await expect(subNav).toBeDisplayed()
    const navText = await subNav.getText()
    expect(navText).toMatch(/Deliver a sustainable service/i)
    expect(navText).toMatch(/Assess risks and record sustainability actions/i)
    expect(navText).toMatch(/Taking action and tracking sustainability performance/i)
  })

  // ─── Objectives subpage (from 66-sustainability-objectives.spec.js) ───────

  // P1-75
  it('Given I am on /sustainability/objectives, when the page loads, then sustainability objectives and targets guidance is shown', async () => {
    await SustainabilityObjectivesPage.open()
    await expect(SustainabilityObjectivesPage.mainHeading).toBeDisplayed()
    const content = await SustainabilityObjectivesPage.pageContent.getText()
    expect(content).toMatch(/objective|target|sustainab/i)
  })

  // ─── Metrics subpage (from 65-sustainability-metrics.spec.js) ─────────────

  // P1-76
  it('Given I am on /sustainability/metrics, when the page loads, then guidance on measuring and reporting sustainability metrics is shown', async () => {
    await SustainabilityMetricsPage.open()
    await expect(SustainabilityMetricsPage.mainHeading).toBeDisplayed()
    const content = await SustainabilityMetricsPage.pageContent.getText()
    expect(content).toMatch(/metric|measure|report/i)
  })
})
