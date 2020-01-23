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

So far there is one class, `Instamation` that has an async static method for constructing an instance that will setup the page in puppeteer, load Instagram, data, cookies, and handle authentication. It implements a very bare-bones interface called `MationBot` that wil be reused in other social media bots for a consistent public interface.

The bot has Actions, interfaced by `InstamationAction` (to be based on `MationBotAction`, one day) that are produced from higher order functions (factory methods) to be used within the `actions()` method of `Instamation`, comma-delimited. The `actions()` method is produced with the `InstamationActionsPipeFactory`. That allows us to reuse the functionality of `actions()`, so that an Action can call a list of Actions, before the next one, in its own list. 

Actions are loosely coupled crawling/interacting factory produced async methods that have the active tab injected for crawling/interacting. Therefore, the bot uses a Declarative syntax within the `actions()` method, while encapsulating the browser and active tab from puppeteer.

All Action factories are stored in `src/instamation/actions/`. If they rely directly on a helper function, they are included but separated by comment, in respective files. Sometimes, like for the `console` actions, helper methods were provided to diversify the implementation options. In time, a separate document for all the Actions will be provided to make it easier for someone to build an Instagram bot, Declaratively, via this library.

Main code is stored in the `src/` directory. More notes on scaffolding, once project matures further.

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

## Actions

Actions are how you use the bot to crawl/interact with the web page (browser tab). Currently, they implement `InstamationAction` and are produced from factory methods implementing `InstamationActionFactory`. This bot has an `actions()` method that is produced with the `InstamationActionsPipeFactory`. It was separated to allow us to reuse that functionality of the "pipe-like" syntax in calling Actions in sequence, asynchronously.

`InstamationAction`'s, which will eventually implement `NationBotAction`, as the project grows. The bot, after instantiated, asynchronously, has one important method, `actions()` that takes a list of Actions.
