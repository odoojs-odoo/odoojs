<template>
  <div class="o_form_view">
    <div class="o_form_sheet_bg">
      <span v-for="(item, index) in children_visible" :key="index">
        <OHeader
          v-if="item.tagName === 'header'"
          v-model="value2"
          :dataDict="dataDict"
          :node="item"
          :editable="editable"
          :modelMethod="modelMethod"
          @on-change="handleOnchange"
          @button-clicked="handleButtonClicked"
        />
        <OSheet
          v-else-if="item.tagName === 'sheet'"
          v-model="value2"
          :dataDict="dataDict"
          :node="item"
          :editable="editable"
          :modelMethod="modelMethod"
          @on-change="handleOnchange"
        />

        <div v-else-if="item.tagName === 'div' && item.class === 'oe_chatter'">
          <!-- chatter -->
        </div>

        <ONode
          v-else-if="item.tagName === 'div'"
          :dataDict="dataDict"
          :node="item"
          :modelMethod="modelMethod"
        />
        <div v-else-if="item.tagName === 'link'"></div>

        <div v-else-if="item.tagName === 'footer'">
          <!-- footer: {{ item.fullName }} -->

          <OFooter
            v-model="value2"
            :dataDict="dataDict"
            :node="item"
            :editable="editable"
            :modelMethod="modelMethod"
            @on-change="handleOnchange"
            @button-clicked="handleButtonClicked"
          />
        </div>

        <div v-else>
          {{ item.fullName }}
        </div>
      </span>
    </div>
  </div>
</template>

<script>
/*
Form 的 结构 tbd

header
sheet
footer

*/

import OMixin from './OMixin'

import OHeader from './OHeader'
import OSheet from './OSheet'
import OFooter from './OFooter'

import ONode from './ONode'

export default {
  name: 'FormView',
  components: { OHeader, OSheet, OFooter, ONode },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {
    // // eslint-disable-next-line no-unused-vars
    // const deep_copy = node => {
    //   return JSON.parse(JSON.stringify(node))
    // }
    // console.log('OFormView', deep_copy(this.node), this.node)
    // console.log('OFormView', deep_copy(this.node))
  },

  methods: {}
}
</script>

<style type="text/css"></style>
