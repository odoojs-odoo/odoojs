<template>
  <div>
    <div v-show="groupby.length">
      <div :class="kanban_class || undefined">
        <template v-for="one in records">
          <div :key="one.id" class="o_kanban_group o_kanban_has_progressbar">
            <div class="o_kanban_header">
              <div class="o_kanban_header_title">
                <span class="o_column_title"> {{ one._keyval }} </span>
              </div>
              <div class="o_kanban_counter">{{ one._count }}</div>
            </div>

            <template v-for="item in one.children">
              <div
                class="oe_kanban_color_0 oe_kanban_global_click o_has_icon o_kanban_record"
                :key="item.id"
                @click="handleOnRowClick2(item)"
              >
                <ONode
                  :data-info="{ record: item }"
                  :view-info="{ ...viewInfo2, node: render_kanban(item) }"
                />
              </div>
              <!-- <a-divider :key="item.id + 'divider'" /> -->
            </template>
          </div>
        </template>
      </div>
    </div>
    <div v-show="!groupby.length">
      <div :class="kanban_class || undefined">
        <template v-for="item in records">
          <div
            class="oe_kanban_color_0 oe_kanban_global_click o_has_icon o_kanban_record"
            :key="item.id"
            @click="handleOnRowClick2(item)"
          >
            <ONode
              :data-info="{ record: item }"
              :view-info="{ ...viewInfo2, node: render_kanban(item) }"
            />
          </div>
          <!-- <a-divider :key="item.id + 'divider'" /> -->
        </template>
      </div>
      <a-pagination
        style="margin: 8px 0 0 0;"
        :total="pagination.total"
        :pageSize.sync="pagination.pageSize"
        @change="handlePageChange"
        show-less-items
      />
    </div>
  </div>
</template>

<script>
import kanbanViewMixin from '@/mixins/kanbanViewMixin'

import ONode from '@/components/ONode/ONode'

export default {
  name: 'KanbanView',
  components: { ONode },
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
