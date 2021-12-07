<template>
  <div>
    <template v-for="(btn, index) in children_visible">
      <template v-if="btn.tagName === 'button'">
        <OStatButton
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: btn }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>
      <template v-else-if="typeof btn === 'string'">
        {{ btn }}
        <!-- ==== in button box, not button -->
      </template>

      <template v-else>
        <!-- {{ [btn] }} -->
        ==== in button box, not button
      </template>
    </template>

    <a-divider />
  </div>
</template>

<script>
import OMixin from './OMixin'

import OStatButton from './OStatButton'

export default {
  name: 'OButtonBox',
  components: { OStatButton },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
