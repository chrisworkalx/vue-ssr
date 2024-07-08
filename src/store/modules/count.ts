import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 3
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
