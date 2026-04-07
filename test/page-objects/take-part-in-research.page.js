import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class TakePartInResearchPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get signUpLink() {
    return $('main a')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/take-part-in-research')
  }

  async getSignUpLinkHref() {
    return this.signUpLink.getAttribute('href')
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new TakePartInResearchPage()
