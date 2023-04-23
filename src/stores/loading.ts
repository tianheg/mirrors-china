import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)

  const updateLoadingStore = (flag) => {
    isLoading.value = flag
  }

  function onLoading(flag) {
    updateLoadingStore(flag)
  }

  return {
    isLoading,
    updateLoadingStore,
    onLoading
  }
})
