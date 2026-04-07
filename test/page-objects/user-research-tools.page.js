import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class UserResearchToolsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get muralLink() {
    return $('a[href*="mural"]')
  }

  get qualtricsLink() {
    return $('a[href*="qualtrics"]')
  }

  get optimalWorkshopLink() {
    return $('a[href*="optimalworkshop"]')
  }

  get sharepointLinks() {
    return $$('main a[href*="sharepoint"]')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  open() {
    return super.open('/user-research/tools')
  }

  async getSharepointLinkHrefs() {
    const links = await this.sharepointLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new UserResearchToolsPage()
