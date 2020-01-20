/**
 * @description   Provides helpful methods for parsing URL's and getting URL's to crawl (ie Instagram login URL)
 */

// Configure URL's without trailing backslashes (functions add them in)
export const INSTAGRAM_BASE_URL = 'https://instagram.com'
export const INSTAGRAM_URL_EXT_LOGIN = 'accounts/login'

export const getInstagramLoginUrl = () => 
  affixBackSlashes(INSTAGRAM_BASE_URL, INSTAGRAM_URL_EXT_LOGIN)

/**
 * @param folderNames list of folders to parse into a URL by adding a backslash to the end of each directory
 * @example    affixBackSlashes('assets', 'screenshots') => 'assets/screenshots/'
 */
export const affixBackSlashes = (...folderNames: string[]): string => 
  folderNames.reduce((folderUrl, folderName) => folderUrl + folderName + '/', '')