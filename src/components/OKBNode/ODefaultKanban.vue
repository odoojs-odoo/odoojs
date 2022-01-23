<template>
  <div class="o_kanban_record" @click="handleOnRowClick2">
    <!-- 可点击 oe_kanban_global_click
     TODO: 设置样式, 显示小手
     -->
    <ONode
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node, dropdown_menu }"
      @on-event="handleOnEvent"
    />
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
