<template>
  <!--  -->
  <OKBManageToggleButton
    v-if="is_o_kanban_manage_toggle_button"
    :data-info="dataInfo"
    :view-info="{ ...viewInfo, node }"
    @on-event="handleOnEvent"
  />
  <a v-else href="javascript:;" @click="onclick" :class="className">
    <template v-if="!node.children || !node.children.length">
      {{ node.content || node.attrs.title }}
    </template>

    <template v-else>
      <template v-for="(item, index) in node.children">
        <ONode
          :key="index"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          @on-event="handleOnEvent"
        />
      </template>
    </template>
  </a>
</template>

<script>
import OMixin from './OMixin'
import ONode from './ONode'

import OKBManageToggleButton from './OKBManageToggleButton.vue'
export default {
  name: 'OA',
  components: { OKBManageToggleButton, ONode },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    is_o_kanban_manage_toggle_button() {
      const node_class = (this.node.attrs || {}).class || ''
      if (node_class.includes('o_kanban_manage_toggle_button')) return true
      else if (node_class.includes('dropdown-toggle')) return true
      else return false
    }
  },

  async created() {},

  mounted() {},

  methods: {
    onclick(e) {
      console.log('btn click.')

      e.preventDefault()
      e.stopPropagation()

      this.$emit('on-event', 'button-clicked', this.node)

      // const type = this.node.attrs.type
      // const name = this.node.attrs.name
      // console.log('action:', this.node.attrs, type, name)

      // const type = this.node.attrs.type
      // const name = this.node.attrs.name
      // const context = this.node.attrs.context
      // console.log(
      //   'btn click.',
      //   type,
      //   name,
      //   context,
      //   JSON.parse(JSON.stringify(this.node))
      // )

      // this.$emit('on-event', 'button-clicked', {
      //   node: this.node
      //   // row_id: this.dataDict222.id
      // })
    }
  }
}
</script>

<style lang="less">
.o_project_kanban_main {
  .fa-ellipsis-v {
    float: right;
  }
}
</style>
