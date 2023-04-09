<template>
  <span>
    <template v-if="readonly">
      <!-- {{ dVal }} -->
      <template v-for="tag in dVal" :key="tag[0]">
        <a-tag>{{ tag[1] }}</a-tag>
      </template>
    </template>

    <template v-else>
      <!-- edit: {{ [fieldName, mVal, dVal, options] }} -->
      <!-- {{ [fieldName, mVal2, options2 ] }} -->

      <a-select
        v-model:value="mVal2"
        mode="multiple"
        label-in-value
        :default-active-first-option="false"
        :filter-option="false"
        :options="options2"
        placeholder="请选择"
        :style="compute_style"
        @search="handleSearch"
        @dropdownVisibleChange="dropdownVisibleChange"
        @change="onSelectChange"
      >
        <template #dropdownRender="{ menuNode: menu }">
          <v-nodes :vnodes="menu" />
          <template v-if="options.length > mVal2.length + 7">
            <a-divider style="margin: 4px 0" />
            <div
              style="padding: 4px 8px; cursor: pointer"
              @mousedown="e => e.preventDefault()"
              @click="searchMore"
            >
              <search-outlined />
              搜索更多
            </div>
          </template>
        </template>
      </a-select>
      <div></div>
    </template>

    <a-form-item-rest>
      <a-modal
        v-model:visible="moreVisible"
        title="搜索"
        width="600px"
        @ok="moreSearch.onSubmit"
      >
        <div>选择: {{ moreCurrent.display_name }}</div>
        <a-table
          :dataSource="moreRecords"
          :columns="moreColumns"
          :customRow="moreSearch.tableCustomRow"
          style="margin-top: 5px"
        >
        </a-table>
      </a-modal>
    </a-form-item-rest>
  </span>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFM2mTags, useMoreSearch } from './FM2mTagsApi'

function VNodes(_, { attrs }) {
  return attrs.vnodes
}

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change'])
const fM2mTags = useFM2mTags(props, { emit })

const { dVal, readonly, mVal, options, onSelectChange } = fM2mTags
const { handleSearch, dropdownVisibleChange, onMoreSelect } = fM2mTags

const mVal2 = computed({
  get() {
    return mVal.value.map(item => {
      return { value: item[0], label: item[1] }
    })
  },
  // eslint-disable-next-line no-unused-vars
  set(value) {
    // console.log('set, mval, ', value)
  }
})

const compute_style = computed(() =>
  props.width ? `width: ${props.width}` : undefined
)

const options2 = computed(() => {
  return options.value.slice(0, mVal.value.length + 7).map(item => {
    return { value: item[0], label: item[1] }
  })
})

const moreVisible = ref(false)

const moreSearch = useMoreSearch(props, { emit, onMorePick })
const { current: moreCurrent } = moreSearch
const { records: moreRecords, columns: moreColumns } = moreSearch

async function searchMore() {
  // console.log('searchMore')
  moreSearch.loadData()
  moreVisible.value = true
}

function onMorePick(one) {
  // console.log('onMorePick', one)
  if (one) {
    onMoreSelect(one)
  }

  moreVisible.value = false
}
</script>

<style type="text/css"></style>
