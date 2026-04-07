import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class ComponentsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get componentLinks() {
    return $$('main .govuk-link')
  }

  get firstComponentLink() {
    return $('main .govuk-link')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/components')
  }

  async clickFirstComponentLink() {
    await this.firstComponentLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new ComponentsPage()
