import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class TestingAndAssurancePage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get recommendedApproachLink() {
    return $('a[href="/testing-and-assurance/recommended-approach"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/testing-and-assurance')
  }

  async clickRecommendedApproachLink() {
    await this.recommendedApproachLink.click()
  }

  async isSectionNavDisplayed() {
    return this.sectionNav.isDisplayed()
  }
}

export default new TestingAndAssurancePage()
