<template>
   <v-card
      :id="createID"
    >
      <v-card-item @click="show = !show">
        <template v-slot:prepend>
          <v-avatar
          size="48px"
        >
          <v-img
            :src="IconPath.getIcon(point)"
          ></v-img>
        </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            variant="text"
          ></v-btn>
        </template>

        <v-card-title class="text-wrap">
          {{ point.Org }}
        </v-card-title>

        <v-card-subtitle class="text-wrap">
          {{ point.Category }}, {{ point.Field }}
        </v-card-subtitle>
      </v-card-item>

      <v-card-text v-show="show">
        <v-divider></v-divider>
        <div v-if="point.Expertise">{{ point.Expertise }}<br><br></div>

        <address class="mx-4">
          <div v-if="point.Site">{{ appStore.translations[appStore.translations.lang].other.site }}: <a :href="point.Site" target="_blank"> {{ point.Site }}</a><br></div>
          <div v-if="point.Telephone">{{ appStore.translations[appStore.translations.lang].other.tel }}: <a :href="createTel" target="_blank">{{ point.Telephone }}</a><br></div>
          <div v-if="point.Address">{{ appStore.translations[appStore.translations.lang].other.address }}: <a :href="createAddress" target="_blank">{{ point.Address }}</a></div>
        </address>
      </v-card-text>


      <v-card-actions v-show="show">
        <v-btn
          @click.stop="
            appStore.listToMap.point = 0;
            appStore.mapToList.point = null;

            appStore.listToMap.point = point.ID;
            appStore.mapToList.point = point;

            appStore.list1.page = 1;
          "
          prepend-icon="mdi-map-marker"
        >
          <template v-slot:prepend>
            <v-icon color="secondary"></v-icon>
          </template>
          {{ appStore.translations[appStore.translations.lang].other.map }}
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { IconPath } from './IconPath';
import { computed, ref, watch } from 'vue';
import { onUpdated } from 'vue';

const props = defineProps(['point', 'isSelected']);
const appStore = useAppStore();

let show = ref(false);
onUpdated(() => {
  show.value = false;
});

const createID = computed(() => 'point-' + props.point.ID);
const createTel = computed(() =>'tel:' + props.point.Telephone);
const createAddress = computed(() =>
  'https://www.google.com/maps/search/?api=1&query=' + props.point.Address
);
</script>