import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class AssuranceServiceAssessmentsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get breadcrumbs() {
    return $('.govuk-breadcrumbs')
  }

  get assuranceBreadcrumbLink() {
    return $('a[href="/delivery-groups/follow-delivery-governance/assurance"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/delivery-groups/follow-delivery-governance/assurance/service-assessments')
  }

  async clickAssuranceBreadcrumb() {
    await this.assuranceBreadcrumbLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new AssuranceServiceAssessmentsPage()
