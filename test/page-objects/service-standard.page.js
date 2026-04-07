import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class ServiceStandardPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get standardPoints() {
    return $$('main .govuk-body')
  }

  get point9Link() {
    return $('a[href*="9-create-a-secure-service"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/service-standard')
  }

  async clickPoint9Link() {
    await this.point9Link.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new ServiceStandardPage()
