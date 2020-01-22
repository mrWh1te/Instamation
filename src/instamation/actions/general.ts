/**
 * @description   This higher order functions can be shared across multiple bots, given the uility of their nature (not specific)
 */

import { sleep } from '@helpers/utilities'

import { InstamationActionFactory } from './instamation-action.interface'

/**
 * @description   Pauses the bot for the provided milliseconds before letting it execute the next Action
 * @param milliseconds 
 */
export const wait: InstamationActionFactory = (milliseconds: number) => async() => 
  await sleep(milliseconds)