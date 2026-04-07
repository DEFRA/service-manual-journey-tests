import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class ArchitecturePage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get sectionNavItems() {
    return $$('nav.app-sub-navigation a')
  }

  get coreDeliveryPlatformLink() {
    return $('a[href="/architecture-and-software-development/core-delivery-platform"]')
  }

  get defraCustomerIdentityLink() {
    return $('a[href="/architecture-and-software-development/defra-customer-identity"]')
  }

  get defraFormsLink() {
    return $('a[href="/architecture-and-software-development/defra-forms"]')
  }

  get defraInteractiveMapLink() {
    return $('a[href="/architecture-and-software-development/defra-accessible-maps"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/architecture-and-software-development')
  }

  async clickCoreDeliveryPlatformLink() {
    await this.coreDeliveryPlatformLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }

  async getSectionNavItemTexts() {
    const items = await this.sectionNavItems
    const arr = Array.isArray(items) ? items : [items].filter(Boolean)
    return Promise.all(arr.map((i) => i.getText()))
  }
}

export default new ArchitecturePage()
