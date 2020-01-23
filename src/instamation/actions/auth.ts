import puppeteer from 'puppeteer'

import { InstamationAction } from '../interfaces/instamation-action.interfaces'
import { InstamationActionsPipeFactory } from '@instamation/factories/instamation-actions.factory'

import { goTo, waitForNavigation } from './navigation'
import { click, type, ifThen } from './utilities'
import { log } from './console'

import { getInstagramLoginUrl } from '@instamation/helpers/urls'
import { InstamationAuthOptions } from '@instamation/interfaces/instamation-options.interfaces'
import { 
  FORM_AUTH_USERNAME_INPUT_SELECTOR,
  FORM_AUTH_PASSWORD_INPUT_SELECTOR,
  FORM_AUTH_SUBMIT_BUTTON_SELECTOR
} from '@selectors'
import { isTurnOnNotificationsModalActive, closeTurnOnNotificationsModal } from './modals'

/**
 * @description   Single Higher Order Function for Page Changing
 * @param url
 */
export const login = ({username, password}: InstamationAuthOptions): InstamationAction => async(tab: puppeteer.Page) =>
  // This is how a single InstamationAction can run its own sequence of InstamationAction's prior to the next call of the original bot.actions() sequence
  InstamationActionsPipeFactory(tab)(
    goTo(getInstagramLoginUrl()),
    click(FORM_AUTH_USERNAME_INPUT_SELECTOR),
    type(username),
    click(FORM_AUTH_PASSWORD_INPUT_SELECTOR),
    type(password),
    click(FORM_AUTH_SUBMIT_BUTTON_SELECTOR),
    waitForNavigation(),
    log('Login Complete'),
    // After initial login, Instagram usually prompts the User with a modal...
    // Deal with the "Turn On Notifications" Modal, if it shows up
    ifThen(isTurnOnNotificationsModalActive, closeTurnOnNotificationsModal()),
    log('If that modal was open, its closed now')
  )

//
// Helpers

// Future: Go into the data, directly, and grab from the database, IndexedDB (redux). There is no data if guest
export const isLoggedIn = async(tab: puppeteer.Page): Promise<boolean> => {
  // Go to the login page
  await goTo(getInstagramLoginUrl())(tab)
  
  // if you're logged in, Instagram would have redirected you to the feed
  // if you were a guest, logged out, you would be on the Instagram Login URL
  return tab.url() !== getInstagramLoginUrl()
}

export const isGuest = async(tab: puppeteer.Page): Promise<boolean> => {
  // Go to the login page
  await goTo(getInstagramLoginUrl())(tab)
  
  // if you're logged in, Instagram would have redirected you to the feed
  // if you were a guest, logged out, you would be on the Instagram Login URL
  return tab.url() === getInstagramLoginUrl()
}
