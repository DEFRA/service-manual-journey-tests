import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class ProductDeliveryToolsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sharepointLinks() {
    return $$('main a[href*="sharepoint"]')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/product-and-delivery/tools-and-access')
  }

  async getSharepointLinkHrefs() {
    const links = await this.sharepointLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new ProductDeliveryToolsPage()
