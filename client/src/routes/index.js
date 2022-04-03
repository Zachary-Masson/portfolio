// import vue-router
import { createRouter, createWebHistory } from "vue-router";

// import views
import Home from "../views/home.vue";

// var content all routes
const routes = [
  {
    path: "",
    name: "Home",
    component: Home,
  },
];

// create router
const Router = createRouter({
  history: createWebHistory(),
  routes,
});

// export router
export default Router;
