import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class RoadmapForChangePage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/delivery-groups/meet-delivery-standards/roadmap-for-change')
  }

  async getPageContentText() {
    return this.pageContent.getText()
  }

  // Use browser.execute for tag counts to avoid ChainablePromiseArray iteration issues
  async getRagTagsCount() {
    const { browser } = await import('@wdio/globals')
    return browser.execute(() => document.querySelectorAll('main .govuk-tag').length)
  }

  async getAmberTagsCount() {
    const { browser } = await import('@wdio/globals')
    return browser.execute(() => document.querySelectorAll('main .govuk-tag--yellow').length)
  }
}

export default new RoadmapForChangePage()
