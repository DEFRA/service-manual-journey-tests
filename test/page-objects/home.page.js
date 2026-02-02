import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class HomePage extends Page {
  get heroTitle() {
    return $('[class*="hero"] h1')
  }

  get serviceManualTile() {
    return $('a[href="/service-manual"]')
  }

  get deliveryGroupsTile() {
    return $('a[href="/delivery-groups"]')
  }

  open() {
    return super.open('/')
  }
}

export default new HomePage()
