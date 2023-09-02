<template>
  <v-app>
    <default-bar />
    <default-app-drawer />

    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import DefaultAppDrawer from './AppDrawer.vue'
</script>
