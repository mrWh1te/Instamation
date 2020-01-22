/**
 * @description    Main source code wrapper to encapsulate main methods with Puppeteer.Page
 */

import puppeteer from 'puppeteer'

import { INSTAGRAM_ACCOUNT_USERNAME, INSTAGRAM_ACCOUNT_PASSWORD } from '@config'

import { login } from '@helpers/instagram/auth'
import { closeTurnOnNotificationsModalIfOpen } from '@helpers/instagram/modals'

import { InstamationOptions } from './interfaces/instamation-options.interfaces'
import { InstamationAction } from './interfaces/instamation-action.interfaces'

//
// As the project grows, we'll add different bots that follow the same base interface
export interface MationBot {
  setup(browser: puppeteer.Browser, options: InstamationOptions): Promise<void>,
  destroy(): Promise<void>
}
// @future MationBotOptions to replace InstamationOptions for use

/**
 * @description   Instagram bot that uses a Puppeteer browser
 */
export class Instamation implements MationBot {
  // Puppeteer
  private browser: puppeteer.Browser
  private activeTab: puppeteer.Page

  // Instamation
  private options: InstamationOptions

  /**
   * @note   Please don't call this constructor directly, instead use the async one below
   * @param options optional partial
   */
  constructor(browser: puppeteer.Browser, tab: puppeteer.Page, options: Partial<InstamationOptions> = {}) {
    this.browser = browser
    this.activeTab = tab
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
  public static async asyncConstructor(browser: puppeteer.Browser, options?: Partial<InstamationOptions>) {
    // Grab the first open page (tab) from the browser, otherwise make a new one
    const pages = await browser.pages()
    const tab = pages.length === 0 ? await browser.newPage() : pages[0] // does this need an await at the start of the expression? That edge case has to be tested, since on browser launch, there is a page open

    // Provide the browser, tab it will be operating in, and any optional overloading options
    const bot = new Instamation(browser, tab, options)
    await bot.setup()
    return bot
  }

  /**
   * @description    Sets up the bot with Puppeteer's browser, cookies, db and runs basic auth
   * @param browser 
   */
  public async setup() {
    
    // TODO: load db

    // Login to Instagram
    await this.setupAuth() // TODO: load cookies 1st
  }

  //
  // Auth
  /**
   * @description   Checks if authenticated, if Guest, then attempts to login with config information
   */
  private async setupAuth() {
    // TODO: leverage the bot's actions() method, therefore convert the following helper functionality into Actions
    if (!await this.isLoggedIn()) {
      await this.login()
      // await.this.actions(goTo('authUrl'), clickThis(''), typeThis(''))
    }

    // TODO: save cookies
  }
  private async isLoggedIn(): Promise<boolean> {
    // TODO: isLoggedIn functionality
    return false
  }
  private async login() {
    await login(this.activeTab, this.options.auth)
    await closeTurnOnNotificationsModalIfOpen(this.activeTab)
  }

  /**
   * @description   Supports the higher-order functions in the actions/ directory
   *                They return async functions with the active puppeteer.page injected so the function can crawl/interact with the webpage
   * 
   *                This function makes it easy to chain promises together while injecting the activePage with a cleaner syntax
   *                So instead of
   *                  await bot.feed()
   *                  await bot.favoriteAllFrom(...)
   * 
   *                We remove multiple "awaits" and the need for "bot." for chaining actions
   * 
   *                This is in-part, based on a promisified pipe, but this does not take the output of the last operation as input for the next.
   * @example         
   *                  await bot.actions(
   *                    goTo('feed'),
   *                    favoriteAllFrom('username1', 'username2')
   *                  )
   * @param actions  
   */
  public async actions(...actions: InstamationAction[]) {
    actions.reduce(async(chain, action) => {
      // Resolve the last returned promise
      await chain
      // Prep injection
      if (this.activeTab === null) {
        return Promise.resolve()
      }
      // Inject the active page into the InstamationAction, for it to operate on
      return action(this.activeTab)
    }, Promise.resolve())
  }

  // Clean up
  async destroy() {
    if (this.browser) {
      await this.browser.close()
    }
  }
}