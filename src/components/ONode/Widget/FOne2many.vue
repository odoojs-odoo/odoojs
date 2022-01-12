<template>
  <div v-if="invisible"></div>

  <div v-else-if="!widget || ['section_and_note_one2many'].includes(widget)">
    <WX2mView
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>

  <div v-else-if="widget === 'kanban_activity'">
    <a-icon type="clock-circle" />
    <!-- {{ value_readonly }} -->
    <!-- 1 {{ [field.type, fname, widget] }} -->
  </div>

  <div v-else-if="widget_todo">{{ [field.type, fname, widget] }}</div>

  <div v-else>
    <!-- // never here -->
  </div>
</template>

<script>
import OFMixin from './OFMixin'
import WX2mView from './WX2mView.vue'

export default {
  name: 'FOne2many',
  components: { WX2mView },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    widget_todo() {
      //   widget: "kanban_activity"
      // 'section_and_note_one2many'
      const done = []
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_one2many')

      arr.push('o_field_x2many')
      //   TODO: list or kanban

      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  async mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
