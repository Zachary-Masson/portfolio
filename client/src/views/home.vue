<script setup>
import { ref, onMounted, reactive } from "vue";
import {useRouter, useRoute} from "vue-router";
import Horlogy from "../components/horlogy.vue";
import Stats from "../components/stats.vue";
import useSessionsStore from "../stores/sessions";

const Router = useRouter()
const Route = useRoute()
const sessionsStore = useSessionsStore();

const main = ref();
const btn_back = ref();
const btn_next = ref();

onMounted(() => {
  Navigation.initialize();
})

class NavigationClass {

  Animation = ref({
    enter: "animate__animated animate__fadeInRight",
    leave: "animate__animated animate__fadeOutLeft"
  })

  ViewerSlide = {}
  LastViewerSlideActive;

  _currentRoute;
  _allChildren;

  constructor() {
    this.setCurrentRoute();
    this.setAllChildren();
  }

  initialize() {
    this.viewerSlideManager();
    if (this._currentRoute === "") {
      this.setVisibilityViewerSlide(this._allChildren[0].id, true);
      this.setVisibilityBouton(btn_back, false);
      this.goTo(this._allChildren[0].path);
    } else {
      if (this.ifCurrentRouteIsLast()) this.setVisibilityBouton(btn_next, false);
      if (this.ifCurrentRouteIsFirst()) this.setVisibilityBouton(btn_back, false);
      this.setVisibilityViewerSlide(this._allChildren.filter(data => data.path === this._currentRoute)[0].id, true);
    }
    window.addEventListener('keyup', (event) => {
      this.navigWithKeyboard(event.keyCode)
    })
  }

  setCurrentRoute() {
    this._currentRoute = Route.path.replace('/', "");
  }

  setAllChildren() {
    const route = Router.getRoutes().filter(data => data.name === "Home")[0];
    this._allChildren = route.children;
  }

  // fonction

  changeAnimationBack() {
    this.Animation.enter = "animate__animated animate__fadeInLeft";
    this.Animation.leave = "animate__animated animate__fadeOutRight";
  }

  changeAnimationNext() {
    this.Animation.enter = "animate__animated animate__fadeInRight";
    this.Animation.leave = "animate__animated animate__fadeOutLeft";
  }

  navigToNext() {
    this.setCurrentRoute()
    for (let i = 0; i <= this._allChildren.length - 1; i++) {
      if (this._allChildren[i].path === this._currentRoute) {
        if (i + 1 > this._allChildren.length - 1) return;
        this.setVisibilityViewerSlide(this.LastViewerSlideActive, false);
        if (this.ifNewRouteIsLast(i + 1)) this.setVisibilityBouton(btn_next, false);
        if (!this.ifNewRouteIsFirst( i + 1)) this.setVisibilityBouton(btn_back, true);
        this.setVisibilityViewerSlide(this._allChildren[i + 1].id, true);
        this.goTo(this._allChildren[i + 1].path);
      }
    }
  }

  navigToBack() {
    this.setCurrentRoute()
    for (let i = 0; i <= this._allChildren.length - 1; i++) {
      if (this._allChildren[i].path === this._currentRoute) {
        if (i - 1 < 0) return;
        this.setVisibilityViewerSlide(this.LastViewerSlideActive, false);
        if (this.ifNewRouteIsFirst(i - 1)) this.setVisibilityBouton(btn_back, false);
        if (!this.ifNewRouteIsLast(i - 1)) this.setVisibilityBouton(btn_next, true);
        this.setVisibilityViewerSlide(this._allChildren[i - 1].id, true);
        this.goTo(this._allChildren[i - 1].path);
      }
    }
  }

  navigWithKeyboard(keyCode) {
    const data = {
      back: [
        37, 8, 81
      ],
      next: [
        39, 68, 13
      ]
    }
    if (data.back.includes(keyCode)) {
      this.changeAnimationBack();
      this.navigToBack();
    }
    else if (data.next.includes(keyCode)) {
      this.changeAnimationNext();
      this.navigToNext();
    }
  }

  navigTo(id) {
    this.setCurrentRoute()
    const {Senses, newRoute} = this.getSenses(this._allChildren, this._currentRoute, id)

    this.setVisibilityViewerSlide(this.LastViewerSlideActive, false);

    if (Senses === 'back') {
      this.changeAnimationBack();
      if (this.ifNewRouteIsFirst(newRoute)) this.setVisibilityBouton(btn_back, false);
      if (!this.ifNewRouteIsLast(newRoute)) this.setVisibilityBouton(btn_next, true);
      this.setVisibilityViewerSlide(id, true);
    }
    else if (Senses === 'next') {
      this.changeAnimationNext();
      if (this.ifNewRouteIsLast(newRoute)) this.setVisibilityBouton(btn_next, false);
      if (!this.ifNewRouteIsFirst(newRoute)) this.setVisibilityBouton(btn_back, true);
      this.setVisibilityViewerSlide(id, true);
    }

    this.goTo(this._allChildren[newRoute].path);
  }

  setVisibilityBouton(button, isActive) {
    if (!isActive) button.value.classList.add('animation_visibility');
    else button.value.classList.remove('animation_visibility');
  }

  viewerSlideManager() {
    this.saveNewViewerSlide()
  }

  saveNewViewerSlide() {
    this._allChildren.map(children => {
      this.ViewerSlide[children.id] = document.getElementById(children.id)
    })
  }

  setVisibilityViewerSlide(id, isActive) {
    if (isActive) this.LastViewerSlideActive = id;
    if (isActive) this.ViewerSlide[id].classList.add('view')
    else this.ViewerSlide[id].classList.remove('view')
  }

  goTo(path) {
    Router.push(path);
  }

  //condition

  ifCurrentRouteIsLast() {
    if (this._allChildren[this._allChildren.length - 1].path === this._currentRoute) return true;
    else return false;
  }

  ifNewRouteIsLast(newRoute) {
    if (newRoute >= this._allChildren.length - 1) return true;
    else return false;
  }

  ifCurrentRouteIsFirst() {
    if (this._allChildren[0].path === this._currentRoute) return true;
    else return false;
  }

  ifNewRouteIsFirst(newRoute) {
    if (newRoute === 0) return true;
    else return false;
  }

  // getters

  getSenses(allChildren, route, id) {
    const search = {
      route: 0,
      newRoute: 0,
      result: ''
    }

    for (let i = 0; i <= allChildren.length - 1; i++) {
      if (allChildren[i].path === route) {
        search.route = i;
      }
      if (allChildren[i].id === id) {
        search.newRoute = i;
      }
    }

    if (search.route === search.newRoute && search.result === '') return;

    if (search.result === '') {
      if (search.route > search.newRoute) search.result = 'back';
      else if (search.route < search.newRoute) search.result = 'next'
    }

    return {
      Senses: search.result,
      newRoute: search.newRoute
    };
  }

  get getChildren() {
    return this._allChildren;
  }

  get getInformationRoute() {
    return Router.currentRoute
  }
}

const Navigation = reactive(new NavigationClass());
sessionsStore.setters.addFunction('Navigation', Navigation)

</script>

<template>
  <main id="Home" ref="main">
    <Horlogy />
    <Stats />
    <div id="wrapper">
      <router-view v-slot="{ Component }">
        <transition
            :enter-active-class="Navigation.Animation.enter"
            :leave-active-class="Navigation.Animation.leave"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <button id="back" class="btn_nav" ref="btn_back" @click="Navigation.changeAnimationBack(), Navigation.navigToBack()"><ion-icon name="arrow-back-circle-outline"></ion-icon></button>
    <div id="viewer_slide">
      <div @click="Navigation.navigTo(children.id)" :ref="children.id" :id="children.id" class="viewer_slide_part" v-for="(children, index) in Navigation.getChildren" :key="index"></div>
    </div>
    <button id="next" class="btn_nav" ref="btn_next" @click="Navigation.changeAnimationNext(), Navigation.navigToNext()"><ion-icon name="arrow-forward-circle-outline"></ion-icon></button>
  </main>
</template>

<style>

.viewer_slide_part:hover {
  background-color: rgba(255, 255, 255, 0.5);
  transition: 0.8s all ease
}

.viewer_slide_part.view {
  background-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-5px);
  transition: 0.8s all ease
}

.viewer_slide_part {
  width: 100%;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.15);
  margin: 10px;
  cursor: pointer;
  transition: 0.8s all ease;
  border-radius: 15px;
}

#viewer_slide {
  width: 80%;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}


main#Home button#back.btn_nav {
  left: 20px;
}

main#Home button#next.btn_nav {
  right: 20px;

}

main#Home button.btn_nav.animation_visibility {
  opacity: 0;
  bottom: -10px;
  transition: 0.5s all ease;
}

main#Home button.btn_nav:hover {
  transform: scale(1.1);
  transition: 0.3s all ease;
}

main#Home button.btn_nav {
  outline: none;
  background: transparent;
  opacity: 1;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 40px;
  position: absolute;
  cursor: pointer;
  bottom: 0px;
  transition: 0.5s all ease;
}

main#Home div#wrapper section.views_in_home {
  position: absolute;
  color: white;
  top: 70px;
  width: 90%;
  height: 85%;
  background-color: transparent;
}

main#Home div#wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

main#Home section#Horlogy {
  position: absolute;
  top: 10px;
  right: 0px;
}

main#Home {
  width: 100%;
  height: 100vh;
  background: url('../assets/img/background.jpg') center center no-repeat;
  background-size: cover;
  position: relative;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
