import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class ProductAndDeliveryPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get governanceLink() {
    return $('a[href="/product-and-delivery/governance"]')
  }

  get toolsAndAccessLink() {
    return $('a[href="/product-and-delivery/tools-and-access"]')
  }

  open() {
    return super.open('/product-and-delivery')
  }

  async clickGovernanceLink() {
    await this.governanceLink.click()
  }

  async clickToolsAndAccessLink() {
    await this.toolsAndAccessLink.click()
  }

  async isSectionNavDisplayed() {
    return this.sectionNav.isDisplayed()
  }
}

export default new ProductAndDeliveryPage()
