<template>
  <v-container
    fluid
    fill-height
    class="clock"
    :style="{fontSize: props.params.fontSize}"
  >
    <v-row
      no-gutters
      justify="center"
    >
      <v-col align="center">
        <div
          class="time"
          :style="{color: makeColor(props.params.timeBrightness)}"
        >
          <span class="hours">{{ hoursString }}:</span>
          <span class="minutes">{{ minutesString }}</span>
          <span class="seconds"
                :style="{top: props.params.secondsVOffset,
                  color: makeColor(props.params.secondsBrightness)}"
                :class="{stacked: props.params.secondsStyle == 'Stacked'}">
            <span class="sec"
                  :style="{fontSize: props.params.secondsRelSize}">
              :{{ secondsString }}
            </span>
            <span class="ampm"
                  :style="{fontSize: props.params.ampmRelSize}">
              {{ ampmString }}
            </span>
          </span>
        </div>
      </v-col>
    </v-row>
    <v-row
      v-if="props.params.showDate"
      no-gutters
      justify="center"
    >
      <v-col align="center">
        <div
          class="date"
          :style="{color: makeColor(props.params.dateBrightness),
            fontSize: props.params.dateFontRelSize,
          marginTop: props.params.verticalSpacing}"
        >
          <span>{{ dateString }}</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {DateTime} from 'luxon'
import type {Dictionary} from 'composables/prefs'

const props = defineProps({
  dateFormat: {
    type: Object,
    default: () => {return {weekday: 'short', month: 'short', day: 'numeric'}}
  },
  timeFormat: {
    type: Object,
    default: () => {return {hour: 'numeric', minute: '2-digit', second: '2-digit', }}
  },
  params: {
    type: Object as () => Dictionary,
    required: true
  },
})

let dateString = ref("...thinking...")
let hoursString = ref("00")
let minutesString = ref("00")
let secondsString = ref("00")
let ampmString = ref("")
let timer: ReturnType<typeof setInterval>|undefined = undefined

function makeColor(v: number) {
  return `rgba(${v}, ${v}, ${v})`
}

function setDateTime() {
  const date = DateTime.now()
  dateString.value = new Intl.DateTimeFormat('default', props.dateFormat).format(date)
  // timeString.value = new Intl.DateTimeFormat('default', props.timeFormat).format(date)
  hoursString.value = date.toFormat('h')
  minutesString.value = date.toFormat('mm')
  secondsString.value = date.toFormat('ss')
  if (props.params.ampmUpperCase)
    ampmString.value = date.toFormat('a').toUpperCase()
  else
    ampmString.value = date.toFormat('a').toLowerCase()
}

onBeforeMount(() => {
  timer = setInterval(setDateTime, 500)
  /*   setDateTime() */
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
 .time {
   display: flex;
   align-items: center;
   justify-content: center;
   line-height: 1.0;
 }
 .seconds {
   line-height: 1.0em;
   display: flex;
   position: relative;
 }
 .sec {
   line-height: 1.0em;
 }
 .ampm {
   line-height: 1.0em;
 }
 .stacked {
   flex-direction: column;
 }
 .date {
   font-family: "Comfortaa";
   font-weight: 100;
   line-height: 1.0;
 }
</style>
