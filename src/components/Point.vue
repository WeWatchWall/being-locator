<template>
   <v-card
      :id="createID"
    >
      <template v-slot:append v-if="isSelected">
        <v-btn
          icon="mdi-close"
          @click.stop="
            appStore.listToMap.point = 0;
            appStore.mapToList.point = null;
          "
        ></v-btn>
      </template>

      <v-card-title class="text-wrap">
        {{ point.Org }}
      </v-card-title>
        
      <v-card-text>
        {{ point.Expertise }}<br><br>

        {{ (<any>appStore.translations.current).other.field }}: {{ point.Field }}<br>
          {{ (<any>appStore.translations.current).other.category }}: {{ point.Category }}<br><br>

        
        <address class="mx-4">
          {{ (<any>appStore.translations.current).other.site }}: <a :href="point.Site" target="_blank"> {{ point.Site }}</a><br>
          {{ (<any>appStore.translations.current).other.tel }}: <a :href="createTel" target="_blank">{{ point.Telephone }}</a><br>
          {{ (<any>appStore.translations.current).other.address }}: <a :href="createAddress" target="_blank">{{ point.Address }}</a>
        </address>
      </v-card-text>


      <v-card-actions>
        <v-btn
          @click.stop="
            appStore.listToMap.point = point.ID;
            appStore.mapToList.point = point;

            appStore.list1.page = 1;
          "
          prepend-icon="mdi-map-marker"
        >
          <template v-slot:prepend>
            <v-icon color="secondary"></v-icon>
          </template>
          {{ (<any>appStore.translations.current).other.map }}
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { computed } from 'vue';

const props = defineProps(['point', 'isSelected']);
const appStore = useAppStore();

const createID = computed(() => 'point-' + props.point.ID);
const createTel = computed(() =>'tel:' + props.point.Telephone);
const createAddress = computed(() =>
  'https://www.google.com/maps/search/?api=1&query=' + props.point.Address
);
</script>