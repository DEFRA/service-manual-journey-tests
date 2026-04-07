import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class WorkingInBetaPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get workingInLiveLink() {
    return $('a[href="/content/working-in-live"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/content/working-in-beta')
  }

  async clickWorkingInLiveLink() {
    await this.workingInLiveLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new WorkingInBetaPage()
