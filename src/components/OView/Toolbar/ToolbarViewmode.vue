<template>
  <div>
    <template v-if="viewMode.length > 1">
      <div align="right">
        <!-- @change="handleChangeViewType" -->
        <a-radio-group
          v-model="value2"
          :default-value="value2"
          button-style="solid"
          size="small"
        >
          <a-radio-button
            v-for="mode in modeButtons"
            :key="mode.name"
            :value="mode.name"
          >
            <a-icon :type="mode.icon" :theme="mode.theme" />
          </a-radio-button>
        </a-radio-group>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ToolbarViewmode',
  components: {},
  mixins: [],

  props: {
    value: { type: String, default: '' },
    viewMode: { type: Array, default: () => [] },
    action: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {}
  },
  computed: {
    value2: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    modeButtons() {
      const icons = {
        list: { type: 'unordered-list' },
        kanban: { type: 'appstore', theme: 'filled' },
        graph: { type: 'area-chart' },
        pivot: { type: 'table' },
        calendar: { type: 'calendar' },
        activity: { type: 'clock-circle' }
        // gantt: { type: 'appstore', theme: 'filled' },
        // qweb: { type: 'appstore', theme: 'filled' },
      }

      return this.viewMode.map(mode => {
        // console.log(mode, icons[mode])
        return {
          name: mode,
          icon: icons[mode].type,
          theme: icons[mode].theme
        }
      })
    }
  },
  watch: {},

  async created() {},

  mounted() {},

  methods: {
    // eslint-disable-next-line no-unused-vars
    async handleChangeViewType(e) {}
  }
}
</script>

<style type="text/css"></style>
