
import puppeteer from 'puppeteer'

/**
 * @description  Open the main feed page if not open already
 * @param page 
 */
export const openFeedPage = async(page: puppeteer.Page) => {
  console.log('go to feed page, if not there already')
  // check what page we're on

  // if not feed, then goTo feed
}