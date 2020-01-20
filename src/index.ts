/**
 * @description  Simple Functional script that uses Puppeteer to crawl and interact with Instagram's web app as an authenticated user
 */
import 'module-alias/register'
import puppeteer from 'puppeteer'

import { login } from '@helpers/instagram/auth'
import { closeTurnOnNotificationsModalIfOpen } from '@helpers/instagram/modals';

// Main Script
(async () => {
  let browser: puppeteer.Browser

  try {
    // Start Puppeteer
    browser = await puppeteer.launch({headless: false})
    const page: puppeteer.Page = await browser.newPage()

    // @todo load cookies
    // @todo load db

    // Login to Instagram
    await login(page) // @todo check if not authenticated

    // @todo save cookies
    
    // Deal with the "Turn on Notifications" modal if it opens
    await closeTurnOnNotificationsModalIfOpen(page) // @todo only check after logging in

    // Process feed (liking photos based on critieria)

  } catch (error) {
    console.error(error)
  } finally {
    // setTimeout(async() => {
    //   if (browser) await browser.close()
    // }, 5000)
  }
  
})();