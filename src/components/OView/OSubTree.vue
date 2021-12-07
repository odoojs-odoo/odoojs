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
import subTreeMixin from './subTreeMixin'
import { tools } from '@/odoojs'
import OSubForm from './OSubForm.vue'
// import { sleep } from '@/odoorpc/utils'

export default {
  name: 'OSubTree',
  components: { OSubForm },
  mixins: [subTreeMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
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

  created() {},

  mounted() {},

  methods: {
    tableCustomRow(record) {
      const that = this
      return {
        on: {
          // eslint-disable-next-line no-unused-vars
          click: event => {
            // console.log(record, event)
            that.handleOnRowClick(record)
          }
        }
      }
    }
  }
}
</script>

<style type="text/css"></style>
