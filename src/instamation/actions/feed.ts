import puppeteer from 'puppeteer'

import { InstamationAction } from './instamation-action.interface'

/**
 * @description   Pipeable methods for crawling/interacting with the main feed page in Instagram
 * @param usernames
 */

export const favoriteAllFrom: InstamationAction = (...usernames: string[]) => async(page: puppeteer.Page) => {
  console.log(`favorite all from ${usernames.join(', ')}`)
}