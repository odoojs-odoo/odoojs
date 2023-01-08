<template>
  <span>
    <template v-if="fieldInfo.widget === 'radio'">
      <WRadio
        v-model="value"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        @change="(fname, value) => handleChange(value)"
      />
    </template>
    <template v-else-if="fieldInfo.widget">
      todo: {{ fieldInfo.widget }}
    </template>

    <template v-else>
      <template v-if="!editable || readonly">
        {{ value_display2 }}
      </template>

      <template v-else>
        <a-select
          v-model="value2"
          :style="compute_style"
          @change="handleChange"
        >
          <a-select-option
            v-for="op in fieldInfo.selection || []"
            :key="op[0]"
            :value="op[0]"
          >
            {{ op[1] }}
          </a-select-option>
        </a-select>
      </template>
    </template>
  </span>
</template>

<script>
import OFMixin from './OFMixin'

import WRadio from './WRadio.vue'

export default {
  name: 'FSelection',
  components: { WRadio },
  mixins: [OFMixin],
  props: {},

  data() {
    return {}
  },
  computed: {
    value_display2() {
      const value = this.value_display
      const selection = this.fieldInfo.selection || []

      const get_label = v => {
        const elm = selection.find(item => item[0] === v)
        return elm ? elm[1] : ''
      }

      return value ? get_label(value) : ''
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
