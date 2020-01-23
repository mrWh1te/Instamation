/**
 * @description   This higher order functions can be shared across multiple bots, given the uility of their nature (not specific)
 */
import puppeteer from 'puppeteer'

import { sleep } from '@instamation/helpers/utilities'

import { InstamationAction } from '@instamation/interfaces/instamation-action.interfaces'

/**
 * @description   Pauses the bot for the provided milliseconds before letting it execute the next Action
 * @param milliseconds 
 */
export const wait = (milliseconds: number): InstamationAction => async() => 
  await sleep(milliseconds)

/**
 * @description   Manually click an element on the page based on the query selector provided
 * @param selector 
 */
export const click = (selector: string): InstamationAction => async(tab: puppeteer.Page) =>
  await tab.click(selector)

/**
 * @description   Using the keyboard, being typing. It's best that you focus/click a form input element 1st, or something similar
 * @param copy 
 */
export const type = (copy: string): InstamationAction => async(tab: puppeteer.Page) =>
  await tab.keyboard.type(copy)


// Concept work for more complex InstamationAction's in the actions pipe
// export const ifThen = (condition: () => Promise<boolean>, then: InstamationAction): InstamationAction => async(page: puppeteer.Page) => {
//   if (await condition) {
//     await then
//   }
// }

