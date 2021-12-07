<template>
  <div>
    <!-- visible: {{ visible }} -->
    <a-modal v-model="visible2" :title="formTitle">
      <!-- 建设中 ... -->

      <OFormView
        :editable="true"
        :view-info="formInfo"
        :data-info="dataInfo"
        :parent-span="12"
        :method-call="methodCall"
        @on-event="handleOnViewEvent"
      />

      <template slot="footer">
        <!-- footer, {{ formFooter.fullName }} -->
        <a-space>
          <template
            v-for="(item, index) in childern_filter(formFooter.children)"
          >
            <template v-if="item.tagName === 'button'">
              <OButton
                :key="index"
                :data-info="dataInfo"
                :view-info="{ ...formInfo, node: item }"
                :method-call="methodCall"
                @on-event="handleOnViewEvent"
              />
            </template>

            <template v-else>
              <ONode
                :key="index"
                :data-info="dataInfo"
                :view-info="{ ...formInfo, node: item }"
                :method-call="methodCall"
                @on-event="handleOnViewEvent"
              />
            </template>
          </template>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<script>
import wizardmixin from '@/mixins/wizardmixin'

import OButton from '@/components/OFormView/OButton.vue'
import ONode from '@/components/OFormView/ONode'

export default {
  name: 'WizardForm',

  components: {
    OFormView: () => import('@/components/OFormView/index.vue'),
    ONode,
    OButton
  },

  mixins: [wizardmixin],

  props: {},

  data() {
    return {}
  },
  computed: {},
  watch: {},

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
