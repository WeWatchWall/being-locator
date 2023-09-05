<template>
  <v-navigation-drawer
    v-model="appStore.drawer.visible"
    temporary
  >
    <v-select
      clearable
      :label="appStore.translations[appStore.translations.lang].field.name"
      :items="appStore.translations[appStore.translations.lang].field.options"
      v-model="appStore.drawer.value[0]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      :label="appStore.translations[appStore.translations.lang].category.name"
      :items="appStore.translations[appStore.translations.lang].category.options"
      v-model="appStore.drawer.value[1]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      :label="appStore.translations[appStore.translations.lang].influence.name"
      :items="appStore.translations[appStore.translations.lang].influence.options"
      v-model="appStore.drawer.value[2]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      :label="appStore.translations[appStore.translations.lang].activity.name"
      :items="appStore.translations[appStore.translations.lang].activity.options"
      v-model="appStore.drawer.value[3]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      :label="appStore.translations[appStore.translations.lang].youth.name"
      :items="appStore.translations[appStore.translations.lang].youth.options"
      v-model="appStore.drawer.value[4]"
      class="my-2 mx-2"
    ></v-select>

    <v-btn
      @click.stop="
        // console.log(appStore.drawer.value);
        // Close the drawer.
        appStore.drawer.visible = false;

        // Reset selected point.
        appStore.mapToList.point = null;

        // Reset pagination.
        appStore.list1.page = 1;
        
        scrollTop();

        // Filter the list.
        appStore.filterList();
      "

      prepend-icon="mdi-filter"
      class="mx-16"
    >
      <template v-slot:prepend>
        <v-icon color="primary"></v-icon>
      </template>

      {{ appStore.translations[appStore.translations.lang].other.filter }}
    </v-btn>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
//
import { useAppStore } from '@/store/app';
const appStore = useAppStore();


function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>