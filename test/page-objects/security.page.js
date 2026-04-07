import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class SecurityPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get commonTasksLink() {
    return $('a[href="/security/common-tasks"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/security')
  }

  async clickCommonTasksLink() {
    await this.commonTasksLink.click()
  }

  async isSectionNavDisplayed() {
    return this.sectionNav.isDisplayed()
  }
}

export default new SecurityPage()
