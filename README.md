
How quick, simple, and cheap can the web2 stack be in 2023?
Part of the larger experiment organized at [coldstart](https://github.com/zootella/coldstart).

This is 🍺 [cold2.cc](https://cold2.cc/) on [Cloudflare](https://developers.cloudflare.com/)

Commands to make

```
$ npm create cloudflare@latest
$ cd cold2

$ git remote add origin git@github.com:zootella/cold2.git
$ git branch -M main
$ git push -u origin main

$ npx wrangler --version
$ npx wrangler whoami
$ npx wrangler login
```

Notes:
 * Run `npm create cloudflare@latest` in a fancy terminal, like PowerShell or Visual Studio Code; Git SCM's MING64 can't do the fancy interactive menus.
 * Fixed error during `create` by updating npm with `$ npm install -g npm`
 * Wrangler `login` pops open browser to page of permissions
 * Fixed a mess on Windows where wrangler was installed globally, and had an expired or incorrectly permissioned OAuth token. You want wranger installed in the project, only. Deleted `C:\Users\UserName\AppData\Roaming\npm\wrangler.ps1` and `C:\Users\UserName\.wrangler`. Also deleted `cold2/.wrangler` and `cold2/node_modules` and repeated `npm install` to fix this.

Commands to use.

```
$ npm run start
$ npm run pages:dev
$ npm run pages:deploy
```

Notes:
 * Pushing to GitHub does not start Cloudflare deploy; they're separate and I like that better.
 * Unlike Amplify, builds locally and pushes static assets, which is faster.
 * `start` runs Webpack for React, while `pages:dev` and `pages:deploy` run Wrangler, which runs Webpack and then React.
 * Not able to get pages:dev working on Mac or Windows.

Locations

 * https://cold2.pages.dev
 * https://cold2.cc
