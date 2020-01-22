/**
 * @description    Functions to facilitate authentication on Instagram via Puppeteer
 */

import puppeteer from 'puppeteer'

import { 
  FORM_AUTH_USERNAME_INPUT_SELECTOR,
  FORM_AUTH_PASSWORD_INPUT_SELECTOR,
  FORM_AUTH_SUBMIT_BUTTON_SELECTOR
} from '@selectors'

import { getInstagramLoginUrl } from '@helpers/urls';
import { getDefaultGoToPageOptions } from '@helpers/puppeteer';
import { InstamationAuthOptions } from '@instamation/interfaces/instamation-options.interfaces';

/**
 * @description   Login to Instagram
 * @param page  Puppeteer.Page that has launched from Puppeteer
 */
export const login = async(page: puppeteer.Page, options: InstamationAuthOptions) => {
  await page.goto(getInstagramLoginUrl(), getDefaultGoToPageOptions())

  await page.click(FORM_AUTH_USERNAME_INPUT_SELECTOR)
  await page.keyboard.type(options.username)
  await page.click(FORM_AUTH_PASSWORD_INPUT_SELECTOR)
  await page.keyboard.type(options.password)

  await page.click(FORM_AUTH_SUBMIT_BUTTON_SELECTOR)
  await page.waitForNavigation()
}