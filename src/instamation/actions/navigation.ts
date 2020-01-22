import puppeteer from 'puppeteer'

import { openFeedPage } from '@instamation/helpers/navigation'
import { InstamationAction } from '../interfaces/instamation-action.interfaces'

/**
 * @description   Single Higher Order Function for Page Changing
 * @param url
 */
export const goTo = (url: string): InstamationAction => async(page: puppeteer.Page) => {
  // TODO: check current url, to prevent reloading if we're already there

  // TODO: replace if check with actual url directly into page.goto(), making this a reusable Action
  if (url === 'feed') {
    await openFeedPage(page)
  }
}
