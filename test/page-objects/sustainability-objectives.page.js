import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class SustainabilityObjectivesPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get metricsLink() {
    return $('a[href="/sustainability/metrics"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/sustainability/objectives')
  }

  async clickMetricsLink() {
    await this.metricsLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new SustainabilityObjectivesPage()
