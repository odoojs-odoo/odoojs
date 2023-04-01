<template>
  <span>
    <template v-if="fieldInfo.widget === 'some widget'">
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>

    <template v-else-if="fieldInfo.widget === 'many2one_button' && readonly">
      <!-- 自定义 功能 对应的数据 -->
      <a-button @click="onClickBtn">
        {{ dVal || (fieldInfo._action || {}).string || 'todo' }}</a-button
      >
    </template>

    <template v-else-if="fieldInfo.widget === 'many2one_view'">
      <!-- 链接到 对应的数据 -->
      <a-button @click="onClickView"> {{ dVal }}</a-button>
    </template>

    <template
      v-else-if="fieldInfo.widget && !widget_nodo.includes(fieldInfo.widget)"
    >
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>

    <template v-else>
      <template v-if="readonly"> {{ dVal }} </template>

      <template v-else>
        <!-- edit: {{ [fieldName, mVal, dVal, options, onChange] }} -->

        <OMany2one
          v-model="mVal"
          :width="width"
          :placeholder="fieldInfo.placeholder || fieldInfo.string"
          :options="options"
          @search="handleSearch"
          @dropdownVisibleChange="dropdownVisibleChange"
          @change="onChange"
          @search-more="searchMore"
        />
        <a-form-item-rest>
          <!--  -->
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
      </template>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, ref, toRaw } from 'vue'
import { useFM2o, useMoreSearch } from './FM2oApi'
import OMany2one from '@/components/OInput/OMany2one.vue'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change', 'click-many2one'])
const widget_nodo = [
  'many2one_avatar_user',
  'res_partner_many2one',
  'many2one_button',
  'many2one_barcode',
  'sol_product_many2one'
]
function onClickBtn() {
  // const val = props.formInfo.record[props.fieldName]
  console.log('onClickBtn', toRaw(props))
  alert('todo button clicked')
  // emit('click-many2one', props.fieldName, val)
}

function onClickView() {
  const val = props.formInfo.record[props.fieldName]
  console.log('sdfsdf', val, val[0])
  // emit('click-many2one', props.fieldName, val)
}

const fm2o = useFM2o(props, { emit })
const { mVal, dVal, readonly, options } = fm2o
const { handleSearch, dropdownVisibleChange, onChange } = fm2o

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
  if (one) {
    onChange(one)
  }

  moreVisible.value = false
}
</script>

<style type="text/css"></style>
