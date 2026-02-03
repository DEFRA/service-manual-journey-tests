import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class ServiceManualPage extends Page {
  get heroTitle() {
    return $('[class*="hero"] h1')
  }

  // Target tiles in the main content area, not navigation links
  get serviceAssessmentsTile() {
    return $('main a[href="/service-assessments"]')
  }

  get sustainabilityTile() {
    return $('main a[href="/sustainability"]')
  }

  get accessibilityTile() {
    return $('main a[href="/accessibility"]')
  }

  get userResearchTile() {
    return $('main a[href="/user-research"]')
  }

  get contentTile() {
    return $('main a[href="/content"]')
  }

  get designTile() {
    return $('main a[href="/design"]')
  }

  get testingAndAssuranceTile() {
    return $('main a[href="/testing-and-assurance"]')
  }

  get businessAnalysisTile() {
    return $('main a[href="/business-analysis"]')
  }

  get productAndDeliveryTile() {
    return $('main a[href="/product-and-delivery"]')
  }

  get architectureTile() {
    return $('main a[href="/architecture-and-software-development"]')
  }

  open() {
    return super.open('/service-manual')
  }
}

export default new ServiceManualPage()
