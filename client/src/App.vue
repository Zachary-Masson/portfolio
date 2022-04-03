<script setup>
import useSessionsStore from "./stores/sessions";
const sessionsStore = useSessionsStore();
sessionsStore.methods.genId();
sessionsStore.methods.saveSessionsInVarSessions();
</script>

<template>
  <router-view />
</template>

<style>
#app,
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
  box-sizing: content-box;
}

html {
  background-color: rgb(231, 232, 232);
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(231, 232, 232);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(11, 172, 255, 1);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:rgba(11, 222, 255, 1);
}
</style>
