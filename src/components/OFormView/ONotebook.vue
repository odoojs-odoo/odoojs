<template>
  <div>
    <Tabs v-if="children_visible.length" :animated="false" type="card">
      <TabPane
        v-for="(page, index) in children_visible"
        :key="index"
        :label="page.attrs.string"
      >
        <!-- {{ page }} -->

        <div
          v-for="(item, index) in childern_filter(page.children)"
          :key="index"
        >
          <!-- {{ item }} -->

          <div
            v-if="
              item.tagName === 'group' &&
                (item.class || '').includes('oe_subtotal_footer')
            "
          >
            <Row>
              <Col span="18"> </Col>
              <Col span="6">
                <OGroupInner
                  v-model="value2"
                  :dataDict="dataDict"
                  :node="item"
                  :editable="editable"
                  :modelMethod="modelMethod"
                  @on-change="handleOnchange"
                />
              </Col>
            </Row>
          </div>

          <OGroupOut
            v-else-if="item.tagName === 'group'"
            v-model="value2"
            :dataDict="dataDict"
            :node="item"
            :editable="editable"
            :modelMethod="modelMethod"
            @on-change="handleOnchange"
          />

          <div
            v-else-if="
              item.tagName === 'field' && item.attrs.widget === 'payment'
            "
          >
            <Row>
              <Col span="12"> </Col>
              <Col span="12">
                <OWidgetPayment
                  v-model="value2"
                  :dataDict="dataDict"
                  :node="item"
                  :editable="editable"
                  :modelMethod="modelMethod"
                  @on-change="handleOnchange"
                />
              </Col>
            </Row>

            <!-- oe_invoice_outstanding_credits_debits
             -->
          </div>

          <OField
            v-else-if="item.tagName === 'field'"
            v-model="value2"
            :dataDict="dataDict"
            :node="item"
            :editable="editable"
            :modelMethod="modelMethod"
            @on-change="handleOnchange"
          />

          <OLabel
            v-else-if="item.tagName === 'label'"
            v-model="value2"
            :dataDict="dataDict"
            :node="item"
            :editable="editable"
            :modelMethod="modelMethod"
            @on-change="handleOnchange"
          />
          <ONode
            v-else-if="['div', 'p'].includes(item.tagName)"
            v-model="value2"
            :dataDict="dataDict"
            :node="item"
            :editable="editable"
            :modelMethod="modelMethod"
            @on-change="handleOnchange"
          />

          <span v-else> in Notebook: {{ item }} </span>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import OMixin from './OMixin'

import OField from './OField'
import OGroupOut from './OGroupOut'
import OGroupInner from './OGroupInner'

import OLabel from './OLabel'
import ONode from './ONode'
import OWidgetPayment from './OWidgetPayment'

export default {
  name: 'FormView',
  components: { OGroupOut, OGroupInner, OField, ONode, OLabel, OWidgetPayment },
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
