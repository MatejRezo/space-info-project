<template>
  <v-app>
    <v-app-bar app>
      <AppHeaderVue />
    </v-app-bar>
    <v-main>
      <v-container fluid class="p-0">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AppHeaderVue from "./components/AppHeader.vue";
</script>

<style lang="scss">
.v-container{
  padding: 0px !important;
  height: 100%;
}
</style>
