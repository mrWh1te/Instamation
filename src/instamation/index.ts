/**
 * @description    Main source code wrapper to encapsulate main methods with Puppeteer.Page
 */

import puppeteer from 'puppeteer'

import { login } from '@helpers/instagram/auth';
import { closeTurnOnNotificationsModalIfOpen } from '@helpers/instagram/modals';

import { InstamationOptions } from './interfaces/instamation-options.interface';

export class Instamation {
  // Main web page that Puppeteer is managing in Chrome
  private activePage: puppeteer.Page | null = null

  constructor() {}
  public static asyncConstructor = async (browser: puppeteer.Browser, options: InstamationOptions) => {
    const bot = new Instamation()
    await bot.setup(browser, options)

    return bot
  }

  public async setup(browser: puppeteer.Browser, options: InstamationOptions) {
    // Setup
    const pages = await browser.pages()
    this.activePage = pages.length === 0 ? await browser.newPage() : pages[0]

    // TODO: load cookies
    // TODO: load db

    // TODO: check if not authenticated
    // Login to Instagram
    await login(this.activePage) 

    // TODO: save cookies
    
    // Deal with the "Turn on Notifications" modal if it opens
    await closeTurnOnNotificationsModalIfOpen(this.activePage) // TODO: only check after logging in
  }

  //
  // Auth


  //
  // Process feed (liking photos based on critieria)
  feed() {

    return this
  }
}