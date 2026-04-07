import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class WorkingInLivePage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get legalContentLink() {
    return $('a[href="/content/legal-content"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/content/working-in-live')
  }

  async clickLegalContentLink() {
    await this.legalContentLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new WorkingInLivePage()
