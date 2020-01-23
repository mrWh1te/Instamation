import puppeteer from 'puppeteer'

import { openFeedPage } from '@instamation/helpers/navigation'
import { InstamationAction } from '../interfaces/instamation-action.interfaces'

import { getInstagramLoginUrl } from '@helpers/urls' // TODO move
import { getDefaultGoToPageOptions } from '@helpers/puppeteer' // TODO move
import { logWarning } from './console'

/**
 * @description   Single Higher Order Function for Page Changing
 * @param url
 */
export const goTo = (url: string): InstamationAction => async(page: puppeteer.Page) => {
  // TODO: check current url, to prevent reloading if we're already there
  if (page.url() === url) {
    // same url
    logWarning('[Action:goTo] Same url requested -> not changing page')
    return
  }

  // // TODO: replace if check with actual url directly into page.goto(), making this a reusable Action
  // if (url === 'feed') {
  //   await openFeedPage(page)
  // }

  logWarning('url: '+ url)
  await page.goto(url, getDefaultGoToPageOptions())
}

/**
 * @description   Wait for navigation to complete. Helpful after submitting a form, liking logging in.
 */
export const waitForNavigation = (): InstamationAction => async(page: puppeteer.Page) => {
  await page.waitForNavigation()
}
