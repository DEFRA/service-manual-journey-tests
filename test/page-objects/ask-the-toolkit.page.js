import { browser, $, $$ } from '@wdio/globals'

import { Page } from '../page-objects/page'

// Real answers come from Bedrock and can take up to the site's own 30 second
// timeout, so wait a little longer than that before calling it a failure.
const answerTimeout = 40 * 1000

class AskTheToolkitPage extends Page {
  get questionField() {
    return $('#question')
  }

  get askButton() {
    // Scoped to the question form: an answer can also carry an options form
    // with its own submit button.
    return $('form:has(#question) button[type="submit"]')
  }

  // The whole conversation shows on one page, one turn per question.
  get turns() {
    return $$('.app-ask__turn')
  }

  async latestTurn() {
    const turns = await this.turns
    return turns[turns.length - 1]
  }

  async latestQuestion() {
    return (await this.latestTurn()).$('.app-ask__asked-text')
  }

  async latestAnswer() {
    return (await this.latestTurn()).$('.app-ask__answer')
  }

  async latestSourceLinks() {
    return (await this.latestTurn()).$$('.app-ask__sources a')
  }

  get startNewConversationLink() {
    return $('.app-ask__restart a')
  }

  get confirmStartNewConversationButton() {
    return $('main form button[type="submit"]')
  }

  open() {
    return super.open('/ai-toolkit/ask')
  }

  async ask(question, answerNumber) {
    await this.questionField.setValue(question)
    await this.askButton.click()
    // The answer page jumps to the new turn, so the address ends #turn-n.
    await browser.waitUntil(
      async () =>
        new URL(await browser.getUrl()).pathname.endsWith(
          `/ai-toolkit/ask/answers/${answerNumber}`
        ),
      {
        timeout: answerTimeout,
        timeoutMsg: `No answer ${answerNumber} after ${answerTimeout / 1000} seconds`
      }
    )
  }
}

export default new AskTheToolkitPage()
