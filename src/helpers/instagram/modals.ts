/**
 * @description   Functions to interact with the Modals ie web specific, Turn on Notifications
 */
import puppeteer from 'puppeteer'
import { TURN_ON_NOTIFICATIONS_MODAL_HEADER } from 'selectors';

export const isTurnOnNotificationsModalActive = async(page: puppeteer.Page): Promise<boolean> => 
  page.$(TURN_ON_NOTIFICATIONS_MODAL_HEADER) !== null