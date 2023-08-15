<template>
  <v-navigation-drawer
    v-model="appStore.drawer.visible"
    temporary
  >
    <v-select
      clearable
      label="Field"
      :items="[
        'Health related', 'Education related', 'Employment related',
        'Environment related', 'Sports related', 'Youth related',
        'Sustainability', 'Religious organizations', 'Social related',
        'Political related', 'Family related', 'Art related', 'Other'
      ]"
      v-model="appStore.drawer.value[0]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      label="Category"
      :items="[
        'Governmental', 'Research & Academia', 'Private', 
        'Non-governmental organisations', 'Education', 
        'Self-organised communities', 'Philantropies',
        'Parents & family communities', 'Media', 'Other',
        
      ]"
      v-model="appStore.drawer.value[1]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      label="Influence"
      :items="[
        'Low', 'Medium', 'High'
      ]"
      v-model="appStore.drawer.value[2]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      label="Activity"
      :items="[
        'Low', 'Medium', 'High'
      ]"
      v-model="appStore.drawer.value[3]"
      class="my-2 mx-2"
    ></v-select>

    <v-select
      clearable
      label="Youth"
      :items="[
        'Youth', 'Youth and Adults'
      ]"
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

      Filter
    </v-btn>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  //
  import { useAppStore } from '@/store/app';
  const appStore = useAppStore();
</script>