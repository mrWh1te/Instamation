import puppeteer from 'puppeteer'

import { openFeedPage } from '@instamation/helpers/navigation'

/**
 * @description   Single Function for Page Changing
 * @param url
 */
export const goTo = (url: string) => async(page: puppeteer.Page) => {
  if (url === 'feed') {
    await openFeedPage(page)
  }
}
