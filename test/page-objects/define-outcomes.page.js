import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class DefineOutcomesPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get breadcrumbs() {
    return $('.govuk-breadcrumbs')
  }

  get meetStandardsBreadcrumbLink() {
    return $('a[href="/delivery-groups/meet-delivery-standards"]')
  }

  get ragTags() {
    return $$('main .govuk-tag')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/delivery-groups/meet-delivery-standards/define-outcomes')
  }

  async clickMeetStandardsBreadcrumb() {
    await this.meetStandardsBreadcrumbLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new DefineOutcomesPage()
