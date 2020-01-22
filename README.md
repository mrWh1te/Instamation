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
 - basic Instamation class with async intialization flow preparing Instagram's web app for crawling/interacting

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

## Architecture // Code Scaffolding

Code architecture is currently a WIP. Notes will be updated as work is done, and finalized on complete. This note will be removed on finalization.

So far there is one class, `Instamation` that has an async static method for constructing instances that will setup the page in puppeteer, load Instagram, data, cookies, and handle authentication.

Then there `actions` that are higher order functions (factory methods) that can be used within the `actions()` method of `Instamation`, comma-delimited. It's loosely coupled crawling/interacting functionality that injects the active page through the factory call.

Main code is stored in the `src/` directory. A class paradigm was adopted for this project's bot architecture, called Instamation, to leverage a consistent public interface across all bots (future ie Twitter, Tinder, etc etc) using a common interface `MationBot`, to be part of the web tool (bot reporting, etc). The main methods for crawling pages return the `this` pointer to enable devs chaining method calls (see example script for bot usage) in exploring the page. The class wraps loosely coupled "helper" functions to enable future abstraction where plossible across bots. Inside the `src/helpers/` directory, exists the helper functions in files, for each technical domain for crawling, interacting the web page and serving basic programming needs (utilites, etc). The main Instamation class code is in `src/instamation/index.ts`.

Generated files, like screenshots, are stored in the `assets/screenshots/` directory. The transpiled built code is saved in the `build/` directory.

An example script on how to use the bot is found in `src/index.ts`. The immediate files in the `src/` directory are open for your changing like `src/config.ts` and `src/selectors.ts`. It's recommended to not touch anything else.

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

## Selectors

There is a dedicated file in the `src/` directory called `selectors.ts`. It has all the DOM selectors used by the program, so in case this breaks, it's possible one may be able to fix it by adjusting those values. When Instagram launches a new version of their web app, it's possible the selectors could have changed, breaking the bot functionality.

## Config

The main config file is `src/config.ts`. Follow the "Getting Started" section in getting that file ready.
