import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class UserResearchPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get sectionNavItems() {
    return $$('nav.app-sub-navigation a')
  }

  get supportBox() {
    return $('main .defra-service-manual-support-box')
  }

  get standardsLink() {
    return $('a[href="/user-research/standards-and-guidance"]')
  }

  get toolsLink() {
    return $('a[href="/user-research/tools"]')
  }

  open() {
    return super.open('/user-research')
  }

  async clickStandardsLink() {
    await this.standardsLink.click()
  }

  async isSupportBoxDisplayed() {
    return this.supportBox.isDisplayed()
  }

  async isSectionNavDisplayed() {
    return this.sectionNav.isDisplayed()
  }
}

export default new UserResearchPage()
