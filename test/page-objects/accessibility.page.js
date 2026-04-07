import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class AccessibilityPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
  return $('nav.app-sub-navigation')
  }

  get sectionNavItems() {
  return $$('nav.app-sub-navigation a')
  }

  get manageAccessibilityLink() {
  return $('a[href="/accessibility/manage-accessibility"]')
  }

  get testForAccessibilityLink() {
  return $('a[href="/accessibility/test-for-accessibility"]')
  }

  open() {
    return super.open('/accessibility')
  }

  async clickManageAccessibilityLink() {
    await this.manageAccessibilityLink.click()
  }

  async clickTestForAccessibilityLink() {
    await this.testForAccessibilityLink.click()
  }

  async isSectionNavDisplayed() {
    return this.sectionNav.isDisplayed()
  }
}

export default new AccessibilityPage()
