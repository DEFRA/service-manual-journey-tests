import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class ContentPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get sectionNavItems() {
    return $$('nav.app-sub-navigation a')
  }

  get inclusiveLanguageLink() {
    return $('a[href="/content/inclusive-clear-language"]')
  }

  get designingContentTypesLink() {
    return $('a[href="/content/designing-different-content-types"]')
  }

  get sharingDesignsLink() {
    return $('a[href="/content/sharing-designs-recording-decisions"]')
  }

  get workingInDiscoveryLink() {
    return $('a[href="/content/working-in-discovery"]')
  }

  get workingInAlphaLink() {
    return $('a[href="/content/working-in-alpha"]')
  }

  get workingInBetaLink() {
    return $('a[href="/content/working-in-beta"]')
  }

  get workingInLiveLink() {
    return $('a[href="/content/working-in-live"]')
  }

  get legalContentLink() {
    return $('a[href="/content/legal-content"]')
  }

  get welshLanguageLink() {
    return $('a[href="/content/welsh-language-translation"]')
  }

  get colourContrastLink() {
    return $('a[href="/content/colour-contrast"]')
  }

  get accessibleSpreadsheetsLink() {
    return $('a[href="/content/accessible-spreadsheets"]')
  }

  get accessibilityToolsLink() {
    return $('a[href="/content/accessibility-tools"]')
  }

  open() {
    return super.open('/content')
  }

  async clickInclusiveLanguageLink() {
    await this.inclusiveLanguageLink.click()
  }

  async getSectionNavItemTexts() {
    const items = await this.sectionNavItems
    const arr = Array.isArray(items) ? items : [items].filter(Boolean)
    return Promise.all(arr.map((i) => i.getText()))
  }

  async isSectionNavDisplayed() {
    return this.sectionNav.isDisplayed()
  }
}

export default new ContentPage()
