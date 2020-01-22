import puppeteer from 'puppeteer'

import { openFeedPage } from '@instamation/helpers/navigation'
import { sleep } from '@helpers/utilities'

/**
 * @description   Single Higher Order Function for Page Changing
 * @param url
 */
export const goTo = (url: string) => async(page: puppeteer.Page) => {
  if (url === 'feed') {
    await sleep(5000) // TODO: remove, was for PoC
    await openFeedPage(page)
  }
}
