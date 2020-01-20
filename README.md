# Instamation

A NodeJS Instagram bot that leverages Puppeteer to crawl & interact with the web app.

Insta + gram / Auto + mation => Insta + mation

## Features

Planned:
 - Like Photos based on provided usernames list
 - View Stories based on provided usernames list
 - Save bot interactions to local DB
 - Create simple reporting tool (web app) to show what the bot has automated

Complete:
 - basic working PoC of technology loading authentication page

Future:
 - Read/Update username lists via reporting tool (web app)

## Getting Started

You will need NodeJS current version or LTS on your machine to run the bot, as of writing this. After you have that installed, install the npm dependencies with this command:

```
$ npm i
```

Inside the `src/` directory, create a `config.ts` file with the following, but replace the text inside the quotes with your Instagram account credentials:
```
export const INSTAGRAM_ACCOUNT_USERNAME = 'put your username here'
export const INSTAGRAM_ACCOUNT_PASSWORD = 'put your password here'
```

Then build and run the bot with this single command:
```
$ npm run instamation
```

## Code Scaffolding

Main code is stored in the `src/` directory. A basic functional paradigm was adopted for this project's architecture. Inside the `src/helpers/` directory, exists files, for each technical domain that provides methods for crawling, interacting the web page and serve basic programming needs (utilites, etc).

Generated files, like screenshots, are stored in the `assets/screenshots/` directory. The transpiled built code is saved in the `build/` directory.

## Manual Scripts

You can manually run the scripts ran by the main `instamation` script, in "Getting Started".

To build the runnable code, run this command:
```
$ npm run build
```

To run the built code, run this command:
```
$ npm run bot
```
