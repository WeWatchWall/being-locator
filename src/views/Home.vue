<template>
  <Map />
  <Point
    v-if="appStore.mapToList.point"
    :point="appStore.mapToList.point"
    :is-selected="true"
  />
  <v-divider class="my-5" v-if="appStore.mapToList.point"></v-divider>
  <Suspense><List /></Suspense>
  <BackToTop />
</template>

<script lang="ts" setup>
import Map from '@/components/Map.vue'
import List from '@/components/List.vue'
import BackToTop from '@/components/BackToTop.vue';
import { useAppStore } from '@/store/app';
import Point from '@/components/Point.vue';

const appStore = useAppStore();
</script>
