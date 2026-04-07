import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class GovernanceModelPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.defra-service-manual-nav')
  }

  get assuranceLink() {
    return $('a[href*="assurance"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/delivery-groups/follow-delivery-governance/governance-model')
  }

  async clickAssuranceLink() {
    await this.assuranceLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new GovernanceModelPage()
