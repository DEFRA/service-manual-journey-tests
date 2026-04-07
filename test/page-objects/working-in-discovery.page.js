import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class WorkingInDiscoveryPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get breadcrumbs() {
    return $('.govuk-breadcrumbs')
  }

  get contentBreadcrumbLink() {
    return $('a[href="/content"]')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/content/working-in-discovery')
  }

  async clickContentBreadcrumb() {
    await this.contentBreadcrumbLink.click()
  }

  async getExternalLinkHrefs() {
    const links = await this.externalLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }
}

export default new WorkingInDiscoveryPage()
