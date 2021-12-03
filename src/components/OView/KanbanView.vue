<template>
  <div v-if="kanbanInfo.templates">
    <a-pagination
      :total="pagination.total"
      :pageSize.sync="pagination.pageSize"
      @change="handlePageChange"
      show-less-items
    />

    <a-list :grid="{ gutter: 16, column: 4 }" :data-source="dataList">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card>
          <p slot="title">
            <a href="javascript:;" @click="handleOnRowClick(item)">
              <KBNode
                :data-dict="item"
                :view-info="{ ...viewInfoForNode, node: kanbanInfo.title }"
              />
            </a>
          </p>

          <div slot="extra">
            <!-- <a-button @click="handleOnRowClick(item)">
              查看
            </a-button> -->
          </div>

          <KBNode
            :data-dict="item"
            :view-info="{ ...viewInfoForNode, node: kanbanInfo.content }"
          />
        </a-card>
      </a-list-item>
    </a-list>
  </div>
  <div v-else>
    找不到 Kanban 视图的 模版文件
  </div>
</template>

<script>
import kanbanViewMixin from '@/mixins/kanbanViewMixin'

import KBNode from './KBNode'

export default {
  name: 'KanbanView',
  components: { KBNode },
  mixins: [kanbanViewMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},
  watch: {},

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
