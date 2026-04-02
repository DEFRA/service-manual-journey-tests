import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class DeliveryGroupsPage extends Page {
  get heroTitle() {
    return $('[class*="hero"] h1')
  }

  get heroParagraph() {
    return $('[class*="hero"] p')
  }

  get followGovernanceTile() {
  return $('a[href="/delivery-groups/follow-delivery-governance"]')
  }
  

  get meetStandardsTile() {
    return $('a[href="/delivery-groups/meet-delivery-standards"]')
  }

  get followGovernanceTileBody() {
    return $('//a[contains(normalize-space(.),"Follow delivery governance")]/ancestor::div[contains(@class,"defra-tile")]//p')
  }

  get meetStandardsTileBody() {
    return $('//a[contains(normalize-space(.),"Meet delivery standards")]/ancestor::div[contains(@class,"defra-tile")]//p')
  }

  open() {
    return super.open('/delivery-groups')
  }
}

export default new DeliveryGroupsPage()
