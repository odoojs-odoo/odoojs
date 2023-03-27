export default {
  view_vat_product_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.vat.product',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },

    fields: {
      code: {},
      name: {},
      shortname: {}
    }
  },

  view_vat_product_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.vat.product',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },

    toolbar: {
      action: {},
      print: {}
    },

    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_name: {
          code: {},
          name: {},
          shortname: {},

          parent_id: {}
        },
        _group_desc: {
          ratio_str: {},
          vat_special: {},
          grouped: {},
          active: {}
        },
        _group_note: {
          _span: 1,
          note: {}
        }
      }
    }
  },

  action_vat_product: {
    _odoo_model: 'ir.actions',
    name: '商品税收分类',
    type: 'ir.actions.act_window',
    res_model: 'fp.vat.product',
    domain: [],
    context: {},
    views: {
      tree: 'view_vat_product_tree',
      form: 'view_vat_product_form'
    }
  }
}
