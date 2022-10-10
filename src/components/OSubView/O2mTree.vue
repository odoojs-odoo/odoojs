<template>
  <span>
    <div>
      <template v-if="editable && !readonly">
        <a-button size="small" @click="handleCreate"> 创建 </a-button>
      </template>
    </div>

    <a-table
      :columns="columns"
      :data-source="values_display"
      rowKey="id"
      :customRow="tableCustomRow"
    >
    </a-table>

    <template v-if="fieldInfo.type === 'many2many'"> // </template>

    <template v-else>
      <O2mForm
        ref="subForm"
        :editable="editable"
        :relationInfo="relationInfo"
        :parentViewInfo="parentViewInfo"
        :parentData="parentData"
        @on-commit="handleOnCommit"
      />
    </template>
  </span>
</template>

<script>
import O2mTreeMixin from '@/odooui/O2mTreeMixin'
import O2mForm from '@/components/OSubView/O2mForm.vue'

export default {
  name: 'O2mTree',
  components: { O2mForm },
  mixins: [O2mTreeMixin],
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
