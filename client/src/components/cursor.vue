<script setup>
import {ref, onMounted} from "vue";
const cursor = ref();
onMounted(() => {
  window.addEventListener('mousemove', e => {
    setTimeout(() => {
      cursor.value.setAttribute('style', `top: ${e.pageY-15}px; left: ${e.pageX-15}px;`)
    }, 30)
  })
})
</script>
<template>
  <div id="Cursor" ref="cursor">

  </div>
</template>
<style scoped>

div#Cursor:before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 90%;
  transform: translateY(-3.5px) translateX(-3.5px) scale(0.8);
  opacity: 0.6;
  height: 90%;
  border-radius: 100%;
  border: 5px solid gray;
  animation: 0.3s anime infinite ease-in-out alternate;
  z-index: 1;
}

div#Cursor {
  mix-blend-mode: difference;
  background-color: white;
  position: absolute;
  z-index: 2;
  pointer-events: none;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(255, 255, 255, 1);
  border-radius: 100%;
}

@keyframes anime {
  to {
    transform: translateY(-3.5px) translateX(-3.5px) scale(1.2);
  }
}
</style>