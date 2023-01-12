<template>
  <v-app dark="true">
    <ConfigUi />
    <v-container
      fluid
      class="app pa-0"
    >
      <v-row
        class="fill-height pa-0"
        align="center"
        justify="center"
      >
        <v-col class="pa-0">
          <DigitalClock
            :params="paramValues"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
const {params, paramValues, loadPrefs} = usePrefs()

const appName = "Web Clock 3"

onMounted(() => {
  loadPrefs()
})

</script>

<style scoped>
 .app {
   height: 105vh;
   background-image: url('/img/brushed-metal-dark-1-sm.jpg');
   background-size: 100% 100%;
 }
</style>
<style>
 /* globally turn off Chrome scrollbar */
 body::-webkit-scrollbar {
   display: none;
 }
 html {
   scrollbar-width: none;
 }
</style>
