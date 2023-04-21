export default {
  view_partner_category_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.category',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: { placeholder: 'e.g. "Consulting Services"' },
          color: { widget: 'color_picker' },
          parent_id: {},
          active: { widget: 'boolean_toggle' }
        }
      }
    }
  },

  view_partner_category_list: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.category',
    type: 'tree',
    arch: {
      sheet: {
        display_name: {},
        color: { widget: 'color_picker' }
      }
    }
  },

  res_partner_category_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.category',
    type: 'search',
    arch: {
      name: {},
      display_name: {},
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  action_partner_category_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Contact Tags',
    type: 'ir.actions.act_window',
    res_model: 'res.partner.category',
    search_view_id: 'res_partner_category_view_search',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
