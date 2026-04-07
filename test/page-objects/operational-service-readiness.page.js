import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class OperationalServiceReadinessPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get otherAssuranceLink() {
    return $('a[href*="other-assurance-types"]')
  }

  get checklistItems() {
    return $$('main li')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/delivery-groups/follow-delivery-governance/assurance/operational-service-readiness')
  }

  async clickOtherAssuranceLink() {
    await this.otherAssuranceLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new OperationalServiceReadinessPage()
