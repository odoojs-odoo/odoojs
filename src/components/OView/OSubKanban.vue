<template>
  <div v-if="kanbanInfo.templates">
    <!-- {{ dataDict[`${fname}__record`] || [] }} -->

    <!-- {{ kanbanInfo }} -->
    <a-list
      :grid="{ gutter: 16, column: 4 }"
      :data-source="dataDict[`${fname}__record`] || []"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card @click="handleOnRowClick(item)">
          <!-- :data-dict="item"
            :view-info="{ ...viewInfo, node: kanbanInfo.content }" -->

          <p slot="title">
            <KBNode
              :data-dict="item"
              :view-info="{ ...subViewInfo, node: kanbanInfo.title }"
            />
          </p>

          <!-- <div slot="extra">
            <a-button @click="handleOnRowClick(item)">
              查看
            </a-button>
          </div> -->

          <KBNode
            :data-dict="item"
            :view-info="{ ...subViewInfo, node: kanbanInfo.content }"
          />
        </a-card>
      </a-list-item>
    </a-list>

    <OSubForm
      :visible.sync="showModal"
      :editable="editable"
      :loading="loading"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node: node }"
      :method-call="methodCall"
      @on-event="handleOnEvent"
    />
  </div>

  <div v-else>找不到 Kanban 视图的 模版文件</div>
</template>

<script>
import subTreeMixin from './subTreeMixin'
import { tools } from '@/odoojs'
import OSubForm from './OSubForm.vue'

import KBNode from './KBNode'

export default {
  name: 'OSubKanban',
  components: { KBNode, OSubForm },
  mixins: [subTreeMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    subViewInfo() {
      const viewInfo = JSON.parse(JSON.stringify(this.viewInfo))
      const meta = viewInfo.fields[this.fname]
      const { fields, node } = meta.views.kanban
      const subInfo = { fields, node, model: meta.relation }
      // console.log('xxxxx,', this.fname, subInfo, kanbanInfo)
      return subInfo
    },

    // for kanban
    kanbanInfo() {
      // console.log(' kanbanInfo ', cp(this.viewInfo))
      return tools.kanban_info({
        view_info: this.viewInfo,
        field: this.fname
      })
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
