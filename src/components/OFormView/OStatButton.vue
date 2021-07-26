<template>
  <span>
    <!-- {{ fullname }} -->
    <!-- // button -->

    <Button style="height:60px" class="oe_stat_button" @click="onClick">
      <div
        v-if="node.children.length && typeof node.children[0] === 'object'"
        class="o_stat_info"
      >
        <!-- <div v-if="node.children[0].children.length === 2" class="o_stat_value">
          o_stat_value
        </div>
        <div v-else class="o_stat_value">
          ValueTBD
        </div> -->

        <!-- {{ stat_info }} -->

        <div>
          <ONode
            v-model="value2"
            :dataDict="dataDict"
            :node="stat_info.children[0]"
            :modelMethod="modelMethod"
          />
        </div>

        <div>
          <ONode
            v-model="value2"
            :dataDict="dataDict"
            :node="stat_info.children[1]"
            :modelMethod="modelMethod"
          />
        </div>

        <!-- <div v-if="node.children[0].children.length === 2" class="o_stat_text">
          {{ node.children[0].children[1].children[0] }}
        </div>
        <div v-else class="o_stat_text">
          TextTBD
        </div> -->
      </div>

      <div v-else class="o_stat_info">
        <!-- stat_info: no children -->
        {{ node.attrs.string }}
      </div>
    </Button>
  </span>
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
  computed: {
    stat_info() {
      const node = this.node
      const node_statinfo = node.children[0]

      const is_feild_statinfo =
        node_statinfo.tagName === 'field' &&
        node_statinfo.attrs.widget === 'statinfo'

      if (is_feild_statinfo) {
        return {
          fullName: 'form.sheet.div.button.div',
          tagName: 'div',
          class: 'o_form_field o_stat_info',
          children: [
            {
              fullName: 'form.sheet.div.button.div.span',
              tagName: 'span',
              class: 'o_stat_value',
              children: [node_statinfo]
            },
            {
              fullName: 'form.sheet.div.button.div.span',
              tagName: 'span',
              class: 'o_stat_text',
              children: [node_statinfo.attrs.string]
            }
          ]
        }
      } else {
        return node_statinfo
      }
    }

    // stat_value() {
    //   const node_statinfo = this.stat_info
    //   console.log(node_statinfo)

    //   if (node_stat_info.children.length === 2) {
    //     return node_stat_info.children[0]
    //   } else {
    //     return undefined
    //   }
    // },

    // stat_text() {
    //   const node_stat_info = this.stat_info
    //   if (node_stat_info.children.length === 2) {
    //     return node_stat_info.children[1]
    //   } else {
    //     return undefined
    //   }
    // }
  },

  async created() {},

  mounted() {},

  methods: {
    //

    onClick() {
      // context: "{'default_partner_id': active_id}"
      // icon: "fa-pencil-square-o"
      // name: "action_view_partner_invoices"
      // type: "object"

      const type = this.node.attrs.type
      const name = this.node.attrs.name

      const context = this.model.get_context({
        node: this.node,
        row_id: this.value2.id
      })

      console.log(type, name, context, JSON.parse(JSON.stringify(this.node)))
    }
  }
}
</script>

<style type="text/css"></style>
