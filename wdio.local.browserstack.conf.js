import { browserStackCapabilities } from './wdio.browserstack.capabilities.js'

const oneMinute = 60 * 1000

export const config = {
  runner: 'local',

  // Local development server
  baseUrl: 'http://localhost:3000',

  // BrowserStack credentials
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_KEY,

  hostname: 'hub-cloud.browserstack.com',

  // Tests to run
  specs: ['./test/specs/**/*.js'],
  // Exclude accessibility tests - WCAG compliance only needs testing on one browser
  exclude: ['./test/specs/accessibility.e2e.js'],

  maxInstances: 5,

  // Map capabilities to add build name and project name
  capabilities: browserStackCapabilities.map((cap) => ({
    ...cap,
    'bstack:options': {
      ...cap['bstack:options'],
      projectName: 'service-manual-journey-tests',
      buildName: `service-manual-local-${new Date().toISOString().split('T')[0]}`
    }
  })),

  services: [
    [
      'browserstack',
      {
        testObservability: true,
        testObservabilityOptions: {
          user: process.env.BROWSERSTACK_USERNAME,
          key: process.env.BROWSERSTACK_KEY,
          projectName: 'service-manual-journey-tests',
          buildName: `service-manual-local-${new Date().toISOString().split('T')[0]}`
        },
        acceptInsecureCerts: true,
        forceLocal: true,
        browserstackLocal: true
      }
    ]
  ],

  execArgv: ['--loader', 'esm-module-alias/loader'],

  logLevel: 'info',

  logLevels: {
    webdriver: 'error'
  },

  bail: 0,
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',

  reporters: [
    [
      'spec',
      {
        addConsoleLogs: true,
        realtimeReporting: true,
        color: false
      }
    ],
    [
      'allure',
      {
        outputDir: 'allure-results'
      }
    ]
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: oneMinute * 2
  },

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (error) {
      try {
        await browser.takeScreenshot()
        // Mark session as failed in BrowserStack
        await browser.execute(
          'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Test assertion failed"}}'
        )
      } catch {
        // Session may have already closed - ignore errors
      }
    }
  }
}
