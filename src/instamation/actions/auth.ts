import puppeteer from 'puppeteer'

import { InstamationAction } from '../interfaces/instamation-action.interfaces'
import { InstamationActionsFactory } from '@instamation/factories/instamation-actions.factory'

import { goTo, waitForNavigation } from './navigation'
import { click, type } from './utilities'
import { log } from './console'

import { getInstagramLoginUrl } from '@instamation/helpers/urls'
import { InstamationAuthOptions } from '@instamation/interfaces/instamation-options.interfaces'
import { 
  FORM_AUTH_USERNAME_INPUT_SELECTOR,
  FORM_AUTH_PASSWORD_INPUT_SELECTOR,
  FORM_AUTH_SUBMIT_BUTTON_SELECTOR
} from '@selectors'

/**
 * @description   Single Higher Order Function for Page Changing
 * @param url
 */
export const login = ({username, password}: InstamationAuthOptions): InstamationAction => async(tab: puppeteer.Page) =>
  // This is how a single InstamationAction can run its own sequence of InstamationAction's prior to the next call of the original bot.actions() sequence
  InstamationActionsFactory(tab)(
    goTo(getInstagramLoginUrl()),
    click(FORM_AUTH_USERNAME_INPUT_SELECTOR),
    type(username),
    click(FORM_AUTH_PASSWORD_INPUT_SELECTOR),
    type(password),
    click(FORM_AUTH_SUBMIT_BUTTON_SELECTOR),
    waitForNavigation(),
    log('Login Complete')
  )
