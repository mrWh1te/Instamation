import puppeteer from 'puppeteer'

// Future: Have these extend NationBotActionFactory & NationBotAction, with the abilty to add on
//         like for other injectables

/**
 * @description   Base Interface for the Higher-Order Action implementations to enable IDE assistance, strong type checking, etc
 */
export interface InstamationActionFactory extends Function {
  // Higher-Order Function (Factory) to Produce an Async Function (Returns Promise to be awaited)
  (...args: any[]) : InstamationAction
}

export interface InstamationAction extends Function {
  (tab: puppeteer.Page) : Promise<void> // async function for pupeeteer manipulation of page, sequentially
}