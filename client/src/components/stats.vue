<script setup>
import {ref, reactive} from 'vue';
import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:3000/utils/"});
const content = ref();
const button = ref();

let visibility = false;

const stats = reactive({
  views: 0,
  people: 0,
  stars: 0,
  time: 0
})

const setVisibility = () => {
  if (visibility) {
    visibility = false;
    button.value.classList.remove('active');
    content.value.classList.remove('active');
  }
  else {
    visibility = true;
    getStats();
    button.value.classList.add('active');
    content.value.classList.add('active');
  }
}

const getStats = async () => {
  const firstTime = new Date().getMilliseconds();
  const response = await API.get('/getStats');
  const secondTime = new Date().getMilliseconds();
  stats.views = response.data.views;
  stats.people = response.data.people;
  stats.stars = response.data.stars;
  stats.time = secondTime - firstTime
}

</script>
<template>
  <section id="Stats">
    <button id="btn-viewer" ref="button" @click="setVisibility()">
      <ion-icon name="stats-chart-outline"></ion-icon>
    </button>
    <section id="content" ref="content">
      <div class="stats">
        <span class="icons"><ion-icon name="eye-outline"></ion-icon></span> <span class="text">{{ stats.views }} views</span>
      </div>
      <div class="stats">
        <span class="icons"><ion-icon name="accessibility-outline"></ion-icon></span> <span class="text">{{ stats.people }} people</span>
      </div>
      <div class="stats">
        <span class="icons"><ion-icon name="star-outline"></ion-icon></span> <span class="text">{{ stats.stars }} stars</span>
      </div>
      <div class="stats">
        <span class="icons"><ion-icon name="timer-outline"></ion-icon></span> <span class="text">{{ stats.time }} ms</span>
      </div>
    </section>
  </section>
</template>

<style scoped>

section#Stats section#content div.stats span.icons {
  transform: translateY(-2px);
  text-align: center;
  font-size: 20px;
  width: 50px;
}

section#Stats section#content div.stats {
  color: white;
  font-size: 15px;
  display: flex;
  margin-top: 5px;
  opacity: 0.8;
  font-weight: lighter;
}

section#Stats section#content.active {
  opacity: 1;
  transform: translateY(0%);
  transition: 1s all ease;
}

section#Stats section#content {
  margin-left: 10px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(20px);
  width: auto;
  height: auto;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  z-index: 1;
  transform: translateY(-120%);
  opacity: 0;
  transition: 1s all ease;
}

section#Stats button#btn-viewer.active {
  border-color: rgba(255, 255, 255, 0.8);
  transition: 0.3s all ease;
}

section#Stats button#btn-viewer:hover {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.8);
  transition: 0.3s all ease;
}

section#Stats button#btn-viewer{
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(20px);
  border: 1px solid transparent;
  color: white;
  height: 45px;
  width: 45px;
  font-size: 25px;
  outline: none;
  cursor: pointer;
  transition: 0.3s all ease;
}

section#Stats {
  display: flex;
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>