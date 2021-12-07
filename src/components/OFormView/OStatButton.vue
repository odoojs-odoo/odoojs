<template>
  <a-button style="height: 100px" class="oe_stat_button" @click="onClick">
    <!-- {{ node.children }} -->

    <i :class="'fa ' + node.attrs.icon" v-if="node.attrs.icon" />
    <template v-if="!children_visible.length">
      <div>.</div>
      <div>{{ node.attrs.string }}</div>
    </template>

    <template v-else>
      <template v-for="(item, index) in children_visible">
        <!-- {{ index }} {{ item }} -->

        <template v-if="typeof item === 'string'">
          <span :key="index" v-if="item.trim()">{{ item }}</span>
        </template>

        <template v-else-if="item.attrs.widget === 'statinfo'">
          <!-- style="float: right" -->
          <div :key="index">
            <div>{{ dataDict[item.attrs.name] }}</div>
            <div>{{ item.attrs.string }}</div>
          </div>
        </template>
        <template v-else>
          <!-- :editable="editable" -->
          <ONode
            :key="index"
            :loading="loading"
            :data-info="dataInfo"
            :view-info="{ ...viewInfo, node: item }"
            :method-call="methodCall"
            @on-event="handleOnEvent"
          />
        </template>
      </template>
    </template>
  </a-button>
</template>

<script>
import OMixin from './OMixin'

import ONode from './ONode'

export default {
  name: 'OStatButton',
  components: { ONode },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {
    //  TBD

    onClick() {
      // context: "{'default_partner_id': active_id}"
      // icon: "fa-pencil-square-o"
      // name: "action_view_partner_invoices"
      // type: "object"

      const type = this.node.attrs.type
      const name = this.node.attrs.name
      const context = this.node.attrs.context
      console.log(type, name, context, JSON.parse(JSON.stringify(this.node)))

      this.$emit('on-event', 'button-clicked', {
        node: this.node
        // row_id: this.dataDict.id
      })
    }
  }
}
</script>

<style type="text/css"></style>
