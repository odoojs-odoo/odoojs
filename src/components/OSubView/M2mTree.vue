<template>
  <span>
    <div>
      <template v-if="editable && !readonly">
        <a-button size="small" @click="handleCreate"> 添加 </a-button>
      </template>
    </div>

    <a-table
      :columns="columns"
      :data-source="values_display"
      rowKey="id"
      :customRow="tableCustomRow"
    >
    </a-table>

    <template v-if="fieldInfo.type === 'many2many'">
      <M2mForm
        ref="subForm"
        :editable="editable"
        :relationInfo="relationInfo"
        :parentViewInfo="parentViewInfo"
        @on-commit="handleOnCommit"
      />

      <M2mNew
        ref="subNew"
        :relationInfo="relationInfo"
        :parentViewInfo="parentViewInfo"
        @on-commit="handleOnCommit"
      />
    </template>

    <template v-else> </template>
  </span>
</template>

<script>
import M2mTreeMixin from '@/odooui/M2mTreeMixin'

import M2mForm from '@/components/OSubView/M2mForm.vue'
import M2mNew from '@/components/OSubView/M2mNew.vue'

export default {
  name: 'M2mTree',
  components: { M2mForm, M2mNew },
  mixins: [M2mTreeMixin],
  props: {},
  data() {
    return {}
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    tableCustomRow(record) {
      return {
        // props: {
        //   xxx... //属性
        // },
        on: {
          // eslint-disable-next-line no-unused-vars
          click: event => {
            // console.log(record)
            this.handleOnRowClick(record)
          } // 点击行
        }
      }
    }
  }
}
</script>

<style type="text/css"></style>
