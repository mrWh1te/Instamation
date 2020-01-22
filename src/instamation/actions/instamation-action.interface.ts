import puppeteer from 'puppeteer'

/**
 * @description   Base Interface for the Higher-Order Action implementations to enable IDE assistance, strong type checking, etc
 */
export interface InstamationAction extends Function {
  (...args: any[]) : (page: puppeteer.Page) => Promise<void>
}