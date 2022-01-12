<template>
  <div :class="className">
    <!-- {{ editable }}
    form view -->

    <div class="o_form_sheet_bg">
      <template v-for="(item, index) in node.children">
        <template v-if="item.tagName === 'header'">
          <OHeader
            :key="index"
            :editable="editable"
            :loading="loading"
            :data-info="dataInfo"
            :view-info="{ ...viewInfo, node: item }"
            @on-event="handleOnEvent"
          />
        </template>

        <template v-else-if="item.tagName === 'sheet'">
          <OSheet
            :key="index"
            :editable="editable"
            :loading="loading"
            :data-info="dataInfo"
            :view-info="{ ...viewInfo, node: item }"
            @on-event="handleOnEvent"
          />
        </template>

        <template v-else-if="!(item.attrs.class || '').includes('oe_chatter')">
          <!--    p link footer group label field  -->
          <!-- -->
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
    </div>
    <template v-for="(item, index) in node.children">
      <template v-if="(item.attrs.class || '').includes('oe_chatter')">
        <div :key="index">
          <!-- oe_chatter -->
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import OMixin from './OMixin'
import OHeader from './OHeader'
import OSheet from './OSheet'
import ONode from './ONode'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'OFormView',
  components: { OHeader, OSheet, ONode },
  mixins: [OMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByNode]
      arr.push('o_form_view')
      arr.push(this.editable ? 'o_form_editable' : 'o_form_readonly')
      return arr.join(' ')
    }
  },

  created() {},
  async mounted() {
    // // console.log('FormView', this.node)
    // const node = JSON.parse(JSON.stringify(this.node))
    // console.log('FormView,node,', node)
  },

  methods: {}
}
</script>

<style scoped></style>
