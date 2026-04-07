import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class AccessibilityStatementPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get contactEmailLink() {
    return $('a[href*="cctsassurance@defra.gov.uk"]')
  }

  get enforcementSection() {
    return $('main h2')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/accessibility-statement')
  }

  async getContactEmailHref() {
    return this.contactEmailLink.getAttribute('href')
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new AccessibilityStatementPage()
