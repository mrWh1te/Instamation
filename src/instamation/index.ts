/**
 * @description    Main source code wrapper to encapsulate main methods with Puppeteer.Page
 */

import puppeteer from 'puppeteer'

import { INSTAGRAM_ACCOUNT_USERNAME, INSTAGRAM_ACCOUNT_PASSWORD } from '@config';

import { login } from '@helpers/instagram/auth';
import { closeTurnOnNotificationsModalIfOpen } from '@helpers/instagram/modals';

import { InstamationOptions } from './interfaces/instamation-options.interface';

//
// As the project grows, we'll add different bots that follow the same base interface
export interface MationBot {
  setup(browser: puppeteer.Browser, options: InstamationOptions): Promise<void>
}

/**
 * @description   Instagram bot that uses a Puppeteer browser
 */
export class Instamation implements MationBot {
  // Puppeteer
  private browser: puppeteer.Browser | null = null
  private activePage: puppeteer.Page | null = null

  // Instamation
  private options: InstamationOptions

  /**
   * @note   Please don't call this constructor directly, instead use the async one below
   * @param options optional partial
   */
  constructor(options: Partial<InstamationOptions> = {}) {
    this.options = {
      // Default Config
      auth: {
        username: INSTAGRAM_ACCOUNT_USERNAME,
        password: INSTAGRAM_ACCOUNT_PASSWORD
      },
      // Overload config with provided options (optional)
      ...options
    }
  }
  /**
   * @description    Runs the constructor then runs async setup code before returning instance
   * @param  options   optional to override default options
   */
  public static asyncConstructor = async (browser: puppeteer.Browser, options?: Partial<InstamationOptions>) => {
    const bot = new Instamation(options)
    await bot.setup(browser)
    return bot
  }

  /**
   * @description    Sets up the bot with Puppeteer's browser, cookies, db and runs basic auth
   * @param browser 
   */
  public async setup(browser: puppeteer.Browser) {
    // Setup browser
    this.browser = browser
    
    // Setup page
    await this.setupActivePage()

    // TODO: load cookies
    // TODO: load db

    // Login to Instagram
    await this.setupAuth()
  }
  private async setupActivePage() {
    if (this.browser !== null) {
      const pages = await this.browser.pages()
      this.activePage = pages.length === 0 ? await this.browser.newPage() : pages[0]
    } else {
      throw new Error('Browser is null')
    }
  }

  //
  // Auth
  /**
   * @description   Checks if authenticated, if Guest, then attempts to login with config information
   */
  private async setupAuth() {
    if (!await this.isLoggedIn()) {
      await this.login()
    }

    // TODO: save cookies
  }
  private async isLoggedIn(): Promise<boolean> {
    return false
  }
  private async login() {
    if (this.options === null) {
      throw new Error('Instamation Options null')
    }
    if (this.activePage === null) {
      throw new Error('Active Page is null')
    }

    await login(this.activePage, this.options.auth)
    await closeTurnOnNotificationsModalIfOpen(this.activePage)
  }

  //
  // Process feed (liking photos based on critieria)
  feed() {
    // Process feed to local data for user actions (liking, etc)

    return this
  }

  // Clean up
  finish() {
    if (this.browser) {
      this.browser.close()
    }
  }
}