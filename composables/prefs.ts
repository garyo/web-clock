import {reactive} from 'vue'

const prefs = reactive({
  fontSize: '12vw',
  dateFontRelSize: '0.8em',
  timeColor: '#eee',
  dateColor: '#ccc',
})

export function usePrefs() {
  return prefs
}
