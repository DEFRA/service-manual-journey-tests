import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class AssurancePage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get spendControlLink() {
    return $('a[href*="spend-control"]')
  }

  get serviceAssessmentsLink() {
    return $('a[href*="service-assessments"]')
  }

  get operationalReadinessLink() {
    return $('a[href*="operational-service-readiness"]')
  }

  get otherAssuranceLink() {
    return $('a[href*="other-assurance-types"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/delivery-groups/follow-delivery-governance/assurance')
  }

  async clickSpendControlLink() {
    await this.spendControlLink.click()
  }

  async clickServiceAssessmentsLink() {
    await this.serviceAssessmentsLink.click()
  }

  async getPageContentText() {
    return this.pageContent.getText()
  }
}

export default new AssurancePage()
