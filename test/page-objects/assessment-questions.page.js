import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class AssessmentQuestionsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get detailsComponents() {
    return $$('main .govuk-details')
  }

  get allDetailsSummaries() {
    return $$('main .govuk-details__summary')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/service-assessments/assessment-questions')
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

  async expandDetailsByIndex(index) {
    const summaries = await this.allDetailsSummaries
    await summaries[index].click()
  }

  async getDetailsCount() {
    return (await this.detailsComponents).length
  }
}

export default new AssessmentQuestionsPage()
