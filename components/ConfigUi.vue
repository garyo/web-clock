<template>
  <div>
    <v-btn
      class="menu-button"
      icon
      color="rgba(100, 100, 100, 0.6)"
      :class="{open: drawerOpen}"
      @click="drawerOpen=!drawerOpen"
    >
      ☰
    </v-btn>
    <v-navigation-drawer
      v-model="drawerOpen"
      class="nav-drawer"
      color="rgba(100, 100, 100, 0.5)"
      absolute
    >
      <v-container>
        <v-row>
          <v-col>
            <v-container py-3/><!-- blank space at top -->
            <v-slider
              v-for="slider in sliderDefs"
              :key="slider.label"
              v-model="slider.model.value"
              color="#ccc"
              :label="slider.label"
              :min="slider.min"
              :max="slider.max"
              thumb-label="true"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">

import {useConfig} from '../composables/model'

const theConfig = useConfig();

const drawerOpen = ref(true)

const sliderDefs = [
  { label: "Font Size", model: ref(12),
    min: 1, max: 20,
    callback: (value: number) => {
      theConfig.fontSize = value + 'vw'
  }},
  { label: "Time Brightness", model: ref(100),
    min: 1, max: 255,
    callback: (value: number) => {
      theConfig.timeColor = `rgba(${value},${value},${value})`
  }},
  { label: "Date Brightness", model: ref(90),
    min: 1, max: 255,
    callback: (value: number) => {
      theConfig.dateColor = `rgba(${value},${value},${value})`
    }
  }
]

// Call callbacks when value changes
for (const slider of sliderDefs) {
  watch(slider.model, (value) => slider.callback && slider.callback(value))
}

</script>

<style scoped>
 .menu-button {
   position: absolute;
   left: 0;
   z-index: 10;
   transition: left 0.2s;
 }
 .menu-button.open {
   left: 256px;
 }
</style>
