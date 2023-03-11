<template>
  <span>
    <span v-if="title"> {{ title }}: </span>

    <a-select
      v-model:value="state.mVal"
      labelInValue
      mode="tags"
      style="width: 300px"
      :placeholder="placeholder"
      show-search
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      :options="options"
      @search="handleSearch"
      @change="handleChange"
    >
      <template #dropdownRender="{ menuNode: menu }">
        <v-nodes :vnodes="menu" />
        <template v-if="options.length > 0">
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

    <a-modal
      v-model:visible="moreVisible"
      title="搜索"
      width="600px"
      @ok="onMoreSubmit"
    >
      <div>选择: {{ moreActive.display_name }}</div>
      <a-table
        :dataSource="moreRecords"
        :columns="moreColumns"
        :customRow="tableCustomRow"
        style="margin-top: 5px"
      >
      </a-table>
    </a-modal>
  </span>
</template>

<script setup>
import api from '@/odoorpc'
import { defineProps, defineEmits, ref, reactive, watch } from 'vue'
// import { useL10n } from '@/components/tools/useL10n'
// const { tr } = useL10n()

function VNodes(_, { attrs }) {
  return attrs.vnodes
}

const props = defineProps(['value', 'title', 'placeholder', 'fieldInfo'])
const emit = defineEmits(['change'])

const state = reactive({ mVal: [] })

const options = ref([])

watch(
  () => props.value,
  // eslint-disable-next-line no-unused-vars
  (newVal, oldVal) => {
    // console.log([newVal, oldVal])
    state.mVal = newVal.map(item => {
      if (item.res_id) {
        return { value: `__id:${item.res_id}`, label: item.string }
      } else {
        return { value: item.value, label: item.value }
      }
    })
  }
)

function loadSelectOptions(kw = {}) {
  const relation = api.env.relation(props.fieldInfo)
  return relation.load_select_options({ ...kw, record: {} })
}

async function handleSearch(val) {
  // console.log('handleSearch:', val)
  const ops = await loadSelectOptions({ name: val, limit: 8 })
  // console.log('handleSearch', ops)

  options.value = ops.map(item => {
    return {
      value: `__id:${item[0]}`,
      label: item[1],
      res_id: item[0]
    }
  })
}

function handleChange(value) {
  // console.log('handleChange', value)
  const value2 = value.map(item => {
    if (item.value.slice(0, 5) === '__id:') {
      return {
        res_id: Number(item.value.slice(5)),
        string: item.label.trim()
      }
    } else {
      return { value: item.value, string: item.value }
    }
  })
  // console.log('handleChange', value2)

  emit('change', value2)
}

const moreRecords = ref([])
const moreVisible = ref(false)
const moreActive = ref({})

const moreColumns = ref([
  {
    dataIndex: 'display_name',
    key: 'display_name',
    title: '名称'
    // align: 'center'
  }
])

function tableCustomRow(record) {
  return {
    // eslint-disable-next-line no-unused-vars
    onClick: event => {
      console.log('click row ', record)
      moreActive.value = record
    }
  }
}

async function searchMore() {
  // console.log('searchMore')
  const ops = await loadSelectOptions({ limit: 0 })
  // console.log('searchMore', ops)

  moreRecords.value = ops.map(item => {
    return { id: item[0], display_name: item[1] }
  })

  moreVisible.value = true
}

const onMoreSubmit = () => {
  const record = moreActive.value
  const value = [
    ...state.mVal,
    { value: `__id:${record.id}`, label: record.display_name }
  ]

  handleChange(value)
  moreActive.value = {}
  moreVisible.value = false
}
</script>

<style type="text/css"></style>
