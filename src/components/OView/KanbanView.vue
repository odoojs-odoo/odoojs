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
              <OKanban
                :key="item.id"
                :data-info="{ record: item }"
                :view-info="{ ...viewInfo2, node }"
                @on-row-click="handleOnRowClick2(item)"
                @on-event="handleOnEvent"
              />
            </template>
          </div>
        </template>
      </div>
    </div>
    <div v-show="!groupby.length">
      <div :class="kanban_class || undefined">
        <template v-for="item in records">
          <OKanban
            :key="item.id"
            :data-info="{ record: item }"
            :view-info="{ ...viewInfo2, node }"
            @on-row-click="handleOnRowClick2(item)"
            @on-event="handleOnEvent"
          />
        </template>
      </div>
      <a-pagination
        style="margin: 8px 0 0 0"
        :total="pagination.total"
        :pageSize.sync="pagination.pageSize"
        @change="handlePageChange"
        show-less-items
      />
    </div>

    <template v-if="showWizard">
      <WizardForm
        :visible.sync="showWizard"
        :view-info="wizardViewInfo"
        @on-event="handleOnEvent"
      />
    </template>
  </div>
</template>

<script>
import kanbanViewMixin from '@/mixins/kanbanViewMixin'
import OKanban from '@/components/OKBNode/OKanban'
import WizardForm from '@/components/OView/WizardForm.vue'

// import ONode from '@/components/ONode/ONode'

export default {
  name: 'KanbanView',
  components: { OKanban, WizardForm },
  mixins: [kanbanViewMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},
  watch: {},

  async created() {},
  async mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
