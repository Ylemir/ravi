<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { nextTick } from 'vue'
import type { Site } from '~/store/types'
import { useWebsiteStore } from '~/store/website'

const websiteStore = useWebsiteStore()

const { websites, showModal, showContext, positionX, positionY } = storeToRefs(websiteStore)

const dropdownOptions = [
  {
    label: 'Edit',
    key: 'edit',
  },
]

function handleContextMenu({ site, event }: { site: Site; event: MouseEvent }) {
  websiteStore.setShowContext(false)
  nextTick().then(() => {
    websiteStore.setShowContext(true)
    websiteStore.setContextPosition(event.clientX, event.clientY)
    websiteStore.setCurrentSite(site)
  })
}

function handleSelect(_: string | number) {
  websiteStore.setShowContext(false)
  websiteStore.setShowModal(true)
}

function onClickoutside() {
  websiteStore.setShowContext(false)
}
</script>

<template>
  <n-grid item-responsive :x-gap="35" :y-gap="35" cols="1 800:2 1200:3">
    <n-grid-item v-for="(sites, title, index) in websites" :key="index" class="mx-auto">
      <Square :sites="sites" :title="title" @contextmenu="handleContextMenu" />
    </n-grid-item>
  </n-grid>
  <n-dropdown
    placement="bottom-start" trigger="manual" :x="positionX" :y="positionY" :options="dropdownOptions"
    :show="showContext" :on-clickoutside="onClickoutside" @select="handleSelect"
  />
  <Modal />
</template>
