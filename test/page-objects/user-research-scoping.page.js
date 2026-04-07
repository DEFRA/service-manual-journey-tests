import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class UserResearchScopingPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get recruitingParticipantsLink() {
    return $('a[href="/user-research/recruiting-participants"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/user-research/scoping-research')
  }

  async clickRecruitingParticipantsLink() {
    await this.recruitingParticipantsLink.click()
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new UserResearchScopingPage()
