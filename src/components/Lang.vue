<!--
 * @Author: Nxf
 * @Date: 2023-03-08 16:33:04
 * @LastEditors: Nxf
 * @LastEditTime: 2023-03-08 19:35:15
 * @Descripttion: 语言选择组件 
-->

<template>
    <a-dropdown placement="bottomRight">
        <!-- <translation-outlined /> -->
        <img src="@/assets/lang.png" style="width:22px; height:22px"/>
        <template #overlay>
            <a-menu @click="onSelectLang">
                <a-menu-item key="zh" :disabled="currentLanguage === 'zh'">
                    <a href="javascript:;"> 中文 </a>
                </a-menu-item>
                <a-menu-item key="en" :disabled="currentLanguage === 'en'">
                    <a href="javascript:;"> English </a>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from "vue-i18n";
 
const i18n = useI18n()
const currentLanguage = computed(() => {
    console.log('------- i18nLanguage.value ------', i18n.locale.value);
    console.log('------- i18nLanguage.value ------', localStorage.getItem('i18nLang'));

    return i18n.locale.value
})
const onSelectLang = (e) => {
    console.log('---- onSelectLang ----', e.key);
    const languageKey = e.key
    i18n.locale.value = languageKey
    localStorage.setItem('i18nLang', languageKey)
}
</script>

<style scoped>

</style>