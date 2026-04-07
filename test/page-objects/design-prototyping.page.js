import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class DesignPrototypingPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get prototypeKitLink() {
    return $('a[href*="prototype-kit"]')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/design/prototyping')
  }

  async clickPrototypeKitLink() {
    await this.prototypeKitLink.click()
  }

  async getExternalLinkHrefs() {
    const links = await this.externalLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }
}

export default new DesignPrototypingPage()
