import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class TestForAccessibilityPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get defraGithubLink() {
    return $('a[href*="defra-design.github.io"]')
  }

  get detailsComponents() {
    return $$('main .govuk-details')
  }

  get firstDetailsSummary() {
    return $('main .govuk-details__summary')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/accessibility/test-for-accessibility')
  }

  async expandFirstDetails() {
    await this.firstDetailsSummary.click()
  }

  async getDefraGithubLinkHref() {
    return this.defraGithubLink.getAttribute('href')
  }
}

export default new TestForAccessibilityPage()
