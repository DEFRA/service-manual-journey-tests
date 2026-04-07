import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class BecomeAnAssessorPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get contactLink() {
    return $('main a[href^="mailto"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/service-assessments/become-an-assessor')
  }

  async getContactLinkHref() {
    return this.contactLink.getAttribute('href')
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new BecomeAnAssessorPage()
