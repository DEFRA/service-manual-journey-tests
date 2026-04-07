import fs from 'fs'
import path from 'path'

/**
 * Copies accessibility reports to Allure report directory after Allure generation.
 * Kept for backwards compatibility (local usage).
 */
export function copyAccessibilityReportsToAllure() {
  const sourceReportsDir = path.join('./reports')
  const destReportsDir = path.join('./allure-report/reports')

  // Only proceed if source reports exist
  if (!fs.existsSync(sourceReportsDir)) {
    return
  }

  // Create destination directory
  if (!fs.existsSync(destReportsDir)) {
    fs.mkdirSync(destReportsDir, { recursive: true })
  }

  // Copy all HTML files
  const files = fs.readdirSync(sourceReportsDir)
  files.forEach((file) => {
    if (file.endsWith('.html')) {
      const sourcePath = path.join(sourceReportsDir, file)
      const destPath = path.join(destReportsDir, file)
      fs.copyFileSync(sourcePath, destPath)
    }
  })
}

/**
 * Reads all accessibility HTML reports from ./reports and returns their
 * content as a base64-encoded JSON array.
 * Each entry: { name: 'filename.html', content: '<html>...' }
 */
function getEmbeddedReportsData() {
  const sourceReportsDir = path.join('./reports')

  if (!fs.existsSync(sourceReportsDir)) {
    return null
  }

  const files = fs.readdirSync(sourceReportsDir).filter((f) => f.endsWith('.html'))

  if (files.length === 0) {
    return null
  }

  const reports = files.map((file) => ({
    name: file,
    content: fs.readFileSync(path.join(sourceReportsDir, file), 'utf8')
  }))

  return Buffer.from(JSON.stringify(reports)).toString('base64')
}

/**
 * Integrates accessibility plugin into the generated Allure report.
 * Embeds the accessibility report HTML content directly into the Allure
 * index.html so it works on any server without needing separate file access.
 */
export function integrateAccessibilityPlugin() {
  const allureReportDir = path.join('./allure-report')
  const allureIndexPath = path.join(allureReportDir, 'index.html')
  const allurePluginDir = path.join(allureReportDir, 'plugin', 'accessibility')

  // Check if allure report exists
  if (!fs.existsSync(allureIndexPath)) {
    return
  }

  // Create plugin directory if it doesn't exist
  if (!fs.existsSync(allurePluginDir)) {
    fs.mkdirSync(allurePluginDir, { recursive: true })
  }

  // Copy the plugin file
  const pluginSourcePath = path.join(
    './allure-accessibility-plugin',
    'index.js'
  )
  const pluginDestPath = path.join(allurePluginDir, 'index.js')

  if (!fs.existsSync(pluginSourcePath)) {
    return
  }

  fs.copyFileSync(pluginSourcePath, pluginDestPath)

  // Read the Allure index.html
  let indexContent = fs.readFileSync(allureIndexPath, 'utf8')

  // Embed accessibility report data as a base64 script variable
  const embeddedData = getEmbeddedReportsData()
  const dataScript = embeddedData
    ? `    <script>window.__ACCESSIBILITY_REPORTS_DATA__ = "${embeddedData}";</script>\n`
    : `    <script>window.__ACCESSIBILITY_REPORTS_DATA__ = null;</script>\n`

  // Add data + plugin script tags before the closing body tag
  const injectedScripts =
    dataScript +
    '    <script src="plugin/accessibility/index.js"></script>\n</body>'
  indexContent = indexContent.replace('</body>', injectedScripts)

  // Write the modified index.html back
  fs.writeFileSync(allureIndexPath, indexContent)
}

/**
 * Main function to handle all accessibility integration after Allure report generation
 */
export function integrateAccessibilityWithAllure() {
  try {
    copyAccessibilityReportsToAllure()
    integrateAccessibilityPlugin()
  } catch (error) {
    console.error('[Accessibility Integration] Error:', error.message)
  }
}
