/**
 * @description    Functions to facilitate authentication on Instagram via Puppeteer
 */

import puppeteer from 'puppeteer'

import { 
  INSTAGRAM_ACCOUNT_USERNAME,
  INSTAGRAM_ACCOUNT_PASSWORD 
} from './../../config'
import { 
  FORM_AUTH_USERNAME_INPUT_SELECTOR,
  FORM_AUTH_PASSWORD_INPUT_SELECTOR,
  FORM_AUTH_SUBMIT_BUTTON_SELECTOR
} from './../../selectors'

import { getInstagramLoginUrl } from './../urls';
import { getDefaultGoToPageOptions } from './../puppeteer';

// Login to Instagram
export const login = async(page: puppeteer.Page) => {
  await page.goto(getInstagramLoginUrl(), getDefaultGoToPageOptions())

  await page.click(FORM_AUTH_USERNAME_INPUT_SELECTOR)
  await page.keyboard.type(INSTAGRAM_ACCOUNT_USERNAME)
  await page.click(FORM_AUTH_PASSWORD_INPUT_SELECTOR)
  await page.keyboard.type(INSTAGRAM_ACCOUNT_PASSWORD)

  await page.click(FORM_AUTH_SUBMIT_BUTTON_SELECTOR)
  await page.waitForNavigation()
}