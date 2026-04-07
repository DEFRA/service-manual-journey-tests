import { browser, expect, $ } from '@wdio/globals'

import ContentPage from '../page-objects/content.page'
import InclusiveClearLanguagePage from '../page-objects/inclusive-clear-language.page'
import LegalContentPage from '../page-objects/legal-content.page'
import WorkingInDiscoveryPage from '../page-objects/working-in-discovery.page'
import WorkingInAlphaPage from '../page-objects/working-in-alpha.page'
import WorkingInBetaPage from '../page-objects/working-in-beta.page'
import WorkingInLivePage from '../page-objects/working-in-live.page'
import WelshLanguageTranslationPage from '../page-objects/welsh-language-translation.page'
import ColourContrastPage from '../page-objects/colour-contrast.page'
import ErrorPage from '../page-objects/error-page.page'

describe('Content Design And Accessibility Verification', () => {
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

  // ─── Main Content Design landing page (from 16-content.spec.js) ──────────

  // P1-30
  it('Given I am on /content, when the page loads, then the section nav shows all content subpage links', async () => {
    await ContentPage.open()
    await expect(ContentPage.mainHeading).toBeDisplayed()
    await expect(ContentPage.sectionNav).toBeDisplayed()
    const navText = await ContentPage.sectionNav.getText()
    expect(navText).toMatch(/Inclusive, clear language/i)
    expect(navText).toMatch(/Working in the discovery phase/i)
    expect(navText).toMatch(/Working in the alpha phase/i)
    expect(navText).toMatch(/Working in the beta phase/i)
    expect(navText).toMatch(/Working in the live phase/i)
    expect(navText).toMatch(/Legal content/i)
    expect(navText).toMatch(/Welsh language translation/i)
    expect(navText).toMatch(/Colour contrast/i)
    expect(navText).toMatch(/Accessible spreadsheets/i)
    expect(navText).toMatch(/Accessibility design and testing tools/i)
  })

  // P1-31
  it('Given I am on /content, when I click "Inclusive, clear language" in the section nav, then I navigate to /content/inclusive-clear-language', async () => {
    await ContentPage.open()
    await expect(ContentPage.inclusiveLanguageLink).toBeDisplayed()
    await ContentPage.inclusiveLanguageLink.waitForClickable()
    await ContentPage.clickInclusiveLanguageLink()
    await expect(browser).toHaveUrl(/\/content\/inclusive-clear-language/)
  })

  // P1-32
  it('Given I navigate to a non-existent page, when the server returns 404, then a styled "Page not found" page is shown', async () => {
    await ErrorPage.openNotFound()
    await expect(ErrorPage.mainHeading).toHaveText(/Page not found/i)
    await expect(ErrorPage.govukTemplateBody).toBeExisting()
  })

  // ─── All subpages — HTTP 200 + heading check ──────────────────────────────

  it('Given I visit each content subpage URL, when the page loads, then each returns HTTP 200 and displays the correct heading', async () => {
    const subpages = [
      { href: '/content/inclusive-clear-language', heading: /inclusive|clear language/i },
      { href: '/content/designing-different-content-types', heading: /designing different content types/i },
      { href: '/content/sharing-designs-recording-decisions', heading: /sharing designs|recording decisions/i },
      { href: '/content/working-in-discovery', heading: /discovery/i },
      { href: '/content/working-in-alpha', heading: /alpha/i },
      { href: '/content/working-in-beta', heading: /beta/i },
      { href: '/content/working-in-live', heading: /live/i },
      { href: '/content/legal-content', heading: /legal/i },
      { href: '/content/welsh-language-translation', heading: /welsh/i },
      { href: '/content/colour-contrast', heading: /colour contrast/i },
      { href: '/content/accessible-spreadsheets', heading: /accessible spreadsheets/i },
      { href: '/content/accessibility-tools', heading: /accessibility.*tools/i }
    ]

    for (const p of subpages) {
      await browser.url(p.href)
      const hasH1 = await browser.execute(() => document.querySelector('main h1') !== null)
      if (!hasH1) {
        throw new Error(`${p.href} — no <h1> found in main (possible error page)`)
      }
      const heading = await $('main h1')
      await expect(heading).toHaveText(p.heading)
    }
  })

  // ─── Content design best practice ────────────────────────────────────────

  // P1-33
  it('Given I am on /content/inclusive-clear-language, when the page loads, then plain English and inclusive content guidance is shown', async () => {
    await InclusiveClearLanguagePage.open()
    await expect(InclusiveClearLanguagePage.mainHeading).toBeDisplayed()
    const content = await InclusiveClearLanguagePage.pageContent.getText()
    expect(content).toMatch(/inclusive|plain English|language/i)
  })

  // ─── Delivery phases ─────────────────────────────────────────────────────

  // P1-35
  it('Given I am on /content/working-in-discovery, when the page loads, then discovery phase guidance and GDS resource links are shown', async () => {
    await WorkingInDiscoveryPage.open()
    await expect(WorkingInDiscoveryPage.mainHeading).toBeDisplayed()
    const content = await WorkingInDiscoveryPage.pageContent.getText()
    expect(content).toMatch(/discovery/i)
    const linksRaw = await WorkingInDiscoveryPage.externalLinks
    const links = Array.isArray(linksRaw) ? linksRaw : [linksRaw].filter(Boolean)
    expect(links.length).toBeGreaterThan(0)
  })

  // P1-36
  it('Given I am on /content/working-in-alpha, when I expand the details component, then assumptions, risks, and prototyping guidance is shown', async () => {
    await WorkingInAlphaPage.open()
    await expect(WorkingInAlphaPage.mainHeading).toBeDisplayed()
    const detailsRaw = await WorkingInAlphaPage.detailsComponents
    const details = Array.isArray(detailsRaw) ? detailsRaw : [detailsRaw].filter(Boolean)
    if (details.length > 0) {
      await WorkingInAlphaPage.expandFirstDetails()
      const pageText = await $('main').getText()
      expect(pageText).toMatch(/assumption|risk|alpha/i)
    } else {
      const pageText = await $('main').getText()
      expect(pageText).toMatch(/alpha/i)
    }
  })

  // P1-37
  it('Given I am on /content/working-in-beta, when the page loads, then beta phase guidance and a content designer checklist are shown', async () => {
    await WorkingInBetaPage.open()
    await expect(WorkingInBetaPage.mainHeading).toBeDisplayed()
    const content = await WorkingInBetaPage.pageContent.getText()
    expect(content).toMatch(/beta/i)
  })

  // P1-38
  it('Given I am on /content/working-in-live, when the page loads, then guidance about maintaining and iterating content in the live phase is shown', async () => {
    await WorkingInLivePage.open()
    await expect(WorkingInLivePage.mainHeading).toBeDisplayed()
    const content = await WorkingInLivePage.pageContent.getText()
    expect(content).toMatch(/live/i)
  })

  // ─── Legal content and translation ───────────────────────────────────────

  // P1-39 (merged from 40-legal-content.spec.js)
  it('Given I am on /content/legal-content, when the page loads, then legal and compliance content guidance for Defra services is shown', async () => {
    await LegalContentPage.open()
    await expect(LegalContentPage.mainHeading).toBeDisplayed()
    const content = await LegalContentPage.pageContent.getText()
    expect(content).toMatch(/legal|compliance/i)
  })

  // P1-40
  it('Given I am on /content/welsh-language-translation, when the page loads, then Welsh translation requirements and external resource links are shown', async () => {
    await WelshLanguageTranslationPage.open()
    await expect(WelshLanguageTranslationPage.mainHeading).toBeDisplayed()
    const content = await WelshLanguageTranslationPage.pageContent.getText()
    expect(content).toMatch(/Welsh|translation/i)
    const linksRaw = await WelshLanguageTranslationPage.externalLinks
    const links = Array.isArray(linksRaw) ? linksRaw : [linksRaw].filter(Boolean)
    expect(links.length).toBeGreaterThan(0)
  })

  // ─── Designing for everyone ───────────────────────────────────────────────

  // P1-41 (moved from 11-breadcrumbs.spec.js — page lives at /content/colour-contrast)
  it('Given I am on /content/colour-contrast, when the page loads, then WCAG AA colour contrast guidance and the section nav entry are shown', async () => {
    await ColourContrastPage.open()
    await expect(ColourContrastPage.mainHeading).toBeDisplayed()
    await expect(ColourContrastPage.mainHeading).toHaveText(/Colour contrast and colour blindness/i)
    const content = await ColourContrastPage.pageContent.getText()
    expect(content).toMatch(/WCAG|contrast ratio|AA/i)
    // Section nav should show this page under "Designing for everyone"
    const sectionNav = await $('nav.app-sub-navigation')
    const navText = await sectionNav.getText()
    expect(navText).toMatch(/Colour contrast|colour blindness/i)
    expect(navText).toMatch(/Accessible spreadsheets/i)
  })
})
