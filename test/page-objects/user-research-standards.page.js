import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class UserResearchStandardsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get mrsLink() {
    return $('a[href*="mrs.org.uk"]')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get userResearchSectionLink() {
    return $('a[href="/user-research"]')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  open() {
    return super.open('/user-research/standards-and-guidance')
  }

  async clickMrsLink() {
    await this.mrsLink.click()
  }

  async getExternalLinkHrefs() {
    const links = await this.externalLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }
}

export default new UserResearchStandardsPage()
