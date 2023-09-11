<template>
    <div>
      <v-data-iterator 
        :items="appStore.mapFilter"
        :page="appStore.list1.page"
        :items-per-page="Environment.numPerPage"
      >
        <template v-slot:default="{ items }">
          <template
            v-for="(item, i) in items"
            :key="i"
          >
            <PointSmall
              :point="item.raw"
              class="my-1 mx-auto"
            ></PointSmall>
          </template>
        </template>

        <template v-slot:footer>
          <v-pagination
            :length="numPages"
            v-model="appStore.list1.page"
            @update:modelValue="scrollTop()"
          ></v-pagination>
        </template>
      </v-data-iterator>
    </div>
</template>

<script lang="ts" setup>
import { Environment } from "../env"
import { VDataIterator } from 'vuetify/lib/labs/components.mjs';
import { useAppStore } from '@/store/app';
import PointSmall from './PointSmall.vue';
import { computed } from 'vue';

const appStore = useAppStore();
await appStore.initList();

let numPages = computed(() => Math.ceil(appStore.mapFilter.length / Environment.numPerPage));

function scrollTop() {
  window.scrollTo({
    top: Environment.mapHeightPx,
    behavior: 'instant',
  });
}
</script>