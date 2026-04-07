import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class MeetDeliveryStandardsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get breadcrumbs() {
    return $('.govuk-breadcrumbs')
  }

  get deliveryGroupsBreadcrumbLink() {
    return $('a[href="/delivery-groups"]')
  }

  get roadmapForChangeLink() {
    return $('a[href*="roadmap-for-change"]')
  }

  get defineOutcomesLink() {
    return $('a[href*="define-outcomes"]')
  }

  get successMeasuresLink() {
    return $('a[href*="success-measures"]')
  }

  get productsAndServicesLink() {
    return $('a[href*="products-and-services"]')
  }

  open() {
    return super.open('/delivery-groups/meet-delivery-standards')
  }

  async clickRoadmapForChangeLink() {
    await this.roadmapForChangeLink.click()
  }

  async clickDeliveryGroupsBreadcrumb() {
    await this.deliveryGroupsBreadcrumbLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new MeetDeliveryStandardsPage()
