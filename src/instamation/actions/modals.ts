/**
 * @description   Functions to interact with the Modals ie web specific, Turn on Notifications
 */
import puppeteer from 'puppeteer'

import { MAIN_MODAL_HEADER_SELECTOR } from '@selectors'
import { InstamationAction } from '@instamation/interfaces/instamation-action.interfaces';

const TURN_OFF_NOTIFICATIONS_MODAL_HEADER_TEXT = 'Turn on Notifications'
const TURN_OFF_NOTIFICATIONS_BUTTON_LABEL = 'Not Now'

/**
 * @description   Instamation action that checks to see if "Turn On Notifications" modal is open, and if open, will close it by clicking a "no" option
 */
export const closeTurnOnNotificationsModalIfOpen = (): InstamationAction => async (tab: puppeteer.Page): Promise<void> => {
  if (await isTurnOnNotificationsModalActive(tab)) {
    // click button with text "Not Now" inside the dialog
    // we don't want to deal with Notifications within the web app
    const [button] = await tab.$x("//button[contains(., '"+TURN_OFF_NOTIFICATIONS_BUTTON_LABEL+"')]")
    if (button) {
      await button.click()
    }
  }
}

//
// Helpers
const isTurnOnNotificationsModalActive = async(tab: puppeteer.Page): Promise<boolean> => {
  const modalHeader = await tab.$(MAIN_MODAL_HEADER_SELECTOR)
  const modalHeaderText = await tab.evaluate(el => el.textContent, modalHeader);

  return modalHeader !== null && modalHeaderText === TURN_OFF_NOTIFICATIONS_MODAL_HEADER_TEXT
}