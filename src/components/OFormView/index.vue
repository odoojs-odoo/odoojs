<template>
  <div>
    <!-- parentSpan22: {{ parentSpan }} -->

    <template v-for="(item, index) in children_visible">
      <template v-if="item.tagName === 'header'">
        <OHeader
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <template v-else-if="item.tagName === 'sheet'">
        <!-- {{ item.fullName }} -->
        <OSheet
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :parent-span="parentSpan"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <template
        v-else-if="item.tagName === 'div' && item.class === 'oe_chatter'"
      >
        <!-- chatter -->
      </template>

      <template v-else-if="item.tagName === 'div'">
        <ONode
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <template v-else-if="item.tagName === 'p'">
        <ONode
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <template v-else-if="item.tagName === 'link'"></template>

      <template v-else-if="item.tagName === 'footer'">
        footer: {{ item.fullName }}

        <!-- <OFooter
              :node="item"
              :editable="editable"
              :modelMethod="modelMethod"
              :parent-init-finished="initFinished"
              :method-call="methodCall"
              @on-event="handleOnEvent"
            /> -->
      </template>

      <template v-else-if="item.tagName === 'group'">
        <!--  o2m form 中出现 -->
        <OGroup
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :parent-span="parentSpan"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <template v-else-if="item.tagName === 'label'">
        <!--  o2m form 中出现 -->
        <OLabel
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <template v-else-if="item.tagName === 'field'">
        <!--  o2m form 中出现 -->
        <OField
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <template v-else>form else: {{ item.fullName }}</template>
    </template>
  </div>
</template>

<script>
import OMixin from './OMixin'
import OHeader from './OHeader'
import OSheet from './OSheet'
import ONode from './ONode'

// import OFooter from './OFooter'

import OGroup from './OGroup'
import OLabel from './OLabel'
import OField from './OField'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'OFormView',
  components: { OHeader, OSheet, ONode, OGroup, OLabel, OField },
  mixins: [OMixin],
  props: {
    parentSpan: { type: Number, default: 24 }
  },
  data() {
    return {}
  },
  computed: {},

  created() {},
  async mounted() {},

  methods: {}
}
</script>

<style scoped></style>
