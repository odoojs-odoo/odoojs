<template>
  <div>
    <!-- :class="required ? 'input-required' : undefined" -->
    <!--       style="width:2000px"
 -->

    <Input
      v-if="render.tag === 'input'"
      v-model="value2"
      :element-id="elemenId"
      :type="render.type"
      :number="render.type === 'number'"
      :placeholder="placeholder"
      @on-change="onInputChange"
      @on-enter="onInputEnter"
      @on-blur="onInputBlur"
    />

    <!-- :readonly="readonly" -->

    <DatePicker
      v-else-if="render.tag === 'date'"
      type="date"
      v-model="value2"
      :element-id="elemenId"
      transfer
      :placeholder="placeholder"
      @on-change="value => onchange(value)"
    />

    <Select
      v-else-if="render.tag === 'select' && render.widget === 'selection'"
      v-model="value2"
      label-in-value
      @on-change="result => onchange(result.value, result.label)"
    >
      <Option
        v-for="item in optionsMethod(fname)"
        :value="item[0]"
        :key="item[0]"
        >{{ item[1] }}</Option
      >
    </Select>

    <SelectM2o
      v-else-if="render.tag === 'select'"
      v-model="value2"
      :element-id="fname"
      :label="valueString"
      :limit="7"
      :placeholder="placeholder"
      :optionsMethod="optionsMethod"
      @on-change="(value, text) => onchange(value, text)"
    />

    <i-switch
      v-else-if="render.tag === 'boolean'"
      v-model="value2"
      size="large"
      false-color="#13ce66"
      @on-change="value => onchange(value)"
    >
      <span slot="open">{{ render.true_label || '是' }}</span>
      <span slot="close">{{ render.false_label || '否' }}</span>
    </i-switch>

    <span v-else> edit,{{ render }},{{ fname }}: {{ value2 }} </span>

    <!-- {{ fullname }} -->
    <!-- <span v-for="(item, index) in children_visible" :key="index">
        {{ index }}: {{ item }}
      </span> -->
  </div>
</template>

<script>
import SelectM2o from '@/components/SelectM2o'

export default {
  name: 'OInput',
  components: { SelectM2o },

  props: {
    value: { type: [String, Number, Boolean, Array, Date], default: undefined },
    fname: { type: String, default: undefined },
    valueString: { type: String, default: undefined },
    render: {
      type: Object,
      default: () => {
        return { tag: 'input', type: undefined }
      }
    },

    placeholder: { type: String, default: undefined },
    optionsMethod: { type: Function, default: () => [] }
  },

  data() {
    return {
      changed: false
    }
  },
  computed: {
    elemenId() {
      return this.fname
    },
    value2: {
      get() {
        return this.value
      },
      set(/*value*/) {
        // console.log(' value2, ', value, typeof value)
        // this.$emit('input', value)
      }
    }
  },

  async created() {},

  mounted() {},

  methods: {
    onInputChange() {
      this.changed = true
    },

    _onInputEnterAndBlur(event) {
      if (this.changed) {
        this.changed = false
        const value = event.target.value
        this.onchange(value)
      }
    },

    onInputEnter(event) {
      this._onInputEnterAndBlur(event)
    },

    onInputBlur(event) {
      this._onInputEnterAndBlur(event)
    },

    onchange(value, text) {
      console.log('handleOnchange', [this.fname, value, text])
      this.$emit('on-change', value, text)
    }
  }
}
</script>

<style type="text/css">
.input-required :nth-last-child(1) {
  color: red !important;
  background-color: dodgerblue;
}
</style>
