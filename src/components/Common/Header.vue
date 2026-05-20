<script setup lang="ts">
import type { LangEnum } from '~/enum/appEnum'
import { language, theme } from '~/store/projectSetting'
import { availableLocales as locales, loadLanguageAsync } from '~/modules/i18n'

const { t } = useI18n()

const languageList = computed(() =>
  locales.map(lang => ({
    label: t(`language.${lang}`),
    key: lang,
    disabled: lang === language.value,
  }))
)

async function changeLanguage(key: LangEnum) {
  language.value = key
  await loadLanguageAsync(key)
}

function changeTheme() {
  theme.value = theme.value ? '' : 'dark'
}

function greetUser() {
  window.$message.info(t('Hello', { now: new Date().toLocaleString() }))
}
</script>

<template>
  <n-layout-header pb-1 role="banner">
    <n-space align="center" justify="space-around" size="large">
      <n-space text-2xl align="center" justify="space-around">
        <router-link to="/" aria-label="Home">
          <h1 class="color-#18a058 hover:color-#36ad6a">
            Ravi
          </h1>
        </router-link>
      </n-space>

      <nav aria-label="Main navigation">
        <n-space text-4 font-bold justify="space-around">
        <router-link to="/Keyboard" theme-color>
            {{ t("header.keyboard-mode") }}
          </router-link>
          <n-divider vertical aria-hidden="true" />
          <router-link to="/Search" theme-color>
            {{ t("header.search-mode") }}
          </router-link>
        </n-space>
      </nav>

      <n-space text-xl font-medium align="center" justify="space-around" role="toolbar" aria-label="User actions">
        <div
          i-carbon-user cursor-pointer theme-color
          role="button"
          tabindex="0"
          aria-label="Greeting"
          @click="greetUser"
        />
        <router-link to="/Settings" :title="t('header.setting')">
          <div theme-color i="carbon-settings" />
        </router-link>
        <n-dropdown trigger="hover" :options="languageList" @select="changeLanguage">
          <div i-carbon:ibm-watson-language-translator theme-color :title="t('header.switch-language')"/>
        </n-dropdown>

        <n-text cursor-pointer @click="changeTheme">
          <div v-if="theme" i-carbon-moon theme-color :title="t('header.switch-to-light')"/>
          <div v-else theme-color i="carbon-sun" :title="t('header.switch-to-dark')"/>
        </n-text>
      </n-space>
    </n-space>
  </n-layout-header>
</template>
