# Mirrors China

## TODO

- [x] Upgrade to Vue3
- [x] Docker support
- [ ] Pinia how to work:

```js
// Vue2 + Vuex + Vue router
router.beforeEach((to, from, next) => {
  store.dispatch("onLoading", true);
  next();
});

router.afterEach((to, from) => {
  store.dispatch("onLoading", false);
});
```

How to convert it use Pinia?([code source](https://github.com/lework/lemonitor/blob/1b9912fa675f254011d59f725c45fc0bc80997a9/src/main.js))

- [ ] 100% test coverage
- [ ] tidy style
- [ ] split one into many components

## Setup

```sh
# install dependencies
pnpm install

# serve with hot reload at localhost:5173
pnpm serve

# build for production with minification
pnpm build
```

Docker:

```sh
docker-compose up -d
```

## Data source

- static/data.json

## Acknowledgements

### App level

- [lework/lemonitor](https://github.com/lework/lemonitor)
- <https://mirrorz.org/>
- [国内的 Docker Hub 镜像加速器，由国内教育机构与各大云服务商提供的镜像加速服务](https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6)

### Vue3 level

- [How to Migrate from Vue CLI to Vite - Vue School Articles](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [rosealin/vue3-ts-vite-less](https://github.com/rosealin/vue3-ts-vite-less)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Pinia | The intuitive store for Vue.js](https://pinia.vuejs.org/)
- [Vue Router | The official Router for Vue.js](https://router.vuejs.org/)
- [Vue Testing Handbook](https://lmiller1990.github.io/vue-testing-handbook/v3/)
