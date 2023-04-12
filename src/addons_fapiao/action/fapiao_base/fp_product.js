export default {
  view_product_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.product',
    type: 'tree',
    arch: {
      sheet: {
        partner_id: {},
        in_out: {},
        //   vat_product_id: {},
        vat_product_code: {},
        vat_product_name: {},
        name: {},
        code: {},
        spec: {},
        uom: {},
        tax_id: {},
        active: {}
      }
    }
  },

  view_product_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.product',
    type: 'form',

    toolbar: {
      action: {},
      print: {}
    },

    arch: {
      sheet: {
        _group: {
          _group_name: {
            code: {},
            name: {},
            partner_id: {},
            in_out: {}
          },
          _group_desc: {
            vat_product_id: {},
            vat_product_code: {},
            vat_product_name: {},
            spec: {},
            uom: {},
            tax_id: {},
            active: {}
          }
        }
      }
    }
  },

  action_product: {
    _odoo_model: 'ir.actions',
    name: '开票商品',
    type: 'ir.actions.act_window',
    res_model: 'fp.product',
    domain: [],
    context: {},
    views: {
      tree: 'view_product_tree',
      form: 'view_product_form'
    }
  }
}
