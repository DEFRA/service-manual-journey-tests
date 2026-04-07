import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class WorkingWithDefraPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get breadcrumbs() {
    return $('.govuk-breadcrumbs')
  }

  get serviceManualBreadcrumbLink() {
    return $('a[href="/service-manual"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/working-with-defra')
  }

  async clickServiceManualBreadcrumb() {
    await this.serviceManualBreadcrumbLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new WorkingWithDefraPage()
