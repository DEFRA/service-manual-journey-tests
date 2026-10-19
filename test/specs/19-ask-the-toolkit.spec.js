import { browser, expect } from '@wdio/globals'

import AskTheToolkitPage from '../page-objects/ask-the-toolkit.page'

// Ask is switched off in prod until it launches on 26 October 2026, so the
// page is a 404 there. Remove this guard once it is live.
const askIsOn = process.env.ENVIRONMENT !== 'prod'

const question = 'How do I report an AI incident?'
const followUp = 'Who should I contact first?'

// Each run makes two real model calls, which count towards the environment's
// daily ceiling.
;(askIsOn ? describe : describe.skip)('Ask the toolkit', () => {
  before(async () => {
    await AskTheToolkitPage.open()
  })

  it('shows the question box on the front door', async () => {
    await expect(AskTheToolkitPage.pageHeading).toHaveText('Ask the toolkit')
    await expect(AskTheToolkitPage.questionField).toBeDisplayed()
  })

  it('answers a question with a link to the guidance it came from', async () => {
    await AskTheToolkitPage.ask(question, 1)

    await expect(AskTheToolkitPage.turns).toBeElementsArrayOfSize(1)
    await expect(await AskTheToolkitPage.latestQuestion()).toHaveText(question)
    await expect(await AskTheToolkitPage.latestAnswer()).toBeDisplayed()
    await expect(
      await AskTheToolkitPage.latestSourceLinks()
    ).toBeElementsArrayOfSize({
      gte: 1
    })
  })

  it('answers a follow-up in the same conversation', async () => {
    await AskTheToolkitPage.ask(followUp, 2)

    await expect(AskTheToolkitPage.turns).toBeElementsArrayOfSize(2)
    await expect(await AskTheToolkitPage.latestQuestion()).toHaveText(followUp)
    await expect(await AskTheToolkitPage.latestAnswer()).toBeDisplayed()
  })

  it('starts a new conversation after asking to confirm', async () => {
    await AskTheToolkitPage.startNewConversationLink.click()

    await expect(browser).toHaveUrl(/\/ai-toolkit\/ask\/restart$/)
    await expect(AskTheToolkitPage.pageHeading).toHaveText(
      'Start a new conversation'
    )

    await AskTheToolkitPage.confirmStartNewConversationButton.click()

    await expect(browser).toHaveUrl(/\/ai-toolkit\/ask$/)
    await expect(AskTheToolkitPage.pageHeading).toHaveText('Ask the toolkit')
    await expect(AskTheToolkitPage.questionField).toHaveValue('')
  })
})
