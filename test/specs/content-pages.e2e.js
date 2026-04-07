import { browser, expect } from '@wdio/globals'

import { Page } from '../page-objects/page'

const page = new Page()

const contentPages = [
  // Top-level content pages
  {
    path: '/accessibility',
    titlePattern: /5. Make sure everyone can use the service/i
  },
  { path: '/design', titlePattern: /Design/i },
  { path: '/user-research', titlePattern: /User research/i },
  { path: '/content', titlePattern: /Content/i },
  { path: '/sustainability', titlePattern: /15. Deliver a sustainable service/i },
  { path: '/service-assessments', titlePattern: /Service assessments/i },
  {
    path: '/testing-and-assurance',
    titlePattern: /Quality Assurance and Test/i
  },
  { path: '/business-analysis', titlePattern: /Business analysis/i },
  { path: '/product-and-delivery', titlePattern: /Product and delivery/i },
  {
    path: '/architecture-and-software-development',
    titlePattern: /Architecture/i
  },
  { path: '/security', titlePattern: /Create a secure service/i },

  // Service Assessments sub-pages
  {
    path: '/service-assessments/book-an-assessment',
    titlePattern: /Book an assessment/i
  },
  {
    path: '/service-assessments/become-an-assessor',
    titlePattern: /Become an assessor/i
  },
  {
    path: '/service-assessments/gov-uk-exemptions',
    titlePattern: /GOV.UK exemptions/i
  },
  {
    path: '/service-assessments/assessment-questions',
    titlePattern: /Assessment questions/i
  },

  // Architecture sub-pages
  {
    path: '/architecture-and-software-development/core-delivery-platform',
    titlePattern: /Core Delivery Platform/i
  },
  {
    path: '/architecture-and-software-development/defra-customer-identity',
    titlePattern: /Defra Customer Identity/i
  },
  {
    path: '/architecture-and-software-development/defra-accessible-maps',
    titlePattern: /Defra.*Map/i
  },
  {
    path: '/architecture-and-software-development/defra-forms',
    titlePattern: /Defra Forms/i
  },

  // Accessibility sub-pages
  {
    path: '/accessibility/manage-accessibility',
    titlePattern: /Manage accessibility/i
  },
  {
    path: '/accessibility/test-for-accessibility',
    titlePattern: /Test for accessibility/i
  },

  // Design sub-pages
  { path: '/design/branding', titlePattern: /Branding/i },
  { path: '/design/cookies', titlePattern: /Cookies/i },
  { path: '/design/data-visualisation', titlePattern: /Data visualisation/i },
  { path: '/design/prototyping', titlePattern: /Prototyping/i },
  { path: '/design/tools', titlePattern: /Tools/i },
  { path: '/design/components-and-patterns', titlePattern: /Components and patterns/i },

  // User Research sub-pages
  {
    path: '/user-research/scoping-research',
    titlePattern: /Research scoping and planning/i
  },
  {
    path: '/user-research/recruiting-participants',
    titlePattern: /Participant recruitment/i
  },
  {
    path: '/user-research/standards-and-guidance',
    titlePattern: /Standards and guidance/i
  },
  {
    path: '/user-research/tools',
    titlePattern: /Tools/i
  },

  // Content sub-pages
  {
    path: '/content/inclusive-clear-language',
    titlePattern: /Inclusive.*language/i
  },
  {
    path: '/content/designing-different-content-types',
    titlePattern: /Designing.*content types/i
  },
  {
    path: '/content/working-in-discovery',
    titlePattern: /Working in the discovery/i
  },
  {
    path: '/content/working-in-alpha',
    titlePattern: /Working in the alpha/i
  },
  {
    path: '/content/working-in-beta',
    titlePattern: /Working in the beta/i
  },
  {
    path: '/content/working-in-live',
    titlePattern: /Working in the live/i
  },
  {
    path: '/content/legal-content',
    titlePattern: /Legal content/i
  },
  {
    path: '/content/welsh-language-translation',
    titlePattern: /Welsh.*translation/i
  },
  {
    path: '/content/colour-contrast',
    titlePattern: /Colour contrast/i
  },
  {
    path: '/content/accessibility-tools',
    titlePattern: /Accessibility design and testing tools/i
  },
  {
    path: '/content/accessible-spreadsheets',
    titlePattern: /Accessible spreadsheets/i
  },
  {
    path: '/content/sharing-designs-recording-decisions',
    titlePattern: /Sharing designs/i
  },

  // Sustainability sub-pages
  { path: '/sustainability/objectives', titlePattern: /Objectives/i },
  {
    path: '/sustainability/process',
    titlePattern: /Assess risks and record sustainability actions/i
  },
  { path: '/sustainability/metrics', titlePattern: /Taking action and tracking sustainability performance through the Agile lifecycle/i },

  // Product & Delivery sub-pages
  { path: '/product-and-delivery/governance', titlePattern: /Governance/i },
  {
    path: '/product-and-delivery/tools-and-access',
    titlePattern: /Tools and access/i
  },

  // Business Analysis sub-pages
  {
    path: '/business-analysis/ways-of-working',
    titlePattern: /Ways of working/i
  },

  // Testing & Assurance sub-pages
  {
    path: '/testing-and-assurance/recommended-approach',
    titlePattern: /Recommended approach/i
  },

  // Security sub-pages
  {
    path: '/security/common-tasks',
    titlePattern: /Get access and travel securely/i
  },

  // Delivery Groups - Meet Standards
  {
    path: '/delivery-groups/meet-delivery-standards',
    titlePattern: /Delivery group standards/i
  },
  {
    path: '/delivery-groups/meet-delivery-standards/define-outcomes',
    titlePattern: /Define.*outcomes/i
  },
  {
    path: '/delivery-groups/meet-delivery-standards/products-and-services',
    titlePattern: /Products and services/i
  },
  {
    path: '/delivery-groups/meet-delivery-standards/roadmap-for-change',
    titlePattern: /Roadmap for change/i
  },
  {
    path: '/delivery-groups/meet-delivery-standards/success-measures',
    titlePattern: /Success measures/i
  },

  // Delivery Groups - Governance
  {
    path: '/delivery-groups/follow-delivery-governance',
    titlePattern: /Delivery group governance/i
  },
  {
    path: '/delivery-groups/follow-delivery-governance/governance-model',
    titlePattern: /Governance model/i
  },
  {
    path: '/delivery-groups/follow-delivery-governance/assurance',
    titlePattern: /Assurance/i
  },
  {
    path: '/delivery-groups/follow-delivery-governance/assurance/spend-control',
    titlePattern: /Spend control/i
  },
  {
    path: '/delivery-groups/follow-delivery-governance/assurance/service-assessments',
    titlePattern: /Service assessments/i
  },
  {
    path: '/delivery-groups/follow-delivery-governance/assurance/operational-service-readiness',
    titlePattern: /Operational service readiness/i
  },
  {
    path: '/delivery-groups/follow-delivery-governance/assurance/other-assurance-types',
    titlePattern: /Other assurance types/i
  },

  // Other pages
  { path: '/components', titlePattern: /Components/i },
  { path: '/patterns', titlePattern: /Patterns/i },
  { path: '/working-with-defra', titlePattern: /Working with Defra/i },
  { path: '/suggest-content', titlePattern: /Suggest content/i },
  {
    path: '/take-part-in-research',
    titlePattern: /Take part.*research/i
  },
  {
    path: '/accessibility-statement',
    titlePattern: /Accessibility statement/i
  }
]

describe('Content pages', () => {
  contentPages.forEach(({ path, titlePattern }) => {
    it(`Should load ${path} with correct title`, async () => {
      await page.open(path)
      await expect(browser).toHaveTitle(titlePattern)
    })

    it(`Should display a heading on ${path}`, async () => {
      await page.open(path)
      await expect(page.pageHeading).toBeDisplayed()
    })
  })
})
