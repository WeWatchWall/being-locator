<template>
    <div>
      <v-data-iterator 
        :items="appStore.mapFilter"
        :page="page"
        items-per-page="10"
      >
        <template v-slot:default="{ items }">
          <template
            v-for="(item, i) in items"
            :key="i"
          >
            <Point
              :point="item.raw"
              class="w-75 my-2 mx-auto"
            ></Point>
          </template>
        </template>

        <template v-slot:footer>
          <v-pagination
            :length="numPages"
            v-model="page"
            @update:modelValue="scrollTop()"
          ></v-pagination>
        </template>
      </v-data-iterator>
      <br>
      <br>
      <br>
    </div>
</template>

<script lang="ts" setup>
import { VDataIterator } from 'vuetify/lib/labs/components.mjs';
import { useAppStore } from '@/store/app';
import Point from './Point.vue';
import { computed, ref } from 'vue';

const appStore = useAppStore();
await appStore.initList();  

let page = ref(1);
let numPages = computed(() => Math.ceil(appStore.mapFilter.length / 10));

function scrollTop() {
  window.scrollTo({
    top: 400,
    behavior: 'instant',
  });
}
</script>