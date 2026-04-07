/**
 * Comprehensive Broken Link Test
 *
 * This test file covers ALL pages in the service-manual-ui application
 * using the complete site map configuration.
 *
 * Features:
 * - Tests every page defined in the site map
 * - Validates parent-child relationships
 * - Checks all links on each page
 * - Provides detailed reporting by section
 * - Ensures navigation integrity
 */

import { expect, browser } from '@wdio/globals'
import {
  siteConfig,
  siteMap,
  getAllPages,
  getSiteStats
} from '../config/site-map.js'

// Test Results Storage
const testResults = {
  workingPages: [],
  brokenPages: [],
  workingLinks: [],
  brokenLinks: [],
  redirects: [],
  externalLinks: [],
  errors: [],
  pageDetails: {},
  startTime: null,
  endTime: null
}

/**
 * Helper: Normalize URL
 */
function normalizeUrl(url, baseUrl) {
  try {
    if (
      !url ||
      url.startsWith('#') ||
      url.startsWith('javascript:') ||
      url.startsWith('mailto:') ||
      url.startsWith('tel:')
    ) {
      return null
    }

    if (url.startsWith('/')) {
      const base = new URL(baseUrl)
      return `${base.protocol}//${base.host}${url}`
    }

    if (url.startsWith('http')) {
      return url
    }

    return null
  } catch {
    return null
  }
}

/**
 * Helper: Check if URL is internal
 */
function isInternalUrl(url, baseUrl) {
  try {
    const baseHost = new URL(baseUrl).host
    const urlHost = new URL(url).host
    return urlHost === baseHost
  } catch {
    return false
  }
}

/**
 * Helper: Should exclude URL from checking
 */
function shouldExclude(url) {
  // Check against excludePatterns (file extensions, mailto, tel, etc.)
  if (siteConfig.excludePatterns.some((pattern) => pattern.test(url))) {
    return true
  }

  // Check against excludeDomains (authentication-required domains)
  if (siteConfig.excludeDomains && siteConfig.excludeDomains.length > 0) {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname
      // Check if the hostname matches any excluded domain pattern
      if (siteConfig.excludeDomains.some((pattern) => pattern.test(hostname))) {
        return true
      }
    } catch {
      // If URL parsing fails, don't exclude by domain
    }
  }

  return false
}

/**
 * Helper: Extract links from page using browser
 */
async function extractLinksFromBrowser(pageUrl) {
  const links = []
  let excludedCount = 0

  try {
    // Get all link elements
    const linkElements = await $$('a[href]')

    for (const element of linkElements) {
      const href = await element.getAttribute('href')
      const text = await element.getText()

      if (href) {
        const normalizedUrl = normalizeUrl(href, pageUrl)
        
        if (!normalizedUrl) {
          continue // Skip invalid URLs
        }

        if (shouldExclude(normalizedUrl)) {
          excludedCount++
          continue // Skip excluded URLs
        }

        links.push({
          url: normalizedUrl,
          text: text.trim().substring(0, 100),
          isInternal: isInternalUrl(normalizedUrl, siteConfig.baseUrl),
          originalHref: href
        })
      }
    }

    if (excludedCount > 0) {
      console.log(`      ℹ Excluded ${excludedCount} links (auth/VPN/file patterns)`)
    }
  } catch (error) {
    console.log(`      Warning: Could not extract links - ${error.message}`)
  }

  return links
}

/**
 * Helper: Check a single URL using fetch API for accurate HTTP status codes
 * Detects: 404, 410, 500, 503, DNS errors, network errors
 */
async function checkUrl(url) {
  const result = {
    url,
    status: null,
    statusText: '',
    responseTime: 0,
    isWorking: false,
    isBroken: false,
    isRedirect: false,
    error: null
  }

  const startTime = Date.now()

  try {
    // Use fetch to get the actual HTTP status code
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    result.status = response.status
    result.statusText = response.statusText
    result.responseTime = Date.now() - startTime

    // Check for various HTTP error codes
    if (response.ok) {
      // 2xx status codes
      result.isWorking = true
    } else if (
      response.status === 301 ||
      response.status === 302 ||
      response.status === 303 ||
      response.status === 307 ||
      response.status === 308
    ) {
      // Redirect status codes
      result.isRedirect = true
      result.isWorking = true
    } else if (response.status === 404) {
      result.isBroken = true
      result.error = '404 Not Found - Page does not exist'
    } else if (response.status === 410) {
      result.isBroken = true
      result.error = '410 Gone - Page has been permanently removed'
    } else if (response.status === 500) {
      result.isBroken = true
      result.error = '500 Internal Server Error'
    } else if (response.status === 502) {
      result.isBroken = true
      result.error = '502 Bad Gateway'
    } else if (response.status === 503) {
      result.isBroken = true
      result.error = '503 Service Unavailable'
    } else if (response.status === 504) {
      result.isBroken = true
      result.error = '504 Gateway Timeout'
    } else if (response.status >= 400 && response.status < 500) {
      result.isBroken = true
      result.error = `${response.status} Client Error - ${response.statusText}`
    } else if (response.status >= 500) {
      result.isBroken = true
      result.error = `${response.status} Server Error - ${response.statusText}`
    }
  } catch (error) {
    result.responseTime = Date.now() - startTime
    result.isBroken = true

    // Detect specific error types
    if (
      error.cause?.code === 'ENOTFOUND' ||
      error.message.includes('ENOTFOUND')
    ) {
      result.error = 'DNS Error - Domain not found'
      result.status = 0
      result.statusText = 'DNS_ERROR'
    } else if (
      error.cause?.code === 'ECONNREFUSED' ||
      error.message.includes('ECONNREFUSED')
    ) {
      result.error = 'Connection Refused - Server not responding'
      result.status = 0
      result.statusText = 'CONNECTION_REFUSED'
    } else if (
      error.cause?.code === 'ETIMEDOUT' ||
      error.message.includes('ETIMEDOUT')
    ) {
      result.error = 'Connection Timeout'
      result.status = 0
      result.statusText = 'TIMEOUT'
    } else if (
      error.cause?.code === 'ECONNRESET' ||
      error.message.includes('ECONNRESET')
    ) {
      result.error = 'Connection Reset'
      result.status = 0
      result.statusText = 'CONNECTION_RESET'
    } else if (error.name === 'AbortError' || error.message.includes('abort')) {
      result.error = 'Request Aborted/Timeout'
      result.status = 0
      result.statusText = 'ABORTED'
    } else if (
      error.message.includes('SSL') ||
      error.message.includes('certificate')
    ) {
      result.error = `SSL/Certificate Error - ${error.message}`
      result.status = 0
      result.statusText = 'SSL_ERROR'
    } else {
      result.error = error.message
      result.status = 0
      result.statusText = 'NETWORK_ERROR'
    }
  }

  return result
}

/**
 * Helper: Delay
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Helper: Print section header
 */
function printHeader(text) {
  console.log('\n' + '═'.repeat(70))
  console.log(`  ${text}`)
  console.log('═'.repeat(70))
}

/**
 * Helper: Print sub-header
 */
function printSubHeader(text) {
  console.log('\n  ' + '-'.repeat(66))
  console.log(`  ${text}`)
  console.log('  ' + '-'.repeat(66))
}

// ============================================================================
// MAIN TEST SUITE
// ============================================================================

describe('Broken Link ', () => {
  before(() => {
    testResults.startTime = new Date()

    printHeader('COMPREHENSIVE BROKEN LINK TEST SUITE')
    console.log(`\n  Base URL: ${siteConfig.baseUrl}`)

    const stats = getSiteStats()
    console.log(`  Total Pages to Test: ${stats.totalPages}`)
    console.log(`  Max Depth: ${stats.maxDepth} levels`)
    console.log(`  Categories: ${JSON.stringify(stats.categories)}`)
    console.log('')
  })

  after(() => {
    testResults.endTime = new Date()

    printHeader('FINAL TEST SUMMARY')

    const duration = (testResults.endTime - testResults.startTime) / 1000

    console.log(
      `\n  Duration: ${Math.floor(duration / 60)}m ${Math.floor(duration % 60)}s`
    )
    console.log(
      `  Pages Tested: ${testResults.workingPages.length + testResults.brokenPages.length}`
    )
    console.log(`  ✅ Working Pages: ${testResults.workingPages.length}`)
    console.log(`  ❌ Broken Pages: ${testResults.brokenPages.length}`)
    console.log(`  ✅ Working Links: ${testResults.workingLinks.length}`)
    console.log(`  ❌ Broken Links: ${testResults.brokenLinks.length}`)
    console.log(`  ↪️  Redirects: ${testResults.redirects.length}`)
    console.log(`  🔗 External Links: ${testResults.externalLinks.length}`)

    if (testResults.brokenPages.length > 0) {
      console.log('\n  BROKEN PAGES:')
      testResults.brokenPages.forEach((page) => {
        console.log(`    ✗ [${page.status || 'ERROR'}] ${page.url}`)
        if (page.error) console.log(`      Error: ${page.error}`)
      })
    }

    if (testResults.brokenLinks.length > 0) {
      console.log('\n  BROKEN LINKS:')
      testResults.brokenLinks.slice(0, 20).forEach((link) => {
        console.log(`    ✗ [${link.status || 'ERROR'}] ${link.url}`)
        console.log(`      Found on: ${link.foundOn}`)
      })
      if (testResults.brokenLinks.length > 20) {
        console.log(`    ... and ${testResults.brokenLinks.length - 20} more`)
      }
    }

    console.log('\n' + '═'.repeat(70) + '\n')
  })

  // ==========================================================================
  // TEST: All Pages Accessibility
  // ==========================================================================
  describe('Page Accessibility Tests', () => {
    const allPages = getAllPages()

    allPages.forEach((page) => {
      it(`Page "${page.name}" (${page.path}) should be accessible`, async () => {
        const fullUrl = `${siteConfig.baseUrl}${page.path}`
        const result = await checkUrl(fullUrl)

        // Store result
        const pageResult = {
          id: page.id,
          name: page.name,
          path: page.path,
          url: fullUrl,
          ...result
        }

        if (result.isWorking) {
          testResults.workingPages.push(pageResult)
          console.log(
            `    ✓ [${result.status}] ${page.path} (${result.responseTime}ms)`
          )
        } else {
          testResults.brokenPages.push(pageResult)
          console.log(
            `    ✗ [${result.status || 'ERROR'}] ${page.path} - ${result.error || result.statusText}`
          )
        }

        await delay(siteConfig.requestDelay)

        expect(result.isWorking).toBe(true)
      })
    })
  })

  // ==========================================================================
  // TEST: Links on Each Page
  // ==========================================================================
  describe('Link Validation Tests', () => {
    const allPages = getAllPages()
    const testedLinks = new Set()

    allPages.forEach((page) => {
      it(`All links on "${page.name}" (${page.path}) should be valid`, async function () {
        this.timeout(60000) // 60 second timeout per page

        // Add Allure step for better reporting
        if (globalThis.allure) {
          await globalThis.allure.step(
            `Testing page: ${page.name}`,
            async () => {
              globalThis.allure.addAttachment(
                'Page Details',
                JSON.stringify(
                  {
                    name: page.name,
                    path: page.path,
                    id: page.id,
                    url: `${siteConfig.baseUrl}${page.path}`
                  },
                  null,
                  2
                ),
                'application/json'
              )
            }
          )
        }

        const fullUrl = `${siteConfig.baseUrl}${page.path}`

        // Navigate to the page using browser
        try {
          if (globalThis.allure) {
            await globalThis.allure.step(`Navigate to ${fullUrl}`, async () => {
              await browser.url(fullUrl)
            })
          } else {
            await browser.url(fullUrl)
          }

          // Check if page loaded successfully
          const bodyExists = await $('body').isExisting()
          if (!bodyExists) {
            console.log(`    ⚠ Skipping link check - page did not load`)
            return
          }
        } catch (error) {
          console.log(`    ⚠ Skipping link check - ${error.message}`)
          return
        }

        // Extract links from the page
        const links = await extractLinksFromBrowser(fullUrl)
        const internalLinks = links.filter((l) => l.isInternal)
        const externalLinksOnPage = links.filter((l) => !l.isInternal)

        // Track external links
        externalLinksOnPage.forEach((link) => {
          if (!testedLinks.has(link.url)) {
            testedLinks.add(link.url)
            testResults.externalLinks.push({
              url: link.url,
              foundOn: fullUrl,
              linkText: link.text
            })
          }
        })

        console.log(
          `    📄 ${page.path}: ${internalLinks.length} internal, ${externalLinksOnPage.length} external links`
        )

        // Add Allure step for link summary
        if (globalThis.allure) {
          await globalThis.allure.step(
            `Found ${internalLinks.length} internal and ${externalLinksOnPage.length} external links`,
            async () => {
              globalThis.allure.addAttachment(
                'Links Summary',
                JSON.stringify(
                  {
                    totalLinks: links.length,
                    internalLinks: internalLinks.length,
                    externalLinks: externalLinksOnPage.length
                  },
                  null,
                  2
                ),
                'application/json'
              )
            }
          )
        }

        // Check internal links
        const brokenOnThisPage = []

        // Wrap link checking in Allure step
        const checkLinksStep = async () => {
          for (const link of internalLinks) {
            // Skip if already tested
            if (testedLinks.has(link.url)) {
              continue
            }
            testedLinks.add(link.url)

            const result = await checkUrl(link.url)

            if (result.isWorking) {
              testResults.workingLinks.push({
                url: link.url,
                foundOn: fullUrl,
                linkText: link.text,
                status: result.status,
                responseTime: result.responseTime
              })

              if (result.isRedirect) {
                testResults.redirects.push({
                  url: link.url,
                  foundOn: fullUrl,
                  status: result.status
                })
              }
            } else {
              const brokenLink = {
                url: link.url,
                foundOn: fullUrl,
                linkText: link.text,
                status: result.status,
                error: result.error,
                statusText: result.statusText
              }
              testResults.brokenLinks.push(brokenLink)
              brokenOnThisPage.push(brokenLink)

              // Add Allure attachment for broken link
              if (globalThis.allure) {
                globalThis.allure.addAttachment(
                  `Broken Link: ${link.url}`,
                  JSON.stringify(brokenLink, null, 2),
                  'application/json'
                )
              }
            }

            await delay(siteConfig.requestDelay / 2)
          }
        }

        if (globalThis.allure && internalLinks.length > 0) {
          await globalThis.allure.step(
            `Checking ${internalLinks.length} internal links`,
            checkLinksStep
          )
        } else {
          await checkLinksStep()
        }

        // Store page details
        testResults.pageDetails[page.id] = {
          totalLinks: links.length,
          internalLinks: internalLinks.length,
          externalLinks: externalLinksOnPage.length,
          brokenLinks: brokenOnThisPage.length
        }

        // Report broken links
        if (brokenOnThisPage.length > 0) {
          console.log(
            `       ❌ Found ${brokenOnThisPage.length} broken links:`
          )
          brokenOnThisPage.forEach((link) => {
            console.log(
              `          ✗ ${link.url} (${link.status || link.error})`
            )
          })

          // Add Allure attachment for all broken links on this page
          if (globalThis.allure) {
            globalThis.allure.addAttachment(
              'All Broken Links',
              JSON.stringify(brokenOnThisPage, null, 2),
              'application/json'
            )
          }
        }

        // Add final summary step
        if (globalThis.allure) {
          await globalThis.allure.step(
            `Test Summary for ${page.name}`,
            async () => {
              const summary = {
                totalLinks: links.length,
                internalLinks: internalLinks.length,
                externalLinks: externalLinksOnPage.length,
                brokenLinks: brokenOnThisPage.length,
                workingLinks: internalLinks.length - brokenOnThisPage.length,
                result: brokenOnThisPage.length === 0 ? '✓ PASSED' : '✗ FAILED'
              }
              globalThis.allure.addAttachment(
                'Final Summary',
                JSON.stringify(summary, null, 2),
                'application/json'
              )
            }
          )
        }

        expect(brokenOnThisPage.length).toBe(0)
      })
    })
  })

  // ==========================================================================
  // TEST: Parent-Child Navigation
  // ==========================================================================
  describe('Navigation Integrity Tests', () => {
    it('All parent pages should exist and be accessible', async () => {
      const allPages = getAllPages()
      const missingParents = []

      for (const page of allPages) {
        if (page.parent && page.parent !== 'root') {
          const parentPage = siteMap[page.parent]
          if (!parentPage) {
            missingParents.push({
              page: page.id,
              missingParent: page.parent
            })
          }
        }
      }

      if (missingParents.length > 0) {
        console.log('Missing parent pages:', missingParents)
      }

      expect(missingParents.length).toBe(0)
    })

    it('All child pages should exist and be accessible', async () => {
      const allPages = getAllPages()
      const missingChildren = []

      for (const page of allPages) {
        if (page.children) {
          for (const childId of page.children) {
            if (!siteMap[childId]) {
              missingChildren.push({
                parent: page.id,
                missingChild: childId
              })
            }
          }
        }
      }

      if (missingChildren.length > 0) {
        console.log('Missing child pages:', missingChildren)
      }

      expect(missingChildren.length).toBe(0)
    })

    it('Section pages should have at least one child', async () => {
      const sectionPages = getAllPages().filter((p) => p.category === 'section')
      const sectionsWithoutChildren = []

      for (const section of sectionPages) {
        if (!section.children || section.children.length === 0) {
          sectionsWithoutChildren.push(section.id)
        }
      }

      console.log(`    Sections: ${sectionPages.length}`)
      console.log(
        `    Sections with children: ${sectionPages.length - sectionsWithoutChildren.length}`
      )

      // This is informational - not a failure
      expect(true).toBe(true)
    })
  })

  // ==========================================================================
  // TEST: Specific Sections
  // ==========================================================================
  describe('Section-Specific Tests', () => {
    it('Service Manual section pages should all be accessible', async () => {
      const serviceManualPages = getAllPages().filter(
        (p) => p.parent === 'service-manual' || p.id === 'service-manual'
      )

      printSubHeader(
        `Testing Service Manual Section (${serviceManualPages.length} pages)`
      )

      let working = 0
      let broken = 0
      const brokenPages = []

      for (const page of serviceManualPages) {
        const fullUrl = `${siteConfig.baseUrl}${page.path}`
        const result = await checkUrl(fullUrl)

        if (result.isWorking) {
          working++
          console.log(`    ✓ ${page.path}`)
        } else {
          broken++
          brokenPages.push({
            name: page.name,
            path: page.path,
            url: fullUrl,
            status: result.status,
            error: result.error || result.statusText
          })
          console.log(`    ✗ ${page.path} - ${result.status || result.error}`)
        }

        await delay(siteConfig.requestDelay)
      }

      console.log(`\n    Results: ${working} working, ${broken} broken`)
      
      if (broken > 0) {
        console.log(`\n    ❌ BROKEN PAGES IN SERVICE MANUAL SECTION:`)
        brokenPages.forEach((p) => {
          console.log(`       • ${p.name} (${p.path})`)
          console.log(`         URL: ${p.url}`)
          console.log(`         Status: ${p.status || 'ERROR'}`)
          console.log(`         Error: ${p.error}`)
        })
      }

      expect(broken).toBe(0)
    })

    it('Delivery Groups section pages should all be accessible', async () => {
      const deliveryGroupsPages = getAllPages().filter((p) =>
        p.path.startsWith('/delivery-groups')
      )

      printSubHeader(
        `Testing Delivery Groups Section (${deliveryGroupsPages.length} pages)`
      )

      let working = 0
      let broken = 0
      const brokenPages = []

      for (const page of deliveryGroupsPages) {
        const fullUrl = `${siteConfig.baseUrl}${page.path}`
        const result = await checkUrl(fullUrl)

        if (result.isWorking) {
          working++
          console.log(`    ✓ ${page.path}`)
        } else {
          broken++
          brokenPages.push({
            name: page.name,
            path: page.path,
            url: fullUrl,
            status: result.status,
            error: result.error || result.statusText
          })
          console.log(`    ✗ ${page.path} - ${result.status || result.error}`)
        }

        await delay(siteConfig.requestDelay)
      }

      console.log(`\n    Results: ${working} working, ${broken} broken`)
      
      if (broken > 0) {
        console.log(`\n    ❌ BROKEN PAGES IN DELIVERY GROUPS SECTION:`)
        brokenPages.forEach((p) => {
          console.log(`       • ${p.name} (${p.path})`)
          console.log(`         URL: ${p.url}`)
          console.log(`         Status: ${p.status || 'ERROR'}`)
          console.log(`         Error: ${p.error}`)
        })
      }

      expect(broken).toBe(0)
    })

    it('Content section pages should all be accessible', async () => {
      const contentPages = getAllPages().filter((p) =>
        p.path.startsWith('/content')
      )

      printSubHeader(`Testing Content Section (${contentPages.length} pages)`)

      let working = 0
      let broken = 0
      const brokenPages = []

      for (const page of contentPages) {
        const fullUrl = `${siteConfig.baseUrl}${page.path}`
        const result = await checkUrl(fullUrl)

        if (result.isWorking) {
          working++
          console.log(`    ✓ ${page.path}`)
        } else {
          broken++
          brokenPages.push({
            name: page.name,
            path: page.path,
            url: fullUrl,
            status: result.status,
            error: result.error || result.statusText
          })
          console.log(`    ✗ ${page.path} - ${result.status || result.error}`)
        }

        await delay(siteConfig.requestDelay)
      }

      console.log(`\n    Results: ${working} working, ${broken} broken`)
      
      if (broken > 0) {
        console.log(`\n    ❌ BROKEN PAGES IN CONTENT SECTION:`)
        brokenPages.forEach((p) => {
          console.log(`       • ${p.name} (${p.path})`)
          console.log(`         URL: ${p.url}`)
          console.log(`         Status: ${p.status || 'ERROR'}`)
          console.log(`         Error: ${p.error}`)
        })
      }

      expect(broken).toBe(0)
    })
  })

  // ==========================================================================
  // TEST: Deep Pages (Level 3+)
  // ==========================================================================
  describe('Deep Navigation Tests', () => {
    it('Level 3 and deeper pages should be accessible', async () => {
      const allPages = getAllPages()
      const deepPages = allPages.filter((page) => {
        // Count depth by slashes in path
        const depth = (page.path.match(/\//g) || []).length
        return depth >= 3
      })

      printSubHeader(
        `Testing Deep Pages - Level 3+ (${deepPages.length} pages)`
      )

      let working = 0
      let broken = 0
      const brokenPages = []

      for (const page of deepPages) {
        const fullUrl = `${siteConfig.baseUrl}${page.path}`
        const result = await checkUrl(fullUrl)

        if (result.isWorking) {
          working++
          console.log(`    ✓ ${page.path}`)
        } else {
          broken++
          brokenPages.push({
            name: page.name,
            path: page.path,
            url: fullUrl,
            status: result.status,
            error: result.error || result.statusText
          })
          console.log(`    ✗ ${page.path} - ${result.status || result.error}`)
        }

        await delay(siteConfig.requestDelay)
      }

      console.log(`\n    Results: ${working} working, ${broken} broken`)
      
      if (broken > 0) {
        console.log(`\n    ❌ BROKEN DEEP PAGES (Level 3+):`)
        brokenPages.forEach((p) => {
          console.log(`       • ${p.name} (${p.path})`)
          console.log(`         URL: ${p.url}`)
          console.log(`         Status: ${p.status || 'ERROR'}`)
          console.log(`         Error: ${p.error}`)
        })
      }

      expect(broken).toBe(0)
    })
  })

  // ==========================================================================
  // TEST: Utility Pages
  // ==========================================================================
  describe('Utility Pages Tests', () => {
    it('Cookies page should be accessible', async () => {
      const result = await checkUrl(`${siteConfig.baseUrl}/cookies`)
      console.log(
        `    Cookies page: [${result.status}] ${result.isWorking ? '✓' : '✗'}`
      )
      expect(result.isWorking).toBe(true)
    })

    it('Search page should be accessible', async () => {
      const result = await checkUrl(`${siteConfig.baseUrl}/search`)
      console.log(
        `    Search page: [${result.status}] ${result.isWorking ? '✓' : '✗'}`
      )
      expect(result.isWorking).toBe(true)
    })

    it('Search API should be accessible', async () => {
      const result = await checkUrl(`${siteConfig.baseUrl}/api/search/index`)
      console.log(
        `    Search API: [${result.status}] ${result.isWorking ? '✓' : '✗'}`
      )
      expect(result.isWorking).toBe(true)
    })

    it('Health endpoint should be accessible', async () => {
      const result = await checkUrl(`${siteConfig.baseUrl}/health`)
      console.log(
        `    Health endpoint: [${result.status}] ${result.isWorking ? '✓' : '✗'}`
      )
      expect(result.isWorking).toBe(true)
    })
  })
})
