# webhook-client

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn dev
```

### Compiles and minifies for production

```
yarn build && cp redirects.txt dist/_redirects
```

### Preview production build

```
yarn preview
```

### Lints and fixes files

```
yarn lint
```

### Docker run local

```sh
$ docker run --rm -p 8000:8000 havus/vue-webhook-client:1.0-rc
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### References

- https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
- https://stackoverflow.com/questions/45848974/call-an-action-from-within-another-action
- https://cli.vuejs.org/guide/deployment.html#docker-nginx

### Setup Editor

- Install the required extensions:
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Add a new file to the project's root `.vscode/settings.json` with the following:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue][javascript][css][postcss][scss]": {
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
      "source.fixAll": true,
    },
  },
}
```
