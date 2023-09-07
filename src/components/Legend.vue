<template>
  <v-expansion-panels>
    <v-expansion-panel class="text-center">
      <v-expansion-panel-title>
        {{ appStore.translations[appStore.translations.lang].other.legendFields }}
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
              src="../../public/img/health/red.png"
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
              src="../../public/img/education/purple.png"
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
              src="../../public/img/employment/grey.png"
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
              src="../../public/img/environment/green.png"
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
              src="../../public/img/sports/blue.png"
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
              src="../../public/img/youth/purple.png"
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
              src="../../public/img/sustainability/green.png"
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
              src="../../public/img/religion/orange.png"
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
              src="../../public/img/social/pink.png"
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
              src="../../public/img/political/blue.png"
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
              src="../../public/img/family/purple.png"
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
              src="../../public/img/art/pink.png"
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
              src="../../public/img/other/blue.png"
            ></v-img>
          </v-avatar>
          {{ appStore.translations[appStore.translations.lang].field.options[12] }}
        </v-chip>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel class="text-center">
      <v-expansion-panel-title>
        {{ appStore.translations[appStore.translations.lang].other.legendCategories }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-chip
          class="ma-2"
          color="red"
        >
          <v-icon start icon="mdi-checkbox-blank-circle" color="red"></v-icon>
          {{ appStore.translations[appStore.translations.lang].category.options[0] }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="green"
        >
          <v-icon start icon="mdi-checkbox-blank-circle" color="green"></v-icon>
          {{ appStore.translations[appStore.translations.lang].category.options[1] }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="black"
        >
          <v-icon start icon="mdi-checkbox-blank-circle" color="black"></v-icon>
          {{ appStore.translations[appStore.translations.lang].category.options[2] }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="blue"
        >
          <v-icon start icon="mdi-checkbox-blank-circle" color="blue"></v-icon>
          {{ appStore.translations[appStore.translations.lang].category.options[3] }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="purple"
        >
          <v-icon start icon="mdi-checkbox-blank-circle" color="purple"></v-icon>
          {{ appStore.translations[appStore.translations.lang].category.options[4] }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="orange"
        >
          <v-icon start icon="mdi-checkbox-blank-circle" color="orange"></v-icon>
          {{ appStore.translations[appStore.translations.lang].category.options[5] }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="pink"
        >
          <v-icon start icon="mdi-checkbox-blank-circle" color="pink"></v-icon>
          {{ appStore.translations[appStore.translations.lang].category.options[6] }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="light-green-accent-3"
        >
          <v-icon start icon="mdi-checkbox-blank-circle" color="light-green-accent-3"></v-icon>
          {{ appStore.translations[appStore.translations.lang].category.options[7] }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="grey-darken-2"
        >
          <v-icon start icon="mdi-checkbox-blank-circle" color="grey-darken-2"></v-icon>
          {{ appStore.translations[appStore.translations.lang].category.options[8] }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="grey"
        >
          <v-icon start icon="mdi-checkbox-blank-circle" color="grey"></v-icon>
          {{ appStore.translations[appStore.translations.lang].category.options[9] }}
        </v-chip>
      </v-expansion-panel-text>
      
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
const appStore = useAppStore();
</script>