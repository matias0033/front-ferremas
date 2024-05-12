<template>

  <v-app>
    <MenuComponent  v-if="route().path != '/login'"   />

    <v-main >
      <router-view v-if="route().path  === '/' || route().path === '/login'" />
    </v-main>
  </v-app>
  <!-- <AppFooter /> -->
</template>

<script lang="ts" setup>
//


const route = () => {
  return useRoute();
};


</script>

<style>
.tamanho {
  min-height: 100vh;
  height: auto;
  overflow-y: auto;
  background-color: #f5f5f5;

}
</style>