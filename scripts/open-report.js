#!/usr/bin/env node
/**
 * Opens the Allure report using the locally installed allure-commandline.
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const allureBin = path.join(
  root,
  'node_modules',
  'allure-commandline',
  'dist',
  'bin',
  'allure.bat'
)

if (!fs.existsSync(allureBin)) {
  console.error('allure.bat not found at:', allureBin)
  process.exit(1)
}

console.log('\nOpening Allure report...')
execSync(`"${allureBin}" open allure-report`, {
  stdio: 'inherit',
  cwd: root
})
