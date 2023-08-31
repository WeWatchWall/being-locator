<template>
  <v-navigation-drawer
    v-model="appStore.drawer.visible"
    temporary
  >
    <v-select
      clearable
      :label="(<any>appStore.translations.current).field.name"
      :items="(<any>appStore.translations.current).field.options"
      v-model="appStore.drawer.value[0]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      :label="(<any>appStore.translations.current).category.name"
      :items="(<any>appStore.translations.current).category.options"
      v-model="appStore.drawer.value[1]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      :label="(<any>appStore.translations.current).influence.name"
      :items="(<any>appStore.translations.current).influence.options"
      v-model="appStore.drawer.value[2]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      :label="(<any>appStore.translations.current).activity.name"
      :items="(<any>appStore.translations.current).activity.options"
      v-model="appStore.drawer.value[3]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      :label="(<any>appStore.translations.current).youth.name"
      :items="(<any>appStore.translations.current).youth.options"
      v-model="appStore.drawer.value[4]"
      class="my-2 mx-2"
    ></v-select>

    <v-btn
      @click.stop="
        // console.log(appStore.drawer.value);
        appStore.drawer.visible = false;
        appStore.filterList();
        appStore.mapToList.point = null;
      "

      prepend-icon="mdi-filter"
      class="mx-16"
    >
      <template v-slot:prepend>
        <v-icon color="primary"></v-icon>
      </template>

      {{ (<any>appStore.translations.current).other.filter }}
    </v-btn>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
//
import { useAppStore } from '@/store/app';
const appStore = useAppStore();

appStore.initTranslations();
</script>