<template>
  <div :class="kanban_class || undefined">
    <template v-for="item in values_display">
      <div
        class="oe_kanban_color_0 oe_kanban_global_click o_has_icon o_kanban_record"
        :key="item.id"
        @click="handleOnRowClick(item)"
      >
        <!-- sub Kanban
        {{ render_kanban(item) }} -->
        <ONode
          :data-info="{ record: item }"
          :view-info="{ ...viewInfo2, node: render_kanban(item) }"
        />
      </div>
      <a-divider :key="item.id + 'divider'" />
    </template>

    <template v-if="field.type === 'many2many'">
      <!-- {{ values_display }}
      {{ data }} -->
      <OM2mForm
        :visible.sync="showModal"
        :editable="editable"
        :records-old="values_display"
        :data-info="formData"
        :view-info="formViewInfo"
        @on-event="handleSubFormOnEvent"
      />

      <OM2mNew
        :visible.sync="showModalNew"
        :records-old="values_display"
        :data-info="{ records: m2mSelectOptions }"
        :view-info="{ ...viewInfo2, node }"
        @on-event="handleSubFormOnEvent"
      />
    </template>

    <template v-else>
      <OSubForm
        :visible.sync="showModal"
        :editable="editable"
        :data-info.sync="formData"
        :view-info="formViewInfo"
        @on-event="handleSubFormOnEvent"
      />
    </template>
  </div>
</template>

<script>
import subTreeMixin from './subTreeMixin'

import api from '@/odooapi'

import ONode from '@/components/ONode/ONode'

import OSubForm from './OSubForm.vue'
import OM2mForm from './OM2mForm.vue'
import OM2mNew from './OM2mNew.vue'

export default {
  name: 'OSubKanban',
  components: { ONode, OSubForm, OM2mForm, OM2mNew },
  mixins: [subTreeMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    viewType() {
      return 'kanban'
    },
    kanban_class() {
      const arr = ['o_kanban_view ', 'o_kanban_ungrouped']
      const node = this.node
      if (node.attrs.class) arr.push(node.attrs.class)

      // console.log('relation kanban', cp(this.viewInfo))
      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    render_kanban(record) {
      const node = api.Views.kanban.render_kanban(this.viewInfo2, record)

      return node
    }
  }
}
</script>

<style type="text/css"></style>
