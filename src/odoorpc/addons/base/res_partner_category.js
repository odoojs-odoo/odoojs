export default {
  view_partner_category_list: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.category',
    type: 'tree',

    fields: {
      display_name: {},
      name: {},
      parent_id: {}
      // color: {}
    }
  },
  view_partner_category_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.category',
    type: 'form',
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
          _span: 2,
          name: {},
          // color: { widget: 'color_picker' },
          parent_id: {},
          active: { widget: 'boolean_toggle' }
        }
      }
    }
  },

  res_partner_category_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.category',
    type: 'search',
    arch: {
      fields: {
        name: {},
        display_name: {}
      },

      filters: {
        group_active: {
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_partner_category_form: {
    _odoo_model: 'ir.actions',
    name: '联系人标签',
    type: 'ir.actions.act_window',
    res_model: 'res.partner.category',
    search_view_id: 'res_partner_category_view_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_partner_category_list',
      form: 'view_partner_category_form'
    }
  }
}
