import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class ServiceAssessmentsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get detailsComponents() {
    return $$('main .govuk-details')
  }

  get firstDetailsSummary() {
    return $('main .govuk-details__summary')
  }

  get sectionNav() {
    return $('nav.defra-service-manual-nav')
  }

  open() {
    return super.open('/service-assessments')
  }

  async expandAllDetails() {
    const details = await this.detailsComponents
    for (const detail of details) {
      const isOpen = await detail.getAttribute('open')
      if (!isOpen) {
        const summary = await detail.$('.govuk-details__summary')
        await summary.click()
      }
    }
  }

  async expandFirstDetails() {
    await this.firstDetailsSummary.click()
  }

  async getDetailsCount() {
    return (await this.detailsComponents).length
  }
}

export default new ServiceAssessmentsPage()
