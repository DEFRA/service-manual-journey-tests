import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page'

class CookiesPage extends Page {
  get mainHeading() {
    return $('h1')
  }

  get acceptRadio() {
  return $('input[name="analytics"][value="yes"]')
  }

  get rejectRadio() {
  return $('input[name="analytics"][value="no"]')
  }

  get saveButton() {
  return $('#cookies-form button[type="submit"]')
  }

  get successNotification() {
    return $('.govuk-notification-banner--success')
  }

  get cookieForm() {
  return $('#cookies-form')
  }

  open() {
    return super.open('/cookies')
  }

  async acceptCookies() {
    const radioExists = await this.acceptRadio.isExisting()
    if (!radioExists) {
      // If analytics section is not present (GTM not configured), skip clicking radio
      return
    }
    await this.acceptRadio.click()
    await this.saveButton.click()
  }

  async rejectCookies() {
    await this.rejectRadio.click()
    await this.saveButton.click()
  }

  async isSuccessNotificationDisplayed() {
    return this.successNotification.isDisplayed()
  }

  async submitForm() {
    await this.saveButton.click()
  }
}

export default new CookiesPage()
