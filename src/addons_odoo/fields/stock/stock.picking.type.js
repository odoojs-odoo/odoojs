const ModelFields = {
  sequence: { widget: 'handle' },
  name: { placeholder: 'e.g. Receptions' },
  active: {},
  warehouse_id: {
    groups: 'stock.group_stock_multi_warehouses',
    force_save: '1'
  },
  auto_show_reception_report: {
    groups: 'stock.group_reception_report'
  },
  sequence_id: { groups: 'base.group_no_one' },
  company_id: { groups: 'base.group_multi_company' },
  default_location_src_id: {
    required({ record }) {
      // 'required': [('code', 'in', ('internal', 'outgoing'))]
      const { code } = record
      return !['internal', 'outgoing'].includes(code)
    }
  },
  default_location_dest_id: {
    required({ record }) {
      // 'required': [('code', 'in', ('internal', 'incoming'))]
      const { code } = record
      return !['internal', 'incoming'].includes(code)
    }
  }
}

const AddonsFields = {
  'stock.picking.type': ModelFields
}

export default AddonsFields
