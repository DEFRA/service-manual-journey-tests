import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class DesigningContentTypesPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get sectionNav() {
    return $('nav.app-sub-navigation')
  }

  get colourContrastLink() {
    return $('a[href*="colour-contrast"]')
  }

  get contentHeadings() {
    return $$('main h2')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/content/designing-different-content-types')
  }

  async clickColourContrastLink() {
    await this.colourContrastLink.click()
  }

  async getSectionHeadings() {
    let headings = await this.contentHeadings
    if (!headings) return []
    if (!Array.isArray(headings)) headings = [headings]
    const texts = []
    for (const h of headings) {
      try {
        const t = await h.getText()
        texts.push(t)
      } catch (err) {
        // Ignore stale/invalid headings
        // eslint-disable-next-line no-console
        console.warn('Could not read heading text:', err)
      }
    }
    return texts
  }
}

export default new DesigningContentTypesPage()
