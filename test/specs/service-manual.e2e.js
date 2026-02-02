import { browser, expect } from '@wdio/globals'

import ServiceManualPage from 'page-objects/service-manual.page'

describe('Service manual hub page', () => {
  before(async () => {
    await ServiceManualPage.open()
  })

  it('Should have the correct page title', async () => {
    await expect(browser).toHaveTitle(/Digital service manual/)
  })

  it('Should display the hero heading', async () => {
    await expect(ServiceManualPage.heroTitle).toBeDisplayed()
    await expect(ServiceManualPage.heroTitle).toHaveText(
      /Design and build digital services for Defra/
    )
  })

  describe('"How to do things in Defra" section', () => {
    it('Should have a service assessments tile', async () => {
      await expect(ServiceManualPage.serviceAssessmentsTile).toBeDisplayed()
    })

    it('Should have a sustainability tile', async () => {
      await expect(ServiceManualPage.sustainabilityTile).toBeDisplayed()
    })

    it('Should have an accessibility tile', async () => {
      await expect(ServiceManualPage.accessibilityTile).toBeDisplayed()
    })
  })

  describe('"Your role at Defra" section', () => {
    it('Should have a user research tile', async () => {
      await expect(ServiceManualPage.userResearchTile).toBeDisplayed()
    })

    it('Should have a content tile', async () => {
      await expect(ServiceManualPage.contentTile).toBeDisplayed()
    })

    it('Should have a design tile', async () => {
      await expect(ServiceManualPage.designTile).toBeDisplayed()
    })

    it('Should have a testing and assurance tile', async () => {
      await expect(ServiceManualPage.testingAndAssuranceTile).toBeDisplayed()
    })

    it('Should have a business analysis tile', async () => {
      await expect(ServiceManualPage.businessAnalysisTile).toBeDisplayed()
    })

    it('Should have a product and delivery tile', async () => {
      await expect(ServiceManualPage.productAndDeliveryTile).toBeDisplayed()
    })

    it('Should have an architecture and software development tile', async () => {
      await expect(ServiceManualPage.architectureTile).toBeDisplayed()
    })
  })

  describe('Navigation from tiles', () => {
    it('Should navigate to accessibility page', async () => {
      await ServiceManualPage.open()
      await ServiceManualPage.accessibilityTile.click()
      await expect(browser).toHaveUrl(/\/accessibility/)
    })

    it('Should navigate to design page', async () => {
      await ServiceManualPage.open()
      await ServiceManualPage.designTile.click()
      await expect(browser).toHaveUrl(/\/design/)
    })
  })
})
