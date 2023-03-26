<template>
  <span>
    <span v-if="title"> 
      <b>
        {{ title }}:
      </b>
    </span>

    <a-select
      v-model:value="state.mVal"
      label-in-value
      :not-found-content="null"
      :default-active-first-option="false"
      mode="tags"
      show-search
      :filter-option="false"
      :show-arrow="false"
      :options="options"
      :placeholder="placeholder"
      style="width: 300px"
      @search="handleSearch"
      @change="handleChange"
      size="small"
    >
      <template #dropdownRender="{ menuNode: menu }">
        <v-nodes :vnodes="menu" />
        <template v-if="options.length > 0">
          <a-divider style="margin: 4px 0" />

          <div
            style="padding: 4px 8px; cursor: pointer"
            @mousedown="e => e.preventDefault()"
            @click="onSearchMore"
          >
            <search-outlined />
            搜索更多
          </div>
        </template>
      </template>
    </a-select>

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
  },
  { immediate: true }
)

async function handleSearch(val) {
  // console.log('handleSearch:', val)
  const ops = await call_loadSelectOptions({ name: val, limit: 8 })
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

const moreVisible = ref(false)
const moreSearch = useMoreSearch()

const { current: moreCurrent } = moreSearch
const { records: moreRecords, columns: moreColumns } = moreSearch

async function onSearchMore() {
  console.log('searchMore')
  moreSearch.loadData()
  moreVisible.value = true
}

function onMorePick(one) {
  if (one) {
    // todo 检查 重复选择
    const value = [...state.mVal, { value: `__id:${one[0]}`, label: one[1] }]
    handleChange(value)
  }

  moreVisible.value = false
}

function useMoreSearch() {
  const records = ref([])
  const columns = ref([
    {
      dataIndex: 'display_name',
      key: 'display_name',
      title: '名称'
      // align: 'center'
    }
  ])

  async function loadData() {
    console.log('searchMore')
    const ops = await call_loadSelectOptions({ limit: 0 })
    // // console.log('searchMore', ops)

    records.value = ops.map(item => {
      return { id: item[0], display_name: item[1] }
    })
  }

  const current = ref({})

  function tableCustomRow(record) {
    return {
      // eslint-disable-next-line no-unused-vars
      onClick: event => {
        // console.log('click row ', record)
        current.value = record
      }
    }
  }

  const onSubmit = () => {
    const record = current.value
    onMorePick([record.id, record.display_name])
    current.value = {}
  }

  return { records, current, columns, loadData, tableCustomRow, onSubmit }
}

function call_loadSelectOptions(kw = {}) {
  const relation = api.env.relation(props.fieldInfo)
  // todo 模拟 做一个 formInfo. 获取 record, context
  return relation.load_select_options2(null, { ...kw })
}
</script>

<style type="text/css"></style>
