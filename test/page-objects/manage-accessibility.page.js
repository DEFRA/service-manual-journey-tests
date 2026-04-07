import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class ManageAccessibilityPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get detailsComponents() {
    return $$('main .govuk-details')
  }

  get firstDetailsSummary() {
    return $('main .govuk-details__summary')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/accessibility/manage-accessibility')
  }

  async expandFirstDetails() {
    await this.firstDetailsSummary.click()
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

  async isDetailsExpanded() {
    const details = await $('main .govuk-details')
    return (await details.getAttribute('open')) !== null
  }
}

export default new ManageAccessibilityPage()
