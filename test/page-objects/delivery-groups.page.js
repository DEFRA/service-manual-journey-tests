import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class DeliveryGroupsPage extends Page {
  get heroTitle() {
    return $('[class*="hero"] h1')
  }

  get followGovernanceTile() {
    return $('a[href="/delivery-groups/follow-delivery-governance"]')
  }

  get meetStandardsTile() {
    return $('a[href="/delivery-groups/meet-delivery-standards"]')
  }

  open() {
    return super.open('/delivery-groups')
  }
}

export default new DeliveryGroupsPage()
