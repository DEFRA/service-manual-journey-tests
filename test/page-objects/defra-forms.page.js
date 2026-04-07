import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class DefraFormsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get breadcrumbs() {
    return $('.govuk-breadcrumbs')
  }

  get architectureBreadcrumbLink() {
    return $('a[href="/architecture-and-software-development"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/architecture-and-software-development/defra-forms')
  }

  async clickArchitectureBreadcrumb() {
    await this.architectureBreadcrumbLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new DefraFormsPage()
