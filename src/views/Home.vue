<template>
  <Map />

  <v-expansion-panels>
  <v-expansion-panel class="text-center">
  <v-expansion-panel-title>
    {{ appStore.translations[appStore.translations.lang].other.legend }}
  </v-expansion-panel-title>
  <v-expansion-panel-text>
    <v-chip
      class="ma-2"
      color="red"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-pharmacy-64.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[0] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="purple"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-library-64.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[1] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="orange"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-labor-64.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[2] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="green"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-environment-48.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[3] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="blue"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-gym-48.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[4] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="purple"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-youth-40.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[5] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="green"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-recycle-48.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[6] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="orange"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-prayer-48.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[7] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="pink"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-social-48.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[8] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="blue"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-political-64.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[9] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="purple"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-family-40.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[10] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="pink"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-art-48.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[11] }}
    </v-chip>
    <v-chip
      class="ma-2"
      color="blue"
    >
      <v-avatar
        size="36px"
      >
        <v-img
          src="../../public/img/icons8-other-48.png"
        ></v-img>
      </v-avatar>
      {{ appStore.translations[appStore.translations.lang].field.options[12] }}
    </v-chip>
  </v-expansion-panel-text>
  </v-expansion-panel>
  </v-expansion-panels>

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
