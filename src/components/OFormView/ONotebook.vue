<template>
  <div>
    <a-tabs
      v-if="children_visible.length"
      type="card"
      @change="handleTabsChange"
    >
      <template v-for="(page, index) in children_visible">
        <a-tab-pane :key="index" :tab="page.attrs.string">
          <template v-for="(item, index) in childern_filter(page.children)">
            <!-- {{ item }} -->

            <div :key="index" v-if="debug && get_invisible(item)">
              hide
            </div>

            <template
              v-if="
                item.tagName === 'group' &&
                  (item.class || '').includes('oe_subtotal_footer')
              "
            >
              <a-row :key="index">
                <a-col :span="18"> </a-col>
                <a-col :span="6">
                  <OGroup
                    :editable="editable"
                    :loading="loading"
                    :data-info="dataInfo"
                    :view-info="{ ...viewInfo, node: item }"
                    :method-call="methodCall"
                    @on-event="handleOnEvent"
                  />
                </a-col>
              </a-row>
            </template>

            <template v-else-if="item.tagName === 'group'">
              <OGroup
                :key="index"
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: item }"
                :method-call="methodCall"
                @on-event="handleOnEvent"
              />
            </template>

            <template
              v-else-if="
                item.tagName === 'field' && item.attrs.widget === 'payment'
              "
            >
              <a-row :key="index">
                <a-col :span="12"> </a-col>
                <a-col :span="12">
                  OWidgetPayment
                  <!-- <OWidgetPayment
                    :node="item"
                    :editable="editable"
                    :method-call="methodCall"
                    @on-event="handleOnEvent"
                  /> -->
                </a-col>
              </a-row>

              <!-- oe_invoice_outstanding_credits_debits
             -->
            </template>

            <template v-else-if="item.tagName === 'field'">
              <OField
                :key="index"
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: item }"
                :method-call="methodCall"
                @on-event="handleOnEvent"
              />
            </template>

            <template v-else-if="item.tagName === 'label'">
              <OLabel
                :key="index"
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: item }"
                :method-call="methodCall"
                @on-event="handleOnEvent"
              />
            </template>

            <template v-else-if="['div', 'p'].includes(item.tagName)">
              <ONode
                :key="index"
                :editable="editable"
                :loading="loading"
                :data-info="dataInfo"
                :view-info="{ ...viewInfo, node: item }"
                :method-call="methodCall"
                @on-event="handleOnEvent"
              />
            </template>

            <span v-else :key="index"> in Notebook: {{ item }} </span>
          </template>
        </a-tab-pane>
      </template>
    </a-tabs>
  </div>
</template>

<script>
// import { sleep } from '@/odoorpc/utils'

import OMixin from './OMixin'

import OField from './OField'
import OGroup from './OGroup'

import OLabel from './OLabel'
import ONode from './ONode'
// import OWidgetPayment from './OWidgetPayment'

export default {
  name: 'ONotebook',
  components: {
    OGroup,
    OField,
    ONode,
    OLabel
    // , OWidgetPayment
  },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {
    // eslint-disable-next-line no-unused-vars
    async handleTabsChange(activeKey) {
      // console.log(activeKey)
      // this.initFinished = false
      // await sleep(10)
      // this.initFinished = true
    }
  }
}
</script>

<style type="text/css"></style>
