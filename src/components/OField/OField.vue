<template>
  <span>
    <template v-if="fieldInfo.type === 'selection'">
      <FSelection
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val) => handleChange(val)"
      />
    </template>

    <template v-else-if="['char', 'text', 'html'].includes(fieldInfo.type)">
      <FString
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val) => handleChange(val)"
      />
    </template>

    <template
      v-else-if="
        fieldInfo.type === 'many2one' && fieldInfo.widget === 'attachment'
      "
    >
      <WAttachment
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val) => handleChange(val)"
      />
    </template>

    <template v-else-if="fieldInfo.type === 'many2one'">
      <FMany2one
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val) => handleChange(val)"
      />
    </template>

    <template
      v-else-if="['float', 'integer', 'monetary'].includes(fieldInfo.type)"
    >
      <FNumber
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val) => handleChange(val)"
      />
    </template>

    <template v-else-if="['date'].includes(fieldInfo.type)">
      <FDate
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val) => handleChange(val)"
      />
    </template>

    <template v-else-if="['datetime'].includes(fieldInfo.type)">
      <FDatetime
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val) => handleChange(val)"
      />
    </template>

    <template v-else-if="['boolean'].includes(fieldInfo.type)">
      <FBoolean
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val) => handleChange(val)"
      />
    </template>

    <template v-else-if="['binary'].includes(fieldInfo.type)">
      <FBinary
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :view-info="viewInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val) => handleChange(val)"
      />
    </template>

    <template
      v-else-if="
        fieldInfo.type === 'many2many' && fieldInfo.widget === 'many2many_tags'
      "
    >
      <FM2mTags
        ref="refM2mTags"
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val) => handleChange(val)"
      />
    </template>

    <template
      v-else-if="
        fieldInfo.type === 'one2many' && fieldInfo.widget === 'x2many_tree'
      "
    >
      <FOne2many
        ref="refOne2many"
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :view-info="viewInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val, ...args) => handleChange(val, ...args)"
      />
    </template>

    <template
      v-else-if="
        fieldInfo.type === 'many2many' && fieldInfo.widget === 'x2many_tree'
      "
    >
      <FMany2many
        ref="refMany2many"
        v-model="value2"
        :editable="editable"
        :field-info="fieldInfo"
        :view-info="viewInfo"
        :data-info="dataInfo"
        :width="width"
        @change="(fname, val) => handleChange(val)"
      />
    </template>

    <template v-else>
      todo, {{ fieldInfo.name || 'name error' }} {{ fieldInfo.type }}
      {{ fieldInfo.widget }}
      :{{ (dataInfo.record || {})[fieldInfo.name] }}
    </template>
  </span>
</template>

<script>
import OFMixin from './OFMixin'

import FSelection from '@/components/OField/FSelection.vue'
import WAttachment from '@/components/OField/WAttachment.vue'

import FMany2one from '@/components/OField/FMany2one.vue'
import FString from '@/components/OField/FString.vue'

import FNumber from '@/components/OField/FNumber.vue'

import FDate from '@/components/OField/FDate.vue'
import FDatetime from '@/components/OField/FDatetime.vue'

import FBoolean from '@/components/OField/FBoolean.vue'

import FM2mTags from '@/components/OField/FM2mTags.vue'
import FOne2many from '@/components/OField/FOne2many.vue'
import FMany2many from '@/components/OField/FMany2many.vue'

import FBinary from '@/components/OField/FBinary.vue'

export default {
  name: 'OField',
  components: {
    FSelection,
    WAttachment,
    FMany2one,
    FString,

    FNumber,
    FDate,
    FDatetime,
    FBoolean,

    FM2mTags,
    FOne2many,
    FMany2many,
    FBinary
  },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    async load_relation() {
      // const refM2mTags = this.$refs.refM2mTags || []
      const refOne2many = this.$refs.refOne2many
      const refMany2many = this.$refs.refMany2many
      if (refOne2many) {
        return await refOne2many.load_relation()
      }

      if (refMany2many) {
        return await refMany2many.load_relation()
      }
    },

    async load_relation_data(...args) {
      const refM2mTags = this.$refs.refM2mTags
      const refOne2many = this.$refs.refOne2many
      const refMany2many = this.$refs.refMany2many

      if (refM2mTags) {
        return await refM2mTags.load_relation_data()
      }

      if (refOne2many) {
        return await refOne2many.load_relation_data(...args)
      }

      if (refMany2many) {
        return await refMany2many.load_relation_data(...args)
      }
    }
  }
}
</script>

<style type="text/css">
.ant-form-item-label {
  width: auto !important;
  text-align: left;
}
.ant-form-item-control-wrapper {
  width: auto !important;
}
</style>
