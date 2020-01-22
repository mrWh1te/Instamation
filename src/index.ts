/**
 * @description  Simple Functional script that uses Puppeteer to crawl and interact with Instagram's web app as an authenticated user
 */
import 'module-alias/register'
import puppeteer from 'puppeteer'

import { Instamation } from '@instamation'
import { goTo } from '@instamation/actions/navigation'
import { favoriteAllFrom } from '@instamation/actions/feed'
import { warning, error, log } from '@instamation/actions/console'

// Main Script
(async () => {
  let browser: puppeteer.Browser

  // Wrap in try/catch, because the bot will throw on Errors requiring dev attention
  try {
    // Start Puppeteer
    browser = await puppeteer.launch({headless: false})

    // Start the Instagram bot
    const bot = await Instamation.asyncConstructor(browser)

    // Actions run in sequence
    await bot.actions(
      warning('Example Warning about something'),
      error('Example error'),
      log('log something'),
      goTo('feed'),
      favoriteAllFrom('user1', 'user2')
    )

    //
    // await bot
    //   .stories()
    //   .viewAllFrom('user1', 'user2')
    //
    // await bot
    //   .destroy()

  } catch (error) {
    console.error(error)
    
    setTimeout(async() => {
      if (browser) await browser.close()
    })
  }
  
})();