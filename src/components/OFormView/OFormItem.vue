<template>
  <!-- <div>fffft {{ fullname }}</div> -->

  <a-form
    labelAlign="left"
    :colon="false"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 12 }"
  >
    <!-- :id="get_fname(node, labelNode)" class="test" -->
    <!-- :htmlFor="get_labelfor(node, labelNode)" -->
    <a-form-item>
      <span slot="label" v-if="labelNode.tagName || !node.attrs.nolabel">
        <div v-if="get_invisible(node)">hide</div>
        <!-- {{ node.attrs.string }} -->

        <template v-if="!labelNode.tagName">
          <!-- <b> {{ node.attrs.string }} </b> -->
          <label :for="node.attrs.name">
            <b> {{ node.attrs.string }} </b>
          </label>
        </template>
        <template v-else>
          <!-- <b> {{ labelNode.tagName }} </b> -->

          <OLabel
            v-if="labelNode.tagName === 'label'"
            :editable="editable"
            :loading="loading"
            :data-info="dataInfo"
            :view-info="{ ...viewInfo, node: labelNode }"
            :method-call="methodCall"
            @on-event="handleOnEvent"
          />

          <ONode
            v-else
            :editable="editable"
            :loading="loading"
            :data-info="dataInfo"
            :view-info="{ ...viewInfo, node: labelNode }"
            :method-call="methodCall"
            @on-event="handleOnEvent"
          />
        </template>
      </span>

      <template v-if="node.tagName === 'field'">
        <OField
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: node }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <!-- <a-input
          v-model="value2[fname]"
          :class="required ? 'input-required' : undefined"
          :placeholder="placeholder"
          @change="onInputChange"
          @pressEnter="onInputEnter"
          @blur="onInputBlur"
        /> -->

      <template v-else>
        <!-- {{ node.tagName }} -->
        <!-- 这里加上  one row 控制 -->
        <ONode
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: node }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />

        <!-- 

          <div>
          
          <a-input
          v-model="value2[fname]"
          :class="required ? 'input-required' : undefined"
          :placeholder="placeholder"
          @change="onInputChange"
          @pressEnter="onInputEnter"
          @blur="onInputBlur"
        />  
           </div>
        -->
      </template>
    </a-form-item>
  </a-form>
</template>

<script>
import OMixin from './OMixin'

import OField from './OField'
import ONode from './ONode'
import OLabel from './OLabel'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))
export default {
  name: 'OFormItem',
  components: { OField, ONode, OLabel },
  mixins: [OMixin],

  props: {
    labelNode: {
      type: Object,
      default: () => {
        return {
          children: []
        }
      }
    }
  },

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {
    // get_labelfor(node, labelNode) {
    //   //
    //   const by_label_node = nd => {
    //     //
    //   }
    //   if (labelNode) {
    //     //
    //   }
    //   return node.attrs.name
    // }
    // get_fname(field_node, label_node) {
    //   // console.log('fname', cp(field_node), cp(label_node))
    //   const fn = (node, tagName, attrName) => {
    //     if (node.tagName === tagName) {
    //       return node.attrs[attrName]
    //     }
    //     const children = node.children || []
    //     for (const item of children) {
    //       // console.log('fname2', cp(item))
    //       if (typeof item === 'string') {
    //         return undefined
    //       }
    //       const res = fn(item)
    //       // console.log('inner', item, res)
    //       if (res) {
    //         return res
    //       }
    //     }
    //     return undefined
    //   }
    //   // console.log(field_node, label_node)
    //   if (label_node && label_node.tagName) {
    //     // console.log('label')
    //     return fn(label_node, 'label', 'for')
    //     // console.log('out', label_node, res)
    //   }
    //   if (!field_node) return undefined
    //   return fn(field_node, 'field', 'name')
    // }
  }
}
</script>

<style type="text/css">
.ant-form-item-label {
  white-space: normal;
}
</style>
