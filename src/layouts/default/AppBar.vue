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
    <v-app-bar-title>{{ appStore.translations[appStore.translations.lang].other.title }}</v-app-bar-title>

    <v-spacer></v-spacer>
    <v-btn
      @click.stop="appStore.switchLang()"
    >
      {{ appStore.translations.lang }}
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
//
import { useAppStore } from '@/store/app';
const appStore = useAppStore();
</script>
