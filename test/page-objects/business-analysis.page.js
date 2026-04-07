import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class BusinessAnalysisPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.defra-service-manual-nav')
  }

  get waysOfWorkingLink() {
    return $('a[href="/business-analysis/ways-of-working"]')
  }

  get sectionDescription() {
    return $('main .govuk-body')
  }

  open() {
    return super.open('/business-analysis')
  }

  async clickWaysOfWorkingLink() {
    await this.waysOfWorkingLink.click()
  }

  async isSectionNavDisplayed() {
    return this.sectionNav.isDisplayed()
  }
}

export default new BusinessAnalysisPage()
