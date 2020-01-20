/**
 * @description  Simple Functional script that uses Puppeteer to crawl and interact with Instagram's web app as an authenticated user
 */

import puppeteer from 'puppeteer'

import { getDefaultGoToPageOptions } from './helpers/puppeteer'
import { getPageScreenshotLocalFileUrl } from './helpers/assets'
import { getInstagramLoginUrl } from './helpers/urls'

// Main Script
(async () => {
  let browser

  try {
    // Start Puppeteer
    browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Login to Instagram
    await page.goto(getInstagramLoginUrl(), getDefaultGoToPageOptions())
    await page.screenshot({path: getPageScreenshotLocalFileUrl('login.png')})

  } catch (error) {
    console.error(error)
  } finally {
    if (browser) await browser.close()
  }
  
})();