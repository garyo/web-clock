<template>
  <v-container
    fluid
    fill-height
    class="clock"
    :style="{fontSize: config.fontSize}"
  >
    <v-row
      no-gutters
      justify="center"
    >
      <v-col align="center">
        <div
          class="time"
          :style="{color: config.timeColor}"
        >
          {{ timeString }}
        </div>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      justify="center"
    >
      <v-col align="center">
        <div
          class="date"
          :style="{color: config.dateColor}"
        >
          {{ dateString }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {DateTime} from 'luxon'
import {useConfig} from '../composables/model'

const props = defineProps({
  clockStyle: {
    type: String, // digital or analog
    default: "digital"
  },
  dateFormat: {
    type: Object,
    default: () => {return {weekday: 'short', month: 'short', day: 'numeric'}}
  },
  timeFormat: {
    type: Object,
    default: () => {return {hour: 'numeric', minute: '2-digit', second: '2-digit', }}
  }
})

let config = useConfig()
let dateString = ref("...thinking...")
let timeString = ref("...thinking...")
let timer = undefined

function setDateTime() {
  const date = DateTime.now()
  dateString.value = new Intl.DateTimeFormat('default', props.dateFormat).format(date)
  timeString.value = new Intl.DateTimeFormat('default', props.timeFormat).format(date)
}

onBeforeMount(() => {
  timer = setInterval(setDateTime, 500)
  setDateTime()
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

</script>
<style scoped>
 .clock {
   font-family: "Overpass Mono";
   font-weight: 100;
   /* text-shadow: rgba(0, 255, 255, 0.5) 0px 0 15px; */
   text-shadow: 3px 3px 1px black;
   height: 100%;
 }
 .date {
   font-size: 0.5em;
   font-family: "Comfortaa";
   font-weight: 100;
   color: #ccc;
 }
</style>
