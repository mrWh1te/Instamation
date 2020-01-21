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
    const pages: puppeteer.Page[] = await browser.pages()
    const page: puppeteer.Page = pages.length === 0 ? await browser.newPage() : pages[0]

    // TODO: load cookies
    // TODO: load db

    // Login to Instagram
    await login(page) // TODO: check if not authenticated

    // TODO: save cookies
    
    // Deal with the "Turn on Notifications" modal if it opens
    await closeTurnOnNotificationsModalIfOpen(page) // TODO: only check after logging in

    // Process feed (liking photos based on critieria)

  } catch (error) {
    console.error(error)
  } finally {
    // setTimeout(async() => {
    //   if (browser) await browser.close()
    // }, 5000)
  }
  
})();