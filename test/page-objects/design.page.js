import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class DesignPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get brandingLink() {
    return $('a[href="/design/branding"]')
  }

  get cookiesLink() {
    return $('a[href="/design/cookies"]')
  }

  get dataVisualisationLink() {
    return $('a[href="/design/data-visualisation"]')
  }

  get prototypingLink() {
    return $('a[href="/design/prototyping"]')
  }

  get toolsLink() {
    return $('a[href="/design/tools"]')
  }

  get componentsAndPatternsLink() {
    return $('a[href="/design/components-and-patterns"]')
  }

  get supportBox() {
    return $('main .defra-service-manual-support-box')
  }

  get designOpsEmailLink() {
    return $('a[href*="DesignOps@defra.gov.uk"]')
  }

  open() {
    return super.open('/design')
  }

  async clickBrandingLink() {
    await this.brandingLink.click()
  }

  async isSupportBoxDisplayed() {
    return this.supportBox.isDisplayed()
  }
}

export default new DesignPage()
