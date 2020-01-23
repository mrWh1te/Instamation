import puppeteer from 'puppeteer'

import { openFeedPage } from '@instamation/helpers/navigation'
import { InstamationAction } from '../interfaces/instamation-action.interfaces'

/**
 * @description   Single Higher Order Function for Page Changing
 * @param url
 */
export const login = (username: string, password: string): InstamationAction => async(page: puppeteer.Page) => {
  // WIP
}
