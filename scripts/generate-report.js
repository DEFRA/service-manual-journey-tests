#!/usr/bin/env node
/**
 * Generates the Allure report using the locally installed allure-commandline.
 * Uses execSync with a quoted path so spaces in the workspace path are handled.
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const isWin = process.platform === 'win32'
const allureBinName = isWin ? 'allure.bat' : 'allure'
const allureBin = path.join(
  root,
  'node_modules',
  'allure-commandline',
  'dist',
  'bin',
  allureBinName
)

if (!fs.existsSync(allureBin)) {
  console.error(allureBinName + ' not found at:', allureBin)
  console.error('Run: npm install')
  process.exit(1)
}

const singleFile = process.argv.includes('--single-file')
const generateFlags = singleFile ? '--single-file --clean' : '--clean'

console.log('\nGenerating Allure report...')
execSync(`"${allureBin}" generate allure-results ${generateFlags}`, {
  stdio: 'inherit',
  cwd: root
})
console.log('Report generated in allure-report/')

// Run the accessibility integration plugin
console.log('\nRunning accessibility integration...')
const { integrateAccessibilityWithAllure } = await import(
  '../allure-accessibility-plugin/allure-accessibility-integration.js'
)
await integrateAccessibilityWithAllure()
console.log('Done.')
