<template>
  <div>
    <!-- visible: {{ visible }} {{ visible2 }} -->
    <a-modal v-model="visible2" :title="node.attrs.string">
      <!-- 建设中 ... -->

      <!-- {{ node.attrs.string }}
      {{ data }} -->

      <OForm
        :editable="true"
        :view-info="{ ...viewInfo2, node: node_non_footer }"
        :data-info="data"
        @on-event="handleOnViewEvent"
      />

      <template slot="footer">
        <!-- footer: , formFooter -->
        <!-- {{ node_footer }} -->
        <a-space>
          <template v-for="(item, index) in node_footer.children">
            <!-- {{ item.tagName }} {{ index }} -->
            <ONode
              :key="index"
              :data-info="{ ...data }"
              :view-info="{ ...viewInfo2, node: item }"
              @on-event="handleOnViewEvent"
            />
          </template>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<script>
import wizardmixin from '@/mixins/wizardmixin'
import ONode from '@/components/ONode/ONode'

// import OButton from '@/components/ONode/OButton'

export default {
  name: 'WizardForm',

  components: {
    OForm: () => import('@/components/ONode/OForm.vue'),
    ONode
    // OButton
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
