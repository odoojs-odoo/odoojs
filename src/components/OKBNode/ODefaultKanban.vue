<template>
  <div :class="className" @click="handleOnRowClick2">
    <template v-for="(item, index) in node.children">
      <!-- 可点击 oe_kanban_global_click
     TODO: 设置样式, 显示小手
     -->

      <ONode
        :key="index"
        :data-info="dataInfo"
        :view-info="{ ...viewInfo, node: item, dropdown_menu }"
        @on-event="handleOnEvent"
      />
    </template>
  </div>
</template>

<script>
import KBNodeMixin from './KBNodeMixin'
import ONode from '@/components/ONode/ONode'

export default {
  name: 'ODefaultKanban',
  components: { ONode },

  mixins: [KBNodeMixin],

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

<style scoped></style>
