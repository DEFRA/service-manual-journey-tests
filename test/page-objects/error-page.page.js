import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class ErrorPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get govukBody() {
    return $('.govuk-body')
  }

  get govukTemplateBody() {
    return $('.govuk-template__body')
  }

  async openNotFound() {
    return super.open('/this-page-does-not-exist-404')
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }

  async isGovukLayoutPresent() {
    return this.govukTemplateBody.isExisting()
  }
}

export default new ErrorPage()
