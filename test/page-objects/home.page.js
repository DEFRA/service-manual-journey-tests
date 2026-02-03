import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class HomePage extends Page {
  get heroTitle() {
    return $('[class*="hero"] h1')
  }

  get serviceManualTile() {
    return $('main a[href="/service-manual"]')
  }

  get deliveryGroupsTile() {
    return $('main a[href="/delivery-groups"]')
  }

  open() {
    return super.open('/')
  }
}

export default new HomePage()
