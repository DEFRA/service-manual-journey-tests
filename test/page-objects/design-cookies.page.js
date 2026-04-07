import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class DesignCookiesPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get govukCookiePatternLink() {
    return $('a[href*="design-system.service.gov.uk"][href*="cookie"]')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/design/cookies')
  }

  async clickGovukCookiePatternLink() {
    await this.govukCookiePatternLink.click()
  }

  async getExternalLinkHrefs() {
    const links = await this.externalLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }
}

export default new DesignCookiesPage()
