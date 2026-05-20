import { useActiveElement, useMagicKeys, whenever } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useWebsiteStore } from '~/store/website'
import { openUrl } from '~/utils/common'

export function useGlobalHotkeys() {
  const websiteStore = useWebsiteStore()
  const { showModal, getHotKeys: hotKeys } = storeToRefs(websiteStore)

  // 全局快捷键
  const activeElement = useActiveElement()
  const notUsingInput = computed(() =>
    activeElement.value?.tagName !== 'INPUT'
    && activeElement.value?.tagName !== 'TEXTAREA',
  )

  const { current } = useMagicKeys()

  whenever(current, () => {
    if (!notUsingInput.value || showModal.value)
      return

    const keys = [...current.keys()].map(key => key.toUpperCase())
    for (const key of keys) {
      if (hotKeys.value[key])
        openUrl(hotKeys.value[key].url)
    }
    current.clear()
  })
}
