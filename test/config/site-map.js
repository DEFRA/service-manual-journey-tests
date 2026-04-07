/**
 * Site Map Configuration
 *
 * Complete site map for the service-manual-ui application.
 * Used by the comprehensive broken link test suite.
 */

const baseUrl =
  process.env.BASE_URL ||
  `https://service-manual-ui.${process.env.ENVIRONMENT || 'dev'}.cdp-int.defra.cloud`

/**
 * Site-wide configuration
 */
export const siteConfig = {
  baseUrl,
  requestDelay: 300,
  excludePatterns: [
    /\.pdf$/i,
    /\.docx?$/i,
    /\.xlsx?$/i,
    /\.pptx?$/i,
    /\.zip$/i,
    /\.csv$/i,
    /^mailto:/i,
    /^tel:/i,
    /^javascript:/i,
    /^#/
  ],
  excludeDomains: [
    /github\.com/i,
    /login\.microsoftonline\.com/i,
    /dev\.azure\.com/i,
    /portal\.azure\.com/i,
    /confluence\.defra\.cloud/i,
    /jira\.defra\.cloud/i
  ]
}

/**
 * Complete site map keyed by page ID.
 * Each entry defines: id, name, path, parent, children, category.
 */
export const siteMap = {
  // ── Root / Top-level pages ──────────────────────────────────────────
  home: {
    id: 'home',
    name: 'Home',
    path: '/',
    parent: 'root',
    children: [
      'service-manual',
      'delivery-groups',
      'accessibility',
      'architecture',
      'business-analysis',
      'content',
      'design',
      'product-and-delivery',
      'security',
      'service-assessments',
      'sustainability',
      'testing-and-assurance',
      'user-research'
    ],
    category: 'page'
  },
  cookies: {
    id: 'cookies',
    name: 'Cookies',
    path: '/cookies',
    parent: 'root',
    children: [],
    category: 'utility'
  },
  'accessibility-statement': {
    id: 'accessibility-statement',
    name: 'Accessibility statement',
    path: '/accessibility-statement',
    parent: 'root',
    children: [],
    category: 'utility'
  },
  components: {
    id: 'components',
    name: 'Components',
    path: '/components',
    parent: 'root',
    children: [],
    category: 'page'
  },
  patterns: {
    id: 'patterns',
    name: 'Patterns',
    path: '/patterns',
    parent: 'root',
    children: [],
    category: 'page'
  },
  search: {
    id: 'search',
    name: 'Search',
    path: '/search',
    parent: 'root',
    children: [],
    category: 'utility'
  },
  'suggest-content': {
    id: 'suggest-content',
    name: 'Suggest content',
    path: '/suggest-content',
    parent: 'root',
    children: [],
    category: 'page'
  },
  'take-part-in-research': {
    id: 'take-part-in-research',
    name: 'Take part in research',
    path: '/take-part-in-research',
    parent: 'root',
    children: [],
    category: 'page'
  },
  'working-with-defra': {
    id: 'working-with-defra',
    name: 'Working with Defra',
    path: '/working-with-defra',
    parent: 'root',
    children: [],
    category: 'page'
  },
  'service-manual': {
    id: 'service-manual',
    name: 'Service Manual',
    path: '/service-manual',
    parent: 'home',
    children: [],
    category: 'section'
  },
  'service-standard': {
    id: 'service-standard',
    name: 'Service Standard',
    path: '/service-standard',
    parent: 'root',
    children: [],
    category: 'page'
  },

  // ── Accessibility ───────────────────────────────────────────────────
  accessibility: {
    id: 'accessibility',
    name: 'Accessibility',
    path: '/accessibility',
    parent: 'home',
    children: ['manage-accessibility', 'test-for-accessibility'],
    category: 'section'
  },
  'manage-accessibility': {
    id: 'manage-accessibility',
    name: 'Manage accessibility',
    path: '/accessibility/manage-accessibility',
    parent: 'accessibility',
    children: [],
    category: 'page'
  },
  'test-for-accessibility': {
    id: 'test-for-accessibility',
    name: 'Test for accessibility',
    path: '/accessibility/test-for-accessibility',
    parent: 'accessibility',
    children: [],
    category: 'page'
  },

  // ── Architecture and Software Development ───────────────────────────
  architecture: {
    id: 'architecture',
    name: 'Architecture and Software Development',
    path: '/architecture-and-software-development',
    parent: 'home',
    children: [
      'core-delivery-platform',
      'defra-accessible-maps',
      'defra-customer-identity',
      'defra-forms'
    ],
    category: 'section'
  },
  'core-delivery-platform': {
    id: 'core-delivery-platform',
    name: 'Core Delivery Platform',
    path: '/architecture-and-software-development/core-delivery-platform',
    parent: 'architecture',
    children: [],
    category: 'page'
  },
  'defra-accessible-maps': {
    id: 'defra-accessible-maps',
    name: 'Defra Accessible Maps',
    path: '/architecture-and-software-development/defra-accessible-maps',
    parent: 'architecture',
    children: [],
    category: 'page'
  },
  'defra-customer-identity': {
    id: 'defra-customer-identity',
    name: 'Defra Customer Identity',
    path: '/architecture-and-software-development/defra-customer-identity',
    parent: 'architecture',
    children: [],
    category: 'page'
  },
  'defra-forms': {
    id: 'defra-forms',
    name: 'Defra Forms',
    path: '/architecture-and-software-development/defra-forms',
    parent: 'architecture',
    children: [],
    category: 'page'
  },

  // ── Business Analysis ───────────────────────────────────────────────
  'business-analysis': {
    id: 'business-analysis',
    name: 'Business Analysis',
    path: '/business-analysis',
    parent: 'home',
    children: ['business-analysis-ways-of-working'],
    category: 'section'
  },
  'business-analysis-ways-of-working': {
    id: 'business-analysis-ways-of-working',
    name: 'Ways of working',
    path: '/business-analysis/ways-of-working',
    parent: 'business-analysis',
    children: [],
    category: 'page'
  },

  // ── Content ─────────────────────────────────────────────────────────
  content: {
    id: 'content',
    name: 'Content',
    path: '/content',
    parent: 'home',
    children: [
      'accessibility-tools',
      'accessible-spreadsheets',
      'colour-contrast',
      'designing-content-types',
      'inclusive-clear-language',
      'legal-content',
      'sharing-designs',
      'welsh-language-translation',
      'working-in-alpha',
      'working-in-beta',
      'working-in-discovery',
      'working-in-live'
    ],
    category: 'section'
  },
  'accessibility-tools': {
    id: 'accessibility-tools',
    name: 'Accessibility tools',
    path: '/content/accessibility-tools',
    parent: 'content',
    children: [],
    category: 'page'
  },
  'accessible-spreadsheets': {
    id: 'accessible-spreadsheets',
    name: 'Accessible spreadsheets',
    path: '/content/accessible-spreadsheets',
    parent: 'content',
    children: [],
    category: 'page'
  },
  'colour-contrast': {
    id: 'colour-contrast',
    name: 'Colour contrast',
    path: '/content/colour-contrast',
    parent: 'content',
    children: [],
    category: 'page'
  },
  'designing-content-types': {
    id: 'designing-content-types',
    name: 'Designing different content types',
    path: '/content/designing-different-content-types',
    parent: 'content',
    children: [],
    category: 'page'
  },
  'inclusive-clear-language': {
    id: 'inclusive-clear-language',
    name: 'Inclusive clear language',
    path: '/content/inclusive-clear-language',
    parent: 'content',
    children: [],
    category: 'page'
  },
  'legal-content': {
    id: 'legal-content',
    name: 'Legal content',
    path: '/content/legal-content',
    parent: 'content',
    children: [],
    category: 'page'
  },
  'sharing-designs': {
    id: 'sharing-designs',
    name: 'Sharing designs, recording decisions',
    path: '/content/sharing-designs-recording-decisions',
    parent: 'content',
    children: [],
    category: 'page'
  },
  'welsh-language-translation': {
    id: 'welsh-language-translation',
    name: 'Welsh language translation',
    path: '/content/welsh-language-translation',
    parent: 'content',
    children: [],
    category: 'page'
  },
  'working-in-alpha': {
    id: 'working-in-alpha',
    name: 'Working in alpha',
    path: '/content/working-in-alpha',
    parent: 'content',
    children: [],
    category: 'page'
  },
  'working-in-beta': {
    id: 'working-in-beta',
    name: 'Working in beta',
    path: '/content/working-in-beta',
    parent: 'content',
    children: [],
    category: 'page'
  },
  'working-in-discovery': {
    id: 'working-in-discovery',
    name: 'Working in discovery',
    path: '/content/working-in-discovery',
    parent: 'content',
    children: [],
    category: 'page'
  },
  'working-in-live': {
    id: 'working-in-live',
    name: 'Working in live',
    path: '/content/working-in-live',
    parent: 'content',
    children: [],
    category: 'page'
  },

  // ── Delivery Groups ─────────────────────────────────────────────────
  'delivery-groups': {
    id: 'delivery-groups',
    name: 'Delivery Groups',
    path: '/delivery-groups',
    parent: 'home',
    children: ['follow-delivery-governance', 'meet-delivery-standards'],
    category: 'section'
  },
  'follow-delivery-governance': {
    id: 'follow-delivery-governance',
    name: 'Follow delivery governance',
    path: '/delivery-groups/follow-delivery-governance',
    parent: 'delivery-groups',
    children: ['assurance', 'governance-model'],
    category: 'section'
  },
  assurance: {
    id: 'assurance',
    name: 'Assurance',
    path: '/delivery-groups/follow-delivery-governance/assurance',
    parent: 'follow-delivery-governance',
    children: [
      'operational-service-readiness',
      'other-assurance-types',
      'assurance-service-assessments',
      'spend-control'
    ],
    category: 'section'
  },
  'operational-service-readiness': {
    id: 'operational-service-readiness',
    name: 'Operational service readiness',
    path: '/delivery-groups/follow-delivery-governance/assurance/operational-service-readiness',
    parent: 'assurance',
    children: [],
    category: 'page'
  },
  'other-assurance-types': {
    id: 'other-assurance-types',
    name: 'Other assurance types',
    path: '/delivery-groups/follow-delivery-governance/assurance/other-assurance-types',
    parent: 'assurance',
    children: [],
    category: 'page'
  },
  'assurance-service-assessments': {
    id: 'assurance-service-assessments',
    name: 'Service assessments',
    path: '/delivery-groups/follow-delivery-governance/assurance/service-assessments',
    parent: 'assurance',
    children: [],
    category: 'page'
  },
  'spend-control': {
    id: 'spend-control',
    name: 'Spend control',
    path: '/delivery-groups/follow-delivery-governance/assurance/spend-control',
    parent: 'assurance',
    children: [],
    category: 'page'
  },
  'governance-model': {
    id: 'governance-model',
    name: 'Governance model',
    path: '/delivery-groups/follow-delivery-governance/governance-model',
    parent: 'follow-delivery-governance',
    children: [],
    category: 'page'
  },
  'meet-delivery-standards': {
    id: 'meet-delivery-standards',
    name: 'Meet delivery standards',
    path: '/delivery-groups/meet-delivery-standards',
    parent: 'delivery-groups',
    children: [
      'define-outcomes',
      'products-and-services',
      'roadmap-for-change',
      'success-measures'
    ],
    category: 'section'
  },
  'define-outcomes': {
    id: 'define-outcomes',
    name: 'Define outcomes',
    path: '/delivery-groups/meet-delivery-standards/define-outcomes',
    parent: 'meet-delivery-standards',
    children: [],
    category: 'page'
  },
  'products-and-services': {
    id: 'products-and-services',
    name: 'Products and services',
    path: '/delivery-groups/meet-delivery-standards/products-and-services',
    parent: 'meet-delivery-standards',
    children: [],
    category: 'page'
  },
  'roadmap-for-change': {
    id: 'roadmap-for-change',
    name: 'Roadmap for change',
    path: '/delivery-groups/meet-delivery-standards/roadmap-for-change',
    parent: 'meet-delivery-standards',
    children: [],
    category: 'page'
  },
  'success-measures': {
    id: 'success-measures',
    name: 'Success measures',
    path: '/delivery-groups/meet-delivery-standards/success-measures',
    parent: 'meet-delivery-standards',
    children: [],
    category: 'page'
  },

  // ── Design ──────────────────────────────────────────────────────────
  design: {
    id: 'design',
    name: 'Design',
    path: '/design',
    parent: 'home',
    children: [
      'design-branding',
      'design-components-patterns',
      'design-cookies',
      'design-data-visualisation',
      'design-prototyping',
      'design-tools'
    ],
    category: 'section'
  },
  'design-branding': {
    id: 'design-branding',
    name: 'Branding',
    path: '/design/branding',
    parent: 'design',
    children: [],
    category: 'page'
  },
  'design-components-patterns': {
    id: 'design-components-patterns',
    name: 'Components and patterns',
    path: '/design/components-and-patterns',
    parent: 'design',
    children: [],
    category: 'page'
  },
  'design-cookies': {
    id: 'design-cookies',
    name: 'Cookies',
    path: '/design/cookies',
    parent: 'design',
    children: [],
    category: 'page'
  },
  'design-data-visualisation': {
    id: 'design-data-visualisation',
    name: 'Data visualisation',
    path: '/design/data-visualisation',
    parent: 'design',
    children: [],
    category: 'page'
  },
  'design-prototyping': {
    id: 'design-prototyping',
    name: 'Prototyping',
    path: '/design/prototyping',
    parent: 'design',
    children: [],
    category: 'page'
  },
  'design-tools': {
    id: 'design-tools',
    name: 'Tools',
    path: '/design/tools',
    parent: 'design',
    children: [],
    category: 'page'
  },

  // ── Product and Delivery ────────────────────────────────────────────
  'product-and-delivery': {
    id: 'product-and-delivery',
    name: 'Product and Delivery',
    path: '/product-and-delivery',
    parent: 'home',
    children: ['product-delivery-governance', 'product-delivery-tools'],
    category: 'section'
  },
  'product-delivery-governance': {
    id: 'product-delivery-governance',
    name: 'Governance',
    path: '/product-and-delivery/governance',
    parent: 'product-and-delivery',
    children: [],
    category: 'page'
  },
  'product-delivery-tools': {
    id: 'product-delivery-tools',
    name: 'Tools and access',
    path: '/product-and-delivery/tools-and-access',
    parent: 'product-and-delivery',
    children: [],
    category: 'page'
  },

  // ── Security ────────────────────────────────────────────────────────
  security: {
    id: 'security',
    name: 'Security',
    path: '/security',
    parent: 'home',
    children: ['security-common-tasks'],
    category: 'section'
  },
  'security-common-tasks': {
    id: 'security-common-tasks',
    name: 'Common tasks',
    path: '/security/common-tasks',
    parent: 'security',
    children: [],
    category: 'page'
  },

  // ── Service Assessments ─────────────────────────────────────────────
  'service-assessments': {
    id: 'service-assessments',
    name: 'Service Assessments',
    path: '/service-assessments',
    parent: 'home',
    children: [
      'assessment-questions',
      'become-an-assessor',
      'book-an-assessment',
      'gov-uk-exemptions'
    ],
    category: 'section'
  },
  'assessment-questions': {
    id: 'assessment-questions',
    name: 'Assessment questions',
    path: '/service-assessments/assessment-questions',
    parent: 'service-assessments',
    children: [],
    category: 'page'
  },
  'become-an-assessor': {
    id: 'become-an-assessor',
    name: 'Become an assessor',
    path: '/service-assessments/become-an-assessor',
    parent: 'service-assessments',
    children: [],
    category: 'page'
  },
  'book-an-assessment': {
    id: 'book-an-assessment',
    name: 'Book an assessment',
    path: '/service-assessments/book-an-assessment',
    parent: 'service-assessments',
    children: [],
    category: 'page'
  },
  'gov-uk-exemptions': {
    id: 'gov-uk-exemptions',
    name: 'GOV.UK exemptions',
    path: '/service-assessments/gov-uk-exemptions',
    parent: 'service-assessments',
    children: [],
    category: 'page'
  },

  // ── Sustainability ──────────────────────────────────────────────────
  sustainability: {
    id: 'sustainability',
    name: 'Sustainability',
    path: '/sustainability',
    parent: 'home',
    children: [
      'sustainability-metrics',
      'sustainability-objectives',
      'sustainability-process'
    ],
    category: 'section'
  },
  'sustainability-metrics': {
    id: 'sustainability-metrics',
    name: 'Metrics',
    path: '/sustainability/metrics',
    parent: 'sustainability',
    children: [],
    category: 'page'
  },
  'sustainability-objectives': {
    id: 'sustainability-objectives',
    name: 'Objectives',
    path: '/sustainability/objectives',
    parent: 'sustainability',
    children: [],
    category: 'page'
  },
  'sustainability-process': {
    id: 'sustainability-process',
    name: 'Process',
    path: '/sustainability/process',
    parent: 'sustainability',
    children: [],
    category: 'page'
  },

  // ── Testing and Assurance ───────────────────────────────────────────
  'testing-and-assurance': {
    id: 'testing-and-assurance',
    name: 'Testing and Assurance',
    path: '/testing-and-assurance',
    parent: 'home',
    children: ['testing-recommended-approach'],
    category: 'section'
  },
  'testing-recommended-approach': {
    id: 'testing-recommended-approach',
    name: 'Recommended approach',
    path: '/testing-and-assurance/recommended-approach',
    parent: 'testing-and-assurance',
    children: [],
    category: 'page'
  },

  // ── User Research ───────────────────────────────────────────────────
  'user-research': {
    id: 'user-research',
    name: 'User Research',
    path: '/user-research',
    parent: 'home',
    children: [
      'user-research-recruiting',
      'user-research-scoping',
      'user-research-standards',
      'user-research-tools'
    ],
    category: 'section'
  },
  'user-research-recruiting': {
    id: 'user-research-recruiting',
    name: 'Recruiting participants',
    path: '/user-research/recruiting-participants',
    parent: 'user-research',
    children: [],
    category: 'page'
  },
  'user-research-scoping': {
    id: 'user-research-scoping',
    name: 'Scoping research',
    path: '/user-research/scoping-research',
    parent: 'user-research',
    children: [],
    category: 'page'
  },
  'user-research-standards': {
    id: 'user-research-standards',
    name: 'Standards and guidance',
    path: '/user-research/standards-and-guidance',
    parent: 'user-research',
    children: [],
    category: 'page'
  },
  'user-research-tools': {
    id: 'user-research-tools',
    name: 'Tools',
    path: '/user-research/tools',
    parent: 'user-research',
    children: [],
    category: 'page'
  }
}

/**
 * Get all pages as a flat array
 * @returns {Array<{id: string, name: string, path: string, parent: string, children: string[], category: string}>}
 */
export function getAllPages() {
  return Object.values(siteMap)
}

/**
 * Get site statistics
 * @returns {{totalPages: number, maxDepth: number, categories: Record<string, number>}}
 */
export function getSiteStats() {
  const allPages = getAllPages()

  const categories = {}
  let maxDepth = 0

  for (const page of allPages) {
    // Count categories
    categories[page.category] = (categories[page.category] || 0) + 1

    // Calculate depth from path
    const depth = (page.path.match(/\//g) || []).length
    if (depth > maxDepth) {
      maxDepth = depth
    }
  }

  return {
    totalPages: allPages.length,
    maxDepth,
    categories
  }
}
