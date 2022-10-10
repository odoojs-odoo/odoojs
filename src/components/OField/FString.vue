<template>
  <span>
    <template v-if="fieldInfo.widget === 'image_url'">
      <WImageUrl
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
        {{ value_display }}
      </template>

      <template v-else>
        <OInput v-model="value2" :width="width" @change="handleChange" />
      </template>
    </template>
  </span>
</template>

<script>
import OFMixin from './OFMixin'
import WImageUrl from './WImageUrl.vue'

import OInput from '@/components/OInput/OInput.vue'

export default {
  name: 'FString',
  components: { WImageUrl, OInput },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
