<template>
  <div>
    <!-- {{ fname }}.ids = {{ dataDict[fname] }}
    <div></div> -->
    <!-- {{ columns_readonly }} -->
    <!-- {{ dataDict[`${fname}__record`] || [] }} -->

    <a-table
      :columns="columns_readonly"
      :data-source="dataDict[`${fname}__record`] || []"
      rowKey="id"
      :pagination="false"
      :loading="loading"
      :customRow="tableCustomRow"
    >
    </a-table>
    <!-- 
      @change="handleTableChange"
      -->

    <!-- <OSubForm :visible.sync="showModal" /> -->

    <OSubForm
      :visible.sync="showModal"
      :editable="editable"
      :loading="loading"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node: node }"
      :method-call="methodCall"
      @on-event="handleOnEvent"
    />

    <!-- -->

    <!-- <span v-if="editable">
      Sub Tree edit
      {{ columns_edit }}
      {{ form_data }}

      <Form ref="formRef" :model="form_data" :rules="form_rule">
        <Table stripe :columns="columns_edit" :data="data2"> </Table>

        <Table
          :show-header="false"
          :columns="columns_action"
          :data="dataAction"
        >
        </Table>
      </Form>
    </span> -->

    <div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
import OMixin from '@/components/OFormView/OMixin'
import { tools } from '@/odoojs'

// import { sleep } from '@/odoorpc/utils'

import OSubForm from './OSubForm.vue'

export default {
  name: 'OSubTree',
  components: { OSubForm },
  mixins: [OMixin],
  props: {},
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    fname() {
      return this.node.attrs.name
    },

    view_columns() {
      return tools.view_columns({ view_info: this.viewInfo, field: this.fname })
    },

    columns() {
      const cols = this.view_columns
      // console.log('subtree', cols, this.viewInfo)
      // TBD GROUPBY
      const cols2 = cols.filter(
        item =>
          !item.node.attrs.invisible &&
          item.node.attrs.optional !== 'hide' &&
          item.node.tagName === 'field'
        // item.node.tagName !== 'templates_no_templates' &&
        // item.node.tagName !== 'groupbyb' &&
      )
      // console.log(JSON.parse(JSON.stringify(cols2)))
      return [...cols2].map(col => {
        return { ...col, dataIndex: col.key }
      })
    },

    columns_readonly() {
      // console.log(this.columns)
      return this.columns
        .filter(item => item.key !== 'sequence')
        .map(item => {
          return {
            ...item,
            key: item.key__name || item.key,
            dataIndex: item.key__name || item.key
          }
        })
    }
  },

  watch: {},

  async created() {},

  mounted() {},

  methods: {
    tableCustomRow(record) {
      const that = this
      return {
        // props: {
        //   xxx... //属性
        // },
        on: {
          // 事件
          // eslint-disable-next-line no-unused-vars
          click: event => {
            // console.log(record, event)
            that.handleOnRowClick(record)
          } // 点击行
          // dblclick: (event) => {},
          // contextmenu: (event) => {},
          // mouseenter: (event) => {},  // 鼠标移入行
          // mouseleave: (event) => {}
        }
      }
    },

    handleOnCreate() {
      console.log('handleOnCreate,', this.node)
      this.$emit('on-event', 'relation-pick', {
        type: 'one2many',
        field: this.fname,
        node: this.node
      })

      this.showModal = true
    },

    async handleOnRowClick(row) {
      console.log('handleOnRowClick,', row, this.node)

      this.$emit('on-event', 'relation-pick', {
        type: 'one2many',
        field: this.fname,
        node: this.node,
        row_id: row.id,
        editable: this.editable
      })

      this.showModal = true
    }
  }
}
</script>

<style type="text/css"></style>
