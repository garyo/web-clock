<template>
  <div>
    <v-btn
      class="menu-button"
      icon
      color="rgba(100, 100, 100)"
      :class="{open: drawerOpen, hidden: hideButton}"
      @click="drawerOpen=!drawerOpen"
    >
      ☰
    </v-btn>
    <v-navigation-drawer
      v-model="drawerOpen"
      class="nav-drawer"
      color="rgba(100, 100, 100, 0.5)"
      absolute
      touchless
    >
      <v-container>
        <v-row>
          <v-col>
            <v-container pt-3 />
            <div
              v-for="(param, name) in params"
              :key="name"
            >
              <v-slider
                v-if="param.type=='slider'"
                v-model="param.model.value"
                color="#ccc"
                :label="param.label"
                :min="param.min"
                :max="param.max"
                :thumb-label="true"
                hide-details
              />
              <v-checkbox
                v-if="param.type=='checkbox'"
                v-model="param.model.value"
                :label="param.label"
                hide-details
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">

const {params} = usePrefs()

const drawerOpen = ref(true)
const hideButton = ref(false)

let timer: NodeJS.Timeout|null = null

onMounted(() => {
  // Auto-close drawer after a few seconds so the user
  // can see that the drawer exists, but not get in the way
  // if they just want to use the app with defaults.
  timer = setTimeout(() => {
    drawerOpen.value = false
    hideButton.value = true
  }, 5000)
})

watch(drawerOpen, (newVal, oldVal) => {
  // Unhide open/close button when opening drawer
  if (newVal && !oldVal) {
    if (timer)
      clearTimeout(timer)
    hideButton.value = false;
  }
  // Re-hide button after closing
  else if (oldVal && !newVal) {
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      hideButton.value = true;
    }, 2000)
  }
})

</script>

<style scoped>
 .menu-button {
   position: absolute;
   left: 0;
   z-index: 10;
   opacity: 0.7;
   transition: left 0.2s;
   transition: opacity 2.0s;
 }
 .menu-button.open {
   left: 256px;
 }
 .menu-button.hidden {
   opacity: 0.2;
 }
 .menu-button:hover {
   opacity: 0.9;
   color: rgba(200, 200, 200)
 }
</style>
