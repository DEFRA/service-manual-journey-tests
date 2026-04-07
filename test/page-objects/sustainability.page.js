import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class SustainabilityPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get processLink() {
    return $('a[href="/sustainability/process"]')
  }

  get objectivesLink() {
    return $('a[href="/sustainability/objectives"]')
  }

  get metricsLink() {
    return $('a[href="/sustainability/metrics"]')
  }

  open() {
    return super.open('/sustainability')
  }

  async clickProcessLink() {
    await this.processLink.click()
  }

  async isSectionNavDisplayed() {
    return this.sectionNav.isDisplayed()
  }
}

export default new SustainabilityPage()
