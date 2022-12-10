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
            <v-slider
              v-for="slider in sliderDefs"
              :key="slider.label"
              color="#ddd"
              v-model=slider.model.value
              :label=slider.label
              min="1"
              max="100"
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
const fontSizeSliderVal = ref(12)
const brightnessSliderVal = ref(100)
const dateBrightnessSliderVal = ref(90)

watch(fontSizeSliderVal, (value: number) => {
  theConfig.fontSize = value * 20 / 100 + 'vw'
})

watch(brightnessSliderVal, (value: number) => {
  const scaledVal = Math.round(value * 255 / 100)
  theConfig.timeColor = `rgba(${scaledVal},${scaledVal},${scaledVal})`
})

watch(dateBrightnessSliderVal, (value: number) => {
  const scaledVal = Math.round(value * 255 / 100)
  theConfig.dateColor = `rgba(${scaledVal},${scaledVal},${scaledVal})`
})

const sliderDefs = [
  { label: "Font Size", model: fontSizeSliderVal },
  { label: "Time Brightness", model: brightnessSliderVal },
  { label: "Date Brightness", model: dateBrightnessSliderVal },
]
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
