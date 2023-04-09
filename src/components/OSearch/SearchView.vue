<template>
  <div
    style="
      display: flex;
      width: 100%;
      background-color: white;
      padding-left: 5px;
      margin-bottom: 10px;
      border-radius: 5px;
    "
  >
    <div style="flex: 1; line-height: 32px">
      <SearchChar
        v-if="defaultItemName && !showSearchMore"
        :title="searchItems[defaultItemName].string"
        :placeholder="searchItems[defaultItemName].string"
        :value="(searchValues[defaultItemName] || {}).values || []"
        @change="val => onSearchChange(searchItems[defaultItemName], val)"
      />
      <!-- 更多搜索 -->
      <template v-else>
        <div
          v-for="item in searchItems"
          :key="item.name"
          style="display: inline-block"
        >
          <template v-if="item.type === 'field'">
            <template v-if="item.meta.type === 'selection'">
              {{ item.type }} {{ item.meta.type }}
            </template>
            <template v-if="item.meta.type === 'many2one'">
              <!-- {{ item.type }} {{ item.meta.type }} -->
              <SearchMany2one
                :title="item.string"
                :fieldInfo="item.meta"
                :placeholder="item.string"
                :value="(searchValues[item.name] || {}).values || []"
                @change="val => onSearchChange(item, val)"
              />
              <!-- <div></div> -->
            </template>
            <template v-else>
              <SearchChar
                :title="item.string"
                :placeholder="item.string"
                :value="(searchValues[item.name] || {}).values || []"
                @change="val => onSearchChange(item, val)"
              />
              <!-- <div></div> -->
            </template>
          </template>
          <template v-else-if="item.type === 'filter'">
            <template v-if="item.selection.length">
              <!-- {{ item.type }} {{ item.selection }} -->

              <SearchSelect
                :title="item.string"
                :placeholder="item.string"
                :value="(searchValues[item.name] || {}).values || []"
                :options="item.selection"
                @change="val => onSearchChange(item, val)"
                style="margin-left: 8px"
              />
            </template>

            <template v-for="item2 in item.date_children" :key="item2.name">
              <SearchDate
                class="searchDataComp"
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
        </div>
      </template>
    </div>
    <div style="width: 150px; text-align: right">
      <a-button
        v-show="showSearchMoreBtn"
        type="primary"
        size="small"
        style="margin-top: 5px; margin-right: 5px"
        @click="onClickShowMore"
      >
        <template #icon>
          <up-circle-outlined v-if="showSearchMore" />
          <down-circle-outlined v-else />
        </template>

        <span v-if="showSearchMore">{{ viewActions.close }}</span>
        <span v-else>{{ viewActions.advancedSearch }}</span>
      </a-button>
    </div>
  </div>
</template>

<script setup>
import SearchChar from './SearchChar.vue'
import SearchSelect from './SearchSelect.vue'
import SearchMany2one from './SearchMany2one.vue'
import SearchDate from './SearchDate.vue'

import api from '@/odoorpc'

import { defineProps, defineEmits, computed, ref, watch } from 'vue'

const props = defineProps(['searchValues', 'searchItems', 'actionId'])
const emit = defineEmits(['change'])

const viewActions = computed(() => api.global_config.view.actions)

const defaultItemName = computed(() => {
  // console.log(props.searchItems)

  if (props.searchItems.name) {
    return 'name'
  }

  const name_items = Object.keys(props.searchItems).filter(
    item => props.searchItems[item]._default
  )

  if (name_items.length) {
    return name_items[0]
  } else {
    return undefined
  }
})

const showSearchMoreBtn = computed(() => {
  const defaultItemName1 = defaultItemName.value
  const searchItems = props.searchItems
  // console.log(
  //   '======  searchItems  ======',
  //   defaultItemName1,
  //   Object.keys(searchItems).filter(item => {
  //     return item !== defaultItemName1
  //   })
  // )

  const filterRelt = Object.keys(searchItems).filter(item => {
    return item !== defaultItemName1
  })

  return filterRelt.length
})

const showSearchMore = ref(false)

watch(
  () => props.actionId,
  newValue => {
    // console.log('--- searchView newValue ---', newValue)
    if (newValue) {
      showSearchMore.value = false
    }
  },
  { immediate: true }
)

async function onClickShowMore() {
  // console.log('onClickShowMore')
  showSearchMore.value = !showSearchMore.value
}

function onSearchChange(item, value) {
  emit('change', item, value)
}
</script>

<style type="text/css">
.searchDataComp {
  padding-top: 5px;
  display: inline-block;
}
</style>
