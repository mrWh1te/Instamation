/**
 * @description   This higher order functions can be shared across multiple bots, given the uility of their nature (not specific)
 */
import puppeteer from 'puppeteer'

import { sleep } from '@helpers/utilities'

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
export const click = (selector: string): InstamationAction => async(page: puppeteer.Page) =>
  await page.click(selector)

/**
 * @description   Using the keyboard, being typing. It's best that you focus/click a form input element 1st, or something similar
 * @param copy 
 */
export const type = (copy: string): InstamationAction => async(page: puppeteer.Page) =>
  await page.keyboard.type(copy)
  
  // await page.goto(getInstagramLoginUrl(), getDefaultGoToPageOptions())
  // await page.keyboard.type(options.username)
  // await page.click(FORM_AUTH_PASSWORD_INPUT_SELECTOR)
  // await page.keyboard.type(options.password)

  // await page.click(FORM_AUTH_SUBMIT_BUTTON_SELECTOR)
  // await page.waitForNavigation()


// Concept work for more complex InstamationAction's in the actions pipe
// export const ifThen = (condition: () => Promise<boolean>, then: InstamationAction): InstamationAction => async(page: puppeteer.Page) => {
//   if (await condition) {
//     await then
//   }
// }

// FORM_AUTH_USERNAME_INPUT_SELECTOR
// FORM_AUTH_PASSWORD_INPUT_SELECTOR
// FORM_AUTH_SUBMIT_BUTTON_SELECTOR