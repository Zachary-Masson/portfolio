// import vue
import { createApp } from "vue";
import App from "./App.vue";

// import Router
import Router from "./routes";

// import Pinia
import { createPinia } from "pinia";

//import trois
import { TroisJSVuePlugin } from "troisjs";

// create app
createApp(App)
  .use(Router)
  .use(createPinia())
  .use(TroisJSVuePlugin)
  .mount("#app");
