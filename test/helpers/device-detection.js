/**
 * Device detection utilities for BrowserStack testing
 */

/**
 * Check if the current test is running on a mobile device
 * Checks multiple capability properties to detect mobile devices
 * @returns {boolean} True if running on mobile device
 */
export function isMobileDevice() {
  const caps = browser.capabilities || {}
  const bstackOptions = caps['bstack:options'] || {}

  // Check for device name in bstack:options
  if (bstackOptions.deviceName) {
    return true
  }

  // Check for mobile platform names
  const platformName = (caps.platformName || '').toLowerCase()
  if (platformName === 'ios' || platformName === 'android') {
    return true
  }

  // Check for mobile browser names
  const browserName = (caps.browserName || '').toLowerCase()
  if (
    browserName.includes('android') ||
    browserName.includes('iphone') ||
    browserName.includes('ipad')
  ) {
    return true
  }

  // Check device property directly on capabilities
  if (caps.device || caps.deviceName) {
    return true
  }

  return false
}

/**
 * Check if the current test is running on a desktop browser
 * @returns {boolean} True if running on desktop browser
 */
export function isDesktopBrowser() {
  return !isMobileDevice()
}
