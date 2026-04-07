import { $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class AccessibilityToolsPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get toolLinks() {
    return $$('main a[href^="http"]')
  }

  get pageContent() {
    return $('main')
  }

  open() {
    return super.open('/content/accessibility-tools')
  }

  async getToolLinkHrefs() {
    let links = await this.toolLinks
    // Coerce to array if the page object returned a single element
    if (!links) return []
    if (!Array.isArray(links)) links = [links]

    const hrefs = []
    for (const l of links) {
      try {
        // if the element is stale/invalid, getAttribute may throw
        // collect hrefs defensively
        const h = await l.getAttribute('href')
        hrefs.push(h)
      } catch (err) {
        // ignore problematic link but continue
        // eslint-disable-next-line no-console
        console.warn('failed to read link href', err)
      }
    }
    return hrefs
  }

  async getHeadingText() {
    return this.mainHeading.getText()
  }
}

export default new AccessibilityToolsPage()
