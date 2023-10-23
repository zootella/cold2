
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
```

Commands to use. Pushing to GitHub does not start Cloudflare deploy.

```
$ npm run pages:dev
$ npm run pages:deploy
```

Locations

 * https://cold2.pages.dev
 * https://cold2.cc
