import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class FollowDeliveryGovernancePage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.defra-service-manual-nav')
  }

  get governanceModelLink() {
    return $('a[href*="governance-model"]')
  }

  get assuranceLink() {
    return $('a[href*="/assurance"]')
  }

  open() {
    return super.open('/delivery-groups/follow-delivery-governance')
  }

  async clickGovernanceModelLink() {
    await this.governanceModelLink.click()
  }

  async clickAssuranceLink() {
    await this.assuranceLink.click()
  }

  async isSectionNavDisplayed() {
    return this.sectionNav.isDisplayed()
  }
}

export default new FollowDeliveryGovernancePage()
