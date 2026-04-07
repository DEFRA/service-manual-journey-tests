import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class DesignComponentsPatternsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get govukDesignSystemLink() {
    return $('a[href*="design-system.service.gov.uk"]')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/design/components-and-patterns')
  }

  async clickGovukDesignSystemLink() {
    await this.govukDesignSystemLink.click()
  }

  async getExternalLinkHrefs() {
    const links = await this.externalLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }
}

export default new DesignComponentsPatternsPage()
