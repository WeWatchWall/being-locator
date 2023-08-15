<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon
      @click.stop="appStore.drawer.visible = !appStore.drawer.visible"
    ></v-app-bar-nav-icon>

    <v-img
      src="/img/being.png"
      class="mx-0"
      max-height="200"
      max-width="200"
      contain
    ></v-img>
    <v-app-bar-title>Locator</v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
  //
  import { useAppStore } from '@/store/app';
  const appStore = useAppStore();
</script>
