/* global allure */
allure.api.addTab('accessibility', {
  title: 'Accessibility Reports',
  icon: 'fa fa-universal-access',
  route: 'accessibility'
})

/**
 * Build the accessibility reports URL relative to the current page location.
 * Works both locally (file:// or localhost) and on the server where the
 * Allure report is served from a deep path like
 * /test-suites/test-results/dev/0.8.0/.../index.html
 */
function getReportsUrl() {
  var currentUrl = window.location.href
  console.log('[Accessibility Plugin] Current URL:', currentUrl)

  // Strip any hash fragment (#accessibility, etc.)
  var baseUrl = currentUrl.split('#')[0]
  console.log('[Accessibility Plugin] After hash strip:', baseUrl)

  // Strip query string if present
  baseUrl = baseUrl.split('?')[0]
  console.log('[Accessibility Plugin] After query strip:', baseUrl)

  // Get the directory of the current page (remove trailing filename like index.html)
  if (baseUrl.match(/\/[^/]*\.[^/]*$/)) {
    baseUrl = baseUrl.replace(/\/[^/]*$/, '')
    console.log('[Accessibility Plugin] After filename strip:', baseUrl)
  }

  // Ensure trailing slash
  if (baseUrl.charAt(baseUrl.length - 1) !== '/') {
    baseUrl = baseUrl + '/'
  }

  var reportsUrl = baseUrl + 'reports/index.html'
  console.log('[Accessibility Plugin] Final reports URL:', reportsUrl)
  return reportsUrl
}

function overrideAccessibilityTab() {
  var accessibilityTab = document.querySelector('a[href="#accessibility"]')
  if (accessibilityTab) {
    accessibilityTab.addEventListener('click', function (event) {
      event.preventDefault()
      event.stopPropagation()
      window.open(getReportsUrl(), '_blank')
    })
  }
}

// Override the accessibility tab click to navigate to reports
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(overrideAccessibilityTab, 1000)
})

// Also try to override after page load
window.addEventListener('load', function () {
  setTimeout(overrideAccessibilityTab, 500)
})
