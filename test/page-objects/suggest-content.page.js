import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class SuggestContentPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get submissionLink() {
    return $('main a')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/suggest-content')
  }

  async getSubmissionLinkHref() {
    return this.submissionLink.getAttribute('href')
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new SuggestContentPage()
