# webhook-client

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build && cp redirects.txt dist/_redirects
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
