import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class WorkingInAlphaPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get detailsComponents() {
    return $$('main .govuk-details')
  }

  get firstDetailsSummary() {
    return $('main .govuk-details__summary')
  }

  get servicesBlogLink() {
    return $('a[href*="services.blog.gov.uk"]')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  open() {
    return super.open('/content/working-in-alpha')
  }

  async expandFirstDetails() {
    await this.firstDetailsSummary.click()
  }

  async getServicesBlogLinkHref() {
    return this.servicesBlogLink.getAttribute('href')
  }

  async getExternalLinkHrefs() {
    const links = await this.externalLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }
}

export default new WorkingInAlphaPage()
