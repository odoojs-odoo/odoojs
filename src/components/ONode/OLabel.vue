<template>
  <label
    :class="className"
    :for="node.tagName === 'label' ? node.attrs.for : node.attrs.name"
    :tag="node.tagName"
  >
    <template v-if="node.tagName === 'field'">
      {{ str_for_field }}
    </template>
    <template v-else-if="node.tagName === 'label'">
      {{ str_for_label }}
    </template>

    <template v-else>
      <template v-for="(item, index) in node.children">
        <ONode
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          @on-event="handleOnEvent"
        />
      </template>
    </template>
  </label>
</template>

<script>
import OMixin from './OMixin'
import ONode from './ONode'

export default {
  name: 'OLabel',
  components: { ONode },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByNode]
      arr.push('o_form_label')
      // TODO: how to add [ o_form_label_empty ]
      if (this.node.tagName === 'label')
        console.log(
          this.node.tagName,
          this.node.attrs.for,
          this.editable,
          this.node
        )
      return arr.join(' ')
    },

    str_for_field() {
      if (this.node.attrs.string) return this.node.attrs.string
      const fname = this.node.attrs.name
      return this.get_string_by_name(fname)
    },
    str_for_label() {
      if (this.node.attrs.string) return this.node.attrs.string
      const fname = this.node.attrs.for

      return this.get_string_by_for(fname)
    }
  },

  async created() {},

  mounted() {},

  methods: {
    get_string_by_name(fname) {
      const { fields = {} } = this.viewInfo.view
      const meta = fields[fname] || {}
      // console.log(this.viewInfo)
      return meta.string
    },
    get_string_by_for(fname) {
      const str = this.get_string_by_name(fname)
      if (str) return str
      else {
        // throw `label for is not a field: ${fname} `
        // TODO: node.attrs.for 可能不是 字段名 需要在 node 中 查找 field
        return '#' + fname
      }
    }
  }
}
</script>

<style type="text/css"></style>
