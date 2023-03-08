<template>
  <span>
    <template v-if="fieldInfo.widget === 'image'">
      <!-- <WImage
        v-model="value"
        :editable="editable"
        :field-info="fieldInfo"
        :view-info="viewInfo"
        :data-info="dataInfo"
        @change="(fname, value) => handleChange(value)"
      /> -->
    </template>
    <template v-else-if="fieldInfo.widget">
      todo: {{ fieldInfo.widget }}
    </template>

    <template v-else>
      <template v-if="!editable || readonly">
        // todo
        <!-- <van-field :label="fieldInfo.string" readonly :value="value_display" /> -->
      </template>

      <template v-else> // todo</template>
    </template>
  </span>
</template>

<script>
// todo
//
// import OFMixin from './OFMixin'

// import WImage from './WImage.vue'

export default {
  name: 'FBinary',
  components: { WImage },
  mixins: [OFMixin],
  props: {
    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
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
