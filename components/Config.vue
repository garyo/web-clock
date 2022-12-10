<template>
  <div>
    <v-btn @click="drawerOpen=!drawerOpen" class="menu-button" :class="{open: drawer}">
      ☰
    </v-btn>
    <v-navigation-drawer class="nav-drawer" color="rgba(30, 30, 30, 0.5)"
                         v-model="drawerOpen"
                         absolute
    >
    <v-list>
      <v-card>
        <v-card-title>Font Size</v-card-title>
        <v-slider v-model="fontSizeSliderVal" max="100" min="1" @input="onFontSize($event)">
        </v-slider>
      </v-card>
      <v-card>
        <v-card-title>Time Brightness</v-card-title>
        <v-slider v-model="brightessSliderVal" max="100" min="1" @input="onBrightness($event)">
        </v-slider>
      </v-card>
      <v-card>
        <v-card-title>Date Brightness</v-card-title>
        <v-slider v-model="dateBrightessSliderVal" max="100" min="1" @input="onDateBrightness($event)">
        </v-slider>
      </v-card>
    </v-list>
  </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">

import {useConfig} from '../composables/model'

const config = useConfig();

const drawerOpen = ref<boolean>(true)
const fontSizeSliderVal = ref(12)
const brightnessSliderVal = ref(100)
const dateBrightnessSliderVal = ref(90)

function onFontSize(value) {
  config.fontSize = value * 20 / 100 + 'vw'
}
function onBrightness(value) {
  const scaledVal = Math.round(value * 255 / 100)
  config.timeColor = `rgba(${scaledVal},${scaledVal},${scaledVal})`
}
function onDateBrightness(value) {
  const scaledVal = Math.round(value * 255 / 100)
  config.dateColor = `rgba(${scaledVal},${scaledVal},${scaledVal})`
}
</script>

<style scoped>
 .menu-button {
   position: absolute;
   left: 0;
   width: 24px;
   z-index: 10;
   opacity: 70%;
   transition: left 0.2s;
 }
 .menu-button.open {
   left: 256px;
 }
</style>
