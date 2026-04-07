import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class PatternsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get govukPatternsLink() {
    return $('a[href*="design-system.service.gov.uk/patterns"]')
  }

  get supportBox() {
    return $('main .defra-service-manual-support-box')
  }

  get designEmailLink() {
    return $('a[href*="DesignOps@defra.gov.uk"]')
  }

  open() {
    return super.open('/patterns')
  }

  async clickGovukPatternsLink() {
    await this.govukPatternsLink.click()
  }

  async isSupportBoxDisplayed() {
    return this.supportBox.isDisplayed()
  }
}

export default new PatternsPage()
