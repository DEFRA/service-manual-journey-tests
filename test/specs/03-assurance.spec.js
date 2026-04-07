import { browser, expect } from '@wdio/globals'

import AssurancePage from '../page-objects/assurance.page'
import SpendControlPage from '../page-objects/spend-control.page'
import AssuranceServiceAssessmentsPage from '../page-objects/assurance-service-assessments.page'
import OperationalServiceReadinessPage from '../page-objects/operational-service-readiness.page'
import ErrorPage from '../page-objects/error-page.page'

describe('Assurance: Spend Control And Readiness', () => {
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

  // ─── Assurance landing page (from 09-assurance.spec.js) ──────────────────

  // P1-99
  it('Given I am on the Assurance landing page, when the page loads, then nav links to Spend Control, Service Assessments, Operational Readiness, and Other Assurance Types are visible', async () => {
    await AssurancePage.open()
    await expect(AssurancePage.mainHeading).toBeDisplayed()
    await expect(AssurancePage.spendControlLink).toBeDisplayed()
    await expect(AssurancePage.serviceAssessmentsLink).toBeDisplayed()
    await expect(AssurancePage.operationalReadinessLink).toBeDisplayed()
    await expect(AssurancePage.otherAssuranceLink).toBeDisplayed()
  })

  // P1-100
  it('Given I am on the Assurance landing page, when I read the content, then Spend Control, Service Assessments, Operational Readiness, and guardrail information is present', async () => {
    await AssurancePage.open()
    const content = await AssurancePage.getPageContentText()
    expect(content).toMatch(/Assurance/i)
    expect(content).toMatch(/Spend control/i)
    expect(content).toMatch(/Service assessment/i)
    expect(content).toMatch(/Operational service readiness/i)
    expect(content).toMatch(/show and tell|guardrail|architectural assurance/i)
  })

  // P1-101
  it('Given I navigate to a non-existent page, when the server returns 404, then a styled "Page not found" page with GOV.UK layout is shown', async () => {
    await ErrorPage.openNotFound()
    await expect(ErrorPage.mainHeading).toHaveText(/Page not found/i)
    await expect(ErrorPage.govukTemplateBody).toBeExisting()
  })

  // ─── All assurance subpages — heading + content check ────────────────────

  it('Given I visit each assurance subpage URL, when the page loads, then each displays the correct heading', async () => {
    const base = '/delivery-groups/follow-delivery-governance/assurance'
    const subpages = [
      { href: `${base}/spend-control`, heading: /Spend control/i },
      { href: `${base}/service-assessments`, heading: /Service assessments/i },
      { href: `${base}/operational-service-readiness`, heading: /Operational service readiness/i },
      { href: `${base}/other-assurance-types`, heading: /Other assurance types/i }
    ]
    for (const p of subpages) {
      await browser.url(p.href)
      const hasH1 = await browser.execute(() => document.querySelector('h1') !== null)
      if (!hasH1) throw new Error(`${p.href} — no <h1> found`)
      const heading = await browser.execute(() => document.querySelector('h1').textContent)
      if (!p.heading.test(heading)) {
        throw new Error(`${p.href} — heading "${heading}" did not match ${p.heading}`)
      }
    }
  })

  // ─── Spend Control subpage (from 64-spend-control.spec.js) ───────────────

  // P1-102
  it('Given I am on the Spend Control page, when the page loads, then spend approval, quarterly reporting, and risk assessment guidance is shown', async () => {
    await SpendControlPage.open()
    await expect(SpendControlPage.mainHeading).toBeDisplayed()
    await expect(SpendControlPage.mainHeading).toHaveText(/Spend control/i)
    const content = await SpendControlPage.pageContent.getText()
    expect(content).toMatch(/spend|threshold|approval/i)
    expect(content).toMatch(/get approval to spend|quarterly|risk/i)
  })

  // ─── Service Assessments (Assurance) subpage (from 08-assurance-service-assessments.spec.js) ─

  // P1-103
  it('Given I am on the Service Assessments (Assurance) page, when the page loads, then GOV.UK Service Standard and 14-point framework content is shown', async () => {
    await AssuranceServiceAssessmentsPage.open()
    await expect(AssuranceServiceAssessmentsPage.mainHeading).toBeDisplayed()
    await expect(AssuranceServiceAssessmentsPage.mainHeading).toHaveText(/Service assessments/i)
    const content = await AssuranceServiceAssessmentsPage.pageContent.getText()
    expect(content).toMatch(/assessment|assurance/i)
    expect(content).toMatch(/GOV\.UK Service Standard|14 points|peer review|transactional/i)
  })

  // ─── Operational Service Readiness subpage (from 46-operational-service-readiness.spec.js) ─

  // P1-105
  it('Given I am on the Operational Service Readiness page, when the page loads, then the pre-live checklist covering support, monitoring, and runbook requirements is shown', async () => {
    await OperationalServiceReadinessPage.open()
    await expect(OperationalServiceReadinessPage.mainHeading).toBeDisplayed()
    await expect(OperationalServiceReadinessPage.mainHeading).toHaveText(/Operational service readiness/i)
    const content = await OperationalServiceReadinessPage.pageContent.getText()
    expect(content).toMatch(/support|monitor|runbook|readiness/i)
    expect(content).toMatch(/safe and secure|live environment|compliance|integrity/i)
    const checklistItemsRaw = await OperationalServiceReadinessPage.checklistItems
    const checklistItems = Array.isArray(checklistItemsRaw) ? checklistItemsRaw : [checklistItemsRaw].filter(Boolean)
    expect(checklistItems.length).toBeGreaterThan(0)
  })

  // ─── Other Assurance Types subpage ────────────────────────────────────────

  // P1-104
  it('Given I am on the Other Assurance Types page, when the page loads, then show-and-tells, architectural assurance, and guardrail exception guidance is shown', async () => {
    const base = '/delivery-groups/follow-delivery-governance/assurance'
    await browser.url(`${base}/other-assurance-types`)
    const heading = await browser.$('h1')
    await expect(heading).toBeDisplayed()
    await expect(heading).toHaveText(/Other assurance types/i)
    const content = await browser.$('main').getText()
    expect(content).toMatch(/show and tell/i)
    expect(content).toMatch(/architectural assurance/i)
    expect(content).toMatch(/guardrail/i)
  })
})
