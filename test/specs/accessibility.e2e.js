import {
  initialiseAccessibilityChecking,
  analyseAccessibility,
  generateAccessibilityReports,
  generateAccessibilityReportIndex
} from '../accessibility-checking.js'

/**
 * Helper function to wait for page to be fully loaded
 */
async function waitForPageLoad() {
  await browser.waitUntil(
    async () => {
      const readyState = await browser.execute(() => document.readyState)
      return readyState === 'complete'
    },
    {
      timeout: 10000,
      timeoutMsg: 'Page did not load completely'
    }
  )
}

describe('Accessibility Testing', () => {
  before(async () => {
    await initialiseAccessibilityChecking()
  })

  it('should test home page accessibility', async () => {
    await browser.url('/')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test service manual hub page accessibility', async () => {
    await browser.url('/service-manual')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test delivery groups page accessibility', async () => {
    await browser.url('/delivery-groups')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test search page accessibility', async () => {
    await browser.url('/search')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test search results page accessibility', async () => {
    await browser.url('/search?q=accessibility')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test accessibility content page accessibility', async () => {
    await browser.url('/accessibility')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test design content page accessibility', async () => {
    await browser.url('/design')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test user research content page accessibility', async () => {
    await browser.url('/user-research')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test content content page accessibility', async () => {
    await browser.url('/content')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test sustainability content page accessibility', async () => {
    await browser.url('/sustainability')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test service assessments content page accessibility', async () => {
    await browser.url('/service-assessments')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test testing and assurance content page accessibility', async () => {
    await browser.url('/testing-and-assurance')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test business analysis content page accessibility', async () => {
    await browser.url('/business-analysis')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test product and delivery content page accessibility', async () => {
    await browser.url('/product-and-delivery')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test architecture and software development content page accessibility', async () => {
    await browser.url('/architecture-and-software-development')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // Service Assessments sub-pages
  it('should test book an assessment page accessibility', async () => {
    await browser.url('/service-assessments/book-an-assessment')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test become an assessor page accessibility', async () => {
    await browser.url('/service-assessments/become-an-assessor')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test GOV.UK exemptions page accessibility', async () => {
    await browser.url('/service-assessments/gov-uk-exemptions')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // Architecture sub-pages
  it('should test Core Delivery Platform page accessibility', async () => {
    await browser.url(
      '/architecture-and-software-development/core-delivery-platform'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test Defra Customer Identity page accessibility', async () => {
    await browser.url(
      '/architecture-and-software-development/defra-customer-identity'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test Defra Accessible Maps page accessibility', async () => {
    await browser.url(
      '/architecture-and-software-development/defra-accessible-maps'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test Defra Forms page accessibility', async () => {
    await browser.url('/architecture-and-software-development/defra-forms')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test Defra Integration page accessibility', async () => {
    await browser.url(
      '/architecture-and-software-development/defra-integration'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // Accessibility sub-pages
  it('should test manage accessibility page accessibility', async () => {
    await browser.url('/accessibility/manage-accessibility')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test test for accessibility page accessibility', async () => {
    await browser.url('/accessibility/test-for-accessibility')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // Design sub-pages
  it('should test branding page accessibility', async () => {
    await browser.url('/design/branding')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test cookies page accessibility', async () => {
    await browser.url('/design/cookies')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test data visualisation page accessibility', async () => {
    await browser.url('/design/data-visualisation')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // User Research sub-pages
  it('should test scoping research page accessibility', async () => {
    await browser.url('/user-research/scoping-research')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test planning research page accessibility', async () => {
    await browser.url('/user-research/planning-research')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test recruiting participants page accessibility', async () => {
    await browser.url('/user-research/recruiting-participants')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test participant recruitment methods page accessibility', async () => {
    await browser.url('/user-research/participant-recruitment-methods')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test gathering consent page accessibility', async () => {
    await browser.url('/user-research/gathering-consent')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test preparing for data collection page accessibility', async () => {
    await browser.url('/user-research/preparing-for-data-collection')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // Sustainability sub-pages
  it('should test sustainability objectives page accessibility', async () => {
    await browser.url('/sustainability/objectives')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test sustainability process page accessibility', async () => {
    await browser.url('/sustainability/process')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test sustainability metrics page accessibility', async () => {
    await browser.url('/sustainability/metrics')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // Product & Delivery sub-pages
  it('should test product and delivery governance page accessibility', async () => {
    await browser.url('/product-and-delivery/governance')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test tools and access page accessibility', async () => {
    await browser.url('/product-and-delivery/tools-and-access')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // Business Analysis sub-pages
  it('should test ways of working page accessibility', async () => {
    await browser.url('/business-analysis/ways-of-working')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // Testing & Assurance sub-pages
  it('should test recommended approach page accessibility', async () => {
    await browser.url('/testing-and-assurance/recommended-approach')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // Delivery Groups - Meet Standards
  it('should test meet delivery standards page accessibility', async () => {
    await browser.url('/delivery-groups/meet-delivery-standards')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test define outcomes page accessibility', async () => {
    await browser.url(
      '/delivery-groups/meet-delivery-standards/define-outcomes'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test products and services page accessibility', async () => {
    await browser.url(
      '/delivery-groups/meet-delivery-standards/products-and-services'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test roadmap for change page accessibility', async () => {
    await browser.url(
      '/delivery-groups/meet-delivery-standards/roadmap-for-change'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test success measures page accessibility', async () => {
    await browser.url(
      '/delivery-groups/meet-delivery-standards/success-measures'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // Delivery Groups - Governance
  it('should test follow delivery governance page accessibility', async () => {
    await browser.url('/delivery-groups/follow-delivery-governance')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test governance model page accessibility', async () => {
    await browser.url(
      '/delivery-groups/follow-delivery-governance/governance-model'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test assurance page accessibility', async () => {
    await browser.url('/delivery-groups/follow-delivery-governance/assurance')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test spend control page accessibility', async () => {
    await browser.url(
      '/delivery-groups/follow-delivery-governance/assurance/spend-control'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test governance service assessments page accessibility', async () => {
    await browser.url(
      '/delivery-groups/follow-delivery-governance/assurance/service-assessments'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test operational service readiness page accessibility', async () => {
    await browser.url(
      '/delivery-groups/follow-delivery-governance/assurance/operational-service-readiness'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test other assurance types page accessibility', async () => {
    await browser.url(
      '/delivery-groups/follow-delivery-governance/assurance/other-assurance-types'
    )
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  // Other pages
  it('should test service standard page accessibility', async () => {
    await browser.url('/service-standard')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test components page accessibility', async () => {
    await browser.url('/components')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test patterns page accessibility', async () => {
    await browser.url('/patterns')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test working with Defra page accessibility', async () => {
    await browser.url('/working-with-defra')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test suggest content page accessibility', async () => {
    await browser.url('/suggest-content')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  it('should test take part in research page accessibility', async () => {
    await browser.url('/take-part-in-research')
    await waitForPageLoad()
    await analyseAccessibility('')
  })

  after(async () => {
    generateAccessibilityReports('accessibility-tests')
    generateAccessibilityReportIndex()
  })
})
