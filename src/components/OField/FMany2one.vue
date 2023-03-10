<template>
  <span>
    <template v-if="fieldInfo.widget === 'some widget'">
      todo: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>
    <template v-else-if="fieldInfo.widget === 'many2one_view'">
      <!-- 链接到 对应的数据 -->
      <a-button @click="onClickView"> {{ dVal }}</a-button>
    </template>

    <template v-else-if="fieldInfo.widget">
      todo widget: {{ [fieldInfo.type, fieldInfo.widget] }}
    </template>

    <template v-else>
      <template v-if="readonly">
        {{ dVal }}
      </template>

      <template v-else>
        <!-- edit: {{ [fieldName, mVal, dVal, options, onChange] }} -->

        <!-- todo. 搜索过滤 -->

        <OMany2one
          v-model="mVal"
          :width="width"
          :placeholder="fieldInfo.string"
          :options="options"
          @dropdownVisibleChange="dropdownVisibleChange"
          @change="onChange"
          @search-more="searchMore"
        />

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
      </template>
    </template>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useFM2o } from './FM2oApi'
import OMany2one from '@/components/OInput/OMany2one.vue'

const props = defineProps([
  'modelValue',
  'width',
  'fieldName',
  'fieldInfo',
  'formInfo'
])

const emit = defineEmits(['update:modelValue', 'change', 'click-many2one'])

function onClickView() {
  const val = props.formInfo.record[props.fieldName]
  console.log('sdfsdf', val, val[0])
  // emit('click-many2one', props.fieldName, val)
}

const {
  mVal,
  dVal,
  readonly,
  options,
  dropdownVisibleChange,
  onChange,
  searchMore,
  moreVisible,
  moreRecords,
  moreColumns,
  onMoreSelect
} = useFM2o(props, { emit })

const moreActive = ref({})

function tableCustomRow(record) {
  // const router = useRouter()
  return {
    // eslint-disable-next-line no-unused-vars
    onClick: event => {
      console.log('click row ', record)
      moreActive.value = record
      // onMoreClickRow(record)
    }
  }
}

const onMoreSubmit = () => {
  // console.log(e)
  const record = moreActive.value

  onMoreSelect([record.id, record.display_name])
  moreActive.value = {}
}
</script>

<style type="text/css"></style>
