import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class SharingDesignsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.defra-service-manual-nav')
  }

  get sectionNavLinks() {
    return $$('nav.defra-service-manual-nav a')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/content/sharing-designs-recording-decisions')
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }

  async getSectionNavLinkTexts() {
    const links = await this.sectionNavLinks
    return Promise.all(links.map((l) => l.getText()))
  }
}

export default new SharingDesignsPage()
