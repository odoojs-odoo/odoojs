<template>
  <div>
    <a-button @click="onClickShowMore">
      <template #icon>
        <up-circle-outlined v-if="showSearchMore" />
        <down-circle-outlined v-else />
      </template>

      <!-- <span v-if="showSearchMore">关闭高级搜索</span>
      <span v-else>打开高级搜索</span> -->
    </a-button>

    <SearchChar
      v-if="defaultItemName && !showSearchMore"
      :placeholder="tr(searchItems[defaultItemName].string)"
      :value="(searchValues[defaultItemName] || {}).values || []"
      @change="val => onSearchChange(searchItems[defaultItemName], val)"
    />
    <template v-else>
      <template v-for="item in searchItems" :key="item.name">
        <template v-if="item.type === 'field'">
          <template v-if="item.meta.type === 'selection'">
            {{ item.type }} {{ item.meta.type }}
          </template>
          <template v-if="item.meta.type === 'many2one'">
            <!-- {{ item.type }} {{ item.meta.type }} -->

            <SearchMany2one
              :title="tr(item.string)"
              :fieldInfo="item.meta"
              :placeholder="tr(item.string)"
              :value="(searchValues[item.name] || {}).values || []"
              @change="val => onSearchChange(item, val)"
            />
            <div></div>
          </template>
          <template v-else>
            <SearchChar
              :title="tr(item.string)"
              :placeholder="tr(item.string)"
              :value="(searchValues[item.name] || {}).values || []"
              @change="val => onSearchChange(item, val)"
            />
            <div></div>
          </template>
        </template>
        <template v-else-if="item.type === 'filter'">
          <template v-if="item.selection.length">
            <!-- {{ item.type }} {{ item.selection }} -->

            <SearchSelect
              :title="tr(item.string)"
              :placeholder="tr(item.string)"
              :value="(searchValues[item.name] || {}).values || []"
              :options="item.selection"
              @change="val => onSearchChange(item, val)"
            />
          </template>

          <template v-for="item2 in item.date_children" :key="item2.name">
            <SearchDate
              class="searchDataComp"
              :title="tr(item2.string)"
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
  </div>
</template>

<script setup>
import SearchChar from './SearchChar.vue'
import SearchSelect from './SearchSelect.vue'
import SearchMany2one from './SearchMany2one.vue'
import SearchDate from './SearchDate.vue'

import { defineProps, defineEmits, computed, ref } from 'vue'
import { useL10n } from '@/components/tools/useL10n'

const { tr } = useL10n()

const props = defineProps(['searchValues', 'searchItems'])
const emit = defineEmits(['change'])

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

const showSearchMore = ref(false)

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
