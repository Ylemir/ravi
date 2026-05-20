<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Site } from '~/store/types'
import { useWebsiteStore } from '~/store/website'

const websiteStore = useWebsiteStore()

const { websites } = storeToRefs(websiteStore)

function handleEditSite({ site }: { site: Site }) {
  websiteStore.setCurrentSite(site)
  websiteStore.setShowModal(true)
}
</script>

<template>
  <n-grid item-responsive :x-gap="35" :y-gap="35" cols="1 800:2 1200:3">
    <n-grid-item v-for="(sites, title, index) in websites" :key="index" class="mx-auto">
      <Square :sites="sites" :title="title" @edit-site="handleEditSite" />
    </n-grid-item>
  </n-grid>
  <Modal />
</template>
