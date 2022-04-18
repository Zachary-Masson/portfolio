<script setup>

</script>

<template>
  <section id="Profile" class="views_in_home">
    <section class="content-logo">
      <img src="../../assets/img/logo.png" alt="" class="logo">
      <h1 class="name">DevNetwork</h1>
    </section>
    <section class="social-network">
      <div class="network"></div>
    </section>
  </section>
</template>

<style scoped>
section#Profile {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

section#Profile section {
  width: 100%;
  height: 100%;
}

section#Profile section.content-logo {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s all ease-in-out;
}

section#Profile section.content-logo img.logo:hover {
  transform: scale(1.05);
  transition: 0.5s all ease;
}

section#Profile section.content-logo img.logo {
  width: 350px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  padding: 15px;
  z-index: 2;
  transition: 0.5s all ease;
}

section#Profile section.content-logo h1.name {
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 0px 0px 15px 15px;
  transform: translateY(-55px);
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 10px;
  padding: 60px 20px 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.11);
}
</style>