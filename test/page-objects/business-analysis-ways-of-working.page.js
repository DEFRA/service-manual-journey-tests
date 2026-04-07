import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class BusinessAnalysisWaysOfWorkingPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get breadcrumbs() {
    return $('.govuk-breadcrumbs')
  }

  get businessAnalysisBreadcrumbLink() {
    return $('a[href="/business-analysis"]')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/business-analysis/ways-of-working')
  }

  async clickBusinessAnalysisBreadcrumb() {
    await this.businessAnalysisBreadcrumbLink.click()
  }

  async getExternalLinkHrefs() {
    const links = await this.externalLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }
}

export default new BusinessAnalysisWaysOfWorkingPage()
