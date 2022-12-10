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
              v-for="slider in sliderDefs()"
              :key="slider.name"
              v-model="slider.model.value"
              color="#ccc"
              :label="slider.label"
              :min="slider.min"
              :max="slider.max"
              :thumb-label=true
            />
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">

const prefs = usePrefs();

const drawerOpen = ref(true)

const paramDefs = [
  { name: "font_size",
    type: "slider",
    label: "Font Size", model: ref(12),
    min: 1, max: 20,
    callback: (value: number) => {
      prefs.fontSize = value + 'vw'
  }},
  { name: "date_font_rel_size",
    type: "slider",
    label: "Date Font Size", model: ref(12),
    min: 0.01, max: 2,
    callback: (value: number) => {
      prefs.dateFontRelSize = value + 'em'
  }},
  { name: "time_brightness",
    type: "slider",
    label: "Time Brightness", model: ref(100),
    min: 1, max: 255,
    callback: (value: number) => {
      prefs.timeColor = `rgba(${value},${value},${value})`
  }},
  { name: "date_brightness",
    type: "slider",
    label: "Date Brightness", model: ref(90),
    min: 1, max: 255,
    callback: (value: number) => {
      prefs.dateColor = `rgba(${value},${value},${value})`
    }
  }
]

function sliderDefs() {
  return paramDefs.filter((x) => x.type == 'slider')
}

// Call callbacks when value changes
for (const param of paramDefs) {
  watch(param.model, (value) => {
    if (param.callback)
      param.callback(value);
    savePrefs();
  })
}

let allowSave = false

function savePrefs() {
  if (!allowSave)
    return
  const prefs: { [key: string]: number|string } = {}
  for (const param of paramDefs) {
    if (typeof(param.model.value) != 'undefined')
      prefs[param.name] = param.model.value
  }
  const stringPrefs = JSON.stringify(prefs)
  if (stringPrefs != '{}')
    localStorage.setItem('prefs', stringPrefs)
}

function loadPrefs() {
  if (localStorage.getItem('prefs')) {
    try {
      const prefsAsJson = localStorage.getItem('prefs')
      if (!prefsAsJson)
        return
      const prefs = JSON.parse(prefsAsJson)
      for (const param of paramDefs) {
        if (prefs[param.name]) {
          param.model.value = prefs[param.name]
        }
      }
    } catch(e) {
      console.error(`Error loading prefs: ${e}`)
      debugger
      // localStorage.removeItem('prefs')
    }
  }
}

onMounted(() => {
  loadPrefs()
  allowSave = true
})

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
