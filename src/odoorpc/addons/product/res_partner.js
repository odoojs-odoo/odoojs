export default {
  view_partner_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'tree',
    buttons: { create: false, edit: true, delete: false },
    fields: {
      display_name: {},
      type: {},
      email: {},
      company_id: {},
      parent_id: {}
    }
  },

  view_partner_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    buttons: { create: false, edit: true, delete: false },
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
          name: { readonly2: 1 },
          vat: { readonly2: 1 }
        },

        _group_logo: {
          image_1920: { widget: 'image', readonly2: 1 }
        },

        _group_sale: {
          _span: 2,
          property_product_pricelist: {}
        }
      }
    }
  },

  action_contacts: {
    _odoo_model: 'ir.actions',
    name: '联系人',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    //   search_view_id: 'view_res_partner_filter',
    domain: [],
    context: { default_is_company: true },

    views: {
      tree: 'view_partner_tree',
      form: 'view_partner_form'
    }
  }
}
