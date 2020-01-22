import puppeteer from 'puppeteer'

import { openFeedPage } from '@instamation/helpers/navigation'
import { sleep } from '@helpers/puppeteer';

/**
 * @description   Single Function for Page Changing
 * @param url
 */
export const goTo = (url: string) => async(page: puppeteer.Page) => {
  if (url === 'feed') {
    await sleep(5000)
    await openFeedPage(page)
  }
}
