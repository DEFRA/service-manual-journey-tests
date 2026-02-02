import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class ServiceManualPage extends Page {
  get heroTitle() {
    return $('[class*="hero"] h1')
  }

  get serviceAssessmentsTile() {
    return $('a[href="/service-assessments"]')
  }

  get sustainabilityTile() {
    return $('a[href="/sustainability"]')
  }

  get accessibilityTile() {
    return $('a[href="/accessibility"]')
  }

  get userResearchTile() {
    return $('a[href="/user-research"]')
  }

  get contentTile() {
    return $('a[href="/content"]')
  }

  get designTile() {
    return $('a[href="/design"]')
  }

  get testingAndAssuranceTile() {
    return $('a[href="/testing-and-assurance"]')
  }

  get businessAnalysisTile() {
    return $('a[href="/business-analysis"]')
  }

  get productAndDeliveryTile() {
    return $('a[href="/product-and-delivery"]')
  }

  get architectureTile() {
    return $('a[href="/architecture-and-software-development"]')
  }

  open() {
    return super.open('/service-manual')
  }
}

export default new ServiceManualPage()
