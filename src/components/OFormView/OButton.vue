<template>
  <span>
    <!-- {{ fullname }} -->

    <span v-if="node.attrs.string || node.attrs.title">
      <span v-if="get_invisible(node)">
        hide
      </span>
      <Button :type="button_type(node)" @click="onclick">
        {{ node.attrs.string || node.attrs.title }}
      </Button>
    </span>

    <span v-else-if="debug"> button, no name, {{ fullname }} </span>
  </span>
</template>

<script>
import OMixin from './OMixin'

export default {
  name: 'OButton',
  components: {},
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {
    // childern_filter(children) {
    //   return (children || []).filter(item => {
    //     // return true
    //     return !this.get_invisible(item)
    //   })
    // }

    button_type(btn_node) {
      //  <!-- class: "oe_highlight" -->
      if ((btn_node.class || '').includes('btn-primary')) {
        return 'primary'
      }
    },

    onclick() {
      const type = this.node.attrs.type
      const name = this.node.attrs.name
      console.log('action:', this.node.attrs, type, name)
      this.$emit('button-clicked', { ...this.node.attrs })
    }

    // // Button click in sheet area
    // async handleBtnClick(type, name) {
    //   console.log(type, name)
    //   // this.$emit('on-btn-click', type, name)
    //   if (type === 'object') {
    //     console.log('onclick object call:', name)
    //     await this.record.execute(name)
    //     await this.record.browse_flash()
    //   } else if (type === 'action') {
    //     console.log('onclick action call:', name)
    //     // const action = await this.record.action_load(name)
    //     // console.log('btnClick ', action)
    //     // const view = action.get_view('form')
    //     // console.log('call_action ', view)
    //     // const callback = (
    //     //   res //
    //     //   // field
    //     // ) => {
    //     //   // console.log('web callback,', field, deep_copy(res))
    //     //   // console.log('web callback,', field, this.record)
    //     //   this.modal_dataDict = { ...res }
    //     //   // console.log('web, xxxxxx:', deep_copy(this.dataDict))
    //     // }
    //     // const modal_record = await view.browse(null, { fetch_one: callback })
    //     // console.log('call_action ', modal_record)
    //     // const modal_node = modal_record.view_node
    //     // const deep_copy = node => {
    //     //   return JSON.parse(JSON.stringify(node))
    //     // }
    //     // console.log('call_action  2', deep_copy(modal_node))
    //     // this.modal_record = modal_record
    //     // this.modal_node = modal_node
    //     // this.modal_dataDict = modal_record.fetch_one()
    //     // this.modal_editable = true
    //     // this.showModal = true
    //   }
    // },
  }
}
</script>

<style type="text/css"></style>
