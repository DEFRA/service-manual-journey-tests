import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class ProductsAndServicesPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.defra-service-manual-nav')
  }

  get sectionNavLinks() {
    return $$('nav.defra-service-manual-nav a')
  }

  get ragTags() {
    return $$('main .govuk-tag')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/delivery-groups/meet-delivery-standards/products-and-services')
  }

  async getSectionNavLinkTexts() {
    const links = await this.sectionNavLinks
    return Promise.all(links.map((l) => l.getText()))
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new ProductsAndServicesPage()
