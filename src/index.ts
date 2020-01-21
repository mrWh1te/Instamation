/**
 * @description  Simple Functional script that uses Puppeteer to crawl and interact with Instagram's web app as an authenticated user
 */
import 'module-alias/register'
import puppeteer from 'puppeteer'

import { Instamation } from '@instamation'

// Main Script
(async () => {
  let browser: puppeteer.Browser

  try {
    // Start Puppeteer
    browser = await puppeteer.launch({headless: false})

    // Star the Instagram bot
    const bot = await Instamation.asyncConstructor(browser)

    // Run it
    // bot
    //   .feed()
    //   .favoriteAllFrom()

  } catch (error) {
    console.error(error)
  } finally {
    // setTimeout(async() => {
    //   if (browser) await browser.close()
    // }, 5000)
  }
  
})();