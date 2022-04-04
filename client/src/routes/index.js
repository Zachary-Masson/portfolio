// import vue-router
import { createRouter, createWebHistory } from "vue-router";

// import views
import Home from "../views/home.vue";
import Test from "../views/test.vue";
import Test2 from "../views/test2.vue";

// var content all routes
const routes = [
  {
    path: "",
    name: "Home",
    component: Home,
    children: [
      {
        path: "test1",
        component: Test
      },
      {
        path: "test2",
        component: Test2
      },
      {
        path: "test3",
        component: Test
      },
      {
        path: "test4",
        component: Test
      },
      {
        path: "test5",
        component: Test
      },
      {
        path: "test6",
        component: Test
      },
      {
        path: "test7",
        component: Test
      },
      {
        path: "test8",
        component: Test
      },
      {
        path: "test9",
        component: Test
      },
      {
        path: "test10",
        component: Test
      },
      {
        path: "test11",
        component: Test
      }
    ]
  },
  {
    path: "/about",
    name: "About",
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
