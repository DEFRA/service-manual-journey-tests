import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class CoreDeliveryPlatformPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get cdpPortalLink() {
    return $('a[href*="portal.cdp-int.defra.cloud"]')
  }

  get breadcrumbs() {
    return $('.govuk-breadcrumbs')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/architecture-and-software-development/core-delivery-platform')
  }

  async getCdpPortalLinkHref() {
    return this.cdpPortalLink.getAttribute('href')
  }

  async getPageContentText() {
    return this.pageContent.getText()
  }
}

export default new CoreDeliveryPlatformPage()
