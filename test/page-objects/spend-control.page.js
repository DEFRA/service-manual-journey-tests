import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class SpendControlPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get sectionNavLinks() {
    return $$('nav.app-sub-navigation a')
  }

  get breadcrumbs() {
    return $('.govuk-breadcrumbs')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/delivery-groups/follow-delivery-governance/assurance/spend-control')
  }

  async getSectionNavLinkTexts() {
    const links = await this.sectionNavLinks
    return Promise.all(links.map((l) => l.getText()))
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new SpendControlPage()
