const ModelFields = {
  invoice_vendor_bill_id: {},
  purchase_line_id: {
    groups: 'purchase.group_purchase_user'
  },

  purchase_order_count: {
    string: 'Purchases'
  },

  purchase_order_id: {
    groups: 'purchase.group_purchase_user'
  }
}

const AddonsFields = {
  'account.move': ModelFields
}

export default AddonsFields

