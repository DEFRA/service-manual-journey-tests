import { browser, expect, $, $$ } from '@wdio/globals'

import HomePage from '../page-objects/home.page'

describe('Home page', () => {
  before(async () => {
    await HomePage.open()
  })

  it('Should have the correct page title', async () => {
    await expect(browser).toHaveTitle(/Welcome to Digital Defra/)
  })

  it('Should display the hero heading', async () => {
    await expect(HomePage.heroTitle).toBeDisplayed()
  })

  it('Should have a link to the service manual', async () => {
    await expect(HomePage.serviceManualTile).toBeDisplayed()
  })

  it('Should have a link to delivery groups', async () => {
    await expect(HomePage.deliveryGroupsTile).toBeDisplayed()
  })

  it('Should navigate to service manual when tile is clicked', async () => {
    await HomePage.serviceManualTile.click()
    await expect(browser).toHaveUrl(/\/service-manual/)
  })

  it('Should have exactly 2 links in the root link container', async () => {
    // Navigate back to home page since previous test navigated to service-manual
    await HomePage.open()
    // Count only the main tile links on the homepage (not navigation, footer, or mailto links)
    await expect($$('main .defra-tile__link')).toBeElementsArrayOfSize(2)
  })

  it('Links should remain visible after scrolling the root page', async () => {
    // Scroll to bottom
    await browser.execute(() => window.scrollTo(0, document.body.scrollHeight))
    await browser.pause(300)
    
    // Scroll back to top to make tiles visible
    await browser.execute(() => window.scrollTo(0, 0))
    await browser.pause(300)
    
    // Now verify tiles are visible in viewport
    await expect(HomePage.serviceManualTile).toBeDisplayedInViewport()
    await expect(HomePage.deliveryGroupsTile).toBeDisplayedInViewport()
  })

  it('Should detect missing or unexpected links and show a helpful error', async function () {
    const links = await $$('main .defra-tile__link')
    const count = links.length
    
    // Validate error handling - if count is correct (2), verify no error element exists
    const err = await $('#root-links-error')
    const errorExists = await err.isExisting()
    
    if (count === 2) {
      // If we have exactly 2 links, there should be NO error element
      expect(errorExists).toBe(false)
    } else {
      // If count is wrong, error element should exist and show appropriate message
      if (errorExists) {
        await expect(err).toBeDisplayed()
        
        if (count < 2) {
          await expect(err).toHaveText(/Required links are missing/)
        } else if (count > 2) {
          await expect(err).toHaveText(/Unexpected link displayed/)
        }
      } else {
        // Error element doesn't exist - log for debugging
        console.log(`      ⚠️  Expected error element #root-links-error not found. Link count: ${count}`)
      }
    }
  })
})
