<template>
  <span>
    <!-- <div>
      <template v-if="editable && !readonly">
        <a-button size="small" @click="handleCreate"> 创建 </a-button>
      </template>
    </div> -->

    <a-table
      :columns="columns"
      :data-source="values_display"
      rowKey="id"
      :customRow="tableCustomRow"
    >
    </a-table>

    <template v-if="fieldInfo.type === 'many2many'"> // </template>

    <template v-else>
      <ModalForm
        :visible.sync="wizardVisible"
        :action="wizardAction"
        :resId="lineId"
      />
      <!--  -->

      <!-- <O2mForm
        ref="subForm"
        :editable="editable"
        :relationInfo="relationInfo"
        :parentViewInfo="parentViewInfo"
        :parentData="parentData"
        @on-commit="handleOnCommit"
      /> -->
    </template>
  </span>
</template>

<script>
import O2mTreeMixin from '@/odooui/O2mTreeMixin'
import ModalForm from '@/components/OView/ModalForm.vue'

const cp = val => JSON.parse(JSON.stringify(val))

export default {
  name: 'O2mTree',
  components: { ModalForm },
  mixins: [O2mTreeMixin],
  props: {},
  data() {
    return {
      wizardVisible: false,
      wizardAction: undefined,

      lineId: undefined
    }
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    tableCustomRow(record) {
      const that = this
      return {
        on: {
          // eslint-disable-next-line no-unused-vars
          click: event => {
            // that._action_show_details(record)
            that.handleOnRowClick(record)
          } // 点击行
        }
      }
    },

    handleOnRowClick(record) {
      //

      // const activeIds = this.activeIds
      console.log('handleOnRowClick', record)
      this.lineId = record.id
      this.wizardAction = 'bmx_sale.action_stock_move'

      this.wizardVisible = true
    },

    _action_show_details(record) {
      const method = 'action_show_details'
      const model = 'stock.move'

      const { record: pdata } = this.parentData

      const m2o_get = m2o => {
        const val = m2o || [null, null]
        return val[0]
      }

      const context = {
        address_in_id: m2o_get(pdata.partner_id),
        default_company_id: m2o_get(pdata.company_id),
        default_date: pdata.scheduled_date,
        default_date_deadline: pdata.date_deadline,
        default_picking_id: m2o_get(pdata.id),
        default_picking_type_id: m2o_get(pdata.picking_type_id),
        default_location_id: m2o_get(pdata.location_id),
        default_location_dest_id: m2o_get(pdata.location_dest_id),
        default_partner_id: m2o_get(pdata.partner_id),
        form_view_ref: 'stock.view_move_form',
        picking_type_code: pdata.picking_type_code
      }

      console.log('tableCustomRow', cp(context), method, model, record)
      //
    }
  }
}
</script>

<style type="text/css"></style>
