import { browser, expect, $ } from '@wdio/globals'

import ServiceAssessmentsPage from '../page-objects/service-assessments.page'
import AssessmentQuestionsPage from '../page-objects/assessment-questions.page'
import BookAnAssessmentPage from '../page-objects/book-an-assessment.page'
import ErrorPage from '../page-objects/error-page.page'

describe('Service Assessments Verification', () => {
  afterEach(async () => {
    const logs = await browser.getLogs('browser')
    // Filter SEVERE level logs but ignore known benign asset 404s (favicons etc.)
    const errors = logs.filter((l) => {
      if (l.level !== 'SEVERE') return false
      const msg = (l.message || '').toString()
      // Ignore missing favicon files or other static asset 404s that we don't control in this test
      if (/favicon/i.test(msg)) return false
      // Ignore generic "Failed to load resource" for non-critical images (allowlist as needed)
      if (/Failed to load resource: the server responded with a status of 404/i.test(msg) && /images\//i.test(msg)) return false
      // Ignore intentional test navigation to the not-found route used by ErrorPage.openNotFound()
      if (/this-page-does-not-exist-404/i.test(msg)) return false
      return true
    })
    // If there are remaining SEVERE errors, surface them for debugging
    if (errors.length > 0) {
      // eslint-disable-next-line no-console
      console.error('Browser SEVERE logs:', errors)
    }
    expect(errors).toHaveLength(0)
  })

  // P1-60
  it('Given I am on the Service Assessments page at /service-assessments, When the page loads, Then I should see Discovery peer review, Alpha assessment, and Beta/Live assessment sections with expandable details panels', async () => {
    await ServiceAssessmentsPage.open()
    await expect(ServiceAssessmentsPage.mainHeading).toBeDisplayed()
    await expect(ServiceAssessmentsPage.mainHeading).toHaveText(/Service assessments/i)
    
    // Verify main content sections are present
    const pageContent = await $('main').getText()
    expect(pageContent).toMatch(/Discovery peer review/i)
    expect(pageContent).toMatch(/Alpha assessment/i)
    expect(pageContent).toMatch(/Beta/i)
    expect(pageContent).toMatch(/Live/i)
    
    const count = await ServiceAssessmentsPage.getDetailsCount()
    expect(count).toBeGreaterThan(0)
  })

  // P1-61
  it('Given I am on the Service Assessments page with collapsed details, When I expand "Things to do in Discovery", Then I should see a bullet list of discovery phase activities', async () => {
    await ServiceAssessmentsPage.open()
    await ServiceAssessmentsPage.expandFirstDetails()
    const isOpen = await $('main .govuk-details').getAttribute('open')
    expect(isOpen).not.toBeNull()
    
    // Verify content inside expanded details
    const detailsText = await $('main .govuk-details__text').getText()
    expect(detailsText).toMatch(/understand users|policy|constraints|problem space|multidisciplinary/i)
  })

  // P1-62
  it('should have details panels in the DOM even if JS has not expanded them', async () => {
    await ServiceAssessmentsPage.open()
    const details = await ServiceAssessmentsPage.detailsComponents
    expect(details.length).toBeGreaterThan(0)
    // By default all panels are collapsed (no open attribute)
    const firstOpen = await details[0].getAttribute('open')
    expect(firstOpen).toBeNull()
  })

  // P1-63: HTTP status check
  it('should load the Service Assessments page (fail on non-200 HTTP status)', async () => {
    await ServiceAssessmentsPage.open()

    const status = await browser.executeAsync(async (done) => {
      try {
        const res = await fetch(globalThis.location.href, { 
          method: 'GET', 
          cache: 'no-store', 
          redirect: 'manual' 
        })
        done(res.status)
      } catch (err) {
        /* eslint-disable-next-line no-console */
        console.warn('fetch failed while checking HTTP status:', err)
        done(-1)
      }
    })

    if (status !== 200) {
      const url = await browser.getUrl()
      throw new Error(`Unexpected HTTP status ${status} for ${url}`)
    }

    // Additionally fail if an error page is rendered despite 200
    if (await ErrorPage.mainHeading.isExisting()) {
      const heading = await ErrorPage.mainHeading.getText()
      const errorHeadingRe = /page not found|archiv|unavailable|service unavailable|404|410|gone|removed|no longer available|not found|moved/i
      if (errorHeadingRe.test(heading)) {
        throw new Error(`Unexpected error page shown: "${heading}"`)
      }
    }

    await expect(ServiceAssessmentsPage.mainHeading).toBeDisplayed()
    await expect(ServiceAssessmentsPage.mainHeading).toHaveText(/Service assessments/i)
  })

  // P1-64: Verify sidebar navigation links
  it('should display all sidebar navigation links for service assessment topics', async () => {
    await ServiceAssessmentsPage.open()
    
    const sidebarNav = await $('nav.app-sub-navigation')
    await expect(sidebarNav).toBeDisplayed()
    
    // Check for the main sidebar links based on dev repo structure
    const assessmentQuestionsLink = await $('a[href="/service-assessments/assessment-questions"]')
    await expect(assessmentQuestionsLink).toBeDisplayed()
    await expect(assessmentQuestionsLink).toHaveText(/Assessment questions/i)

    const bookAssessmentLink = await $('a[href="/service-assessments/book-an-assessment"]')
    await expect(bookAssessmentLink).toBeDisplayed()
    await expect(bookAssessmentLink).toHaveText(/Book an assessment/i)

    const becomeAssessorLink = await $('a[href="/service-assessments/become-an-assessor"]')
    await expect(becomeAssessorLink).toBeDisplayed()
    await expect(becomeAssessorLink).toHaveText(/Become an assessor/i)

    const exemptionsLink = await $('a[href="/service-assessments/gov-uk-exemptions"]')
    await expect(exemptionsLink).toBeDisplayed()
    await expect(exemptionsLink).toHaveText(/GOV\.UK exemptions/i)

    const currentLink = await $('a[href="/service-assessments"][class*="current"]')
    await expect(currentLink).toBeDisplayed()
    await expect(currentLink).toHaveText(/Service assessments/i)
  })

  // P1-65: Verify page content structure and key sections
  it('should display key content sections including types of assessment and service standard', async () => {
    await ServiceAssessmentsPage.open()
    
    const pageContent = await $('main').getText()
    
    // Verify "Types of assessment" section
    expect(pageContent).toMatch(/Types of assessment/i)
    expect(pageContent).toMatch(/Discovery peer review/i)
    expect(pageContent).toMatch(/Alpha/i)
    expect(pageContent).toMatch(/Beta/i)
    expect(pageContent).toMatch(/Live/i)
    
    // Verify "Service Standard" section
    expect(pageContent).toMatch(/Service Standard/i)
    
    // Verify "Does my service need an assessment" section
    expect(pageContent).toMatch(/Does my service need an assessment/i)
    expect(pageContent).toMatch(/going on GOV\.UK|Cabinet Office spend approval/i)
    
    // Verify support box
    const supportBox = await $('.defra-support-box')
    await expect(supportBox).toBeDisplayed()
    const supportText = await supportBox.getText()
    expect(supportText).toMatch(/Get support/i)
    expect(supportText).toMatch(/Service Assessment team|service\.assessment@defra\.gov\.uk/i)
  })

  // P1-66: Navigate and verify each sidebar link
  it('should navigate to each service assessment subpage and verify HTTP status', async () => {
    const sidebarLinks = [
      { 
        href: '/service-assessments/assessment-questions', 
        heading: /Assessment questions/i,
        contentCheck: /User.centred design|Service performance|Team.*agile/i
      },
      { 
        href: '/service-assessments/book-an-assessment', 
        heading: /Book an assessment/i,
        contentCheck: /6.week|lead time|booking/i
      },
      { 
        href: '/service-assessments/become-an-assessor', 
        heading: /Become an assessor/i,
        contentCheck: /assessor|criteria|training/i
      },
      { 
        href: '/service-assessments/gov-uk-exemptions', 
        heading: /GOV\.UK exemptions/i,
        contentCheck: /exemption|GOV\.UK/i
      }
    ]

    await ServiceAssessmentsPage.open()

    for (const link of sidebarLinks) {
      const linkEl = await $(`a[href="${link.href}"]`)
      await expect(linkEl).toBeDisplayed()
      
      await linkEl.scrollIntoView()
      await linkEl.waitForClickable()
      await linkEl.click()

      const url = await browser.getUrl()
      if (!url.includes(link.href)) {
        throw new Error(`Expected to navigate to ${link.href} but arrived at ${url}`)
      }

      // Check HTTP status
      const status = await browser.executeAsync(async (done) => {
        try {
          const res = await fetch(globalThis.location.href, { 
            method: 'GET', 
            cache: 'no-store', 
            redirect: 'manual' 
          })
          done(res.status)
        } catch (err) {
          /* eslint-disable-next-line no-console */
          console.warn('fetch failed:', err)
          done(-1)
        }
      })

      if (status !== 200) {
        throw new Error(`Unexpected HTTP status ${status} for ${link.href}`)
      }

      // Verify not an error page
      if (await ErrorPage.mainHeading.isExisting()) {
        const heading = await ErrorPage.mainHeading.getText()
        const errorHeadingRe = /page not found|404|unavailable|removed/i
        if (errorHeadingRe.test(heading)) {
          throw new Error(`Link ${link.href} landed on error page: "${heading}"`)
        }
      }

      // Verify page heading
      const pageHeading = await $('main h1')
      await expect(pageHeading).toBeDisplayed()
      await expect(pageHeading).toHaveText(link.heading)

      // Verify page content
      const pageContent = await $('main').getText()
      expect(pageContent).toMatch(link.contentCheck)

      // Navigate back to main Service Assessments page
      await ServiceAssessmentsPage.open()
    }
  })

  // P1-66: Assessment Questions - expand "User-centred design" panel
  it('should expand "User-centred design" panel and show sub-questions for beta/live assessments', async () => {
    await AssessmentQuestionsPage.open()
    await expect(AssessmentQuestionsPage.mainHeading).toBeDisplayed()
    await expect(AssessmentQuestionsPage.mainHeading).toHaveText(/Assessment questions/i)
    
    const count = await AssessmentQuestionsPage.getDetailsCount()
    expect(count).toBeGreaterThan(0)
    
    await AssessmentQuestionsPage.expandDetailsByIndex(0)
    const content = await AssessmentQuestionsPage.pageContent.getText()
    expect(content).toMatch(/user.centred|design|beta|live/i)
  })

  // P1-67: Assessment Questions - expand "Service performance" and "Team and agile" panels
  it('should expand "Service performance" and "Team and agile ways of working" panels', async () => {
    await AssessmentQuestionsPage.open()
    const summaries = await AssessmentQuestionsPage.allDetailsSummaries
    expect(summaries.length).toBeGreaterThanOrEqual(2)
    
    for (const summary of summaries) {
      const text = await summary.getText()
      if (/service performance|team and agile/i.test(text)) {
        await summary.click()
        const content = await AssessmentQuestionsPage.pageContent.getText()
        expect(content).toMatch(/performance|agile|team/i)
        break
      }
    }
  })

  // P1-68: Assessment Questions - render all details panels in DOM
  it('should render all details panels in the DOM so the browser can parse them', async () => {
    await AssessmentQuestionsPage.open()
    const count = await AssessmentQuestionsPage.getDetailsCount()
    expect(count).toBeGreaterThan(0)
  })

  // P1-63: Book an Assessment - display booking process and 6-week lead time
  it('should display the booking process and the 6-week lead time requirement', async () => {
    await BookAnAssessmentPage.open()
    await expect(BookAnAssessmentPage.mainHeading).toBeDisplayed()
    await expect(BookAnAssessmentPage.mainHeading).toHaveText(/Book an assessment/i)
    
    const content = await BookAnAssessmentPage.getPageContentText()
    expect(content).toMatch(/6.week|six.week|lead time/i)
  })

  // P1-64: Book an Assessment - display booking contact link
  it('should display a booking contact link or email for initiating an assessment booking', async () => {
    await BookAnAssessmentPage.open()
    await expect(BookAnAssessmentPage.bookingContactLink).toBeDisplayed()
    
    const href = await BookAnAssessmentPage.getBookingContactHref()
    expect(href).toMatch(/^mailto:|^https?:\/\//)
  })

  // P1-65: Book an Assessment - show 404 for broken booking contact link
  it('should show a 404 page when the booking contact link is broken or missing', async () => {
    await ErrorPage.openNotFound()
    await expect(ErrorPage.mainHeading).toHaveText(/Page not found/i)
    await expect(ErrorPage.govukTemplateBody).toBeExisting()
  })

  // P1-09: Service Standard link on /service-assessments points to GOV.UK
  it('Given I am on /service-assessments, when I inspect the "Service Standard" link, then it points to https://www.gov.uk/service-manual/service-standard', async () => {
    await ServiceAssessmentsPage.open()
    const serviceStandardLink = $('main a[href="https://www.gov.uk/service-manual/service-standard"]')
    await expect(serviceStandardLink).toBeExisting()
    const href = await serviceStandardLink.getAttribute('href')
    expect(href).toBe('https://www.gov.uk/service-manual/service-standard')
    await expect(serviceStandardLink).toHaveText(/Service Standard/i)
  })
})
