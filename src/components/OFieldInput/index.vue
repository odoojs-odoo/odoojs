<template>
  <div>
    <!-- {{ fullname }} -->
    <!-- :class="required ? 'input-required' : undefined" -->
    <!--       style="width:2000px"
 -->
    <template v-if="render.tag === 'input'">
      <Input
        :dataDict="dataDict"
        :type="render.type"
        :loading="loading"
        :fname="fname"
        :required="required"
        :placeholder="placeholder"
        @on-change="onchange"
      />
    </template>

    <template v-else-if="render.tag === 'number'">
      <!-- input-number -->
      <Input
        type="number"
        :dataDict="dataDict"
        :loading="loading"
        :fname="fname"
        :required="required"
        :placeholder="placeholder"
        @on-change="onchange"
      />
    </template>

    <template v-else-if="render.tag === 'date'">
      <!-- {{ fname }}: data -->
      <DatePicker
        :type="render.type"
        :dataDict="dataDict"
        :loading="loading"
        :fname="fname"
        :required="required"
        :placeholder="placeholder"
        @on-change="onchange"
      />
    </template>

    <template
      v-else-if="render.tag === 'selection' && render.widget === 'radio'"
    >
      <SelectionRadio
        :dataDict="dataDict"
        :fname="fname"
        :required="required"
        :placeholder="placeholder"
        :optionsMethod="optionsMethod"
        @on-change="(value, text) => onchange(value, text)"
      />
    </template>

    <template
      v-else-if="render.tag === 'selection' && render.widget === 'selection'"
    >
      selection selection
      <!-- <Selection
        :dataDict="dataDict"
        :fname="fname"
        :required="required"
        :placeholder="placeholder"
        :optionsMethod="optionsMethod"
        @on-change="(value, text) => onchange(value, text)" -->
      />
    </template>

    <template v-else-if="render.tag === 'selection'">
      <!-- selection only -->

      <Selection
        :dataDict="dataDict"
        :fname="fname"
        :required="required"
        :placeholder="placeholder"
        :optionsMethod="optionsMethod"
        @on-change="(value, text) => onchange(value, text)"
      />
    </template>

    <!-- -->

    <template
      v-else-if="render.tag === 'select' && render.widget === 'selection'"
    >
      <!-- select selection -->

      <Selection
        :dataDict="dataDict"
        :fname="fname"
        :required="required"
        :placeholder="placeholder"
        :optionsMethod="optionsMethod"
        @on-change="(value, text) => onchange(value, text)"
      />
    </template>

    <template
      v-else-if="render.tag === 'select2' && render.widget === 'many2many_tags'"
    >
      <!-- edit m2m,{{ render }},{{ fname }}: {{ dataDict[fname] }} -->
      <Select
        :dataDict="dataDict"
        :fname="fname"
        :required="required"
        :limit="7"
        mode="multiple"
        :placeholder="placeholder"
        :optionsMethod="optionsMethod"
        @on-change="(value, text) => onchange(value, text)"
      />
    </template>

    <template v-else-if="render.tag === 'select'">
      <!-- select {{ fname }} -->
      <Select
        :dataDict="dataDict"
        :fname="fname"
        :required="required"
        :limit="7"
        mode="default"
        :placeholder="placeholder"
        :optionsMethod="optionsMethod"
        @on-change="(value, text) => onchange(value, text)"
      />
    </template>

    <template v-else-if="render.tag === 'boolean'">
      <!-- boolean -->
      <!-- <a-switch :default-checked="dataDict[fname]" @change="onChangeSwitch" /> -->

      <FSwitch
        :dataDict="dataDict"
        :fname="fname"
        :required="required"
        @on-change="onchange"
      />
    </template>

    <span v-else-if="render.tag === 'img'">
      edit,img,{{ render }},{{ fname }}
    </span>

    <span v-else> edit,{{ render }},{{ fname }}: </span>
  </div>
</template>

<script>
import Input from './Input.vue'
import DatePicker from './DatePicker.vue'
import Select from './Select.vue'
import Selection from './Selection.vue'

import SelectionRadio from './SelectionRadio.vue'
import FSwitch from './FSwitch.vue'

//

export default {
  name: 'OFieldInput',
  components: { Input, DatePicker, Select, Selection, SelectionRadio, FSwitch },

  props: {
    loading: { type: Boolean, default: false },
    dataDict: {
      type: Object,
      default: () => {
        return {}
      }
    },

    fname: { type: String, default: undefined },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },

    render: {
      type: Object,
      default: () => {
        return { tag: 'input', type: undefined }
      }
    },

    optionsMethod: { type: Function, default: () => [] },
    selectionOptions: { type: Array, default: () => [] }
  },

  data() {
    return {}
  },
  computed: {},

  watch: {},

  async created() {},

  async mounted() {},

  methods: {
    onChangeSwitch(value) {
      // console.log('onChangeSwitch', [this.fname, value])
      this.onchange(value)
    },

    onchange(value, text) {
      console.log('handleOnchange', [this.fname, value, text])
      this.$emit('on-change', value, text)
    }
  }
}
</script>

<style type="text/css" scoped>
.input-required.ant-input {
  background: rgb(75, 156, 233);
}
</style>
