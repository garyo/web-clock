import {ref, watch, computed} from 'vue'

interface Param {
  type: "slider"|"checkbox"|"color"|"menu",
  label: string,
  model: any,
  min?: number,
  max?: number,
  units?: string,                // appended to value,
  menu_items?: string[]
}
export interface Params {
  [key: string]: Param
}

const params: Params  = {
  fontSize: {
    type: "slider",
    label: "Font Size",
    model: ref(13),
    min: 1, max: 35,
    units: "vw"
  },
  verticalSpacing: {
    type: "slider",
    label: "Vertical Spacing",
    model: ref(0.1),
    min: 0, max: 2,
    units: "em"
  },
  secondsStyle: {
    type: "menu",
    label: "Seconds Style",
    menu_items: ["Normal", "Stacked"],
    model: ref("normal"),
  },
  secondsRelSize: {
    type: "slider",
    label: "Seconds Rel Size",
    model: ref(1),
    min: 0, max: 2,
    units: "em"
  },

  ampmRelSize: {
    type: "slider",
    label: "AM/PM Rel Size",
    model: ref(1),
    min: 0, max: 2,
    units: "em"
  },
  secondsVOffset: {
    type: "slider",
    label: "Seconds Vert Shift",
    model: ref(0),
    min: -100, max: 100,
    units: "px"
  },

  ampmUpperCase: {
    type: "checkbox",
    label: "AM/PM Upper Case",
    model: ref(false),
  },

  showDate: {
    type: "checkbox",
    label: "Show Date",
    model: ref(true),
  },
  dateFontRelSize: {
    type: "slider",
    label: "Date Font Size",
    model: ref(0.8),
    min: 0.01, max: 2,
    units: "em"
  },
  timeBrightness: {
    type: "slider",
    label: "Time Brightness",
    model: ref(220),
    min: 1, max: 255,
  },
  secondsBrightness: {
    type: "slider",
    label: "Seconds/AMPM Brightness",
    model: ref(200),
    min: 1, max: 255,
  },
  dateBrightness: {
    type: "slider",
    label: "Date Brightness",
    model: ref(150),
    min: 1, max: 255,
  },
}

let allowSave = false           // don't save until we've loaded them

export interface Dictionary { [key: string]: number|string|boolean }

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

/* Values of all params as a simple dict, with units. Not responsive! */
const paramValues = computed(() => {
  const vals: Dictionary = {}
  for (const param in params) {
    if (params[param].units)
      vals[param] = params[param].model.value + params[param].units
    else
      vals[param] = params[param].model.value
  }
  return vals
})

export function usePrefs() {
  return {params, savePrefs, loadPrefs, paramValues}
}
