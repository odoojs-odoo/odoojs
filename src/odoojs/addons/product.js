const sale_product_template_action_kanban = `
<templates name="kanban" model="product.template" string="产品">
  <div name="title">
    <field name="name" />
  </div>
  <div name="content">
    <div> <field name="name" /></div> 
  </div>  
</templates >
`

const ProductProduct = {
  'sale.product_template_action': {
    fields_views: {
      kanban: {
        templates: sale_product_template_action_kanban
      }
    }
  }
}

//

const AddonsActions = {
  ...ProductProduct
}

export default AddonsActions
