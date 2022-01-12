<template>
  <div class="o_form_statusbar">
    <span class="o_statusbar_buttons">
      <a-space>
        <template v-for="(item, index) in node.children">
          <template v-if="item.tagName === 'button'">
            <template v-if="get_invisible(item)"> </template>
            <OButton
              v-else
              :key="index + 'btn'"
              :data-info="dataInfo"
              :view-info="{ ...viewInfo, node: item }"
              @on-event="handleOnEvent"
            />
          </template>
        </template>
      </a-space>
    </span>
    <span class="o_statusbar_status o_field_widget o_readonly_modifier">
      <!-- state:{{ current_state }} -->
      <a-space>
        <template v-for="(btn, index) in header_statusbar_visible">
          <a-button
            :key="index"
            :disabled="btn[0] === current_state ? true : false"
            :type="btn[0] === current_state ? 'primary' : ''"
            :class="`btn o_arrow_button ${
              btn[0] === current_state
                ? 'btn-primary disabled f-danger'
                : 'btn-secondary'
            }`"
            size="small"
          >
            <!-- {{ btn[0] === current_state ? '' : '' }} -->
            {{ btn[1] }}
          </a-button>
        </template>
      </a-space>
    </span>

    <a-divider style="margin: 10px 0px" />
  </div>
</template>

<script>
import OMixin from './OMixin'
import OButton from './OButton.vue'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default {
  name: 'OHeader',
  components: { OButton },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    current_state() {
      const node_statusbar = this.header_statusbar
      if (!node_statusbar) return undefined

      const fname = node_statusbar.attrs.name
      if (!this.editable) return this.record[fname]
      else return this.values[fname]
    },

    header_statusbar() {
      const children = this.node.children
      const nodes = children.find(
        node => node.tagName === 'field' && node.attrs.widget === 'statusbar'
      )
      return nodes
    },

    header_statusbar_visible() {
      const node_statusbar = this.header_statusbar
      if (node_statusbar) {
        const str = node_statusbar.attrs.statusbar_visible || ''
        if (!str) {
          return []
        }

        const states = str.split(',')
        // const fname = node_statusbar.attrs.name
        const current_state = this.current_state

        if (current_state && !states.includes(current_state)) {
          states.push(current_state)
        }

        const meta = this.viewInfo.view.fields || { state: { selection: [] } }

        const selections2 = meta.state.selection || []
        const selections = selections2.reduce((acc, cur) => {
          return { ...acc, [cur[0]]: cur[1] }
        }, {})
        return states.map(item => [item, selections[item]])
      } else {
        return []
      }
    }
  },

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css">
  .o_statusbar_buttons{
    margin: 0 8px 0 0px;
  }
</style>
