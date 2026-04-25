<script setup lang="ts">
import type { PropType } from 'vue'
import type { Site } from '~/store/types'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import { useWebsiteStore } from '~/store/website'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  sites: {
    type: Object as PropType<Array<Site>>,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'contextmenu', payload: { site: Site; event: MouseEvent }): void
}>()

const websiteStore = useWebsiteStore()

const titleName = ref(props.title)
const originalTitle = props.title

const inputStatus = ref('success')
const showInput = ref(false)
const titleInputRef = ref<HTMLElement | null>(null)

function openInput(e: MouseEvent) {
  e.preventDefault()
  showInput.value = true
}

function saveTitle() {
  if (titleName.value.trim().length === 0) {
    inputStatus.value = 'error'
    window.$message.warning('The input cannot be blank')
    return
  }
  inputStatus.value = 'success'
  showInput.value = false
  if (props.title !== titleName.value) {
    websiteStore.setTitle(props.title, titleName.value)
    window.$message.success('Save successfully')
  }
}

function cancelEdit() {
  showInput.value = false
  titleName.value = originalTitle
  inputStatus.value = 'success'
}

onClickOutside(titleInputRef, () => {
  if (showInput.value)
    saveTitle()
})

function handleContextMenu(site: Site, event: MouseEvent) {
  event.preventDefault()
  emit('contextmenu', { site, event })
}
</script>

<template>
  <n-h4 prefix="bar" class="ml-1 max-w-[90%]" @click="openInput">
    <n-input
      v-if="showInput" ref="titleInputRef" v-model:value="titleName" type="text" :status="inputStatus" maxlength="10"
      minlength="1" autofocus clearable @keydown.enter="saveTitle" @keydown.esc="cancelEdit"
    />
    <n-text v-else strong>
      {{ titleName }}
    </n-text>
  </n-h4>
  <n-grid :x-gap="8" :y-gap="8" :cols="3" class="max-w-[400px]">
    <n-grid-item
      v-for="(site, index) in sites" :key="site.id"
      @contextmenu="handleContextMenu({ ...site, index, group: title }, $event)"
    >
      <a class="square" :href="site.url" target="_blank">
        <n-ellipsis max-w-sm>
          {{ site.name }}
        </n-ellipsis>
      </a>
    </n-grid-item>
  </n-grid>
</template>

<style scoped>
.square {
  position: relative;
  display: block;
  padding: 5px;
  margin: auto;
  width: 7em;
  min-height: 2em;
  line-height: 2.4;
  text-align: center;
  font-weight: normal;
  font-size: 1em;
  border-radius: 5px;
  color: white;
  background: rgba(0, 0, 0, 0.35);
  cursor: pointer;
}

.square:hover {
  font-size: 1em;
  font-weight: bolder;
}

.edit {
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 10px;
}
</style>
