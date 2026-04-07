import { browser, expect } from '@wdio/globals'

import FollowDeliveryGovernancePage from '../page-objects/follow-delivery-governance.page'
import ErrorPage from '../page-objects/error-page.page'

describe('Verify Follow Delivery Governance', () => {
  // P1-96
  it('Given I am on the Follow Delivery Governance page at /delivery-groups/follow-delivery-governance, When the page loads, Then I should see the main heading and links to "Governance model" and "Assurance" subpages', async () => {
    await FollowDeliveryGovernancePage.open()
    await expect(FollowDeliveryGovernancePage.mainHeading).toBeDisplayed()
    await expect(FollowDeliveryGovernancePage.governanceModelLink).toBeDisplayed()
    await expect(FollowDeliveryGovernancePage.assuranceLink).toBeDisplayed()
  })

  // P1-97
  it('Given I am on the Follow Delivery Governance page, When I click the "Governance model" link, Then I should be navigated to the Governance model subpage at /delivery-groups/follow-delivery-governance/governance-model', async () => {
    await FollowDeliveryGovernancePage.open()
    await FollowDeliveryGovernancePage.governanceModelLink.waitForClickable()
    await FollowDeliveryGovernancePage.clickGovernanceModelLink()
    await expect(browser).toHaveUrl(/governance-model/)
  })

  // P1-98
  it('Given I navigate to a page that does not exist, When the server returns a 404, Then I should see a styled "Page not found" error page with GOV.UK template styling', async () => {
    await ErrorPage.openNotFound()
    await expect(ErrorPage.mainHeading).toHaveText(/Page not found/i)
    await expect(ErrorPage.govukTemplateBody).toBeExisting()
  })
})
