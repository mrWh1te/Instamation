import puppeteer from 'puppeteer'

import { InstamationAction } from '../interfaces/instamation-action.interfaces'

/**
 * @description   Pipeable methods for crawling/interacting with the main feed page in Instagram
 * @param usernames
 */

/**
 * @description   Favorite all published photos from these usernames
 * @param usernames 
 */
export const favoriteAllFrom = (...usernames: string[]): InstamationAction => async(page: puppeteer.Page) => {
  console.log(`favorite all from ${usernames.join(', ')}`)
}