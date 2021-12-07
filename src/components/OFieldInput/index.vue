<template>
  <span>
    <!-- {{ fullname }} -->
    <!-- :class="required ? 'input-required' : undefined" -->
    <!--       style="width:2000px"
 -->
    <template v-if="render.tag === 'input'">
      <Input
        :dataDict="dataDict"
        :elementId="elementId"
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
        :elementId="elementId"
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
        :elementId="elementId"
        :loading="loading"
        :fname="fname"
        :required="required"
        :placeholder="placeholder"
        @on-change="onchange"
      />
    </template>

    <template v-else-if="render.tag === 'boolean'">
      <!-- boolean -->
      <FSwitch
        :dataDict="dataDict"
        :fname="fname"
        :required="required"
        @on-change="onchange"
      />
    </template>

    <template v-else-if="render.tag === 'selection'">
      <template v-if="render.widget === 'radio'">
        <SelectionRadio
          :dataDict="dataDict"
          :elementId="elementId"
          :fname="fname"
          :required="required"
          :placeholder="placeholder"
          :selectionOptions="selectionOptions"
          @on-change="(value, text) => onchange(value, text)"
        />
      </template>

      <template v-else-if="render.widget === 'selection'">
        <div>selection selection</div>
        <!-- <Selection
        :dataDict="dataDict"
              :elementId="elementId"
        :fname="fname"
        :required="required"
        :placeholder="placeholder"
        :selectionOptions="selectionOptions"
        @on-change="(value, text) => onchange(value, text)"
      /> -->
      </template>

      <template v-else>
        <!-- selection only -->

        <Selection
          :dataDict="dataDict"
          :elementId="elementId"
          :fname="fname"
          :required="required"
          :placeholder="placeholder"
          :selectionOptions="selectionOptions"
          @on-change="(value, text) => onchange(value, text)"
        />
      </template>
    </template>

    <template v-else-if="render.tag === 'select'">
      <template v-if="render.widget === 'selection'">
        <!-- select selection -->
        <Selection
          :dataDict="dataDict"
          :elementId="elementId"
          :fname="fname"
          :required="required"
          :placeholder="placeholder"
          :selectionOptions="selectionOptions"
          @on-change="(value, text) => onchange(value, text)"
        />
      </template>

      <template v-else>
        <!-- select {{ fname }} {{ dataDict[fname] }} -->
        <Select
          :dataDict="dataDict"
          :elementId="elementId"
          :fname="fname"
          :required="required"
          :limit="7"
          mode="default"
          :placeholder="placeholder"
          :optionsMethod="optionsMethod"
          @on-change="(value, text) => onchange(value, text)"
        />
      </template>
    </template>

    <template v-else-if="render.tag === 'many2many'">
      <template v-if="render.widget === 'many2many_tags'">
        <!-- m2m tags -->
        <Select
          :dataDict="dataDict"
          :elementId="elementId"
          :fname="fname"
          :required="required"
          :limit="7"
          mode="multiple"
          :placeholder="placeholder"
          :optionsMethod="optionsMethod"
          @on-change="(value, text) => onchange(value, text)"
        />
      </template>

      <template v-else-if="render.widget === 'many2many_checkboxes'">
        <M2mCheckboxs
          :dataDict="dataDict"
          :elementId="elementId"
          :editable="editable"
          :fname="fname"
          :selectionOptions="selectionOptions"
          :required="required"
          @on-change="onchange"
        />
      </template>

      <template v-else>
        <div>edit, m2m, {{ render }},{{ fname }}:</div>
      </template>
    </template>

    <template v-else-if="render.tag === 'img'">
      <div>edit,img,{{ render }},{{ fname }}</div>
    </template>

    <template v-else>
      <div>edit,{{ render }},{{ fname }}:</div>
    </template>
  </span>
</template>

<script>
import Input from './Input.vue'
import DatePicker from './DatePicker.vue'
import Select from './Select.vue'
import Selection from './Selection.vue'

import SelectionRadio from './SelectionRadio.vue'
import FSwitch from './FSwitch.vue'

import M2mCheckboxs from './M2mCheckboxs.vue'

//

export default {
  name: 'OFieldInput',
  components: {
    Input,
    DatePicker,
    Select,
    Selection,
    SelectionRadio,
    FSwitch,
    M2mCheckboxs
  },

  props: {
    loading: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    dataDict: {
      type: Object,
      default: () => {
        return {}
      }
    },

    dataReady: { type: Boolean, default: false },

    elementId: { type: String, default: undefined },

    fname: { type: String, default: undefined },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },

    render: {
      type: Object,
      default: () => {
        return { tag: 'input', type: undefined }
      }
    },

    optionsMethod: { type: Function, default: () => [] }
  },

  data() {
    return {
      selectionOptions: []
    }
  },
  computed: {},

  watch: {
    dataReady(newVal) {
      if (newVal) this.handleDataReady()
    }
  },

  async created() {},

  async mounted() {
    // console.log(' mounted', this.fname, this.dataReady)

    if (this.dataReady) this.handleDataReady()
  },

  methods: {
    async handleDataReady() {
      const { tag, widget } = this.render
      if (tag === 'many2many') {
        if (widget === 'many2many_checkboxes') {
          const ops = await this.optionsMethod({ query: '', limit: 0 })
          this.selectionOptions = ops
        }
      } else if (tag === 'select') {
        if (widget === 'selection') {
          const ops = await this.optionsMethod({ query: '', limit: 0 })
          this.selectionOptions = ops
        }
      } else if (tag === 'selection') {
        const ops = await this.optionsMethod()
        this.selectionOptions = ops
      }
    },

    selectionOptionsMethod() {
      return this.optionsMethod({ selection: 1 })
    },

    onChangeSwitch(value) {
      // console.log('onChangeSwitch', [this.fname, value])
      this.onchange(value)
    },

    onchange(value, text) {
      // console.log('handleOnchange', [this.fname, value, text])
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
