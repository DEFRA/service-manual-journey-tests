import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class ServiceManualPage extends Page {
  get heroTitle() {
    return $('[class*="hero"] h1')
  }

  get heroParagraph() {
    return $('[class*="hero"] p')
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

  get securityTile() {
    return $('main a[href="/security"]')
  }

  get serviceAssessmentsTileBody() {
    return $('//a[contains(normalize-space(.),"Service assessments")]/ancestor::div[contains(@class,"defra-tile")]//p')
  }

  get accessibilityTileBody() {
    return $('//a[contains(normalize-space(.),"Accessibility")]/ancestor::div[contains(@class,"defra-tile")]//p')
  }

  // container used to group the primary hub links under the header
  get hubSection() {
    return $('main .hub-section')
  }

  get userResearchTile() {
    return $('main a[href="/user-research"]')
  }

  get userResearchTileBody() {
    return $('//a[contains(normalize-space(.),"User research")]/ancestor::div[contains(@class,"defra-tile")]//p')
  }

  get contentTile() {
    return $('main a[href="/content"]')
  }

  get contentTileBody() {
    return $('//a[contains(normalize-space(.),"Content") and contains(@href, "/content")]/ancestor::div[contains(@class,"defra-tile")]//p')
  }

  get designTile() {
    return $('main a[href="/design"]')
  }

  get designTileBody() {
    return $('//a[contains(normalize-space(.),"Design")]/ancestor::div[contains(@class,"defra-tile")]//p')
  }

  get testingAndAssuranceTile() {
    return $('main a[href="/testing-and-assurance"]')
  }

  get testingAndAssuranceTileBody() {
    return $('//a[contains(normalize-space(.),"Quality assurance") or contains(normalize-space(.),"testing")]/ancestor::div[contains(@class,"defra-tile")]//p')
  }

  get businessAnalysisTile() {
    return $('main a[href="/business-analysis"]')
  }

  get businessAnalysisTileBody() {
    return $('//a[contains(normalize-space(.),"Business analysis")]/ancestor::div[contains(@class,"defra-tile")]//p')
  }

  get productAndDeliveryTile() {
    return $('main a[href="/product-and-delivery"]')
  }

  get productAndDeliveryTileBody() {
    return $('//a[contains(normalize-space(.),"Product and delivery")]/ancestor::div[contains(@class,"defra-tile")]//p')
  }

  get architectureTile() {
    return $('main a[href="/architecture-and-software-development"]')
  }

  get architectureTileBody() {
    return $('//a[contains(normalize-space(.),"Architecture")]/ancestor::div[contains(@class,"defra-tile")]//p')
  }

  open() {
    return super.open('/service-manual')
  }
}

export default new ServiceManualPage()
