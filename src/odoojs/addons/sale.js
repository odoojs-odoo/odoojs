const action_orders_kanban = `
<templates name="kanban" model="account.move" string="销售订单">
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

const action_quotations_with_onboarding_order_line_kanban = `
<templates name="kanban">
  <div name="title">
    <field name="product_id" />
    <field name="name" />
  </div>
  <div name="label">
    <div> <field name="name" /></div> 
  </div>
  <div name="content">
    <field name="quantity" /><span> x </span>
    <span>¥</span><field name="price_unit" /> <span> = </span>
    <span>¥</span><field name="price_subtotal" />
  </div>
</templates >
`

const SaleOrder = {
  'sale.action_quotations_with_onboarding': {
    fields_views: {
      kanban: {
        templates: action_orders_kanban
      },
      form: {
        order_line: {
          kanban: {
            templates: action_quotations_with_onboarding_order_line_kanban
          }
        }
      }
    }
  },

  'sale.action_orders': {
    fields_views: {
      kanban: {
        templates: action_orders_kanban
      }
    }
  }
}

const AddonsActions = {
  ...SaleOrder
}

export default AddonsActions
