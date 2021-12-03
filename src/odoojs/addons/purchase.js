const purchase_rfq_kanban = `
<templates name="kanban" model="account.move" string="采购订单">
  <div name="title">
    <field name="partner_id" />
  </div>
  <div name="label">
    <div> <field name="name" /></div> 
    <div> <field name="date_order" /></div> 
  </div>
  <div name="content">
    <div> <field name="amount_total" /></div> 
    <div> <field name="state" /></div> 
  </div>
</templates >
`

const purchase_form_action_order_line_kanban = `
<templates name="kanban" >
  <div name="title">
    <field name="product_id" />
  </div>
  <div name="label">
    <div> <field name="name" /></div> 
    <div> <field name="name" /></div> 
  </div>
  <div name="content">
      <field name="product_qty" /><span> x </span>
      <span>¥</span><field name="price_unit" /> <span> = </span>
      <span>¥</span><field name="price_subtotal" />
  </div>
</templates >
`

const PurchaseOrder = {
  'purchase.purchase_rfq': {
    fields_views: {
      kanban: {
        templates: purchase_rfq_kanban
      }
    }
  },

  'purchase.purchase_form_action': {
    fields_views: {
      form: {
        order_line: {
          kanban: {
            templates: purchase_form_action_order_line_kanban
          }
        }
      },

      kanban: {
        templates: purchase_rfq_kanban
      }
    }
  }
}

const AddonsActions = {
  ...PurchaseOrder
}

export default AddonsActions
