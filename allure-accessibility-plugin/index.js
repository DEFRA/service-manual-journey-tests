/* global allure */
allure.api.addTab('accessibility', {
  title: 'Accessibility Reports',
  icon: 'fa fa-universal-access',
  route: 'accessibility'
})

/**
 * Opens the accessibility report.
 *
 * Strategy:
 * 1. If embedded report data exists (window.__ACCESSIBILITY_REPORTS_DATA__),
 *    open it as a Blob URL — works on any server without needing separate file access.
 * 2. Fallback: try the relative reports/index.html URL (works locally).
 */
function openAccessibilityReport() {
  // Strategy 1: Use embedded data (works on server/S3)
  if (window.__ACCESSIBILITY_REPORTS_DATA__) {
    try {
      var decoded = atob(window.__ACCESSIBILITY_REPORTS_DATA__)
      var reports = JSON.parse(decoded)
      console.log('[Accessibility Plugin] Found ' + reports.length + ' embedded report(s)')

      if (reports.length === 1) {
        var blob = new Blob([reports[0].content], { type: 'text/html' })
        var url = URL.createObjectURL(blob)
        window.open(url, '_blank')
        return
      }

      if (reports.length > 1) {
        var indexHtml = '<!DOCTYPE html><html><head><meta charset="utf-8">'
        indexHtml += '<title>Accessibility Reports</title>'
        indexHtml += '<style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:0 20px}'
        indexHtml += 'h1{color:#333}ul{list-style:none;padding:0}li{margin:10px 0}'
        indexHtml += 'a{color:#005ea5;text-decoration:none;font-size:18px}a:hover{text-decoration:underline}'
        indexHtml += '</style></head><body><h1>Accessibility Reports</h1><ul>'

        for (var i = 0; i < reports.length; i++) {
          var reportBlob = new Blob([reports[i].content], { type: 'text/html' })
          var reportUrl = URL.createObjectURL(reportBlob)
          indexHtml += '<li><a href="' + reportUrl + '" target="_blank">' + reports[i].name + '</a></li>'
        }

        indexHtml += '</ul></body></html>'
        var indexBlob = new Blob([indexHtml], { type: 'text/html' })
        var indexUrl = URL.createObjectURL(indexBlob)
        window.open(indexUrl, '_blank')
        return
      }
    } catch (e) {
      console.error('[Accessibility Plugin] Error decoding embedded data:', e)
    }
  }

  // Strategy 2: Fallback to relative URL (works locally)
  console.log('[Accessibility Plugin] No embedded data, falling back to relative URL')
  var currentUrl = window.location.href.split('#')[0].split('?')[0]
  if (currentUrl.match(/\/[^/]*\.[^/]*$/)) {
    currentUrl = currentUrl.replace(/\/[^/]*$/, '')
  }
  if (currentUrl.charAt(currentUrl.length - 1) !== '/') {
    currentUrl = currentUrl + '/'
  }
  window.open(currentUrl + 'reports/index.html', '_blank')
}

function overrideAccessibilityTab() {
  var accessibilityTab = document.querySelector('a[href="#accessibility"]')
  if (accessibilityTab) {
    accessibilityTab.addEventListener('click', function (event) {
      event.preventDefault()
      event.stopPropagation()
      openAccessibilityReport()
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
