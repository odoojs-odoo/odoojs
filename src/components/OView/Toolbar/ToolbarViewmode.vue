<template>
  <div>
    <template v-if="viewMode.length > 1">
      <div align="right">
        <a-radio-group
          v-model="value2"
          :default-value="value2"
          button-style="solid"
          size="small"
          @change="handleChangeViewType"
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
    modelGet: { type: Function, default: () => undefined }
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
    async handleChangeViewType(e) {
      const viewType = e.target.value

      const model = this.modelGet()
      model.with_view(viewType)

      // this.$emit('on-event', 'on-mode-change', viewType)
    }
  }
}
</script>

<style type="text/css"></style>
