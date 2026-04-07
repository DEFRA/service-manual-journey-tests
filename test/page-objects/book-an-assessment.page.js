import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class BookAnAssessmentPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get bookingContactLink() {
    return $('main a[href^="mailto"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/service-assessments/book-an-assessment')
  }

  async getBookingContactHref() {
    return this.bookingContactLink.getAttribute('href')
  }

  async getPageContentText() {
    return this.pageContent.getText()
  }
}

export default new BookAnAssessmentPage()
