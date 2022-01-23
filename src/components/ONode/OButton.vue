<template>
  <div style="display: inline-block">
    <template v-if="invisible"> </template>

    <a-button
      v-else
      size="small"
      :type="button_type"
      :class="className"
      @click="onclick"
    >
      <i
        :class="'fa o_button_icon ' + node.attrs.icon"
        v-if="node.attrs.icon"
      />
      <template v-if="!node.children || !node.children.length">
        {{ node.content || node.attrs.string || node.attrs.title }}
      </template>
      <template v-for="(item, index) in node.children">
        <ONode
          :key="index"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          @on-event="handleOnEvent"
        />
      </template>
    </a-button>
  </div>
</template>

<script>
import OMixin from './OMixin'
import ONode from './ONode'

const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'OButton',
  components: { ONode },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByNode]
      arr.unshift('btn')
      return arr.join(' ')
    },
    button_type() {
      const node = this.node
      const btn_class = node.attrs.class || ''
      const primary =
        btn_class.includes('btn-primary') || btn_class.includes('oe_highlight')

      if (primary) return 'primary'
      return undefined
    }
  },

  async created() {},

  mounted() {},

  methods: {
    async onclick(e) {
      console.log('btn click', cp(this.node))
      e.preventDefault()
      e.stopPropagation()
      this.$emit('on-event', 'button-clicked', this.node)
    }
  }
}
</script>

<style type="text/css"></style>
