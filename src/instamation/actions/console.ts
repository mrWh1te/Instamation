import chalk from 'chalk'

import { InstamationAction } from './instamation-action.interface'

// Chalk Themes
const logTheme = chalk.bgGreen;
const warningTheme = chalk.bgYellow
const errorTheme = chalk.bgRed

/**
 * @description   The following Actions are specific to the Console, for the Developer
 *                It's only about logging strings into the Console, with some kind of coloring
 */

//
// actions
export const log: InstamationAction = (message: string) => async() =>
  console.log(
    logTheme(appendGutter(' Log:', 5)) + prependGutter(message, 1)
  )

export const warning: InstamationAction = (warning: string) => async () =>
  console.log(
    warningTheme(' Warning: ') + prependGutter(warning, 1)
  )

export const error: InstamationAction = (error: string) => async () =>
  console.log(
    errorTheme(appendGutter(' Error:', 3)) + prependGutter(error, 1)
  )

//
// helpers
/**
 * @description   Keep the actual console message right-aligned with other logged messages
 * @param copy 
 * @param size 
 */
const prependGutter = (copy: string, size: number = 0): string => {
  if (!size) {
    return copy
  }

  let gutter = ''
  for(let i = 0; i < size; i++) {
    gutter += ' '
  } 

  return gutter + copy
}
const appendGutter = (copy: string, size: number = 0): string => {
  if (!size) {
    return copy
  }

  let gutter = ''
  for(let i = 0; i < size; i++) {
    gutter += ' '
  } 

  return copy + gutter
}