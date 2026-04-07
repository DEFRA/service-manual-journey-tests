import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class SustainabilityProcessPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get ragTable() {
    return $('main table')
  }

  get greenTags() {
    return $$('main .govuk-tag--green')
  }

  get amberTags() {
    return $$('main .govuk-tag--yellow')
  }

  get redTags() {
    return $$('main .govuk-tag--red')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/sustainability/process')
  }

  async getRagTableText() {
    return this.ragTable.getText()
  }

  async getPageContentText() {
    return this.pageContent.getText()
  }

  async isRagTableDisplayed() {
    return this.ragTable.isDisplayed()
  }
}

export default new SustainabilityProcessPage()
