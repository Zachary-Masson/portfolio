<script setup>
import { ref, onMounted } from "vue"
import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, AmbientLight } from 'troisjs';
import useSessionsStore from "../stores/sessions";
const sessionsStore = useSessionsStore();
// const renderer = ref()
// const box = ref()
// const sphere = ref()
//
//
// onMounted(() => {
//   renderer.value.renderer.clearColor(0, 0, 0, 0)
//   sphere.value.mesh.position.x = 10
//   renderer.value.onBeforeRender(() => {
//     box.value.mesh.rotation.y += 0.01;
//   })
// })

</script>
<template>
  <main id="Home">
    <section id="top">
      <content id="content-top">
        <img :src="sessionsStore.getters.getConfig().logo_url" alt id="logo" />

        <a target="blank" href="https://github.com/DevNetworktm" id="github">
          <content>
            Mon Github
            <ion-icon name="logo-github"></ion-icon>
          </content>
        </a>
        <img src="/libs/svg/wave.svg" alt class="waves" />
        <img src="/libs/svg/wave.svg" alt class="waves-bottom" />
      </content>
    </section>
    <section id="second">
      <content id="content-second">
      </content>
    </section>
    <!--    <section id="three">-->
    <!--      <Renderer resize orbit-ctrl ref="renderer" :alpha="true">-->
    <!--        <Camera :position="{ "z": 20 }" />-->
    <!--        <Scene>-->
    <!--          <PointLight color="#ffffff" :intensity="0.5" :position="{ "x": 1, "y": 1 }" />-->
    <!--          <Sphere ref="box">-->
    <!--            <BasicMaterial>-->
    <!--              <Texture src="/src/assets/img/textures/terre.jpg" />-->
    <!--            </BasicMaterial>-->
    <!--          </Sphere>-->
    <!--          <Sphere ref="sphere">-->
    <!--            <BasicMaterial>-->
    <!--              <Texture src="/src/assets/img/textures/moon.jpg" />-->
    <!--            </BasicMaterial>-->
    <!--          </Sphere>-->
    <!--        </Scene>-->
    <!--      </Renderer>-->
    <!--    </section>-->
  </main>
</template>
<style>
:root {
  --logo-size: 250px;
}

/*Section Second*/
main#Home section#second {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
  background: rgb(21,46,83);
  background: -moz-linear-gradient(170deg, rgba(21,46,83,1) 33%, rgba(27,5,145,1) 76%);
  background: -webkit-linear-gradient(170deg, rgba(21,46,83,1) 33%, rgba(27,5,145,1) 76%);
  background: linear-gradient(170deg, rgba(21,46,83,1) 33%, rgba(27,5,145,1) 76%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#152e53",endColorstr="#1b0591",GradientType=1);
}

/*Section Top*/
main#Home section#top {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
  background: url("../assets/img/background.jpg") center center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

main#Home section#top img.waves {
  position: absolute;
  width: 100%;
  z-index: -1;
  overflow: hidden;
  top: 0;
  left: 0;
}

main#Home section#top img.waves-bottom {
  position: absolute;
  width: 100%;
  z-index: -1;
  overflow: hidden;
  transform: rotate(180deg);
  bottom: 0;
  left: 0;
}

main#Home section#top content#content-top {
  display: block;
  width: var(--logo-size);
  text-align: center;

}

main#Home section#top content#content-top img#logo {
  width: var(--logo-size);
  border-radius: 100%;
  box-shadow: 0 15px 25px rgb(0, 0, 0, 0.1);
  transform: scale(1);
  margin-bottom: 20px;
  transition: 0.3s all ease;
}

main#Home section#top content#content-top img#logo:hover {
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
  transition: 0.3s all ease;
}

main#Home section#top content#content-top a#github {
  padding: 10px 30px;
  border-radius: 5px;

  font-size: 20px;
  color: white;
  text-decoration: none;
  background: rgb(63, 141, 255);
  background: -moz-linear-gradient(
    122deg,
    rgba(63, 141, 255, 1) 18%,
    rgba(67, 68, 236, 1) 96%
  );
  background: -webkit-linear-gradient(
    122deg,
    rgba(63, 141, 255, 1) 18%,
    rgba(67, 68, 236, 1) 96%
  );
  background: linear-gradient(
    122deg,
    rgba(63, 141, 255, 1) 18%,
    rgba(67, 68, 236, 1) 96%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3f8dff",endColorstr="#4344ec",GradientType=1);
  transition: 0.3s all ease;
}

main#Home section#top content#content-top a#github:hover {
  padding: 15px 35px;
  transition: 0.3s all ease;
}

/*main#Home section#three {*/
/*  margin-top: 20vh;*/
/*  width: 100%;*/
/*  height: 100vh;*/

/*  background: url("../assets/img/textures/space.jpg") center center no-repeat;*/
/*  background-size: cover;*/
/*}*/
</style>
