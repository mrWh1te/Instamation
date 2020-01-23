import puppeteer from 'puppeteer'

import { InstamationAction } from '@instamation/interfaces/instamation-action.interfaces'

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
export const InstamationActionsFactory = (tab: puppeteer.Page) => async (...actions: InstamationAction[]): Promise<void> => {
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