<script setup>
import { ref, onMounted, reactive } from "vue";
import {useRouter, useRoute} from "vue-router";
import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, AmbientLight } from 'troisjs';
import useSessionsStore from "../stores/sessions";

const Router = useRouter()
const Route = useRoute()
const sessionsStore = useSessionsStore();

const main = ref();
const btn_back = ref();
const btn_next = ref();

onMounted(() => {
  if (Route.path === "/") btn_back.value.style.display = "none";
  else btn_back.value.style.display = "flex"
})

class NavigationClass {
  _animation = {
    base: "animate__animated",
    enter: "animate__fadeInLeft",
    leave: "animate__fadeOutRight"
  }

  constructor() {
  }

  navigToNext() {
    const currentRoute = Route.path.replace('/', "");
    const allChildren = Router.currentRoute.value.matched[0].children;
    if (currentRoute === "") return Router.push(allChildren[0].path);
    for (let i = 0; i <= allChildren.length - 1; i++) {
      if (allChildren[i].path === currentRoute) {
        if (i + 1 > allChildren.length - 1) return;
        Router.push(allChildren[i + 1].path);
      }
    }
  }

  navigToBack() {
    const currentRoute = Route.path.replace('/', "");
    const allChildren = Router.currentRoute.value.matched[0].children;
    for (let i = 0; i <= allChildren.length - 1; i++) {
      if (allChildren[i].path === currentRoute) {
        if (i - 1 < 0)  {
          Router.push('/');
        }
        else Router.push(allChildren[i - 1].path);
      }
    }
  }

  get getAnimationEnter() {
    return `${this._animation.base} ${this._animation.enter}`;
  }

  get getAnimationLeave() {
    return `${this._animation.base} ${this._animation.leave}`;
  }
}

const Navigation = reactive(new NavigationClass());
</script>

<template>
  <main id="Home" ref="main">
    <div id="wrapper">
      <router-view v-slot="{ Component }">
        <transition
            :enter-active-class="Navigation.getAnimationEnter"
            :leave-active-class="Navigation.getAnimationLeave"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <button id="back" class="btn_nav" ref="btn_back" @click="Navigation.navigToBack()"><ion-icon name="arrow-back-circle-outline"></ion-icon></button>
    <button id="next" class="btn_nav" ref="btn_next" @click="Navigation.navigToNext()"><ion-icon name="arrow-forward-circle-outline"></ion-icon></button>
  </main>
</template>

<style>

main#Home div#wrapper section#profile {
  background-color: #000;
}

main#Home div#wrapper section#works {
  background-color: aqua;
}

main#Home div#wrapper section.section-in-scroller {
  width: 100%;
  height: 100vh;
}

main#Home button#back.btn_nav {
  left: 10px;
}

main#Home button#next.btn_nav {
  right: 10px;
}


main#Home button.btn_nav {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 40px;
  position: absolute;
  bottom: 10px;
}

main#Home div#wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

main#Home {
  width: 100%;
  height: 100vh;
  background: url('http://www.comptavenir.fr/wp-content/uploads/2013/05/fond.png') center center no-repeat;
  background-size: cover;
  position: relative;
}
</style>
