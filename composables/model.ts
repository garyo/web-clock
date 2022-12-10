import {reactive} from 'vue'

const config = reactive({
  fontSize: '12vw',
  timeColor: '#eee',
  dateColor: '#ccc',
})

export function useConfig() {
  return config
}
