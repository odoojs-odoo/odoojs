export default {
  view_partner_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    type: 'form',
    buttons: { create: false, edit: true, delete: false },
    arch: {
      sheet: {
        // _group_sales_purchases__sale: {
        //   user_id: {},
        //   property_product_pricelist: {
        //     groups: 'product.group_product_pricelist',
        //     invisible: ({ record }) => {
        //       // 'invisible': [('is_company','=',False),
        //       // ('parent_id','!=',False)]
        //       const { is_company, parent_id } = record
        //       return !is_company && parent_id
        //     }
        //   }
        // }
      }
    }
  }
}
