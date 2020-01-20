/**
 * @description   Functions to interact with the Modals ie web specific, Turn on Notifications
 */
import puppeteer from 'puppeteer'

import { MAIN_MODAL_HEADER } from '@selectors'

const TURN_OFF_NOTIFICATIONS_MODAL_HEADER_TEXT = 'Turn on Notifications'
const TURN_OFF_NOTIFICATIONS_BUTTON_LABEL = 'Not Now'

//
// Turn On Notifications Modal
const isTurnOnNotificationsModalActive = async(page: puppeteer.Page): Promise<boolean> => {
  const modalHeader = await page.$(MAIN_MODAL_HEADER)
  const modalHeaderText = await page.evaluate(el => el.textContent, modalHeader);

  return modalHeader !== null && modalHeaderText === TURN_OFF_NOTIFICATIONS_MODAL_HEADER_TEXT
}

export const closeTurnOnNotificationsModalIfOpen = async(page: puppeteer.Page): Promise<any> => {
  if (await isTurnOnNotificationsModalActive(page)) {
    // click button with text "Not Now" inside the dialog
    // we don't want to deal with Notifications within the web app
    const [button] = await page.$x("//button[contains(., '"+TURN_OFF_NOTIFICATIONS_BUTTON_LABEL+"')]")
    if (button) {
      await button.click()
    }
  }
}
