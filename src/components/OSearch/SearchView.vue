<!--
 * @Author: Nxf
 * @Date: 2023-02-11 22:39:08
 * @LastEditors: Nxf
 * @LastEditTime: 2023-02-12 11:34:17
 * @Descripttion: 
-->
<template>
    <template v-for="item in searchItems" :key="item.name">
      <template v-if="item.type === 'field'">
        <template v-if="item.meta.type === 'selection'">
          {{ item.type }} {{ item.meta.type }}
        </template>
        <template v-if="item.meta.type === 'many2one'">
          {{ item.type }} {{ item.meta.type }}
        </template>
        <template v-else>
          <SearchChar
            :title="item.string"
            :placeholder="item.string"
            :value="(searchValues[item.name] || {}).values || []"
            @change="val => onSearchChange(item, val)"
          />
        </template>
      </template>
      <template v-else-if="item.type === 'filter'">
        <template v-if="item.selection.length">
          {{ item.type }} {{ item.selection }}
        </template>

        <template v-for="item2 in item.date_children" :key="item2.name">
          <SearchDate class="searchDataComp"
            :title="item2.string"
            :value="
              (
                ((searchValues[item.name] || {}).date_children || {})[
                  item2.name
                ] || {}
              ).value || []
            "
            @change="val => onSearchChange(item2, val)"
          />
        </template>
      </template>
    </template>
</template>

<script setup>
import SearchChar from './SearchChar.vue'
import SearchDate from './SearchDate.vue'
import { defineProps, defineEmits } from 'vue'

defineProps(['searchValues', 'searchItems'])
const emit = defineEmits(['change'])

function onSearchChange(item, value) {
  emit('change', item, value)
}
</script>

<style type="text/css">
  .searchDataComp{
    padding-top: 5px;
    display: inline-block;
  }
</style>
