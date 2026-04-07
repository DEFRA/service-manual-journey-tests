import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class WelshLanguageTranslationPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get welshGovLink() {
    return $('a[href*="gov.wales"]')
  }

  get externalLinks() {
    return $$('main a[href^="http"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/content/welsh-language-translation')
  }

  async clickWelshGovLink() {
    await this.welshGovLink.click()
  }

  async getExternalLinkHrefs() {
    const links = await this.externalLinks
    return Promise.all(links.map((l) => l.getAttribute('href')))
  }
}

export default new WelshLanguageTranslationPage()
