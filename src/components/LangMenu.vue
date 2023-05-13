<template>
  <a-dropdown placement="bottomRight">
    <!-- <translation-outlined /> -->
    <img :src="imgUrl" style="width: 22px; height: 22px" />
    <template #overlay>
      <a-menu @click="onSelectLang">
        <a-menu-item key="zh_CN" :disabled="lang === 'zh_CN'">
          <a href="javascript:;"> 中文 </a>
        </a-menu-item>
        <a-menu-item key="en_US" :disabled="lang === 'en_US'">
          <a href="javascript:;"> English </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import { ref } from 'vue';
import { useLang } from '@/components/useApi/useLang'

const { lang, onchange } = useLang()

const props = defineProps(['logoName'])
const imgName = ref(props.logoName)
const imgUrl = require('@/assets/' + imgName.value);



async function onSelectLang(e) {
  await onchange(e.key)
}
</script>

<style scoped></style>
