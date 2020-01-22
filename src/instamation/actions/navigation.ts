import puppeteer from 'puppeteer'

import { openFeedPage } from '@instamation/helpers/navigation'
import { sleep } from '@helpers/utilities'
import { InstamationActionFactory } from './instamation-action.interface'

/**
 * @description   Single Higher Order Function for Page Changing
 * @param url
 */
export const goTo: InstamationActionFactory = (url: string) => async(page: puppeteer.Page) => {
  if (url === 'feed') {
    await sleep(5000) // TODO: remove, was for PoC
    await openFeedPage(page)
  }
}
