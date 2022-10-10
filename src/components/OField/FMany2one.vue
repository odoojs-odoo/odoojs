<template>
  <span>
    <template v-if="fieldInfo.widget === 'something'">
      <!-- <Something
        v-model="value"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        @change="(fname, value) => handleChange(value)"
      /> -->
    </template>
    <template v-else-if="fieldInfo.widget">
      todo: {{ fieldInfo.widget }}
    </template>

    <template v-else>
      <template v-if="!editable || readonly">
        {{ (value_display || [0, null])[1] }}
      </template>

      <template v-else>
        <OMany2one
          v-model="value2"
          :options="options"
          :width="width"
          @change="handleChange"
        />
      </template>
    </template>
  </span>
</template>

<script>
import api from '@/odoorpc'

import OFMixin from './OFMixin'
import OMany2one from '@/components/OInput/OMany2one.vue'

export default {
  name: 'FMany2one',
  components: { OMany2one },
  mixins: [OFMixin],
  props: {
    value: { type: Array, default: undefined }
  },

  data() {
    return {
      options: []
    }
  },
  computed: {},

  watch: {
    editable: {
      // eslint-disable-next-line no-unused-vars
      handler: function (newVal, oldval) {
        if (newVal && !this.readonly) {
          // console.log('editable, watch', this.fieldInfo, newVal, oldval)
          this.load_select_options()
        }
      },
      deep: true,
      immediate: true
    }
  },

  created() {},

  mounted() {
    if (this.editable && !this.readonly) {
      // console.log('editable, mounted', this.fieldInfo, this.editable)
      this.load_select_options()
    }
  },

  methods: {
    async load_select_options() {
      const relation = api.env.relation(this.fieldInfo)

      const values = this.values
      const record = this.record

      this.options = await relation.load_select_options({
        record: { ...record, ...values }
      })
    }
  }
}
</script>

<style type="text/css"></style>
