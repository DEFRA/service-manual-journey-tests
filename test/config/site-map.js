/**
 * Site Map Configuration
 * Complete mapping of all pages in the service-manual-ui application
 * Auto-generated from repository analysis
 *
 * This configuration file contains:
 * - All routes with their hierarchical structure
 * - Parent-child relationships
 * - Page categories and metadata
 * - Expected content types
 */

export const siteConfig = {    
  baseUrl: process.env.ENVIRONMENT 
    ? `https://service-manual-ui.${process.env.ENVIRONMENT}.cdp-int.defra.cloud`
    : 'http://localhost:3000',
  //  Request configuration
  requestTimeout: 30000,
  requestDelay: 100,
  maxConcurrentRequests: 5,

  // Valid HTTP status codes
  validStatusCodes: [200, 201, 204],
  redirectStatusCodes: [301, 302, 303, 307, 308],
  brokenStatusCodes: [400, 401, 403, 404, 405, 500, 502, 503, 504],

  // Patterns to exclude from link checking
  excludePatterns: [
    /\.(pdf|zip|doc|docx|xls|xlsx|ppt|pptx|png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/i,
    /^mailto:/i,
    /^tel:/i,
    /^javascript:/i,
    /^#/,
    /^data:/i
  ],

  // Domains to exclude from link checking (authentication-required or external)
  // Add domains that require VPN, authentication, or should be skipped
  excludeDomains: [
    /github\.com/i,                    // GitHub (may require auth)
    /gitlab\.com/i,                    // GitLab (may require auth)
    /vpn\./i,                          // VPN URLs
    /intranet\./i,                     // Intranet URLs
    /confluence\./i,                   // Confluence (usually requires auth)
    /jira\./i,                         // Jira (usually requires auth)
    /sharepoint\./i,                   // SharePoint (usually requires auth)
    /teams\.microsoft\.com/i,          // Microsoft Teams
    /login\./i,                        // Login pages
    /auth\./i,                         // Auth pages
    /sso\./i,                          // SSO pages
    /portal\.cdp-int\.defra\.cloud/i,  // CDP portal (requires VPN)
    /defra-digital-team\.slack\.com/i, // Slack (requires auth)
    /eaflood\.atlassian\.net/i         // Jira (requires auth)
    // Add more domains as needed, e.g.:
    // /example\.com/i,
    // /internal\.company\.com/i
  ]
}

/**
 * Complete Site Map
 * Hierarchical structure of all pages in the application
 */
export const siteMap = {
  // ==========================================
  // ROOT LEVEL PAGES
  // ==========================================
  root: {
    path: '/',
    name: 'Home',
    description: 'Main landing page',
    contentType: 'text/html',
    children: ['service-manual', 'delivery-groups']
  },

  // ==========================================
  // SERVICE MANUAL SECTION
  // ==========================================
  'service-manual': {
    path: '/service-manual',
    name: 'Service Manual',
    description: 'Service manual landing page',
    parent: 'root',
    contentType: 'text/html',
    children: [
      'accessibility-statement',
      'working-with-defra',
      'suggest-content',
      'take-part-in-research',
      'accessibility',
      'architecture-and-software-development',
      'business-analysis',
      'components',
      'content',
      'design',
      'patterns',
      'product-and-delivery',
      'security',
      'service-assessments',
      'sustainability',
      'testing-and-assurance',
      'user-research'
    ]
  },

  // ==========================================
  // STANDALONE PAGES
  // ==========================================
  'accessibility-statement': {
    path: '/accessibility-statement',
    name: 'Accessibility Statement',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'standalone'
  },

  'working-with-defra': {
    path: '/working-with-defra',
    name: 'Working with Defra',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'standalone'
  },

  'suggest-content': {
    path: '/suggest-content',
    name: 'Suggest Content',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'standalone'
  },

  'take-part-in-research': {
    path: '/take-part-in-research',
    name: 'Take Part in Research',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'standalone'
  },

  components: {
    path: '/components',
    name: 'Components',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'standalone'
  },

  patterns: {
    path: '/patterns',
    name: 'Patterns',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'standalone'
  },

  // ==========================================
  // ACCESSIBILITY SECTION
  // ==========================================
  accessibility: {
    path: '/accessibility',
    name: 'Accessibility',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'section',
    children: [
      'accessibility/manage-accessibility',
      'accessibility/test-for-accessibility'
    ]
  },

  'accessibility/manage-accessibility': {
    path: '/accessibility/manage-accessibility',
    name: 'Manage Accessibility',
    parent: 'accessibility',
    contentType: 'text/html',
    category: 'page'
  },

  'accessibility/test-for-accessibility': {
    path: '/accessibility/test-for-accessibility',
    name: 'Test for Accessibility',
    parent: 'accessibility',
    contentType: 'text/html',
    category: 'page'
  },

  // ==========================================
  // ARCHITECTURE AND SOFTWARE DEVELOPMENT
  // ==========================================
  'architecture-and-software-development': {
    path: '/architecture-and-software-development',
    name: 'Architecture and Software Development',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'section',
    children: [
      'architecture-and-software-development/core-delivery-platform',
      'architecture-and-software-development/defra-customer-identity',
      'architecture-and-software-development/defra-accessible-maps',
      'architecture-and-software-development/defra-forms'
    ]
  },

  'architecture-and-software-development/core-delivery-platform': {
    path: '/architecture-and-software-development/core-delivery-platform',
    name: 'Core Delivery Platform',
    parent: 'architecture-and-software-development',
    contentType: 'text/html',
    category: 'page'
  },

  'architecture-and-software-development/defra-customer-identity': {
    path: '/architecture-and-software-development/defra-customer-identity',
    name: 'Defra Customer Identity',
    parent: 'architecture-and-software-development',
    contentType: 'text/html',
    category: 'page'
  },

  'architecture-and-software-development/defra-accessible-maps': {
    path: '/architecture-and-software-development/defra-accessible-maps',
    name: 'Defra Accessible Maps',
    parent: 'architecture-and-software-development',
    contentType: 'text/html',
    category: 'page'
  },

  'architecture-and-software-development/defra-forms': {
    path: '/architecture-and-software-development/defra-forms',
    name: 'Defra Forms',
    parent: 'architecture-and-software-development',
    contentType: 'text/html',
    category: 'page'
  },

  // ==========================================
  // BUSINESS ANALYSIS
  // ==========================================
  'business-analysis': {
    path: '/business-analysis',
    name: 'Business Analysis',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'section',
    children: ['business-analysis/ways-of-working']
  },

  'business-analysis/ways-of-working': {
    path: '/business-analysis/ways-of-working',
    name: 'Ways of Working',
    parent: 'business-analysis',
    contentType: 'text/html',
    category: 'page'
  },

  // ==========================================
  // CONTENT SECTION
  // ==========================================
  content: {
    path: '/content',
    name: 'Content',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'section',
    children: [
      'content/inclusive-clear-language',
      'content/designing-different-content-types',
      'content/sharing-designs-recording-decisions',
      'content/working-in-discovery',
      'content/working-in-alpha',
      'content/working-in-beta',
      'content/working-in-live',
      'content/legal-content',
      'content/welsh-language-translation',
      'content/colour-contrast',
      'content/accessible-spreadsheets',
      'content/accessibility-tools'
    ]
  },

  'content/inclusive-clear-language': {
    path: '/content/inclusive-clear-language',
    name: 'Inclusive and Clear Language',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  'content/designing-different-content-types': {
    path: '/content/designing-different-content-types',
    name: 'Designing Different Content Types',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  'content/sharing-designs-recording-decisions': {
    path: '/content/sharing-designs-recording-decisions',
    name: 'Sharing Designs and Recording Decisions',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  'content/working-in-discovery': {
    path: '/content/working-in-discovery',
    name: 'Working in Discovery',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  'content/working-in-alpha': {
    path: '/content/working-in-alpha',
    name: 'Working in Alpha',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  'content/working-in-beta': {
    path: '/content/working-in-beta',
    name: 'Working in Beta',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  'content/working-in-live': {
    path: '/content/working-in-live',
    name: 'Working in Live',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  'content/legal-content': {
    path: '/content/legal-content',
    name: 'Legal Content',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  'content/welsh-language-translation': {
    path: '/content/welsh-language-translation',
    name: 'Welsh Language Translation',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  'content/colour-contrast': {
    path: '/content/colour-contrast',
    name: 'Colour Contrast',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  'content/accessible-spreadsheets': {
    path: '/content/accessible-spreadsheets',
    name: 'Accessible Spreadsheets',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  'content/accessibility-tools': {
    path: '/content/accessibility-tools',
    name: 'Accessibility Tools',
    parent: 'content',
    contentType: 'text/html',
    category: 'page'
  },

  // ==========================================
  // DESIGN SECTION
  // ==========================================
  design: {
    path: '/design',
    name: 'Design',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'section',
    children: [
      'design/branding',
      'design/cookies',
      'design/data-visualisation',
      'design/prototyping',
      'design/tools',
      'design/components-and-patterns'
    ]
  },

  'design/branding': {
    path: '/design/branding',
    name: 'Branding',
    parent: 'design',
    contentType: 'text/html',
    category: 'page'
  },

  'design/cookies': {
    path: '/design/cookies',
    name: 'Cookies (Design)',
    parent: 'design',
    contentType: 'text/html',
    category: 'page'
  },

  'design/data-visualisation': {
    path: '/design/data-visualisation',
    name: 'Data Visualisation',
    parent: 'design',
    contentType: 'text/html',
    category: 'page'
  },

  'design/prototyping': {
    path: '/design/prototyping',
    name: 'Prototyping',
    parent: 'design',
    contentType: 'text/html',
    category: 'page'
  },

  'design/tools': {
    path: '/design/tools',
    name: 'Design Tools',
    parent: 'design',
    contentType: 'text/html',
    category: 'page'
  },

  'design/components-and-patterns': {
    path: '/design/components-and-patterns',
    name: 'Components and Patterns',
    parent: 'design',
    contentType: 'text/html',
    category: 'page'
  },

  // ==========================================
  // PRODUCT AND DELIVERY
  // ==========================================
  'product-and-delivery': {
    path: '/product-and-delivery',
    name: 'Product and Delivery',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'section',
    children: [
      'product-and-delivery/governance',
      'product-and-delivery/tools-and-access'
    ]
  },

  'product-and-delivery/governance': {
    path: '/product-and-delivery/governance',
    name: 'Governance',
    parent: 'product-and-delivery',
    contentType: 'text/html',
    category: 'page'
  },

  'product-and-delivery/tools-and-access': {
    path: '/product-and-delivery/tools-and-access',
    name: 'Tools and Access',
    parent: 'product-and-delivery',
    contentType: 'text/html',
    category: 'page'
  },

  // ==========================================
  // SECURITY
  // ==========================================
  security: {
    path: '/security',
    name: 'Security',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'section',
    children: ['security/common-tasks']
  },

  'security/common-tasks': {
    path: '/security/common-tasks',
    name: 'Common Tasks',
    parent: 'security',
    contentType: 'text/html',
    category: 'page'
  },

  // ==========================================
  // SERVICE ASSESSMENTS
  // ==========================================
  'service-assessments': {
    path: '/service-assessments',
    name: 'Service Assessments',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'section',
    children: [
      'service-assessments/book-an-assessment',
      'service-assessments/become-an-assessor',
      'service-assessments/gov-uk-exemptions',
      'service-assessments/assessment-questions'
    ]
  },

  'service-assessments/book-an-assessment': {
    path: '/service-assessments/book-an-assessment',
    name: 'Book an Assessment',
    parent: 'service-assessments',
    contentType: 'text/html',
    category: 'page'
  },

  'service-assessments/become-an-assessor': {
    path: '/service-assessments/become-an-assessor',
    name: 'Become an Assessor',
    parent: 'service-assessments',
    contentType: 'text/html',
    category: 'page'
  },

  'service-assessments/gov-uk-exemptions': {
    path: '/service-assessments/gov-uk-exemptions',
    name: 'GOV.UK Exemptions',
    parent: 'service-assessments',
    contentType: 'text/html',
    category: 'page'
  },

  'service-assessments/assessment-questions': {
    path: '/service-assessments/assessment-questions',
    name: 'Assessment Questions',
    parent: 'service-assessments',
    contentType: 'text/html',
    category: 'page'
  },

  // ==========================================
  // SUSTAINABILITY
  // ==========================================
  sustainability: {
    path: '/sustainability',
    name: 'Sustainability',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'section',
    children: [
      'sustainability/process',
      'sustainability/objectives',
      'sustainability/metrics'
    ]
  },

  'sustainability/process': {
    path: '/sustainability/process',
    name: 'Process',
    parent: 'sustainability',
    contentType: 'text/html',
    category: 'page'
  },

  'sustainability/objectives': {
    path: '/sustainability/objectives',
    name: 'Objectives',
    parent: 'sustainability',
    contentType: 'text/html',
    category: 'page'
  },

  'sustainability/metrics': {
    path: '/sustainability/metrics',
    name: 'Metrics',
    parent: 'sustainability',
    contentType: 'text/html',
    category: 'page'
  },

  // ==========================================
  // TESTING AND ASSURANCE
  // ==========================================
  'testing-and-assurance': {
    path: '/testing-and-assurance',
    name: 'Testing and Assurance',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'section',
    children: ['testing-and-assurance/recommended-approach']
  },

  'testing-and-assurance/recommended-approach': {
    path: '/testing-and-assurance/recommended-approach',
    name: 'Recommended Approach',
    parent: 'testing-and-assurance',
    contentType: 'text/html',
    category: 'page'
  },

  // ==========================================
  // USER RESEARCH
  // ==========================================
  'user-research': {
    path: '/user-research',
    name: 'User Research',
    parent: 'service-manual',
    contentType: 'text/html',
    category: 'section',
    children: [
      'user-research/scoping-research',
      'user-research/recruiting-participants',
      'user-research/standards-and-guidance',
      'user-research/tools'
    ]
  },

  'user-research/scoping-research': {
    path: '/user-research/scoping-research',
    name: 'Scoping Research',
    parent: 'user-research',
    contentType: 'text/html',
    category: 'page'
  },

  'user-research/recruiting-participants': {
    path: '/user-research/recruiting-participants',
    name: 'Recruiting Participants',
    parent: 'user-research',
    contentType: 'text/html',
    category: 'page'
  },

  'user-research/standards-and-guidance': {
    path: '/user-research/standards-and-guidance',
    name: 'Standards and Guidance',
    parent: 'user-research',
    contentType: 'text/html',
    category: 'page'
  },

  'user-research/tools': {
    path: '/user-research/tools',
    name: 'User Research Tools',
    parent: 'user-research',
    contentType: 'text/html',
    category: 'page'
  },

  // ==========================================
  // DELIVERY GROUPS SECTION
  // ==========================================
  'delivery-groups': {
    path: '/delivery-groups',
    name: 'Delivery Groups',
    parent: 'root',
    contentType: 'text/html',
    category: 'section',
    children: [
      'delivery-groups/meet-delivery-standards',
      'delivery-groups/follow-delivery-governance'
    ]
  },

  'delivery-groups/meet-delivery-standards': {
    path: '/delivery-groups/meet-delivery-standards',
    name: 'Meet Delivery Standards',
    parent: 'delivery-groups',
    contentType: 'text/html',
    category: 'section',
    children: [
      'delivery-groups/meet-delivery-standards/define-outcomes',
      'delivery-groups/meet-delivery-standards/products-and-services',
      'delivery-groups/meet-delivery-standards/roadmap-for-change',
      'delivery-groups/meet-delivery-standards/success-measures'
    ]
  },

  'delivery-groups/meet-delivery-standards/define-outcomes': {
    path: '/delivery-groups/meet-delivery-standards/define-outcomes',
    name: 'Define Outcomes',
    parent: 'delivery-groups/meet-delivery-standards',
    contentType: 'text/html',
    category: 'page'
  },

  'delivery-groups/meet-delivery-standards/products-and-services': {
    path: '/delivery-groups/meet-delivery-standards/products-and-services',
    name: 'Products and Services',
    parent: 'delivery-groups/meet-delivery-standards',
    contentType: 'text/html',
    category: 'page'
  },

  'delivery-groups/meet-delivery-standards/roadmap-for-change': {
    path: '/delivery-groups/meet-delivery-standards/roadmap-for-change',
    name: 'Roadmap for Change',
    parent: 'delivery-groups/meet-delivery-standards',
    contentType: 'text/html',
    category: 'page'
  },

  'delivery-groups/meet-delivery-standards/success-measures': {
    path: '/delivery-groups/meet-delivery-standards/success-measures',
    name: 'Success Measures',
    parent: 'delivery-groups/meet-delivery-standards',
    contentType: 'text/html',
    category: 'page'
  },

  'delivery-groups/follow-delivery-governance': {
    path: '/delivery-groups/follow-delivery-governance',
    name: 'Follow Delivery Governance',
    parent: 'delivery-groups',
    contentType: 'text/html',
    category: 'section',
    children: [
      'delivery-groups/follow-delivery-governance/governance-model',
      'delivery-groups/follow-delivery-governance/assurance'
    ]
  },

  'delivery-groups/follow-delivery-governance/governance-model': {
    path: '/delivery-groups/follow-delivery-governance/governance-model',
    name: 'Governance Model',
    parent: 'delivery-groups/follow-delivery-governance',
    contentType: 'text/html',
    category: 'page'
  },

  'delivery-groups/follow-delivery-governance/assurance': {
    path: '/delivery-groups/follow-delivery-governance/assurance',
    name: 'Assurance',
    parent: 'delivery-groups/follow-delivery-governance',
    contentType: 'text/html',
    category: 'section',
    children: [
      'delivery-groups/follow-delivery-governance/assurance/spend-control',
      'delivery-groups/follow-delivery-governance/assurance/service-assessments',
      'delivery-groups/follow-delivery-governance/assurance/operational-service-readiness',
      'delivery-groups/follow-delivery-governance/assurance/other-assurance-types'
    ]
  },

  'delivery-groups/follow-delivery-governance/assurance/spend-control': {
    path: '/delivery-groups/follow-delivery-governance/assurance/spend-control',
    name: 'Spend Control',
    parent: 'delivery-groups/follow-delivery-governance/assurance',
    contentType: 'text/html',
    category: 'page'
  },

  'delivery-groups/follow-delivery-governance/assurance/service-assessments': {
    path: '/delivery-groups/follow-delivery-governance/assurance/service-assessments',
    name: 'Service Assessments (Assurance)',
    parent: 'delivery-groups/follow-delivery-governance/assurance',
    contentType: 'text/html',
    category: 'page'
  },

  'delivery-groups/follow-delivery-governance/assurance/operational-service-readiness':
    {
      path: '/delivery-groups/follow-delivery-governance/assurance/operational-service-readiness',
      name: 'Operational Service Readiness',
      parent: 'delivery-groups/follow-delivery-governance/assurance',
      contentType: 'text/html',
      category: 'page'
    },

  'delivery-groups/follow-delivery-governance/assurance/other-assurance-types':
    {
      path: '/delivery-groups/follow-delivery-governance/assurance/other-assurance-types',
      name: 'Other Assurance Types',
      parent: 'delivery-groups/follow-delivery-governance/assurance',
      contentType: 'text/html',
      category: 'page'
    },

  // ==========================================
  // UTILITY PAGES
  // ==========================================
  cookies: {
    path: '/cookies',
    name: 'Cookies',
    parent: 'root',
    contentType: 'text/html',
    category: 'utility'
  },

  search: {
    path: '/search',
    name: 'Search',
    parent: 'root',
    contentType: 'text/html',
    category: 'utility'
  }
}

/**
 * Get all page paths as a flat array
 */
export function getAllPagePaths() {
  return Object.values(siteMap).map((page) => page.path)
}

/**
 * Get all pages with full metadata
 */
export function getAllPages() {
  return Object.entries(siteMap).map(([key, page]) => ({
    id: key,
    ...page
  }))
}

/**
 * Get pages by category
 */
export function getPagesByCategory(category) {
  return Object.entries(siteMap)
    .filter(([_, page]) => page.category === category)
    .map(([key, page]) => ({ id: key, ...page }))
}

/**
 * Get child pages of a parent
 */
export function getChildPages(parentId) {
  const parent = siteMap[parentId]
  if (!parent?.children) return []

  return parent.children.map((childId) => ({
    id: childId,
    ...siteMap[childId]
  }))
}

/**
 * Get page hierarchy (breadcrumb path)
 */
export function getPageHierarchy(pageId) {
  const hierarchy = []
  let currentId = pageId

  while (currentId && siteMap[currentId]) {
    hierarchy.unshift({
      id: currentId,
      ...siteMap[currentId]
    })
    currentId = siteMap[currentId].parent
  }

  return hierarchy
}

/**
 * Get page depth level
 */
export function getPageDepth(pageId) {
  let depth = 0
  let currentId = pageId

  while (currentId && siteMap[currentId]?.parent) {
    depth++
    currentId = siteMap[currentId].parent
  }

  return depth
}

/**
 * Statistics about the site
 */
export function getSiteStats() {
  const pages = getAllPages()
  const categories = {}
  let maxDepth = 0

  pages.forEach((page) => {
    const category = page.category || 'unknown'
    categories[category] = (categories[category] || 0) + 1

    const depth = getPageDepth(page.id)
    if (depth > maxDepth) maxDepth = depth
  })

  return {
    totalPages: pages.length,
    categories,
    maxDepth,
    pagesWithChildren: pages.filter((p) => p.children?.length > 0).length
  }
}

export default {
  siteConfig,
  siteMap,
  getAllPagePaths,
  getAllPages,
  getPagesByCategory,
  getChildPages,
  getPageHierarchy,
  getPageDepth,
  getSiteStats
}
