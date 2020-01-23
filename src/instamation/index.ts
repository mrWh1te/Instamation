/**
 * @description    Main source code wrapper to encapsulate main methods with Puppeteer.Page
 */

import puppeteer from 'puppeteer'

import { INSTAGRAM_ACCOUNT_USERNAME, INSTAGRAM_ACCOUNT_PASSWORD } from '@config'

import { login } from '@helpers/instagram/auth'
import { closeTurnOnNotificationsModalIfOpen } from '@helpers/instagram/modals'

import { InstamationOptions } from './interfaces/instamation-options.interfaces'
import { InstamationAction } from './interfaces/instamation-action.interfaces'
import { goTo, waitForNavigation } from './actions/navigation';
import { getInstagramLoginUrl } from '@helpers/urls'; // TODO: move
import { click, type } from './actions/utilities';
import { FORM_AUTH_USERNAME_INPUT_SELECTOR, FORM_AUTH_PASSWORD_INPUT_SELECTOR, FORM_AUTH_SUBMIT_BUTTON_SELECTOR } from '@selectors';
import { log } from './actions/console';

//
// As the project grows, we'll add different bots that follow the same base interface
export interface MationBot {
  setup(browser: puppeteer.Browser, options: InstamationOptions): Promise<void>
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
   *         If you do call the constructor directly, please call "await bot.setup()" on the bot before running any actions
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
   * @description    Loads cookies, db and runs basic auth
   *                 Sets everything up for actions() to run
   * @param browser 
   */
  public async setup() {
    
    // TODO: load db

    // Login to Instagram
    await this.authenticate() 
    
  }

  //
  // Auth
  /**
   * @description   Load saved cookies, Check if authenticated, if Guest, then attempt to login with options information
   */
  private async authenticate() {
    // TODO: load cookies 1st

    // TODO: leverage the bot's actions() method, therefore convert the following helper functionality into Actions
    if (this.options.auth) {
      const isLoggedIn = await this.isLoggedIn()

      if (! isLoggedIn) {
        // await login(this.activeTab, this.options.auth)
        // await closeTurnOnNotificationsModalIfOpen(this.activeTab)

        // await.this.actions(goTo('authUrl'), clickThis(''), typeThis(''))

        // Login
        await this.actions(
          goTo(getInstagramLoginUrl()),
          click(FORM_AUTH_USERNAME_INPUT_SELECTOR),
          type(this.options.auth.username),
          click(FORM_AUTH_PASSWORD_INPUT_SELECTOR),
          type(this.options.auth.password),
          click(FORM_AUTH_SUBMIT_BUTTON_SELECTOR),
          waitForNavigation(),
          log('Login Complete')
        )

        // await page.goto(getInstagramLoginUrl(), getDefaultGoToPageOptions())

        // await page.click(FORM_AUTH_USERNAME_INPUT_SELECTOR)
        // await page.keyboard.type(options.username)
        // await page.click(FORM_AUTH_PASSWORD_INPUT_SELECTOR)
        // await page.keyboard.type(options.password)

        // await page.click(FORM_AUTH_SUBMIT_BUTTON_SELECTOR)
        // await page.waitForNavigation()
      }
    }

    // TODO: save cookies
  }
  private async isLoggedIn(): Promise<boolean> {
    // isLoggedIn functionality from https://github.com/mifi/instauto/blob/43325cb1ed38acbc5419d33bbcfc2b8f453a97b7/index.js#L218
    return (await this.activeTab.$x('//nav')).length === 2
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
  public async actions(...actions: InstamationAction[]): Promise<void> {
    return InstamationActionsFactory(this.activeTab)(...actions)
  }

  // Clean up
  async destroy() {
    if (this.browser) {
      await this.browser.close()
    }
  }
}

/**
 * @description   Actions() method Factory that will inject the active tab for the InstamationAction's to operate on
 *                Separated out for future complex composable actions like ifThen(conditional, thenExpression)
 *                  where the tab is injected, and the if can run with that available in checking for awaited boolean
 *                    on awaited boolean true, run await thenExpression() -> missing arguments? WIP concept
 *                Ideally, the thenExpression is another InstamationAction, so you can it give it a promise as a conditional for a boolean
 *                  to run against the tab, before letting a particular InstamationAction running
 * 
 *                Be nice to support a list of Actions...... hence the factory separation, as it may get reused there
 * @param tab 
 */
const InstamationActionsFactory = (tab: puppeteer.Page) => async (...actions: InstamationAction[]): Promise<void> => {
  return actions.reduce(async(chain, action) => {
    // Resolve the last returned promise
    await chain
    // Prep injection
    if (tab === null) {
      return Promise.resolve()
    }
    // Inject the active page into the InstamationAction, for it to operate on
    return action(tab)
  }, Promise.resolve())
}

