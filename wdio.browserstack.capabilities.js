/**
 * BrowserStack capabilities for cross-browser testing
 * Optimized for coverage with reduced redundancy (6 configurations)
 */

export const browserStackCapabilities = [
  // Windows 11 - Chrome (most common desktop browser)
  {
    browserName: 'Chrome',
    'bstack:options': {
      browserVersion: 'latest',
      os: 'Windows',
      osVersion: '11',
      resolution: '1920x1080',
      idleTimeout: 300
    }
  },

  // Windows 11 - Firefox (Gecko engine coverage)
  {
    browserName: 'Firefox',
    'bstack:options': {
      browserVersion: 'latest',
      os: 'Windows',
      osVersion: '11',
      resolution: '1920x1080',
      idleTimeout: 300
    }
  },

  // macOS Sequoia - Safari (latest WebKit)
  {
    browserName: 'Safari',
    'bstack:options': {
      browserVersion: 'latest',
      os: 'OS X',
      osVersion: 'Sequoia',
      resolution: '1920x1080',
      idleTimeout: 300
    }
  },

  // macOS Monterey - Safari 15.6 (legacy WebKit support)
  {
    browserName: 'Safari',
    'bstack:options': {
      browserVersion: '15.6',
      os: 'OS X',
      osVersion: 'Monterey',
      resolution: '1920x1080',
      idleTimeout: 300
    }
  },

  // iOS 18 - iPhone 16 Safari (mobile WebKit)
  {
    browserName: 'Safari',
    'bstack:options': {
      deviceName: 'iPhone 16',
      osVersion: '18',
      deviceOrientation: 'portrait',
      idleTimeout: 300
    }
  },

  // Android 13 - Samsung Galaxy S23 Chrome (mobile Chrome)
  {
    browserName: 'Chrome',
    'bstack:options': {
      deviceName: 'Samsung Galaxy S23',
      osVersion: '13.0',
      deviceOrientation: 'portrait',
      idleTimeout: 300
    }
  }
]
