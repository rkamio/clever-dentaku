# clever-dentaku

> clever-dentaku Nuxt.js project

## Before Deploy
``` bash
# If .env changed, Delete env: global: in .travis.yml and then
$ cat .env | travis encrypt -r rkamio/clever-dentaku --split --add

```

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
