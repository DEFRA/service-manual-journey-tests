import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class SecurityCommonTasksPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  get ncscLink() {
    return $('a[href*="ncsc.gov.uk"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/security/common-tasks')
  }

  async getExternalLinkHrefs() {
    const links = await this.externalLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new SecurityCommonTasksPage()
