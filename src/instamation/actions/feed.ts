import puppeteer from 'puppeteer'

/**
 * @description   Pipeable methods for crawling/interacting with the main feed page in Instagram
 * @param usernames
 */

export const favoriteAllFrom = (...usernames: string[]) => async(page: puppeteer.Page) => {
  console.log(`favorite all from ${usernames.join(', ')}`)
}