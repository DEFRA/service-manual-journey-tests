import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class OtherAssuranceTypesPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/delivery-groups/follow-delivery-governance/assurance/other-assurance-types')
  }

  async getExternalLinkHrefs() {
    const links = await this.externalLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new OtherAssuranceTypesPage()
