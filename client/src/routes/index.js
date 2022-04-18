// import vue-router
import { createRouter, createWebHistory } from "vue-router";

// import views
import Home from "../views/home.vue";
import Profile from "../views/pages/profile.vue";
import AboutMe from "../views/pages/about_me.vue";
import MySkills from "../views/pages/my_skills.vue";
import Works from "../views/pages/works.vue";


// var content all routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "profile",
        id: "profile",
        component: Profile
      },
      {
        path: "about_me",
        id: "about_me",
        component: AboutMe
      },
      {
        path: "my_skills",
        id: "my_skills",
        component: MySkills
      },
      {
        path: "works",
        id: "works",
        component: Works
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)",
    redirect: ""
  }
];

// create router
const Router = createRouter({
  history: createWebHistory(),
  routes,
});

// export router
export default Router;
