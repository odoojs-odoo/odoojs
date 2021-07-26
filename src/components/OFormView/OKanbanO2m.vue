<template>
  <div>
    <!-- <div>{{ parentField }}</div> -->
    <Card v-for="one in data2" :key="one.id" style="width:200px">
      <p slot="title">
        <ONode
          parent="kanban"
          :dataDict="one"
          :node="kanban_title"
          :modelMethod="modelMethod"
        />
      </p>

      <div>
        <ONode
          parent="kanban"
          :dataDict="one"
          :node="kanban_content"
          :modelMethod="modelMethod"
        />
      </div>
    </Card>
  </div>
</template>

<script>
import OMixinO2m from './OMixinO2m'

import ONode from './ONode'

export default {
  name: 'OKanbanO2m',
  components: { ONode },
  mixins: [OMixinO2m],

  props: {},

  data() {
    return {
      new_data: [],
      data_updated: undefined
    }
  },
  computed: {
    data2() {
      // 正在编辑的行, 数据在 form_data
      // 因此 仅仅 有该行即可
      const data = this.data_updated || this.data
      const new_data = this.new_data
      return [...data, ...new_data]
    },

    kanban_title() {
      const model = this.modelMethod()
      if (model) {
        return model.kanban_title()
      }
      return undefined
    },

    kanban_content() {
      const model = this.modelMethod()
      if (model) {
        return model.kanban_content()
      }
      return undefined
    }
  },

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
