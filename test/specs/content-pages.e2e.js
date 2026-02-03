import { browser, expect } from '@wdio/globals'

import { Page } from 'page-objects/page'

const page = new Page()

const contentPages = [
  // Top-level content pages
  {
    path: '/accessibility',
    titlePattern: /Make sure everyone can use the service/
  },
  { path: '/design', titlePattern: /Design/ },
  { path: '/user-research', titlePattern: /User research/ },
  { path: '/content', titlePattern: /Content/ },
  { path: '/sustainability', titlePattern: /Deliver a sustainable service/ },
  { path: '/service-assessments', titlePattern: /Service assessments/ },
  {
    path: '/testing-and-assurance',
    titlePattern: /Quality Assurance and Test/
  },
  { path: '/business-analysis', titlePattern: /Business analysis/ },
  { path: '/product-and-delivery', titlePattern: /Product and delivery/ },
  {
    path: '/architecture-and-software-development',
    titlePattern: /Architecture/
  },

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
    titlePattern: /Defra Interactive Map/i
  },
  {
    path: '/architecture-and-software-development/defra-forms',
    titlePattern: /Defra Forms/i
  },
  {
    path: '/architecture-and-software-development/defra-integration',
    titlePattern: /Defra Integration/i
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

  // User Research sub-pages
  {
    path: '/user-research/scoping-research',
    titlePattern: /Scoping research/i
  },
  {
    path: '/user-research/planning-research',
    titlePattern: /Planning research/i
  },
  {
    path: '/user-research/recruiting-participants',
    titlePattern: /Recruiting participants/i
  },
  {
    path: '/user-research/participant-recruitment-methods',
    titlePattern: /Participant recruitment methods/i
  },
  {
    path: '/user-research/gathering-consent',
    titlePattern: /Gathering consent/i
  },
  {
    path: '/user-research/preparing-for-data-collection',
    titlePattern: /Preparing for data collection/i
  },

  // Sustainability sub-pages
  { path: '/sustainability/objectives', titlePattern: /Objectives/i },
  {
    path: '/sustainability/process',
    titlePattern: /Assess risk and write statements/i
  },
  { path: '/sustainability/metrics', titlePattern: /Measure sustainability/i },

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

  // Delivery Groups - Meet Standards
  {
    path: '/delivery-groups/meet-delivery-standards',
    titlePattern: /Delivery group standards/i
  },
  {
    path: '/delivery-groups/meet-delivery-standards/define-outcomes',
    titlePattern: /Define and share outcomes/i
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
  { path: '/service-standard', titlePattern: /Service standard/i },
  { path: '/components', titlePattern: /Components/i },
  { path: '/patterns', titlePattern: /Patterns/i },
  { path: '/working-with-defra', titlePattern: /Working with Defra/i },
  { path: '/suggest-content', titlePattern: /Suggest content/i },
  {
    path: '/take-part-in-research',
    titlePattern: /Take part in user research/i
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
