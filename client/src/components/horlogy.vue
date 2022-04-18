<script setup>
import {ref, onMounted} from "vue";

const hour = ref('');
const minute = ref('');
const seconds = ref('');

onMounted(() => {
  const setTime = () => {
    const date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    if (hr < 10) hr = `0${hr}`;
    if (min < 10) min = `0${min}`;
    if (sec < 10) sec = `0${sec}`;

    hour.value.innerText = hr;
    minute.value.innerText = min;
    seconds.value.innerText = sec;
  }
  setTime()
  setInterval(setTime,1000)
})
</script>

<template>
  <section id="Horlogy">
    <div id="hour" ref="hour">00</div>:
    <div id="minute" ref="minute">00</div>:
    <div id="seconds" ref="seconds">00</div>
  </section>
</template>

<style scoped>
div {
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#Horlogy {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 25px;
}
</style>