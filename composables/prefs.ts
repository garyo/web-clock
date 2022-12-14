import {ref, watch, computed} from 'vue'

interface Param {
  type: "slider"|"checkbox"|"color",
  label: string,
  model: any,
  min?: number,
  max?: number
}
interface Params {
  [key: string]: Param
}

const params: Params  = {
  fontSize: {
    type: "slider",
    label: "Font Size",
    model: ref(13),
    min: 1, max: 20,
  },
  dateFontRelSize: {
    type: "slider",
    label: "Date Font Size",
    model: ref(0.8),
    min: 0.01, max: 2,
  },
  timeBrightness: {
    type: "slider",
    label: "Time Brightness",
    model: ref(220),
    min: 1, max: 255,
  },
  showDate: {
    type: "checkbox",
    label: "Show Date",
    model: ref(true),
  },
  dateBrightness: {
    type: "slider",
    label: "Date Brightness",
    model: ref(150),
    min: 1, max: 255,
  }
}

let allowSave = false           // don't save until we've loaded them

interface Dictionary { [key: string]: number|string|boolean }

function savePrefs() {
  if (!allowSave)
    return;
  const prefsDict: Dictionary = {}
  for (const param in params) {
    if (typeof(params[param].model.value) != 'undefined')
      prefsDict[param] = params[param].model.value
  }
  // console.log('Saving prefs:', prefsDict)
  const stringPrefs = JSON.stringify(prefsDict)
  if (stringPrefs != '{}')
    localStorage.setItem('prefs', stringPrefs)
}

function loadPrefs() {
  if (localStorage.getItem('prefs')) {
    try {
      const prefsAsJson = localStorage.getItem('prefs')
      if (!prefsAsJson)
        return
      const prefsDict = JSON.parse(prefsAsJson)
      console.log('Loading prefs: ', prefsDict);
      for (const param in params) {
        if (typeof(prefsDict[param]) != 'undefined') {
          params[param].model.value = prefsDict[param]
        }
      }
    } catch(e) {
      console.error(`Error loading prefs: ${e}`)
      localStorage.removeItem('prefs')
    }
  }
  // Save prefs when any value changes
  for (const param in params) {
    watch(params[param].model, () => { savePrefs() })
  }
  allowSave = true
}

/* Values of all params as a simple dict. Not responsive! */
const paramValues = computed(() => {
  const vals: Dictionary = {}
  for (const param in params) {
    vals[param] = params[param].model.value
  }
  return vals
})

export function usePrefs() {
  return {params, savePrefs, loadPrefs, paramValues}
}
